// src/shaders/aura-v2.js — 流線(Isocontours) + 3 octave FBM
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

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }

      float fbm(vec2 p) {
        float f = 0.0;
        float amp = 0.5;
        mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
        for (int i = 0; i < 3; i++) {
          f += amp * noise(p);
          p = rot * p * 2.0;
          amp *= 0.5;
        }
        return f;
      }

      mat2 rot(float a) {
        float s = sin(a), c = cos(a);
        return mat2(c, -s, s, c);
      }

      vec2 cdiv(vec2 a, vec2 b) {
        float d = dot(b, b);
        d = max(d, 0.001);
        return vec2(dot(a, b), a.y * b.x - a.x * b.y) / d;
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

        p *= rot(u_time * 0.03 + s * 3.14);
        vec2 p_base = p;

        vec2 p_wave = p + normalize(p) * cos(length(p) * 20.0 - u_time * 4.0) * 0.04 * exp(-length(p));
        p = mix(p, p_wave, w2);

        vec2 p_entangle = vec2(abs(p.x) - 0.3, p.y + sin(p.x * 10.0 - u_time) * 0.1);
        p = mix(p, p_entangle, w3);

        float r_len = length(p);
        float a = atan(p.y, p.x);
        a += (1.0 / (r_len + 0.2)) * 0.8 * sin(u_time * 0.5);
        vec2 p_vortex = vec2(cos(a), sin(a)) * r_len;
        p = mix(p, p_vortex, w4);

        vec2 p_hopf = cdiv(p + vec2(0.6, 0.0), p - vec2(0.6, 0.0)) * 0.4;
        p_hopf *= rot(u_time * 0.3);
        p = mix(p, p_hopf, w5);

        float t = u_time * (0.15 + s * 0.25);

        vec2 q = vec2(fbm(p + vec2(0.0, t * 0.5)), fbm(p + vec2(t * 0.4, 0.0)));
        vec2 r_vec = vec2(fbm(p + 2.5 * q + vec2(1.7, 9.2) + 0.1 * t),
                          fbm(p + 2.5 * q + vec2(8.3, 2.8) - 0.1 * t));

        float field = fbm(p + 3.0 * r_vec);

        float lineAlpha = 0.0;
        lineAlpha += smoothstep(0.08, 0.0, abs(sin(field * 8.0 - u_time * 0.8))) * 0.3;
        lineAlpha += smoothstep(0.05, 0.0, abs(sin(field * 15.0 - u_time * 1.2 + 1.0))) * 0.5;
        lineAlpha += smoothstep(0.03, 0.0, abs(sin(field * 30.0 - u_time * 1.5 + 2.0))) * 0.8;
        lineAlpha += smoothstep(0.015, 0.0, abs(sin(field * 60.0 - u_time * 2.0 + 3.0))) * 1.0;

        float baseAura = smoothstep(0.3, 0.7, field) * 0.1;
        float finalAlpha = clamp(lineAlpha + baseAura, 0.0, 1.0);

        vec3 inkCol = vec3(0.05, 0.10, 0.15);
        vec3 cyanCol = vec3(0.15, 0.65, 0.90);
        vec3 goldCol = vec3(0.85, 0.65, 0.25);

        vec3 color = mix(inkCol, cyanCol, smoothstep(0.2, 0.8, length(q)));
        color = mix(color, goldCol, smoothstep(0.3, 0.9, length(r_vec)));

        float wavePattern = smoothstep(0.05, 0.0, abs(sin(length(p_base) * 30.0 - u_time * 5.0)));
        finalAlpha += wavePattern * w2 * 0.4;

        float vignette = smoothstep(1.3, 0.3, length(uv - 0.5));
        finalAlpha *= vignette;

        gl_FragColor = vec4(color, clamp(finalAlpha, 0.0, 1.0));
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
