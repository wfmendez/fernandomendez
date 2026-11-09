import { cases } from './cases';
import { clientProjects } from './projects';
import { CV_URL, EMAIL, GITHUB_URL, LINKEDIN_URL, WHATSAPP_URL } from './site';

// One entry in the command palette (⌘K). Plain data, so the server can build
// the list and hand it to the client component.
export type Command = {
  id: string;
  group: 'Pages' | 'Logbooks' | 'Live projects' | 'Contact';
  label: string;
  // Small text on the right, e.g. a domain or a date.
  hint?: string;
  // Extra words that should match, e.g. a project's stack.
  keywords?: string;
  href?: string;
  external?: boolean;
  download?: boolean;
  copy?: string;
};

export const commands: Command[] = [
  { id: 'home', group: 'Pages', label: 'Home', href: '/' },
  { id: 'work', group: 'Pages', label: 'Selected work', href: '/#projects', keywords: 'projects portfolio' },
  { id: 'about', group: 'Pages', label: 'About', href: '/about', keywords: 'bio profile' },
  { id: 'skills', group: 'Pages', label: 'Skills', href: '/about#skills', keywords: 'stack expertise' },
  { id: 'experience', group: 'Pages', label: 'Experience', href: '/about#experience', keywords: 'jobs roles career' },
  { id: 'archive', group: 'Pages', label: 'Archive', href: '/archive', keywords: 'all projects list' },

  ...cases.map(c => ({
    id: `log-${c.slug}`,
    group: 'Logbooks' as const,
    label: c.name,
    hint: `${c.entries.length} entries`,
    keywords: `logbook case study ${c.eyebrow} ${c.facts.map(f => f.value).join(' ')}`,
    href: `/work/${c.slug}`,
  })),

  ...clientProjects
    .filter(p => p.link)
    .map(p => ({
      id: `live-${p.slug}`,
      group: 'Live projects' as const,
      label: `Open ${p.name}`,
      hint: p.link!.href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
      keywords: `${p.kind} ${p.tags.join(' ')}`,
      href: p.link!.href,
      external: true,
    })),

  { id: 'copy-email', group: 'Contact', label: 'Copy email address', hint: EMAIL, copy: EMAIL, keywords: 'mail contact' },
  { id: 'cv', group: 'Contact', label: 'Download CV', hint: 'PDF', href: CV_URL, download: true, keywords: 'resume' },
  { id: 'contact', group: 'Contact', label: 'Send a message', href: '/#contact', keywords: 'hire form' },
  { id: 'whatsapp', group: 'Contact', label: 'WhatsApp', href: WHATSAPP_URL, external: true, keywords: 'phone chat' },
  { id: 'linkedin', group: 'Contact', label: 'LinkedIn', href: LINKEDIN_URL, external: true },
  { id: 'github', group: 'Contact', label: 'GitHub', href: GITHUB_URL, external: true, keywords: 'code source repositories' },
];
