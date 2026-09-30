import type { ReactNode } from 'react';

// A handwritten margin note with a small inked arrow pointing at what it
// annotates. `point` says which way the arrow goes.
export default function HandNote({
  children,
  point = 'left',
  className = '',
}: {
  children: ReactNode;
  point?: 'left' | 'down' | 'right';
  className?: string;
}) {
  const arrow = {
    left: 'M44 10 C 30 4, 16 8, 6 20 M6 20 l 2 -9 M6 20 l 9 -2',
    down: 'M8 4 C 4 16, 10 28, 22 36 M22 36 l -9 -1 M22 36 l -3 -8',
    right: 'M4 10 C 18 4, 32 8, 42 20 M42 20 l -9 -2 M42 20 l -2 -9',
  }[point];

  return (
    <span className={`hand-note hand-note-${point} ${className}`}>
      <svg viewBox="0 0 48 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <path d={arrow} />
      </svg>
      <span>{children}</span>
    </span>
  );
}
