import { initWebGPUShaderBackground } from './webgpu-runtime.js';
import { shaderCodeMain } from './webgpu-background-core.js';

let instance = null;

async function init() {
  const container = document.getElementById('webgl-container');
  if (!container) return;
  instance = await initWebGPUShaderBackground({
    container,
    shaderCode: shaderCodeMain,
    logPrefix: '[project-design/main-webgpu]',
  });
}

export function cleanup() {
  instance?.dispose?.();
  instance = null;
}

void init();
