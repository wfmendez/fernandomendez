// Shared helpers for the site's client-side animations and WebGL scenes.

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isTouchDevice = () =>
  window.matchMedia('(hover: none), (pointer: coarse)').matches;

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Returns a live { on } flag tracking whether `el` is on screen, so render
// loops can skip work while the user has scrolled past them.
export function onScreenFlag(el: Element | null) {
  const state = { on: true, disconnect: () => {} };
  if (!el || !('IntersectionObserver' in window)) return state;
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { state.on = e.isIntersecting; }),
    { rootMargin: '120px' },
  );
  obs.observe(el);
  state.disconnect = () => obs.disconnect();
  return state;
}

// requestAnimationFrame loop that pauses while the tab is hidden or `isOn()`
// is false. Returns a function that stops the loop.
export function startLoop(frame: () => void, isOn: () => boolean = () => true) {
  let id = 0;
  const tick = () => {
    id = requestAnimationFrame(tick);
    if (document.hidden || !isOn()) return;
    frame();
  };
  tick();
  return () => cancelAnimationFrame(id);
}
