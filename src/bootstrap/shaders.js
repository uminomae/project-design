export async function loadRandomShader(shaderPaths, baseUrl = import.meta.url) {
    const pick = shaderPaths[Math.floor(Math.random() * shaderPaths.length)];
    const resolved = new URL(pick, baseUrl).href;
    await import(resolved);
}
