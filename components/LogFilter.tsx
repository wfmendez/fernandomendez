'use client';

import { useEffect, useState } from 'react';
import type { LogKind } from '@/data/cases';

type Props = {
  // The <ol> of entries to filter, by id.
  target: string;
  counts: Partial<Record<LogKind, number>>;
  labels: Record<LogKind, string>;
};

// Filter chips for a logbook. The entries stay server-rendered; this only
// sets data-filter on the list and CSS hides what does not match.
export default function LogFilter({ target, counts, labels }: Props) {
  const [filter, setFilter] = useState<LogKind | 'all'>('all');
  const total = Object.values(counts).reduce((a, b) => a + (b ?? 0), 0);

  useEffect(() => {
    const list = document.getElementById(target);
    if (!list) return;
    if (filter === 'all') list.removeAttribute('data-filter');
    else list.setAttribute('data-filter', filter);
  }, [filter, target]);

  const kinds = (Object.keys(labels) as LogKind[]).filter(k => counts[k]);
  const shown = filter === 'all' ? total : counts[filter] ?? 0;

  return (
    <div className="log-filter">
      <div role="group" aria-label="Filter entries by kind">
        <button type="button" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
          All <span>{total}</span>
        </button>
        {kinds.map(k => (
          <button
            key={k}
            type="button"
            className={`kind-${k}`}
            aria-pressed={filter === k}
            onClick={() => setFilter(f => (f === k ? 'all' : k))}
          >
            {labels[k]} <span>{counts[k]}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {filter === 'all' ? `Showing all ${total} entries` : `Showing ${shown} ${labels[filter].toLowerCase()} entries`}
      </p>
    </div>
  );
}
