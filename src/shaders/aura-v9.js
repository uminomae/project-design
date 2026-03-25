// src/shaders/aura-v9.js — Rainbow caustics (MtKSWW inspired)
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

      void rainbowCaustics(vec2 p, float t, out vec3 col, out float intensity) {
          p *= rot(t * 0.1);
          col = vec3(0.0);
          float causticsValue = 0.0;

          float amp = 1.0;
          for(int i=0; i<8; i++) {
              p = abs(p - 1.0) - 1.0;
              p *= rot(t * 0.02 + float(i) * 0.3);
              float l = length(p);

              vec3 c = abs(sin(t + l * 10.0 + vec3(0.0, 1.0, 2.0) * t / 10.0));

              causticsValue += dot(c, vec3(0.333)) * amp;
              col += c * amp;

              p *= 1.4;
              amp *= 0.6;
          }

          intensity = causticsValue;
          col = mix(col, vec3(dot(col, vec3(0.333))), 0.1);
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

        p *= 3.0;
        p *= rot(t_rhythmic * 0.1 + s * 3.14);

        vec2 p_base = p;

        vec2 p_wave = p + normalize(p_base) * cos(length(p_base) * 20.0 - t_rhythmic * 4.0) * 0.05;
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

        vec3 rainbowCol;
        float networkIntensity;
        rainbowCaustics(p, t_rhythmic, rainbowCol, networkIntensity);

        vec3 color = rainbowCol;
        color = mix(color, vec3(1.0), w5 * smoothstep(0.5, 1.2, networkIntensity));

        float alpha = smoothstep(0.01, 1.0, networkIntensity);
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
