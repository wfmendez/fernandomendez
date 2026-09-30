export type MockIcon = 'academy' | 'map' | 'chart' | 'graph';

export type FeaturedProject = {
  index: string;
  title: string;
  tags: string[];
  description: string;
  mock: { key: string; url: string; name: string; icon: MockIcon };
  // Primary call-to-action; omitted for private work.
  link?: { href: string; label: string };
  github?: string;
  privateLabel?: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    index: '01 · 2026',
    title: 'FPY Academy — AI Learning Platform',
    tags: ['Next.js 15', 'TypeScript', 'Groq', 'Llama 3.3', 'RAG'],
    description:
      'A full-stack LMS shipped to production at fpyacademy.com. Every lesson includes a context-aware AI tutor (Llama 3.3 70B via Groq) that grounds its answers in the live lesson content — a lightweight RAG pattern, streamed token-by-token with the Vercel AI SDK. Plus a course builder, quiz engine, role-based access, and PDF-exportable learning plans. 100+ commits.',
    mock: { key: 'fpy', url: 'fpyacademy.com', name: 'FPY Academy', icon: 'academy' },
    link: { href: 'https://fpyacademy.com', label: 'Visit Live' },
  },
  {
    index: '02 · 2026',
    title: 'Collab Map — Field-Sales Platform',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'PostGIS', 'Google Maps'],
    description:
      'An end-to-end operations platform coordinating field reps across 3,000+ retail stores. Unifies three Airtable bases and Supabase (PostGIS) into one real-time map dashboard with a route optimizer (NN → 2-opt → 3-opt), Kalman-smoothed GPS check-ins, and in-app turn-by-turn navigation. Result: reps log visits 4× faster. Built at Collab Collective Studio.',
    mock: { key: 'collab', url: 'collab map · private', name: 'Collab Map', icon: 'map' },
    privateLabel: 'Private · Collab Collective Studio',
  },
  {
    index: '03 · 2026',
    title: 'STRATA — SocialFi Platform',
    tags: ['Next.js 14', 'TypeScript', 'Prisma', 'viem', 'SIWE'],
    description:
      'A "Twitter for on-chain real estate" where investors post tokenized property deals and earn DeFi yield. Engineered for scale and security: Fan-Out-on-Write feeds (500-post materialized timelines), Sign-In with Ethereum with replay protection, HMAC-signed sessions, CSRF middleware, and CSP hardening — all covered by 29 Vitest tests.',
    mock: { key: 'strata', url: 'strata · socialfi', name: 'STRATA', icon: 'chart' },
    link: { href: 'https://github.com/wfmendez/strata', label: 'View Code' },
    github: 'https://github.com/wfmendez/strata',
  },
  {
    index: '04 · 2026',
    title: 'ContentFlow — AI Content Pipeline',
    tags: ['FastAPI', 'Celery', 'Gemini', 'Llama 3.3', 'React'],
    description:
      'An open-source SaaS that automates the entire content cycle: it monitors RSS feeds and Reddit every 6 hours, scores trending topics with AI (Gemini 1.5 Flash + Groq Llama 3.3), and drafts LinkedIn posts, blogs, and newsletters for human review. Per-draft AI transparency — tokens, cost, and prompt used — at roughly $0.001 per trend. End-to-end tested with Playwright.',
    mock: { key: 'flow', url: 'contentflow · open-source', name: 'ContentFlow', icon: 'graph' },
    link: { href: 'https://github.com/wfmendez', label: 'View Code' },
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
