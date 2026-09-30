import type { ReactNode } from 'react';
import { ArrowIcon, GitHubIcon } from './icons';
import type { FeaturedProject, MockIcon } from '@/data/projects';

const mockIcons: Record<MockIcon, ReactNode> = {
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

export default function ProjectCard({ project }: { project: FeaturedProject }) {
  const { mock } = project;
  return (
    <article className="project-card reveal-up">
      <div className="project-content">
        <span className="project-index">{project.index}</span>
        <div className="project-tags">
          {project.tags.map(tag => <span key={tag}>{tag}</span>)}
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        <div className="project-links">
          {project.link && (
            <a href={project.link.href} target="_blank" rel="noopener noreferrer" className="project-link magnetic">
              <span>{project.link.label}</span>
              <ArrowIcon />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-icon magnetic"
              title="GitHub"
              aria-label={`View ${mock.name} repository on GitHub`}
            >
              <GitHubIcon />
            </a>
          )}
          {project.privateLabel && (
            <span className="project-link" style={{ color: 'var(--text-muted)', cursor: 'default' }}>
              {project.privateLabel}
            </span>
          )}
        </div>
      </div>
      <div className="project-visual">
        <div className="browser-mock" data-mock={mock.key}>
          <div className="browser-bar">
            <span className="b-dot"></span><span className="b-dot"></span><span className="b-dot"></span>
            <span className="browser-url">{mock.url}</span>
          </div>
          <div className="browser-screen">
            {/* To show a real screenshot, replace .mock-app with an <img> from /public/assets/projects/. */}
            <div className="mock-app">
              <span className="mock-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  {mockIcons[mock.icon]}
                </svg>
              </span>
              <span className="mock-name">{mock.name}</span>
              <span className="mock-line w70"></span>
              <span className="mock-line w45"></span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
