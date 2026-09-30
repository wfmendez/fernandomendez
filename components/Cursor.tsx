'use client';

import { useEffect, useRef } from 'react';
import { isTouchDevice, lerp, prefersReducedMotion, startLoop } from '@/lib/motion';

const HOVER_TARGETS =
  'a, button, .btn, .project-link, .skill-card, .timeline-card, .magnetic, .archive-link';

// Custom two-part cursor: a dot that tracks the pointer and a ring that eases after it.
export default function Cursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner || prefersReducedMotion() || isTouchDevice()) return;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let ox = mx, oy = my;

    const ac = new AbortController();
    const opts = { signal: ac.signal };
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, opts);
    document.addEventListener('mouseover', e => {
      if ((e.target as Element).closest?.(HOVER_TARGETS)) document.body.classList.add('cursor-hover');
    }, opts);
    document.addEventListener('mouseout', e => {
      if ((e.target as Element).closest?.(HOVER_TARGETS)) document.body.classList.remove('cursor-hover');
    }, opts);
    document.addEventListener('mousedown', () => { inner.style.transform = 'translate(-50%,-50%) scale(0.7)'; }, opts);
    document.addEventListener('mouseup', () => { inner.style.transform = 'translate(-50%,-50%) scale(1)'; }, opts);

    const stop = startLoop(() => {
      ox = lerp(ox, mx, 0.12);
      oy = lerp(oy, my, 0.12);
      outer.style.left = ox + 'px';
      outer.style.top = oy + 'px';
      inner.style.left = mx + 'px';
      inner.style.top = my + 'px';
    });

    return () => {
      ac.abort();
      stop();
      document.body.classList.remove('cursor-hover');
    };
  }, []);

  return (
    <>
      <div id="cursor-outer" ref={outerRef} />
      <div id="cursor-inner" ref={innerRef} />
    </>
  );
}
