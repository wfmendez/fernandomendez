// The "FM" hexagon mark. Pass `gradientId` for the gradient stroke (ids must
// be unique per page), or omit it for a flat accent-colored stroke.
type Props = {
  size?: number;
  fontSize?: number;
  gradientId?: string;
  className?: string;
};

export default function Logo({ size, fontSize = 14, gradientId, className }: Props) {
  return (
    <svg viewBox="0 0 60 60" fill="none" width={size} height={size} className={className}>
      <polygon
        points="30,4 56,18 56,42 30,56 4,42 4,18"
        stroke={gradientId ? `url(#${gradientId})` : 'var(--accent-1)'}
        strokeWidth="2"
        fill="none"
      />
      <text
        x="50%"
        y="55%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        fontFamily="Syne"
        fontSize={fontSize}
        fontWeight="800"
      >
        FM
      </text>
      {gradientId && (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6C63FF" />
            <stop offset="100%" stopColor="#00D4FF" />
          </linearGradient>
        </defs>
      )}
    </svg>
  );
}
