import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import AboutCanvas from '@/components/AboutCanvas';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import Navbar from '@/components/Navbar';
import { certifications, education, skills, volunteering, type SkillIcon } from '@/data/about';
import { timeline } from '@/data/experience';
import { SITE_URL, personJsonLd, websiteRef, type NavItem } from '@/data/site';

const title = 'About — Fernando Mendez | AI & Full-Stack Developer';
const description =
  'Get to know Fernando Mendez — an AI & Full-Stack Developer from Venezuela. Skills, professional experience, education, certifications, and volunteer leadership.';
const socialDescription =
  'Skills, professional experience, education, certifications, and volunteer leadership — the story behind the work.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'Fernando Mendez', 'About', 'AI Developer', 'Full Stack Developer', 'LLM', 'RAG', 'Chatbots', 'AI Agents',
    'Automation', 'n8n', 'Next.js', 'TypeScript', 'Python', 'React', 'Node.js', 'Venezuela',
  ],
  alternates: { canonical: '/about' },
  openGraph: { type: 'profile', title, description: socialDescription, url: '/about' },
  twitter: { title, description: socialDescription },
};

const navItems: NavItem[] = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '/#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '/#contact', label: 'Contact' },
];

const skillIcons: Record<SkillIcon, ReactNode> = {
  ai: (
    <svg viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="18" stroke="#6C63FF" strokeWidth="1.5" />
      <path d="M13 14l-5 6 5 6M27 14l5 6-5 6M22 12l-4 16" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  frontend: (
    <svg viewBox="0 0 40 40" fill="none">
      <rect x="4" y="4" width="32" height="32" rx="8" stroke="#00D4FF" strokeWidth="1.5" />
      <path d="M12 16h16M12 20h10M12 24h13" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  backend: (
    <svg viewBox="0 0 40 40" fill="none">
      <polygon points="20,4 36,12 36,28 20,36 4,28 4,12" stroke="#FF6B9D" strokeWidth="1.5" />
      <polygon points="20,12 28,16 28,24 20,28 12,24 12,16" stroke="#FF6B9D" strokeWidth="1" opacity="0.5" />
    </svg>
  ),
  automation: (
    <svg viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="10" stroke="#FFB347" strokeWidth="1.5" />
      <path d="M20 4v4M20 32v4M4 20h4M32 20h4" stroke="#FFB347" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  web3: (
    <svg viewBox="0 0 40 40" fill="none">
      <path d="M8 32 Q16 8 20 8 Q24 8 32 32" stroke="#A855F7" strokeWidth="1.5" fill="none" />
      <circle cx="20" cy="20" r="3" fill="#A855F7" />
    </svg>
  ),
  tools: (
    <svg viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="6" fill="none" stroke="#00FFB2" strokeWidth="1.5" />
      <path
        d="M20 4L20 14M20 26L20 36M4 20L14 20M26 20L36 20M8 8L15 15M25 25L32 32M32 8L25 15M15 25L8 32"
        stroke="#00FFB2"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          personJsonLd,
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About — Fernando Mendez',
            url: `${SITE_URL}/about`,
            description:
              'Skills, professional experience, education, certifications, and volunteer leadership of Fernando Mendez — AI & Full-Stack Developer.',
            isPartOf: websiteRef,
          },
        ]}
      />
      <Navbar items={navItems} ctaHref="/#contact" logoHref="/" />

      {/* ===================== ABOUT ===================== */}
      <section id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-visual">
              <div className="about-image-wrap">
                <div className="about-image-placeholder">
                  <AboutCanvas />
                </div>
                <div className="about-tag tag-1">AI · RAG · LLMs</div>
                <div className="about-tag tag-2">Next.js + TypeScript</div>
                <div className="about-tag tag-3">Python · Automation</div>
              </div>
            </div>
            <div className="about-text">
              <span className="section-label reveal-up">About Me</span>
              <h2 className="section-title reveal-up">
                From idea to <span className="gradient-text">AI-powered products</span>
              </h2>
              <p className="about-body reveal-up">
                I&apos;m a Full-Stack Developer pursuing a Bachelor of Software Development at BYU-Idaho. I build
                production AI applications — LLM-powered chatbots, RAG systems, and content pipelines — turning
                models like Llama 3.3 and Claude into products people actually use.
              </p>
              <p className="about-body reveal-up">
                I also architect automation ecosystems — n8n, custom AI agents, and API integrations that replace
                manual ops with self-running infrastructure. My stack centers on Next.js, TypeScript and Python,
                backed by PostgreSQL and Supabase — and yes, I&apos;ve shipped on-chain too.
              </p>
              <div className="about-signature reveal-up">
                <svg viewBox="0 0 160 50" fill="none" className="signature-svg">
                  <path
                    d="M10 40 Q30 5 50 30 Q70 55 90 20 Q110 -10 140 35"
                    stroke="url(#sig-grad)"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="sig-grad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#6C63FF" />
                      <stop offset="100%" stopColor="#00D4FF" />
                    </linearGradient>
                  </defs>
                </svg>
                <span>Fernando Mendez</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SKILLS ===================== */}
      <section id="skills">
        <div className="container">
          <div className="section-header">
            <span className="section-label reveal-up">Expertise</span>
            <h2 className="section-title reveal-up">
              The tools I <span className="gradient-text">master</span>
            </h2>
          </div>
          <div className="skills-grid">
            {skills.map((skill, i) => (
              <div className="skill-card reveal-up" data-delay={i * 100} key={skill.title}>
                <div className="skill-icon">{skillIcons[skill.icon]}</div>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
                <div className="skill-bar">
                  <div className="skill-fill" data-width={skill.level}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== EXPERIENCE ===================== */}
      <section id="experience">
        <div className="container">
          <div className="section-header">
            <span className="section-label reveal-up">Journey</span>
            <h2 className="section-title reveal-up">
              Where I&apos;ve <span className="gradient-text">worked</span>
            </h2>
          </div>
          <div className="timeline">
            <div className="timeline-line"></div>
            {timeline.map((item, i) => (
              <div className="timeline-item reveal-up" data-side={i % 2 === 0 ? 'left' : 'right'} key={item.period + item.title}>
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <span className="timeline-period">{item.period}</span>
                  <h3>{item.title}</h3>
                  <span className="timeline-company">{item.company}</span>
                  <p>
                    {item.highlight && (
                      <>
                        {item.highlight.before}
                        <strong>{item.highlight.strong}</strong>
                      </>
                    )}
                    {item.description}
                  </p>
                  <div className="timeline-skills">
                    {item.skills.map(s => <span key={s}>{s}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== EDUCATION & CERTIFICATIONS ===================== */}
      <section id="education">
        <div className="container">
          <div className="section-header">
            <span className="section-label reveal-up">Learning</span>
            <h2 className="section-title reveal-up">
              Education &amp; <span className="gradient-text">Certifications</span>
            </h2>
          </div>

          <div className="edu-grid">
            {education.map(item => (
              <div className="edu-card reveal-up" key={item.title}>
                <span className="edu-period">{item.period}</span>
                <h3>{item.title}</h3>
                <span className="edu-org">{item.org}</span>
                <p>{item.description}</p>
              </div>
            ))}
          </div>

          <div className="cert-block reveal-up">
            <h3 className="cert-title">Featured certifications</h3>
            <div className="cert-cloud">
              {certifications.map(cert => (
                <span className="cert-chip" key={cert.name}>
                  {cert.name} <span className="cert-issuer">· {cert.issuer}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== LEADERSHIP & SERVICE ===================== */}
      <section id="volunteering">
        <div className="container">
          <div className="section-header">
            <span className="section-label reveal-up">Beyond Code</span>
            <h2 className="section-title reveal-up">
              Leadership &amp; <span className="gradient-text">Service</span>
            </h2>
          </div>

          <div className="vol-grid">
            {volunteering.map(item => (
              <div className="vol-card reveal-up" key={item.title}>
                <h3>{item.title}</h3>
                <span className="vol-org">{item.org}</span>
                <span className="vol-period">{item.period}</span>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer brandHref="/" topHref="#about" />
    </>
  );
}
