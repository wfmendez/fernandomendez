export type CoverIcon = 'academy' | 'map' | 'chart' | 'graph' | 'leaf';

// A project shown on the home page. Client and product work gets a large
// "chapter"; side projects get a compact row.
export type Project = {
  slug: string;
  name: string;
  kind: 'Client' | 'Product' | 'Volunteer' | 'Side project';
  // Short context line, e.g. who it was for and when.
  context: string;
  summary: string;
  tags: string[];
  facts?: { label: string; value: string }[];
  // Slug of the logbook page under /work, when one exists.
  caseSlug?: string;
  // Optional stamp shown next to the kind, e.g. "New".
  badge?: string;
  // Typographic cover used when there is no screenshot.
  cover: { icon: CoverIcon; tone: 'cobalt' | 'signal' | 'moss' | 'ink' };
  link?: { href: string; label: string };
  github?: string;
  privateLabel?: string;
};

export const clientProjects: Project[] = [
  {
    slug: 'trayecto',
    name: 'Trayecto',
    kind: 'Product',
    context: 'Founder · trayecto.app · 2026',
    summary:
      'An AI system that helps people in Latin America build an international remote career, told as one journey on an illustrated map: get to know yourself, plan the move, apply. From personality tests to CV, cover letters and interviews. It began as FPY Academy, a learning platform.',
    tags: ['Next.js 15', 'TypeScript', 'Prisma', 'Groq', 'NextAuth', 'PWA'],
    facts: [
      { label: 'Commits', value: '482' },
      { label: 'Test files', value: '68' },
      { label: 'Languages', value: 'ES · EN · PT' },
    ],
    caseSlug: 'trayecto',
    cover: { icon: 'academy', tone: 'moss' },
    link: { href: 'https://trayecto.app', label: 'trayecto.app' },
  },
  {
    slug: 'collab-map',
    name: 'Collab Map',
    kind: 'Client',
    context: 'Collab Collective Studio · Miami · 2026',
    summary:
      'A field-sales platform coordinating reps across 5,000+ retail stores. Three Airtable bases and Supabase (PostGIS) meet in one real-time map with a route optimizer (NN → 2-opt → 3-opt), Kalman-smoothed GPS check-ins and in-app navigation.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'PostGIS', 'Google Maps'],
    facts: [
      { label: 'Stores', value: '5,000+' },
      { label: 'Visit logging', value: '4× faster' },
    ],
    cover: { icon: 'map', tone: 'moss' },
    privateLabel: 'Private · built at Collab Collective Studio',
  },
  {
    slug: 'cil',
    name: 'Cíl',
    kind: 'Product',
    badge: 'New',
    context: 'Own product · Android, Windows and web · 2026',
    summary:
      'A study app for the Cambridge B1, B2 and C1 exams. Every exercise explains why the answer is right, mock tests mark you part by part, and an optional AI review comments on your writing. No account: everything stays on the device and works offline.',
    tags: ['Flutter', 'Dart', 'Vercel Functions', 'Groq', 'Anthropic'],
    facts: [
      { label: 'Levels', value: 'B1 · B2 · C1' },
      { label: 'Platforms', value: 'Android · Windows · Web' },
      { label: 'Built in', value: '2 days' },
    ],
    caseSlug: 'cil',
    cover: { icon: 'academy', tone: 'cobalt' },
    link: { href: 'https://cambridge-helper-cumorah.vercel.app', label: 'Open the web app' },
    github: 'https://github.com/wfmendez/cambridge-helper-cumorah',
  },
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
    slug: 'kenhion-allen',
    name: 'Kenhion Allen',
    kind: 'Client',
    context: 'Sportswear brand · Maracay, Venezuela · 2026',
    summary:
      'An online shop for a sportswear brand: a catalog with filters in the URL, colour and size per product, a cart with a 15% wholesale discount from six pieces, and a checkout that produces a PDF receipt and sends the order over WhatsApp.',
    tags: ['Next.js 16', 'TypeScript', 'Zod', 'react-pdf', 'Playwright'],
    facts: [
      { label: 'Pull requests', value: '21' },
      { label: 'Test files', value: '19' },
      { label: 'Checks', value: 'CI · axe · Lighthouse' },
    ],
    caseSlug: 'kenhion-allen',
    cover: { icon: 'chart', tone: 'ink' },
    link: { href: 'https://kenhion-allen.vercel.app', label: 'kenhion-allen.vercel.app' },
    github: 'https://github.com/wfmendez/kenhion-allen',
  },
  {
    slug: 'estaca-caracas',
    name: 'Estaca Caracas',
    kind: 'Volunteer',
    context: 'Church stake · Caracas · 2026',
    summary:
      'Started as the site for a stake conference, became a permanent information portal and now announces the next conference too. It has an AI assistant grounded in official Church content, an adaptive contact form, local SEO for Caracas and 133 unit tests.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Vercel Functions', 'Groq'],
    facts: [
      { label: 'Commits', value: '147' },
      { label: 'First launch', value: '1 day' },
      { label: 'Tests', value: '133' },
    ],
    caseSlug: 'estaca-caracas',
    cover: { icon: 'map', tone: 'signal' },
    link: { href: 'https://www.estacacaracas.com', label: 'estacacaracas.com' },
  },
  {
    slug: 'perez-rojas',
    name: 'Pérez Rojas Abogados',
    kind: 'Client',
    context: 'Criminal law firm · Madrid · 2026',
    summary:
      'A bilingual website for a Madrid criminal defense firm specialised in economic crime, compliance and European Public Prosecutor (EPPO) cases. Confidential consultation requests, a 24/7 emergency line, a publications section and a page for collaborating law firms.',
    tags: ['Next.js 16', 'TypeScript', 'next-intl', 'Resend', 'Tailwind CSS'],
    facts: [
      { label: 'Languages', value: 'ES · EN' },
      { label: 'Commits', value: '64' },
    ],
    cover: { icon: 'chart', tone: 'ink' },
    link: { href: 'https://www.perezrojasabogados.com/es', label: 'perezrojasabogados.com' },
  },
  {
    slug: 'cumorah-games',
    name: 'Cumorah classroom games',
    kind: 'Product',
    context: 'Cumorah Academy · Czechia · 2026',
    summary:
      'Two mobile games for English classes. Campus Challenge follows a student day through 16 mini-games; Academy Party plays on a 3D diorama of the campus with five Houses. The teacher opens a room, shares a QR code, and up to 60 students play live.',
    tags: ['Node.js', 'Socket.IO', 'Three.js', 'QR rooms'],
    facts: [
      { label: 'Players', value: 'Up to 60' },
      { label: 'Mini-games', value: '16 + 3' },
    ],
    cover: { icon: 'academy', tone: 'cobalt' },
    link: { href: 'https://cumorah-academy-party.vercel.app', label: 'Play Academy Party' },
    github: 'https://github.com/wfmendez/cumorah-life-campus-challenge',
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
    title: 'Key Admit Prep',
    description:
      'Public website in English, Spanish and French for an admissions-prep service: server-rendered content, international SEO, an interactive Three.js scene and Motion animations, with the groundwork for a CRM.',
    tags: ['Next.js 16', 'TypeScript', 'next-intl', 'Three.js', 'Motion'],
    highlight: 2,
    href: 'https://key-admit.vercel.app',
    linkKind: 'live',
  },
  {
    year: '2026',
    title: 'Cumorah Academy Party',
    description:
      'A classroom party game in English: five Houses, a 3D diorama based on the Cumorah campus map and three arcade mini-games. The teacher runs each round from a shared room that up to 60 students join by QR code.',
    tags: ['Node.js', 'Socket.IO', 'Three.js', 'QR rooms'],
    highlight: 2,
    href: 'https://cumorah-academy-party.vercel.app',
    linkKind: 'live',
  },
  {
    year: '2026',
    title: 'Entre Fios e Trilhas',
    description:
      'Website in Portuguese for group trips that mix art (fios) and nature (trilhas), with an interactive 3D scene.',
    tags: ['Next.js 16', 'Tailwind CSS', 'Three.js', 'React Three Fiber'],
    highlight: 2,
    href: 'https://entre-fios-e-trilhas.vercel.app',
    linkKind: 'live',
  },
  {
    year: '2026',
    title: 'Casitas Cozumel',
    description:
      'A private property-management app for rental houses in Cozumel: houses and units, rent and payment tracking, expenses, utility meters and period reports with charts.',
    tags: ['Next.js 16', 'TypeScript', 'Supabase', 'Three.js'],
    highlight: 2,
  },
  {
    year: '2026',
    title: 'Cumorah Life — Campus Challenge',
    description:
      'A mobile classroom tournament in English with 16 mini-games that follow a student day. Practice alone, or join a live room by QR code: up to 60 students, each stage timed and scored up to 100 points.',
    tags: ['Node.js', 'Socket.IO', 'Three.js', 'QR rooms'],
    highlight: 2,
    href: 'https://github.com/wfmendez/cumorah-life-campus-challenge',
    linkKind: 'github',
  },
  {
    year: '2026',
    title: 'Pérez Rojas Abogados',
    description:
      'A bilingual (ES/EN) website for a Madrid criminal defense firm specialised in economic crime, compliance and EPPO cases: confidential consultation requests, a 24/7 emergency line, publications and an Of Counsel page.',
    tags: ['Next.js 16', 'TypeScript', 'next-intl', 'Resend'],
    highlight: 2,
    href: 'https://www.perezrojasabogados.com/es',
    linkKind: 'live',
  },
  {
    year: '2026',
    title: 'Kenhion Allen',
    description:
      'An online store for a sportswear brand from Maracay: filterable catalog, colour and size selection, a cart with a wholesale discount, PDF order receipts and orders sent by WhatsApp. Unit, end-to-end and accessibility tests.',
    tags: ['Next.js 16', 'TypeScript', 'Zod', 'react-pdf', 'Playwright'],
    highlight: 2,
    href: 'https://kenhion-allen.vercel.app',
    linkKind: 'live',
  },
  {
    year: '2026',
    title: 'SCE Core',
    description:
      'Contributor and maintainer on an internal PWA for SCE International to create, approve and execute budgets, with real-time expense tracking, in-app and email notifications and document downloads.',
    tags: ['Next.js 16', 'TypeScript', 'Supabase', 'Resend'],
    highlight: 2,
    href: 'https://scecore.app',
    linkKind: 'live',
  },
  {
    year: '2026',
    title: 'Cíl',
    description:
      'A study app for the Cambridge B1, B2 and C1 exams on Android, Windows and the web. Explained practice, original mock papers marked part by part, writing tasks with optional AI reviews (Groq, with Anthropic as fallback) and no accounts: everything stays on the device.',
    tags: ['Flutter', 'Dart', 'Vercel Functions', 'Groq', 'Anthropic'],
    highlight: 2,
    href: 'https://cambridge-helper-cumorah.vercel.app',
    linkKind: 'live',
  },
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
    title: 'Kenhion Allen',
    description:
      'Online shop for a sportswear brand in Maracay: catalog with URL filters, colour and size per product, 15% wholesale discount from six pieces, PDF order receipt and checkout over WhatsApp. Built in phases with Vitest, Playwright, axe and Lighthouse CI.',
    tags: ['Next.js 16', 'TypeScript', 'Zod', 'react-pdf', 'Playwright'],
    highlight: 2,
    href: 'https://kenhion-allen.vercel.app',
    linkKind: 'live',
  },
  {
    year: '2026',
    title: 'Estaca Caracas',
    description:
      'Volunteer site for a church stake in Caracas, from conference page to information portal and back to announce the November 2026 conference: an AI assistant on Groq grounded in official content, adaptive contact form, local SEO, CSP and 133 unit tests.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Vercel Functions', 'Groq'],
    highlight: 2,
    href: 'https://www.estacacaracas.com',
    linkKind: 'live',
  },
  {
    year: '2026',
    title: 'Money Flow',
    description:
      'Site for my workshop on AI, personal finance and employment, with two talks: how to stand out in the AI revolution, and financial intelligence in the digital era. Light and dark themes.',
    tags: ['Next.js', 'Framer Motion'],
    highlight: 1,
  },
  {
    year: '2026',
    title: 'Talks',
    description:
      'Hand-drawn slides that draw themselves as you click, for my talks and classes: failure and success, good design, everyday AI agents with a sung opening video, and an English lesson with animated 3D emojis and an activity on the students’ phones.',
    tags: ['React', 'Vite', 'Three.js', 'Tailwind'],
    highlight: 2,
    href: 'https://github.com/wfmendez/public-speaking',
    linkKind: 'github',
  },
  {
    year: '2026',
    title: 'Cumorah Life',
    description:
      'A classroom game in English for phones: sixteen mini-games follow a student’s day. The teacher opens a room, shares a QR code and up to 60 students play a tournament at their own pace.',
    tags: ['JavaScript', 'Node.js', 'Socket.IO', 'Three.js'],
    highlight: 1,
    href: 'https://github.com/wfmendez/cumorah-life-campus-challenge',
    linkKind: 'github',
  },
  {
    year: '2026',
    title: 'Trayecto',
    description:
      'An AI system for building an international remote career from Latin America, formerly FPY Academy. One journey on an illustrated map: personality tests and a free AI compass report, then CV builder, cover letters, application board and remote job search. In Spanish, English and Portuguese.',
    tags: ['Next.js 15', 'TypeScript', 'Prisma', 'Groq', 'PWA'],
    highlight: 2,
    href: 'https://trayecto.app',
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
      'An operations platform coordinating field reps across 5,000+ retail stores. Real-time map dashboard with route optimizer (NN → 2-opt → 3-opt), Kalman-smoothed GPS check-ins, and turn-by-turn navigation. Reps log visits 4× faster.',
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
