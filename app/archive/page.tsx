import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import Logo from '@/components/Logo';
import { ArrowIcon, ExternalIcon, GitHubIcon } from '@/components/icons';
import { archiveProjects } from '@/data/projects';
import { history } from '@/data/experience';
import { SITE_NAME, SITE_URL, websiteRef } from '@/data/site';
import './archive.css';

const title = 'Project & Experience Archive — Fernando Mendez';
const description =
  'A complete archive of projects and work experience by Fernando Mendez — AI & Full-Stack Developer.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'Fernando Mendez', 'Archive', 'Projects', 'Experience', 'AI Developer', 'Full Stack Developer',
    'Next.js', 'TypeScript', 'Python',
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: '/archive' },
  openGraph: {
    title,
    description,
    url: '/archive',
    images: [{ url: '/assets/og-image.png', width: 1200, height: 630, alt: title }],
  },
  twitter: { title, description },
};

function Tags({ tags, highlight }: { tags: string[]; highlight: number }) {
  return (
    <div className="archive-tags">
      {tags.map((tag, i) => (
        <span key={tag} className={'archive-tag' + (i < highlight ? ' highlight' : '')}>{tag}</span>
      ))}
    </div>
  );
}

export default function ArchivePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: title,
          description,
          url: `${SITE_URL}/archive`,
          isPartOf: websiteRef,
          creator: { '@type': 'Person', name: SITE_NAME, url: `${SITE_URL}/` },
        }}
      />

      <header className="archive-header">
        <Link href="/" className="back-link">
          <ArrowIcon />
          <span>Back to Home</span>
        </Link>
        <div className="nav-logo">
          <Logo size={36} />
        </div>
      </header>

      <main>
        <section className="archive-hero">
          <h1 className="archive-title">Archive</h1>
          <p className="archive-subtitle">
            A complete list of everything I&apos;ve built, deployed, and worked on since the start of my software
            journey.
          </p>
        </section>

        <section className="archive-section" id="archive-projects">
          <h2 className="archive-section-title">All Projects</h2>
          <div className="archive-table-wrapper">
            <table className="archive-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Project</th>
                  <th>Description</th>
                  <th>Built with</th>
                  <th>Links</th>
                </tr>
              </thead>
              <tbody>
                {archiveProjects.map(project => (
                  <tr key={project.title}>
                    <td className="col-year">{project.year}</td>
                    <td className="col-title">
                      {project.href ? (
                        <a href={project.href} target="_blank" rel="noopener noreferrer">
                          {project.title}
                          <ArrowIcon />
                        </a>
                      ) : (
                        project.title
                      )}
                    </td>
                    <td className="col-desc">{project.description}</td>
                    <td className="col-tags">
                      <Tags tags={project.tags} highlight={project.highlight} />
                    </td>
                    <td className="col-links">
                      {project.href ? (
                        <div className="archive-links">
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="archive-link"
                            title={project.linkKind === 'live' ? 'Visit Live' : 'GitHub'}
                            aria-label={
                              project.linkKind === 'live'
                                ? `Visit ${project.title} live website`
                                : `View ${project.title} code on GitHub`
                            }
                          >
                            {project.linkKind === 'live' ? <ExternalIcon /> : <GitHubIcon />}
                          </a>
                        </div>
                      ) : (
                        <span className="archive-tag">Private</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="archive-section" id="archive-experience">
          <h2 className="archive-section-title">Work &amp; Education History</h2>
          <div className="archive-table-wrapper">
            <table className="archive-table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Role / Degree</th>
                  <th>Details</th>
                  <th>Skills &amp; Focus</th>
                </tr>
              </thead>
              <tbody>
                {history.map(item => (
                  <tr key={item.period + item.role}>
                    <td className="col-period">{item.period}</td>
                    <td className="col-role">
                      {item.role}
                      <span className="company-name">{item.company}</span>
                    </td>
                    <td className="col-desc">{item.description}</td>
                    <td className="col-tags">
                      <Tags tags={item.tags} highlight={item.highlight} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer brandHref="/" />
    </>
  );
}
