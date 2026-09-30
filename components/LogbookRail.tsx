'use client';

import { useEffect, useState } from 'react';

// Sticky week index beside the logbook; highlights the week being read.
export default function LogbookRail({ weeks }: { weeks: { id: string; label: string }[] }) {
  const [active, setActive] = useState(weeks[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-25% 0px -65% 0px' },
    );
    weeks.forEach(w => {
      const el = document.getElementById(w.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [weeks]);

  return (
    <nav className="log-rail" aria-label="Weeks">
      <span className="log-rail-title">Index</span>
      <ol>
        {weeks.map(w => (
          <li key={w.id}>
            <a href={`#${w.id}`} className={active === w.id ? 'active' : undefined}>{w.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
