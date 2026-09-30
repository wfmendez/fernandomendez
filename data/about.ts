export type SkillIcon = 'ai' | 'frontend' | 'backend' | 'automation' | 'web3' | 'tools';

export const skills: { icon: SkillIcon; title: string; description: string; level: number }[] = [
  {
    icon: 'ai',
    title: 'AI & LLM Apps',
    description: 'RAG, chatbots, prompt engineering · Llama 3.3, Claude, Gemini, Groq, Vercel AI SDK',
    level: 93,
  },
  {
    icon: 'frontend',
    title: 'Frontend',
    description: 'React, Next.js, TypeScript, Vite, Tailwind CSS, Figma-to-code',
    level: 90,
  },
  {
    icon: 'backend',
    title: 'Backend & APIs',
    description: 'Node.js, FastAPI, Express, Prisma, PostgreSQL, Supabase, MongoDB',
    level: 88,
  },
  {
    icon: 'automation',
    title: 'Automation & Integration',
    description: 'n8n, AI agents, REST APIs, Airtable, Celery, webhooks',
    level: 88,
  },
  {
    icon: 'web3',
    title: 'Web3 & Blockchain',
    description: 'Solidity, Hardhat, Ethers.js, viem, Wagmi',
    level: 72,
  },
  {
    icon: 'tools',
    title: 'Languages & Tools',
    description: 'TypeScript, Python, JavaScript, Solidity · Git, Docker, Vercel · EN/ES bilingual',
    level: 90,
  },
];

export const education = [
  {
    period: 'Jan 2022 — Dec 2027',
    title: 'B.S. in Software Development',
    org: 'Brigham Young University–Idaho · Computer Software Engineering',
    description:
      'Software engineering principles, OOP, algorithms, and full-stack design across frontend, backend, and database management.',
  },
  {
    period: 'Jul 2023 — Present',
    title: 'Zero To Mastery Academy',
    org: 'Continuous learning · 11+ courses',
    description:
      'Self-driven specialization across AI agents (n8n), prompt engineering, React, TypeScript, Solidity & Web3, cybersecurity, and UI/UX design.',
  },
  {
    period: 'Jan 2021 — Dec 2021',
    title: 'PathwayConnect',
    org: 'BYU-Pathway Worldwide',
    description:
      'Academic foundations and English proficiency — the on-ramp into the BYU-Idaho software degree.',
  },
  {
    period: 'Jan 2019 — Apr 2019',
    title: 'Electronics Repair Technician',
    org: 'FUNVAL Colombia',
    description: 'Intensive 3-month program in hardware and software diagnosis, maintenance, and repair.',
  },
];

export const certifications: { name: string; issuer: string }[] = [
  { name: 'Claude Code 101', issuer: 'Anthropic' },
  { name: 'Claude 101', issuer: 'Anthropic' },
  { name: 'EF SET English — B2', issuer: 'EF SET' },
  { name: 'Build AI Agents with n8n', issuer: 'ZTM' },
  { name: 'Prompt Engineering Bootcamp', issuer: 'ZTM' },
  { name: 'Web3 Masterclass', issuer: 'ZTM' },
  { name: 'Complete React Developer', issuer: 'ZTM' },
  { name: 'TypeScript Bootcamp', issuer: 'ZTM' },
  { name: 'Cybersecurity for Beginners', issuer: 'ZTM' },
];

export const volunteering = [
  {
    title: 'Online Seminar Teacher (English)',
    org: 'The Church of Jesus Christ of Latter-day Saints',
    period: 'Sep 2025 — Present',
    description:
      'Teach weekly religion classes in English to American teenagers — preparing slides and activities, and leading weekly conversations on an online platform.',
  },
  {
    title: 'Volunteer English Instructor',
    org: 'English Connect · The Church of Jesus Christ',
    period: 'Feb 2021 — Sep 2025',
    description:
      'Helped 100+ students of all ages reach English proficiency — with several admitted to English-speaking universities and others securing jobs that required English.',
  },
  {
    title: 'Full-time Volunteer Missionary',
    org: 'The Church of Jesus Christ · Caracas, Venezuela',
    period: 'Jun 2016 — Aug 2018',
    description:
      'Led and trained teams of up to 80 volunteers — sharpening leadership, mentorship, and communication through daily goal-setting, planning, and outreach.',
  },
  {
    title: 'Administrative & Financial Secretary',
    org: 'The Church of Jesus Christ',
    period: 'Aug 2018 — Jan 2020',
    description:
      'Managed budgets, donations, and records for a 200+ member unit with 100% audit compliance — plus leadership logistics, reporting, and data administration.',
  },
];
