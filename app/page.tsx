import type { Metadata } from 'next';
import Link from 'next/link';
import ContactCanvas from '@/components/ContactCanvas';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import HeroCanvas from '@/components/HeroCanvas';
import JsonLd from '@/components/JsonLd';
import Navbar from '@/components/Navbar';
import ProjectCard from '@/components/ProjectCard';
import { ArrowIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from '@/components/icons';
import { featuredProjects } from '@/data/projects';
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
      <section id="hero">
        <HeroCanvas />
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              Available for new projects
            </div>
            <h1 className="hero-title">
              <span className="title-line" data-text="Fernando">Fernando</span>
              <span className="title-line gradient-text" data-text="Mendez">Mendez</span>
              <span className="title-line" data-text="— Builds with AI.">— Builds with AI.</span>
            </h1>
            <p className="hero-subtitle">
              Full-Stack Developer specialised in <em>AI-powered apps</em> — building LLM chatbots, RAG
              systems &amp; automation pipelines with React, TypeScript &amp; Next.js, from Venezuela.
            </p>
            <div className="hero-stat-highlight">
              <span className="stat-num" data-target="4">0</span>
              <span className="stat-label">
                <span className="stat-highlight">Years</span>
                <br />
                of Experience
              </span>
            </div>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary magnetic">
                <span>View Work</span>
                <ArrowIcon />
              </a>
              <a href="#contact" className="btn btn-ghost magnetic">
                <span>Let&apos;s Talk</span>
              </a>
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* ===================== PROJECTS ===================== */}
      <section id="projects">
        <div className="container">
          <div className="section-header">
            <span className="section-label reveal-up">Work</span>
            <h2 className="section-title reveal-up">
              Selected <span className="gradient-text">Projects</span>
            </h2>
          </div>

          <div className="projects-list">
            {featuredProjects.map(project => (
              <ProjectCard key={project.mock.key} project={project} />
            ))}
          </div>

          <div className="projects-cta reveal-up">
            <Link href="/archive" className="btn btn-ghost magnetic">
              <span>View Complete Archive (All Projects &amp; Jobs)</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== CONTACT ===================== */}
      <section id="contact">
        <ContactCanvas />
        <div className="container">
          <div className="contact-inner">
            <div className="contact-text">
              <span className="section-label reveal-up">Contact</span>
              <h2 className="section-title reveal-up">
                Let&apos;s build
                <br />
                something <span className="gradient-text">intelligent.</span>
              </h2>
              <p className="reveal-up">
                Open to freelance work, remote full-time roles, and AI &amp; automation projects. Reach out — I
                respond within 24 hours.
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
