'use client';

import { useEffect, useRef } from 'react';
import { onScreenFlag, prefersReducedMotion, startLoop } from '@/lib/motion';

const WAVE_COLORS = [
  ['rgba(108,99,255,0.15)', 'rgba(108,99,255,0)'],
  ['rgba(0,212,255,0.12)', 'rgba(0,212,255,0)'],
  ['rgba(255,107,157,0.1)', 'rgba(255,107,157,0)'],
];

// Layered aurora waves behind the contact section (2D canvas).
export default function ContactCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || prefersReducedMotion()) return;

    let W = 0, H = 0;
    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();
    window.addEventListener('resize', resize);

    const vis = onScreenFlag(canvas);
    let t = 0;
    const stop = startLoop(() => {
      ctx.clearRect(0, 0, W, H);
      t += 0.008;

      for (let k = 0; k < 3; k++) {
        ctx.beginPath();
        const amp = H * 0.08 + k * H * 0.04;
        const freq = 0.008 - k * 0.001;
        const phase = t + k * 1.2;
        const yBase = H * (0.35 + k * 0.15);

        for (let x = 0; x <= W; x += 4) {
          const y = yBase + Math.sin(x * freq + phase) * amp + Math.sin(x * freq * 2 + phase * 1.5) * amp * 0.4;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, yBase - amp, 0, H);
        grad.addColorStop(0, WAVE_COLORS[k][0]);
        grad.addColorStop(1, WAVE_COLORS[k][1]);
        ctx.fillStyle = grad;
        ctx.fill();
      }
    }, () => vis.on);

    return () => {
      stop();
      vis.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas id="contact-canvas" ref={canvasRef} />;
}
