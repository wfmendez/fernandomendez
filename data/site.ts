export const SITE_URL = 'https://fernandomendez.online';
export const SITE_NAME = 'Fernando Mendez';
export const SITE_TITLE = 'Fernando Mendez — AI & Full-Stack Developer';
export const OG_IMAGE = `${SITE_URL}/assets/og-image.png`;

export const EMAIL = 'wuillian.f.mendez@gmail.com';
export const PHONE_DISPLAY = '+58 414 489 6306';
export const WHATSAPP_URL = 'https://wa.me/584144896306';
export const GITHUB_URL = 'https://github.com/wfmendez';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/wf-mendez/';

// Get a free key at https://web3forms.com. Until it is set, the contact form
// falls back to opening the visitor's email app.
export const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? '';

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  jobTitle: 'AI & Full-Stack Developer',
  url: `${SITE_URL}/`,
  image: OG_IMAGE,
  email: `mailto:${EMAIL}`,
  address: { '@type': 'PostalAddress', addressCountry: 'VE' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Brigham Young University–Idaho' },
  knowsAbout: [
    'Artificial Intelligence', 'Large Language Models', 'RAG', 'Chatbots', 'AI Agents',
    'Automation', 'Next.js', 'TypeScript', 'React', 'Node.js', 'Python', 'Web3',
  ],
  sameAs: [GITHUB_URL, LINKEDIN_URL],
};

export const websiteRef = {
  '@type': 'WebSite',
  name: SITE_TITLE,
  url: `${SITE_URL}/`,
};

export type NavItem = { href: string; label: string };
