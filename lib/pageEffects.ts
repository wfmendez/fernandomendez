import { prefersReducedMotion } from './motion';

// DOM-level enhancements for whatever page is currently rendered: scroll
// reveals, counters, skill bars and smooth in-page anchors. Runs on every
// route change; the returned function undoes everything it set up.
export function initPageEffects() {
  const reduced = prefersReducedMotion();
  const ac = new AbortController();
  const observers: IntersectionObserver[] = [];
  const timers: ReturnType<typeof setTimeout>[] = [];
  const intervals: ReturnType<typeof setInterval>[] = [];

  const qsa = (s: string) => [...document.querySelectorAll<HTMLElement>(s)];
  const observe = (
    els: Element[],
    onEnter: (el: HTMLElement) => void,
    options: IntersectionObserverInit,
  ) => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        onEnter(e.target as HTMLElement);
        obs.unobserve(e.target);
      });
    }, options);
    els.forEach(el => obs.observe(el));
    observers.push(obs);
  };

  // Every inline SVG is paired with visible text, so hide them from screen readers.
  document.querySelectorAll('svg:not([aria-label]):not([role="img"])').forEach(s => s.setAttribute('aria-hidden', 'true'));

  // Scroll reveal
  observe(qsa('.reveal-up'), el => {
    const delay = parseInt(el.dataset.delay || '0', 10);
    timers.push(setTimeout(() => el.classList.add('visible'), delay));
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  // Stat counters
  observe(qsa('.stat-num'), el => {
    const target = parseInt(el.dataset.target || '0', 10);
    if (reduced) { el.textContent = String(target); return; }
    let current = 0;
    const ticker = setInterval(() => {
      current += 1;
      el.textContent = String(current);
      if (current >= target) clearInterval(ticker);
    }, 250);
    intervals.push(ticker);
  }, { threshold: 0.5 });

  // Skill bars
  observe(qsa('.skill-fill'), el => {
    el.style.width = el.dataset.width + '%';
  }, { threshold: 0.5 });

  // Smooth in-page anchor scrolling
  document.addEventListener('click', e => {
    const a = (e.target as Element).closest?.('a[href^="#"]');
    const href = a?.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }, { signal: ac.signal });

  return () => {
    ac.abort();
    observers.forEach(o => o.disconnect());
    timers.forEach(clearTimeout);
    intervals.forEach(clearInterval);
  };
}
