import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import HandNote from '@/components/HandNote';
import JsonLd from '@/components/JsonLd';
import LogbookRail from '@/components/LogbookRail';
import Navbar from '@/components/Navbar';
import { ArrowIcon, ExternalIcon } from '@/components/icons';
import { cases, getCase, type LogKind } from '@/data/cases';
import { SITE_NAME, SITE_URL, type NavItem } from '@/data/site';
import './case.css';

type Params = { params: Promise<{ slug: string }> };

const kindLabel: Record<LogKind, string> = {
  launch: 'Launch',
  decision: 'Decision',
  design: 'Design',
  build: 'Build',
  content: 'Content',
};

const navItems: NavItem[] = [
  { href: '/#projects', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/archive', label: 'Archive' },
  { href: '/#contact', label: 'Contact' },
];

export function generateStaticParams() {
  return cases.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const study = getCase((await params).slug);
  if (!study) return {};
  const title = `${study.name} — Project logbook · ${SITE_NAME}`;
  return {
    title,
    description: study.intro,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: { type: 'article', title, description: study.intro, url: `/work/${study.slug}` },
    twitter: { title, description: study.intro },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const study = getCase((await params).slug);
  if (!study) notFound();

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: study.name,
          description: study.intro,
          url: `${SITE_URL}/work/${study.slug}`,
          creator: { '@type': 'Person', name: SITE_NAME, url: `${SITE_URL}/` },
        }}
      />
      <Navbar items={navItems} ctaHref="/#contact" logoHref="/" />

      <main className="case">
        <header className="case-hero container">
          <div className="case-hero-text">
            <Link href="/#projects" className="back-link">
              <ArrowIcon />
              <span>All work</span>
            </Link>
            <span className="section-label">{study.eyebrow}</span>
            <h1 className="case-title">{study.name}</h1>
            <p className="case-tagline">&ldquo;{study.tagline}&rdquo;</p>
            <p className="case-intro">{study.intro}</p>
            <a href={study.url} target="_blank" rel="noopener noreferrer" className="link-ext">
              {study.url.replace('https://', '')}
              <ExternalIcon />
            </a>
          </div>
          <figure className="taped case-cover">
            <Image src={study.cover.src} alt={study.cover.alt} priority sizes="(max-width: 860px) 92vw, 620px" placeholder="blur" />
          </figure>
        </header>

        <section className="case-sheet container" aria-label="Project facts">
          <dl className="case-facts">
            {study.facts.map(f => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="case-stats">
            {study.stats.map(s => (
              <li key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="logbook container" aria-labelledby="logbook-title">
          <LogbookRail weeks={study.weeks} />

          <div className="log-main">
            <header className="log-head">
              <span className="section-label">Logbook</span>
              <h2 id="logbook-title" className="section-title">How it was built, day by day</h2>
              <p className="section-intro">
                Written from the project&apos;s commit history. Decisions are marked in red.
              </p>
            </header>

            <ol className="log-entries">
              {study.entries.map((entry, i) => (
                <li
                  key={entry.date + entry.title}
                  id={entry.weekId}
                  className={`log-entry kind-${entry.kind} reveal-up`}
                  data-delay={Math.min(i, 3) * 60}
                >
                  <time className="log-date">{entry.date}</time>
                  <div className="log-body">
                    <span className="log-kind">{kindLabel[entry.kind]}</span>
                    <h3>{entry.title}</h3>
                    <p>{entry.text}</p>
                    {entry.source && <p className="log-source">{entry.source}</p>}
                    {entry.image && (
                      <figure className="taped log-figure">
                        <Image src={entry.image.src} alt={entry.image.alt} sizes="(max-width: 860px) 92vw, 560px" placeholder="blur" />
                        <figcaption>{entry.image.caption}</figcaption>
                      </figure>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            {study.mobile && (
              <figure className="case-mobile reveal-up">
                <div className="phone">
                  <Image src={study.mobile.src} alt={study.mobile.alt} sizes="240px" placeholder="blur" />
                </div>
                <HandNote point="left">same site, on a phone</HandNote>
              </figure>
            )}

            <div className="case-end">
              <Link href="/#projects" className="btn btn-ghost">
                <span>Back to all work</span>
              </Link>
              <Link href="/#contact" className="btn btn-primary">
                <span>Start a project</span>
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer brandHref="/" />
    </>
  );
}
