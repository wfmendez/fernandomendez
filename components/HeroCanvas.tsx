'use client';

import { useEffect, useRef } from 'react';
import { isTouchDevice, onScreenFlag, prefersReducedMotion, startLoop } from '@/lib/motion';
import { createRenderer, disposeScene, loadThree } from '@/lib/three';

// Full-screen particle field with floating wireframe shapes and mouse parallax.
export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion()) return;
    let cleanup = () => {};
    let cancelled = false;

    loadThree().then(THREE => {
      if (cancelled) return;
      const renderer = createRenderer(THREE, canvas);
      renderer.setSize(window.innerWidth, window.innerHeight);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
      camera.position.z = 50;

      // Particle field
      const count = isTouchDevice() ? 1100 : 2200;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const palette = ['#6C63FF', '#00D4FF', '#FF6B9D', '#00FFB2', '#ffffff'].map(c => new THREE.Color(c));

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 160;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
        const c = palette[Math.floor(Math.random() * palette.length)];
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
        sizes[i] = Math.random() * 1.8 + 0.4;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const mat = new THREE.ShaderMaterial({
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        vertexShader: `
          attribute float size;
          varying vec3 vColor;
          varying float vAlpha;
          void main() {
            vColor = color;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vAlpha = clamp(1.0 - (-mv.z / 80.0), 0.0, 1.0);
            gl_PointSize = size * (300.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vAlpha;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.1, d) * vAlpha * 0.7;
            gl_FragColor = vec4(vColor, alpha);
          }
        `,
      });

      const points = new THREE.Points(geo, mat);
      scene.add(points);

      // Floating 3D objects
      const shapes = [
        new THREE.IcosahedronGeometry(3, 1),
        new THREE.OctahedronGeometry(2.5, 0),
        new THREE.TorusGeometry(2, 0.6, 12, 32),
      ];
      const shapeColors = [0x6c63ff, 0x00d4ff, 0xff6b9d];
      const objects = shapes.map((g, i) => {
        const mesh = new THREE.Mesh(
          g,
          new THREE.MeshBasicMaterial({ color: shapeColors[i], wireframe: true, transparent: true, opacity: 0.3 }),
        );
        mesh.position.set(
          (i - 1) * 22 + (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 20,
          -20 + Math.random() * -20,
        );
        scene.add(mesh);
        return mesh;
      });

      let mouseX = 0, mouseY = 0;
      const ac = new AbortController();
      document.addEventListener('mousemove', e => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      }, { signal: ac.signal });
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, { signal: ac.signal });

      const vis = onScreenFlag(canvas.closest('#hero'));
      let t = 0;
      const stop = startLoop(() => {
        t += 0.005;
        // Parallax camera
        camera.position.x += (mouseX * 6 - camera.position.x) * 0.04;
        camera.position.y += (-mouseY * 4 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);

        points.rotation.y = t * 0.04;
        points.rotation.x = t * 0.02;

        objects.forEach((obj, i) => {
          obj.rotation.x += 0.004 + i * 0.001;
          obj.rotation.y += 0.006 + i * 0.001;
          obj.position.y += Math.sin(t + i * 2) * 0.02;
        });

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

  return <canvas id="hero-canvas" ref={canvasRef} />;
}
