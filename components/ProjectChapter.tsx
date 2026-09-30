import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowIcon, ExternalIcon } from './icons';
import { getCase } from '@/data/cases';
import type { CoverIcon, Project } from '@/data/projects';

export const coverIcons: Record<CoverIcon, ReactNode> = {
  academy: (
    <>
      <path d="M3 8l9-4 9 4-9 4-9-4z" />
      <path d="M7 10v5c0 1 2.5 2.5 5 2.5s5-1.5 5-2.5v-5" />
    </>
  ),
  map: (
    <>
      <path d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  chart: (
    <>
      <path d="M3 17l6-6 4 4 7-7" />
      <path d="M15 8h6v6" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z" />
      <path d="M5 19l8-8" />
    </>
  ),
  graph: (
    <>
      <circle cx="6" cy="6" r="2.3" />
      <circle cx="18" cy="6" r="2.3" />
      <circle cx="12" cy="18" r="2.3" />
      <path d="M8 7l8 0M7.5 8l3.5 8M16.5 8l-3.5 8" />
    </>
  ),
};

// A client or product project told as a large "chapter" on the home page.
// Uses the case study's screenshot when there is one, otherwise a
// typographic cover.
export default function ProjectChapter({ project }: { project: Project }) {
  const study = project.caseSlug ? getCase(project.caseSlug) : undefined;

  return (
    <article className="chapter reveal-up">
      <div className={`chapter-cover tone-${project.cover.tone}`}>
        {study ? (
          <figure className="taped">
            <Image
              src={study.cover.src}
              alt={study.cover.alt}
              sizes="(max-width: 860px) 92vw, 640px"
              placeholder="blur"
            />
          </figure>
        ) : (
          <div className="type-cover" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              {coverIcons[project.cover.icon]}
            </svg>
            <span>{project.name}</span>
          </div>
        )}
      </div>

      <div className="chapter-body">
        <p className="chapter-meta">
          <span className="stamp">{project.kind}</span>
          {project.context}
        </p>
        <h3 className="chapter-title">{project.name}</h3>
        <p className="chapter-summary">{project.summary}</p>

        {project.facts && (
          <dl className="chapter-facts">
            {project.facts.map(f => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <ul className="tag-list" aria-label="Built with">
          {project.tags.map(tag => <li key={tag}>{tag}</li>)}
        </ul>

        <div className="chapter-actions">
          {study && (
            <Link href={`/work/${study.slug}`} className="btn btn-primary">
              <span>Read the logbook</span>
              <ArrowIcon />
            </Link>
          )}
          {project.link && (
            <a href={project.link.href} target="_blank" rel="noopener noreferrer" className="link-ext">
              {project.link.label}
              <ExternalIcon />
            </a>
          )}
          {project.privateLabel && <span className="private-note">{project.privateLabel}</span>}
        </div>
      </div>
    </article>
  );
}
