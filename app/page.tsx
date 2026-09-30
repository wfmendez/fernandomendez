import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import HandNote from '@/components/HandNote';
import JsonLd from '@/components/JsonLd';
import Navbar from '@/components/Navbar';
import ProjectChapter from '@/components/ProjectChapter';
import { ArrowIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from '@/components/icons';
import { clientProjects, sideProjects } from '@/data/projects';
import {
  EMAIL, GITHUB_URL, LINKEDIN_URL, PHONE_DISPLAY, SITE_TITLE, SITE_URL, WHATSAPP_URL,
  personJsonLd, type NavItem,
} from '@/data/site';

const description =
  'Fernando Mendez — Full-Stack Developer building AI-powered apps: LLM chatbots, RAG systems, and automation pipelines with Next.js, TypeScript, and Python. Based in Venezuela.';
const socialDescription =
  'Building AI-powered apps — LLM chatbots, RAG systems, and automation pipelines with Next.js, TypeScript & Python.';

export const metadata: Metadata = {
  title: SITE_TITLE,
  description,
  keywords: [
    'Fernando Mendez', 'AI Developer', 'Full Stack Developer', 'LLM', 'RAG', 'Chatbots', 'AI Agents',
    'Automation', 'n8n', 'Next.js', 'TypeScript', 'Python', 'React', 'Node.js', 'Venezuela',
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
              'Fernando Mendez — Full-Stack Developer building AI-powered apps: LLM chatbots, RAG systems, and automation pipelines with Next.js, TypeScript, and Python.',
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
              Available for new projects
            </p>
            <h1 className="hero-title">
              Fernando Mendez
              <span className="hero-title-line">
                builds <mark className="marker">with AI.</mark>
              </span>
            </h1>
            <p className="hero-subtitle">
              Full-stack developer specialised in AI-powered apps: LLM chatbots, RAG systems and automation
              pipelines with React, TypeScript and Next.js. Based in Venezuela, working with clients anywhere.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                <span>See the work</span>
                <ArrowIcon />
              </a>
              <a href="#contact" className="btn btn-ghost">
                <span>Let&apos;s talk</span>
              </a>
            </div>
          </div>

          <aside className="hero-card" aria-label="Experience">
            <span className="hero-card-label">Field notes</span>
            <p className="hero-stat">
              <span className="stat-num" data-target="4">0</span>
              <span className="stat-unit">years shipping software</span>
            </p>
            <ul className="hero-card-list">
              <li><span>Now</span> Full-stack at Collab Collective Studio</li>
              <li><span>Stack</span> Next.js · TypeScript · Python</li>
              <li><span>Studying</span> B.S. Software Development, BYU-Idaho</li>
            </ul>
            <HandNote point="left" className="hero-card-note">and counting</HandNote>
          </aside>
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
            {clientProjects.map(project => (
              <ProjectChapter key={project.slug} project={project} />
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
                Open to freelance work, remote full-time roles, and AI &amp; automation projects. I reply within
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
