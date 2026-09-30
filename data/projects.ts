export type CoverIcon = 'academy' | 'map' | 'chart' | 'graph' | 'leaf';

// A project shown on the home page. Client and product work gets a large
// "chapter"; side projects get a compact row.
export type Project = {
  slug: string;
  name: string;
  kind: 'Client' | 'Product' | 'Side project';
  // Short context line, e.g. who it was for and when.
  context: string;
  summary: string;
  tags: string[];
  facts?: { label: string; value: string }[];
  // Slug of the logbook page under /work, when one exists.
  caseSlug?: string;
  // Typographic cover used when there is no screenshot.
  cover: { icon: CoverIcon; tone: 'cobalt' | 'signal' | 'moss' | 'ink' };
  link?: { href: string; label: string };
  github?: string;
  privateLabel?: string;
};

export const clientProjects: Project[] = [
  {
    slug: 'amarhte',
    name: 'Amarhte',
    kind: 'Client',
    context: 'Wellbeing studio · Madrid · 2026',
    summary:
      'A trilingual website for an integral-wellbeing studio. Instead of a price list, it helps each visitor find their path: a feelings selector, a guided breathing pause and an Ayurvedic dosha test, each ending in a WhatsApp conversation or a booking on Cal.com.',
    tags: ['Next.js 16', 'TypeScript', 'next-intl', 'Cal.com'],
    facts: [
      { label: 'Built in', value: '22 days' },
      { label: 'Commits', value: '98' },
      { label: 'Languages', value: 'ES · EN · PT' },
    ],
    caseSlug: 'amarhte',
    cover: { icon: 'leaf', tone: 'signal' },
    link: { href: 'https://amarhte.com', label: 'amarhte.com' },
  },
  {
    slug: 'collab-map',
    name: 'Collab Map',
    kind: 'Client',
    context: 'Collab Collective Studio · Miami · 2026',
    summary:
      'A field-sales platform coordinating reps across 3,000+ retail stores. Three Airtable bases and Supabase (PostGIS) meet in one real-time map with a route optimizer (NN → 2-opt → 3-opt), Kalman-smoothed GPS check-ins and in-app navigation.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'PostGIS', 'Google Maps'],
    facts: [
      { label: 'Stores', value: '3,000+' },
      { label: 'Visit logging', value: '4× faster' },
    ],
    cover: { icon: 'map', tone: 'moss' },
    privateLabel: 'Private · built at Collab Collective Studio',
  },
  {
    slug: 'fpy-academy',
    name: 'FPY Academy',
    kind: 'Product',
    context: 'fpyacademy.com · 2026',
    summary:
      'A production LMS where every lesson has a context-aware AI tutor (Llama 3.3 70B via Groq) grounded in the lesson content and streamed with the Vercel AI SDK. Plus a course builder, quiz engine, role-based access and PDF learning plans.',
    tags: ['Next.js 15', 'TypeScript', 'Groq', 'Llama 3.3', 'RAG'],
    facts: [{ label: 'Commits', value: '100+' }],
    cover: { icon: 'academy', tone: 'cobalt' },
    link: { href: 'https://fpyacademy.com', label: 'fpyacademy.com' },
  },
];

export const sideProjects: Project[] = [
  {
    slug: 'strata',
    name: 'STRATA',
    kind: 'Side project',
    context: 'SocialFi · 2026',
    summary:
      'A "Twitter for on-chain real estate": Fan-Out-on-Write feeds, Sign-In with Ethereum with replay protection, HMAC sessions and CSP hardening, covered by 29 Vitest tests.',
    tags: ['Next.js 14', 'Prisma', 'viem', 'SIWE'],
    cover: { icon: 'chart', tone: 'ink' },
    github: 'https://github.com/wfmendez/strata',
  },
  {
    slug: 'contentflow',
    name: 'ContentFlow',
    kind: 'Side project',
    context: 'Open-source AI pipeline · 2026',
    summary:
      'Monitors RSS and Reddit, scores trending topics with Gemini and Llama 3.3, and drafts posts for human review, with per-draft token and cost transparency.',
    tags: ['FastAPI', 'Celery', 'Gemini', 'React'],
    cover: { icon: 'graph', tone: 'ink' },
    github: 'https://github.com/wfmendez',
  },
];

export type ArchiveProject = {
  year: string;
  title: string;
  description: string;
  // The first `highlight` tags are rendered with the accent style.
  tags: string[];
  highlight: number;
  href?: string;
  linkKind?: 'live' | 'github';
};

export const archiveProjects: ArchiveProject[] = [
  {
    year: '2026',
    title: 'Amarhte',
    description:
      'A trilingual (ES/EN/PT) website for a wellbeing studio in Madrid. It guides visitors to the right support path with a feelings selector, a guided breathing pause and an Ayurvedic dosha test. Visitors pick a treatment and continue on WhatsApp or book through Cal.com, with 301 redirects from the old site.',
    tags: ['Next.js 16', 'TypeScript', 'next-intl', 'Cal.com', 'i18n'],
    highlight: 2,
    href: 'https://amarhte.com',
    linkKind: 'live',
  },
  {
    year: '2026',
    title: 'FPY Academy',
    description:
      'A full-stack LMS shipped to production. Includes a context-aware AI tutor grounded in lesson content via a lightweight RAG pattern, streamed token-by-token with Vercel AI SDK, plus a course builder, quiz engine, role-based access, and PDF export.',
    tags: ['Next.js 15', 'TypeScript', 'Llama 3.3', 'Groq', 'RAG'],
    highlight: 2,
    href: 'https://fpyacademy.com',
    linkKind: 'live',
  },
  {
    year: '2026',
    title: 'ContentFlow',
    description:
      'An open-source SaaS that automates the content cycle: monitors RSS/Reddit, scores trending topics with AI, drafts LinkedIn/blog posts, newsletter review dashboard with full AI cost transparency. End-to-end Playwright tested.',
    tags: ['FastAPI', 'Celery', 'Gemini', 'Llama 3.3', 'React'],
    highlight: 2,
    href: 'https://github.com/wfmendez',
    linkKind: 'github',
  },
  {
    year: '2026',
    title: 'Collab Map',
    description:
      'An operations platform coordinating field reps across 3,000+ retail stores. Real-time map dashboard with route optimizer (NN → 2-opt → 3-opt), Kalman-smoothed GPS check-ins, and turn-by-turn navigation. Reps log visits 4× faster.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'PostGIS', 'Google Maps'],
    highlight: 2,
  },
  {
    year: '2026',
    title: 'STRATA',
    description:
      'A "Twitter for on-chain real estate" where investors post tokenized property deals and earn DeFi yield. Fan-Out-on-Write feeds (materialized timelines), Sign-In with Ethereum with replay protection, HMAC sessions, CSRF middleware, CSP hardening.',
    tags: ['Next.js 14', 'TypeScript', 'Prisma', 'viem', 'SIWE'],
    highlight: 2,
    href: 'https://github.com/wfmendez/strata',
    linkKind: 'github',
  },
  {
    year: '2025',
    title: 'Hey, View my NFTs!',
    description:
      "A dApp on Ethereum mainnet for browsing any wallet's NFT collection. Integrates Wagmi for wallet connection and the Alchemy API for NFT metadata retrieval. Uses React Query to keep state synchronized with the chain.",
    tags: ['React', 'TypeScript', 'Wagmi', 'Ethers.js', 'Alchemy API'],
    highlight: 2,
    href: 'https://github.com/wfmendez',
    linkKind: 'github',
  },
  {
    year: '2025',
    title: 'Adorable Turtles',
    description:
      'A full-stack web application focused on real-time data handling. Implemented React component-based architecture, RESTful API on Node.js/Express, MongoDB Atlas database, and Cloudinary for image optimization.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Cloudinary'],
    highlight: 2,
    href: 'https://github.com/wfmendez',
    linkKind: 'github',
  },
  {
    year: '2025',
    title: 'DONA-POL',
    description:
      'A donation dApp on the Polygon network bringing transparency to charitable giving. Smart contracts written in Solidity to manage secure donation flows, developed and tested locally with Hardhat before mainnet deployment.',
    tags: ['Solidity', 'Hardhat', 'Polygon Network', 'Smart Contracts'],
    highlight: 2,
    href: 'https://github.com/wfmendez',
    linkKind: 'github',
  },
];
