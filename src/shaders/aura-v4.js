// src/shaders/aura-v4.js — Black hole + accretion disk + isocontours
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

      float fbm(vec2 p, int octaves) {
        float f = 0.0;
        float amp = 0.5;
        mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
        for (int i = 0; i < 6; i++) {
          if (i >= octaves) break;
          f += amp * noise(p);
          p = rot * p * 2.1;
          amp *= 0.55;
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

      float isocontours(float field, float t_speed) {
        float lineAlpha = 0.0;
        lineAlpha += smoothstep(0.08, 0.0, abs(sin(field * 8.0 - t_speed * 0.8))) * 0.3;
        lineAlpha += smoothstep(0.05, 0.0, abs(sin(field * 15.0 - t_speed * 1.2 + 1.0))) * 0.5;
        lineAlpha += smoothstep(0.03, 0.0, abs(sin(field * 30.0 - t_speed * 1.5 + 2.0))) * 0.8;
        lineAlpha += smoothstep(0.015, 0.0, abs(sin(field * 60.0 - t_speed * 2.0 + 3.0))) * 1.0;
        return lineAlpha;
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

        vec2 p_base = p;

        float dist = length(p_base);
        p /= (1.0 + dist * dist * mix(5.0, 50.0, s));

        p *= rot(u_time * 0.02 + s * 3.14);

        vec2 p_wave = p + normalize(p_base) * cos(dist * mix(20.0, 50.0, s) - u_time * 4.0) * 0.04 * exp(-dist);
        p = mix(p, p_wave, w2);

        vec2 p_entangle = vec2(abs(p.x) - mix(0.3, 0.6, s), p.y + sin(p.x * 10.0 - u_time) * 0.1);
        p = mix(p, p_entangle, w3);

        float r_len = length(p);
        float a = atan(p.y, p.x);
        a += (1.0 / (r_len + 0.2)) * mix(0.8, 2.5, s) * sin(u_time * 0.5);
        vec2 p_vortex = vec2(cos(a), sin(a)) * r_len;
        p = mix(p, p_vortex, w4);

        vec2 p_hopf = cdiv(p + vec2(0.6, 0.0), p - vec2(0.6, 0.0)) * 0.4;
        p_hopf *= rot(u_time * 0.3);
        p = mix(p, p_hopf, w5);

        float t_speed = u_time * (mix(0.15, 0.5, s));

        int octaves = int(mix(3.0, 6.0, s));

        vec2 q = vec2(fbm(p + vec2(0.0), octaves), fbm(p + vec2(5.2, 1.3), octaves));
        q += vec2(sin(t_speed * 0.1), cos(t_speed * 0.15)) * 0.1;

        vec2 r_vec = vec2(fbm(p + 4.0 * q + vec2(1.7, 9.2) + t_speed * 0.1, octaves),
                          fbm(p + 4.0 * q + vec2(8.3, 2.8) - t_speed * 0.15, octaves));

        float field = fbm(p + 4.0 * r_vec, octaves);

        float eventHorizonRadius = mix(0.15, 0.4, w5);
        float eventHorizon = 1.0 - smoothstep(0.0, eventHorizonRadius, dist);

        float diskMask = smoothstep(eventHorizonRadius, eventHorizonRadius + 0.1, dist) * smoothstep(1.5, 1.0, dist);

        float lines = isocontours(field, t_speed);

        float diskAura = field * field * lines;
        diskAura += field * field * field * 0.2;

        vec3 deepBlue = vec3(0.01, 0.05, 0.15);
        vec3 brightCyan = vec3(0.1, 0.7, 0.9);
        vec3 pinkish = vec3(0.8, 0.3, 0.6);
        vec3 goldCol = vec3(0.85, 0.65, 0.25);
        vec3 inkCol = vec3(0.05, 0.10, 0.15);

        vec3 color = mix(deepBlue, brightCyan, clamp(diskAura * 4.0, 0.0, 1.0));
        color = mix(color, pinkish, clamp(length(q), 0.0, 1.0) * 0.3);
        color = mix(color, vec3(1.0), clamp(length(r_vec), 0.0, 1.0) * 0.1);

        color = mix(color, inkCol, w1 * 0.5);
        vec3 entangleCol = mix(brightCyan, goldCol, smoothstep(0.0, 0.1, p_entangle.x));
        color = mix(color, entangleCol, w3 * 0.6);
        vec3 hopfCol = mix(goldCol, brightCyan, smoothstep(0.0, 0.1, length(p_hopf.xy)));
        color = mix(color, hopfCol, w5 * 0.8);

        color = mix(color, vec3(0.0), eventHorizon);

        float brightness = length(field);
        float finalAlpha = diskMask * (brightness * 0.6 + lines * 0.3);
        finalAlpha = mix(finalAlpha, 1.0, eventHorizon * 0.9);
        finalAlpha *= (1.0 + w5 * 0.2);

        float vignette = smoothstep(1.5, 0.3, length(uv - 0.5));
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
