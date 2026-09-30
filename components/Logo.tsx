// The "FM" monogram: a hand-inked square with a folded corner, like a
// notebook tab. Inherits the current text color.
export default function Logo({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={className} fill="none" aria-hidden="true">
      <path d="M4 4h24l8 8v24H4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M28 4v8h8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <text
        x="19"
        y="26.5"
        textAnchor="middle"
        fill="currentColor"
        style={{ font: '800 13px var(--font-display)' }}
      >
        FM
      </text>
    </svg>
  );
}
