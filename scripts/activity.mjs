// Builds data/activity.json: my commits per day between two dates, counted
// across local clones of my repositories.
//
//   node scripts/activity.mjs <dir-with-clones> <from YYYY-MM-DD> [to YYYY-MM-DD]
//
// Clones can be bare and blobless (git clone --bare --filter=blob:none).
// Only counts are written, never repository names or messages.
import { execFileSync } from 'node:child_process';
import { readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [dir, fromArg, toArg] = process.argv.slice(2);
if (!dir || !fromArg) {
  console.error('usage: node scripts/activity.mjs <dir-with-clones> <from YYYY-MM-DD> [to YYYY-MM-DD]');
  process.exit(1);
}

const ME = /wuillian\.f\.mendez@gmail\.com|wmendezgarcia@byupathway\.edu|wfmendez@users\.noreply\.github\.com|dev@strata\.local/i;
const DAY = 86_400_000;

// Whole weeks, Sunday to Saturday, like GitHub's calendar. Days outside the
// requested range are null so the grid can leave them blank.
const start = new Date(`${fromArg}T00:00:00Z`);
const end = new Date(`${toArg ?? new Date().toISOString().slice(0, 10)}T00:00:00Z`);
const first = new Date(start.getTime() - start.getUTCDay() * DAY);
const last = new Date(end.getTime() + (6 - end.getUTCDay()) * DAY);
const iso = d => d.toISOString().slice(0, 10);

const seen = new Set();
const perDay = new Map();
let repos = 0;

for (const name of readdirSync(dir)) {
  let out;
  try {
    out = execFileSync(
      'git',
      ['-C', join(dir, name), 'log', '--all', '--no-merges', `--since=${iso(first)}`, '--format=%H%x09%ae%x09%aI'],
      { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
    );
  } catch {
    continue;
  }
  let mine = 0;
  for (const line of out.split('\n')) {
    const [hash, email, date] = line.split('\t');
    if (!hash || !ME.test(email) || seen.has(hash)) continue;
    seen.add(hash);
    // The author's local calendar day, as git recorded it.
    const day = date.slice(0, 10);
    if (day < iso(start) || day > iso(end)) continue;
    perDay.set(day, (perDay.get(day) ?? 0) + 1);
    mine++;
  }
  if (mine > 0) repos++;
}

const days = [];
for (let t = first.getTime(); t <= last.getTime(); t += DAY) {
  const day = iso(new Date(t));
  days.push(day < iso(start) || day > iso(end) ? null : perDay.get(day) ?? 0);
}

const counts = days.filter(n => n !== null);
const activity = {
  // First day of the grid (a Sunday) and the counted range.
  gridStart: iso(first),
  from: iso(start),
  to: iso(end),
  total: counts.reduce((a, b) => a + b, 0),
  activeDays: counts.filter(n => n > 0).length,
  repos,
  days,
};
writeFileSync(new URL('../data/activity.json', import.meta.url), `${JSON.stringify(activity)}\n`);
console.log(`${activity.total} commits on ${activity.activeDays} days across ${repos} repositories (${activity.from} → ${activity.to})`);
