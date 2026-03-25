// src/shaders/consciousness.js — Gemini generated: Quantum Consciousness
// 白背景に溶け込む流体的な意識と創造のシェーダー
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

const container = document.getElementById('webgl-container');

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0xffffff, 0.2);

const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 100);
camera.position.z = 3.5;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// === Custom Shaders ===
const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;

  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 142.0 * 0.007042253521126761;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  void main() {
    vUv = uv;
    vNormal = normal;
    float noise = snoise(position * 1.5 + uTime * 0.2);
    vec3 newPosition = position + normal * noise * 0.3;
    vPosition = newPosition;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;

  void main() {
    vec3 colorYin = vec3(0.05, 0.08, 0.15);
    vec3 colorYang = vec3(0.85, 0.65, 0.2);
    vec3 colorTrust = vec3(0.9, 0.9, 0.95);

    float mixFactor = sin(vPosition.y * 3.0 + uTime) * 0.5 + 0.5;
    float noiseGlow = fract(sin(dot(vUv, vec2(12.9898,78.233))) * 43758.5453) * 0.1;

    vec3 baseColor = mix(colorYin, colorYang, mixFactor);

    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = dot(viewDirection, vNormal);
    fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
    fresnel = pow(fresnel, 3.0);

    vec3 finalColor = mix(baseColor, colorTrust, fresnel);
    finalColor += noiseGlow;

    float alpha = 0.85 + fresnel * 0.15;
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

// === Geometry & Material ===
const geometry = new THREE.IcosahedronGeometry(1, 64);
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: { uTime: { value: 0.0 } },
  transparent: true,
  side: THREE.DoubleSide
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// === Particles ===
const particlesGeo = new THREE.BufferGeometry();
const PARTICLE_COUNT = 700;
const posArray = new Float32Array(PARTICLE_COUNT * 3);
for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 8;
}
particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMat = new THREE.PointsMaterial({
  size: 0.015,
  color: 0x886622,
  transparent: true,
  opacity: 0.6,
  blending: THREE.MultiplyBlending
});
const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
scene.add(particlesMesh);

// === Animation ===
const clock = new THREE.Clock();
let animationId;

function animate() {
  animationId = requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  material.uniforms.uTime.value = t;
  sphere.rotation.y = t * 0.1;
  sphere.rotation.z = t * 0.05;
  particlesMesh.rotation.y = -t * 0.05;
  particlesMesh.position.y = Math.sin(t * 0.2) * 0.2;
  renderer.render(scene, camera);
}
animate();

// === Resize ===
function onResize() {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}
window.addEventListener('resize', onResize);

// === Cleanup ===
export function cleanup() {
  cancelAnimationFrame(animationId);
  window.removeEventListener('resize', onResize);
  renderer.dispose();
  geometry.dispose();
  material.dispose();
  particlesGeo.dispose();
  particlesMat.dispose();
  container.removeChild(renderer.domElement);
}
