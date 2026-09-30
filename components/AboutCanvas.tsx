'use client';

import { useEffect, useRef } from 'react';
import { isTouchDevice, onScreenFlag, prefersReducedMotion, startLoop } from '@/lib/motion';
import { createRenderer, disposeScene, loadThree } from '@/lib/three';

// Rotating sphere of colored dots wrapped by a thin ring.
export default function AboutCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = canvas?.parentElement;
    if (!canvas || !wrap || prefersReducedMotion()) return;
    let cleanup = () => {};
    let cancelled = false;

    loadThree().then(THREE => {
      if (cancelled) return;
      const renderer = createRenderer(THREE, canvas);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      camera.position.z = 14;

      const resize = () => {
        renderer.setSize(wrap.offsetWidth, wrap.offsetHeight);
        camera.aspect = wrap.offsetWidth / wrap.offsetHeight;
        camera.updateProjectionMatrix();
      };
      resize();

      // Sphere of dots (Fibonacci distribution)
      const count = isTouchDevice() ? 480 : 900;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      const palette = ['#6C63FF', '#00D4FF', '#FF6B9D'].map(c => new THREE.Color(c));
      for (let i = 0; i < count; i++) {
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        const r = 5;
        pos[i * 3] = r * Math.cos(theta) * Math.sin(phi);
        pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
        pos[i * 3 + 2] = r * Math.cos(phi);
        const c = palette[i % 3];
        col[i * 3] = c.r;
        col[i * 3 + 1] = c.g;
        col[i * 3 + 2] = c.b;
      }
      const sGeo = new THREE.BufferGeometry();
      sGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      sGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const sphere = new THREE.Points(
        sGeo,
        new THREE.PointsMaterial({ vertexColors: true, size: 0.12, transparent: true, opacity: 0.85 }),
      );
      scene.add(sphere);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(3.5, 0.04, 8, 80),
        new THREE.MeshBasicMaterial({ color: 0x6c63ff, transparent: true, opacity: 0.3 }),
      );
      ring.rotation.x = Math.PI / 3;
      scene.add(ring);

      const ac = new AbortController();
      window.addEventListener('resize', resize, { signal: ac.signal });

      const vis = onScreenFlag(wrap);
      let t = 0;
      const stop = startLoop(() => {
        t += 0.006;
        sphere.rotation.y = t;
        sphere.rotation.x = t * 0.3;
        ring.rotation.z = t * 0.4;
        renderer.render(scene, camera);
      }, () => vis.on);

      cleanup = () => {
        stop();
        ac.abort();
        vis.disconnect();
        disposeScene(scene, renderer);
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <canvas id="about-canvas" ref={canvasRef} />;
}
