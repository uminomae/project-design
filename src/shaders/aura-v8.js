// src/shaders/aura-v8.js — Glassy network v2 (same as v7 content from second paste)
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

let scene, camera, renderer, material, mesh, animationId;
let targetScroll = 0;
let currentScroll = 0;

function init() {
  const container = document.getElementById('webgl-container');
  if (!container) return;

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
  container.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const geometry = new THREE.PlaneGeometry(2, 2);

  const uniforms = {
    u_time: { value: 0.0 },
    u_resolution: { value: new THREE.Vector2(innerWidth, innerHeight) },
    u_scroll: { value: 0.0 }
  };

  material = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform float u_scroll;
      varying vec2 vUv;

      mat2 rot(float a) {
        float s = sin(a), c = cos(a);
        return mat2(c, -s, s, c);
      }

      vec2 cdiv(vec2 a, vec2 b) {
        float d = dot(b, b);
        d = max(d, 0.001);
        return vec2(dot(a, b), a.y * b.x - a.x * b.y) / d;
      }

      vec2 foldSpace(vec2 p, float t) {
        for(int i = 0; i < 3; i++) {
            p = abs(p) - vec2(0.15 + 0.1 * sin(t));
            p *= rot(t * 0.2 + float(i) * 1.5);
        }
        return p * 1.2;
      }

      float glassyNetwork(vec2 p, float t) {
          vec2 q = p;
          float c = 0.0;
          float amp = 1.0;

          for(int i = 0; i < 4; i++) {
              q += vec2(sin(t * 0.4 + q.y * 1.8), cos(t * 0.5 + q.x * 1.9)) * 0.5;
              float dist = length(q) * 2.5;
              c += amp * 0.04 / (abs(sin(dist - t)) + 0.03);
              q *= 1.4;
              q *= rot(t * 0.15 + float(i) * 1.1);
              amp *= 0.6;
          }
          return c;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

        float s = u_scroll;
        float w1 = 1.0 - smoothstep(0.10, 0.20, s);
        float w2 = smoothstep(0.10, 0.20, s) * (1.0 - smoothstep(0.30, 0.40, s));
        float w3 = smoothstep(0.30, 0.40, s) * (1.0 - smoothstep(0.50, 0.60, s));
        float w4 = smoothstep(0.50, 0.60, s) * (1.0 - smoothstep(0.75, 0.85, s));
        float w5 = smoothstep(0.75, 0.85, s);

        float t_rhythmic = u_time * 0.4 + sin(u_time * 1.2) * 0.3;

        p *= rot(t_rhythmic * 0.1 + s * 3.14);

        vec2 p_base = p;

        vec2 p_wave = p + normalize(p_base) * cos(length(p_base) * 25.0 - t_rhythmic * 4.0) * 0.05;
        p = mix(p, p_wave, w2);

        vec2 p_fold = foldSpace(p, t_rhythmic);
        p = mix(p, p_fold, w3);

        float r_len = length(p);
        float a = atan(p.y, p.x);
        a += (1.0 / (r_len + 0.3)) * mix(0.5, 2.0, s) * sin(t_rhythmic * 0.8);
        p = mix(p, vec2(cos(a), sin(a)) * r_len, w4);

        vec2 p_hopf = cdiv(p + vec2(0.5, 0.0), p - vec2(0.5, 0.0)) * 0.5;
        p_hopf *= rot(t_rhythmic * 0.3);
        p = mix(p, p_hopf, w5);

        float network = glassyNetwork(p, t_rhythmic);

        vec3 darkBlue = vec3(0.02, 0.08, 0.15);
        vec3 cyanCol = vec3(0.1, 0.7, 0.95);
        vec3 goldCol = vec3(0.9, 0.7, 0.2);

        vec3 color = mix(darkBlue, cyanCol, smoothstep(0.2, 0.8, network));
        color = mix(color, goldCol, smoothstep(0.7, 1.5, network));

        color = mix(color, vec3(0.8, 0.2, 0.5), w3 * smoothstep(0.5, 1.2, network) * 0.5);

        color = mix(color, vec3(1.0), smoothstep(1.5, 2.5, network));

        float alpha = smoothstep(0.1, 1.2, network);
        alpha *= smoothstep(1.8, 0.2, length(uv - 0.5));

        gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));
      }
    `,
    uniforms,
    transparent: true,
    depthWrite: false
  });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  window.addEventListener('resize', onResize);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const clock = new THREE.Clock();
  function animate() {
    animationId = requestAnimationFrame(animate);
    currentScroll += (targetScroll - currentScroll) * 0.05;
    uniforms.u_scroll.value = currentScroll;
    uniforms.u_time.value = clock.getElapsedTime();
    renderer.render(scene, camera);
  }
  animate();
}

function onResize() {
  renderer.setSize(innerWidth, innerHeight);
  if (material) {
    material.uniforms.u_resolution.value.set(innerWidth, innerHeight);
  }
  onScroll();
}

function onScroll() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll > 0) {
    targetScroll = Math.max(0, Math.min(1, window.scrollY / maxScroll));
  } else {
    targetScroll = 0;
  }
}

export function cleanup() {
  window.removeEventListener('resize', onResize);
  window.removeEventListener('scroll', onScroll);
  if (animationId) cancelAnimationFrame(animationId);
  if (mesh) {
    scene.remove(mesh);
    mesh.geometry.dispose();
    mesh.material.dispose();
  }
  if (renderer) {
    renderer.dispose();
    const container = document.getElementById('webgl-container');
    if (container && renderer.domElement && container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
  }
}

init();
