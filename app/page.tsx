import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import ActivityGraph from '@/components/ActivityGraph';
import Footer from '@/components/Footer';
import HeroTerminal from '@/components/HeroTerminal';
import JsonLd from '@/components/JsonLd';
import Navbar from '@/components/Navbar';
import ProjectChapter from '@/components/ProjectChapter';
import { ArrowIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from '@/components/icons';
import activity from '@/data/activity.json';
import { clientProjects, sideProjects } from '@/data/projects';
import {
  CV_URL, EMAIL, GITHUB_URL, LINKEDIN_URL, PHONE_DISPLAY, SITE_TITLE, SITE_URL, WHATSAPP_URL,
  personJsonLd, type NavItem,
} from '@/data/site';

const description =
  'Fernando Mendez — AI Product Engineer building complete AI-powered products: LLM systems, AI agents and automation with TypeScript, Python, Next.js, FastAPI and Flutter. Based in Czechia, open to relocation and remote roles.';
const socialDescription =
  'Building complete AI-powered products, from problem definition to production.';

export const metadata: Metadata = {
  title: SITE_TITLE,
  description,
  keywords: [
    'Fernando Mendez', 'AI Product Engineer', 'Full Stack Developer', 'LLM', 'RAG', 'AI Agents',
    'Automation', 'n8n', 'Next.js', 'TypeScript', 'Python', 'FastAPI', 'Flutter', 'React',
  ],
  alternates: { canonical: '/' },
  openGraph: { title: SITE_TITLE, description: socialDescription, url: '/' },
  twitter: { title: SITE_TITLE, description: socialDescription },
};

const navItems: NavItem[] = [
  { href: '/about', label: 'About' },
  { href: '/about#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '/about#experience', label: 'Experience' },
  { href: '/about#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
];

const monthYear = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const formatDay = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          personJsonLd,
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE_TITLE,
            url: `${SITE_URL}/`,
            description:
              'Fernando Mendez — AI Product Engineer building complete AI-powered products: LLM systems, AI agents and automation with TypeScript, Python, Next.js, FastAPI and Flutter.',
          },
        ]}
      />
      <Navbar items={navItems} ctaHref="#contact" />

      {/* ===================== HERO ===================== */}
      <section id="hero" className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="kicker">
              <span className="status-dot" aria-hidden="true"></span>
              Open to relocation &amp; remote roles
            </p>
            <h1 className="hero-title">
              Fernando Mendez
              <span className="hero-title-line">
                builds <mark className="marker">with AI.</mark>
              </span>
            </h1>
            <p className="hero-subtitle">
              AI Product Engineer who builds complete software products powered by AI, from problem definition
              to production. Based in Czechia, open to relocating to the EU, UK or US, or to working remotely with teams anywhere.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                <span>See the work</span>
                <ArrowIcon />
              </a>
              <a href={CV_URL} className="btn btn-ghost" download>
                <span>Download CV</span>
              </a>
            </div>
          </div>

          <HeroTerminal />
        </div>
      </section>

      {/* ===================== ACTIVITY ===================== */}
      <section id="activity" className="section activity" aria-labelledby="activity-title">
        <div className="container">
          <div className="activity-head">
            <header className="section-head">
              <span className="section-label">Activity</span>
              <h2 id="activity-title" className="section-title">
                <mark className="marker">{activity.total.toLocaleString('en-US')} commits</mark> since {monthYear(activity.from)}.
              </h2>
              <p className="section-intro">
                Every commit I authored in my own, client and volunteer repositories, counted from their git
                history. My work at Collab Collective lives in their repositories and is not included.
              </p>
            </header>
            <dl className="activity-stats">
              <div><dt>Repositories</dt><dd>{activity.repos}</dd></div>
              <div><dt>Days with commits</dt><dd>{activity.activeDays}</dd></div>
              <div><dt>Shipped to production</dt><dd>{clientProjects.filter(p => p.link).length}</dd></div>
            </dl>
          </div>
          <figure className="activity-figure">
            <div className="activity-scroll">
              <ActivityGraph />
            </div>
            <figcaption>
              <span>Commits per day, {formatDay(activity.from)} – {formatDay(activity.to)}</span>
              <span className="activity-legend" aria-hidden="true">
                Less <i className="ag-l0" /><i className="ag-l1" /><i className="ag-l2" /><i className="ag-l3" /><i className="ag-l4" /> More
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ===================== PROJECTS ===================== */}
      <section id="projects" className="section">
        <div className="container">
          <header className="section-head">
            <span className="section-label">Selected work</span>
            <h2 className="section-title">
              Every project, <mark className="marker">logged</mark> from kickoff to launch.
            </h2>
            <p className="section-intro">
              What I built, for whom, and the decisions along the way. Client projects and my own products
              come with a dated logbook of how they were made.
            </p>
          </header>

          <div className="chapters">
            {clientProjects.map((project, i) => (
              <ProjectChapter key={project.slug} project={project} index={i + 1} />
            ))}
          </div>

          <div className="side-projects reveal-up">
            <h3 className="section-label">Side projects</h3>
            <ul>
              {sideProjects.map(project => (
                <li key={project.slug} className="side-row">
                  <div className="side-name">
                    <strong>{project.name}</strong>
                    <span>{project.context}</span>
                  </div>
                  <p>{project.summary}</p>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-link"
                      aria-label={`${project.name} on GitHub`}
                    >
                      <GitHubIcon />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="projects-cta reveal-up">
            <Link href="/archive" className="btn btn-ghost">
              <span>Full archive of projects and roles</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== CONTACT ===================== */}
      <section id="contact" className="section contact">
        <div className="container">
          <div className="contact-inner">
            <div className="contact-text">
              <span className="section-label reveal-up">Contact</span>
              <h2 className="section-title reveal-up">
                Let&apos;s start the <mark className="marker">next entry.</mark>
              </h2>
              <p className="reveal-up">
                Open to full-time roles with relocation, remote positions, and AI &amp; automation projects. I reply within
                24 hours.
              </p>
              <div className="contact-links reveal-up">
                <a href={`mailto:${EMAIL}`} className="contact-link">
                  <MailIcon />
                  {EMAIL}
                </a>
                <a href={WHATSAPP_URL} className="contact-link">
                  <PhoneIcon />
                  {PHONE_DISPLAY}
                </a>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="contact-link">
                  <LinkedInIcon />
                  LinkedIn
                </a>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="contact-link">
                  <GitHubIcon />
                  GitHub
                </a>
                <a href={CV_URL} className="contact-link" download>
                  <ArrowIcon />
                  Download CV (PDF)
                </a>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer topHref="#hero" />
    </>
  );
}
