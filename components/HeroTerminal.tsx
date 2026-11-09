import { Fragment, type CSSProperties } from 'react';
import activity from '@/data/activity.json';
import { cases } from '@/data/cases';

const shortDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', timeZone: 'UTC' });

// A shell command that wraps between arguments, never inside one.
const Cmd = ({ children }: { children: string }) => (
  <>
    <span className="term-prompt">❯</span>{' '}
    {children.split(' ').map((arg, i) => (
      <Fragment key={i}>
        {i > 0 && ' '}
        <span className="term-arg">{arg}</span>
      </Fragment>
    ))}
  </>
);

// The hero's "terminal": who I am, how much I ship and the latest logbook
// entries, all read from the site's data so it stays current on every build.
// Lines are server-rendered in full; CSS only staggers how they appear.
export default function HeroTerminal() {
  const latest = [...cases]
    .sort((a, b) => b.updated.localeCompare(a.updated))
    .slice(0, 4)
    .map(c => ({ slug: c.slug, name: c.slug.split('-')[0], date: shortDate(c.updated), title: c.entries[c.entries.length - 1].title }));

  let line = 0;
  const next = () => ({ '--i': line++ }) as CSSProperties;

  return (
    <figure className="term" aria-label="Terminal: profile, commit count and latest logbook entries">
      <div className="term-bar" aria-hidden="true">
        <span className="term-dots"><i /><i /><i /></span>
        <span className="term-title">fernando@cz — ~/work</span>
      </div>
      <div className="term-body">
        <p className="term-line" style={next()}>
          <Cmd>whoami</Cmd>
        </p>
        <p className="term-out" style={next()}>
          AI product engineer · <b>4 years</b> shipping software
        </p>
        <p className="term-line" style={next()}>
          <Cmd>{`git log --author=fernando --since=${activity.from} --oneline | wc -l`}</Cmd>
        </p>
        <p className="term-out" style={next()}>
          <b className="term-num">{activity.total.toLocaleString('en-US')}</b>{' '}
          <span className="term-comment"># across {activity.repos} repositories</span>
        </p>
        <p className="term-line" style={next()}>
          <Cmd>{`tail -n ${latest.length} ~/logbook`}</Cmd>
        </p>
        <ol className="term-log">
          {latest.map(e => (
            <li key={e.slug} className="term-out" style={next()}>
              <time>{e.date}</time>
              <a href={`/work/${e.slug}`}>{e.name}</a>
              <span>{e.title}</span>
            </li>
          ))}
        </ol>
        <p className="term-line" style={next()}>
          <span className="term-prompt">❯</span> <span className="term-cursor" aria-hidden="true" />
        </p>
      </div>
    </figure>
  );
}
