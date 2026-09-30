import { isTouchDevice, prefersReducedMotion } from './motion';

// DOM-level enhancements that apply to whatever page is currently rendered:
// scroll reveals, counters, skill bars, magnetic buttons, card tilt, the hero
// glitch/parallax and smooth in-page anchors. Runs after the preloader and on
// every route change; the returned function undoes everything it set up.
export function initPageEffects() {
  const reduced = prefersReducedMotion();
  const touch = isTouchDevice();
  const ac = new AbortController();
  const signal = ac.signal;
  const observers: IntersectionObserver[] = [];
  const timers: ReturnType<typeof setTimeout>[] = [];
  const intervals: ReturnType<typeof setInterval>[] = [];

  const qsa = (s: string) => [...document.querySelectorAll<HTMLElement>(s)];
  const observe = (
    els: Element[],
    onEnter: (el: HTMLElement, obs: IntersectionObserver) => void,
    options: IntersectionObserverInit,
  ) => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        onEnter(e.target as HTMLElement, obs);
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
    if (target <= 5) {
      // Small targets tick up one at a time, slowly.
      const ticker = setInterval(() => {
        current += 1;
        el.textContent = String(current);
        if (current >= target) clearInterval(ticker);
      }, 250);
      intervals.push(ticker);
    } else {
      const step = target / 50;
      const ticker = setInterval(() => {
        current = Math.min(target, current + step);
        if (current >= target) clearInterval(ticker);
        el.textContent = Math.floor(current) + '+';
      }, 30);
      intervals.push(ticker);
    }
  }, { threshold: 0.5 });

  // Skill bars
  observe(qsa('.skill-fill'), el => {
    el.style.width = el.dataset.width + '%';
  }, { threshold: 0.5 });

  // Signature reveal
  observe(qsa('.about-signature'), el => el.classList.add('visible'), { threshold: 0.5 });

  if (!reduced && !touch) {
    // Magnetic buttons
    qsa('.magnetic').forEach(el => {
      el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.35;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      }, { signal });
      el.addEventListener('mouseleave', () => { el.style.transform = 'translate(0,0)'; }, { signal });
    });

    // 3D card tilt
    qsa('.skill-card, .timeline-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(600px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-6px)`;
      }, { signal });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
      }, { signal });
    });
  }

  if (!reduced) {
    // Glitch on hero title hover
    qsa('.title-line').forEach(el => {
      el.addEventListener('mouseenter', () => {
        el.style.animation = 'none';
        el.classList.add('glitch');
        timers.push(setTimeout(() => el.classList.remove('glitch'), 500));
      }, { signal });
    });

    // Hero parallax on scroll
    const hero = document.querySelector<HTMLElement>('.hero-content');
    if (hero) {
      window.addEventListener('scroll', () => {
        hero.style.transform = `translateY(${window.scrollY * 0.25}px)`;
      }, { passive: true, signal });
    }
  }

  // Smooth in-page anchor scrolling
  document.addEventListener('click', e => {
    const a = (e.target as Element).closest?.('a[href^="#"]');
    const href = a?.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  }, { signal });

  return () => {
    ac.abort();
    observers.forEach(o => o.disconnect());
    timers.forEach(clearTimeout);
    intervals.forEach(clearInterval);
    document.body.classList.remove('cursor-hover');
  };
}
