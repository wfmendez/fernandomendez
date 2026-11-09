import activity from '@/data/activity.json';

const CELL = 12;
const GAP = 3;
const STEP = CELL + GAP;
const TOP = 18; // room for month labels
const LEFT = 26; // room for weekday labels
const DAY = 86_400_000;

// Commit counts per level: none, 1–2, 3–5, 6–11, 12+.
const level = (n: number) => (n === 0 ? 0 : n <= 2 ? 1 : n <= 5 ? 2 : n <= 11 ? 3 : 4);

const fmt = (t: number, opts: Intl.DateTimeFormatOptions) =>
  new Date(t).toLocaleDateString('en-GB', { ...opts, timeZone: 'UTC' });
const monthOf = (t: number) => new Date(t).toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });

// A GitHub-style contribution calendar drawn from data/activity.json, which
// scripts/activity.mjs builds from the git history of my repositories.
// Pure SVG, rendered on the server.
export default function ActivityGraph() {
  const start = new Date(`${activity.gridStart}T00:00:00Z`).getTime();
  const weeks = Math.ceil(activity.days.length / 7);
  const width = LEFT + weeks * STEP - GAP;
  const height = TOP + 7 * STEP - GAP;

  const months: { x: number; label: string }[] = [];
  for (let w = 0; w < weeks; w++) {
    // A week belongs to the month its Saturday falls in, so a first week that
    // starts in the previous month is still labelled with the counted one.
    const month = monthOf(start + (w * 7 + 6) * DAY);
    if (w > 0 && month === monthOf(start + (w * 7 - 1) * DAY)) continue;
    // Skip a label that would crowd the previous one.
    if (months.length && w * STEP - months[months.length - 1].x < STEP * 3) continue;
    months.push({ x: w * STEP, label: month });
  }

  return (
    <svg
      className="activity-graph"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`${activity.total} commits on ${activity.activeDays} days between ${activity.from} and ${activity.to}`}
    >
      {months.map(m => (
        <text key={m.x} x={LEFT + m.x} y={10} className="ag-label">{m.label}</text>
      ))}
      {['Mon', 'Wed', 'Fri'].map((d, i) => (
        <text key={d} x={0} y={TOP + (1 + i * 2) * STEP + CELL - 2} className="ag-label">{d}</text>
      ))}
      {activity.days.map((n, i) => {
        if (n === null) return null;
        const w = Math.floor(i / 7);
        const d = i % 7;
        return (
          <rect
            key={i}
            x={LEFT + w * STEP}
            y={TOP + d * STEP}
            width={CELL}
            height={CELL}
            rx={2.5}
            className={`ag-l${level(n)}`}
          >
            <title>{`${n} ${n === 1 ? 'commit' : 'commits'} · ${fmt(start + i * DAY, { day: 'numeric', month: 'short', year: 'numeric' })}`}</title>
          </rect>
        );
      })}
    </svg>
  );
}
