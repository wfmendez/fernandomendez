// Lazily loads Three.js configured to match the legacy (r128) rendering the
// scenes were designed with: no color management, linear output.
export async function loadThree() {
  const THREE = await import('three');
  THREE.ColorManagement.enabled = false;
  return THREE;
}

export type Three = Awaited<ReturnType<typeof loadThree>>;

export function createRenderer(THREE: Three, canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  return renderer;
}

// Frees GPU resources for everything in a scene, then the renderer itself.
export function disposeScene(scene: import('three').Scene, renderer: import('three').WebGLRenderer) {
  scene.traverse(obj => {
    const mesh = obj as import('three').Mesh;
    mesh.geometry?.dispose();
    const mat = mesh.material;
    if (Array.isArray(mat)) mat.forEach(m => m.dispose());
    else mat?.dispose();
  });
  renderer.dispose();
}
