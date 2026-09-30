// Career timeline on the About page. `highlight` is an optional lead-in whose
// `strong` part renders bold, placed before `description`.
export type TimelineEntry = {
  period: string;
  title: string;
  company: string;
  description: string;
  highlight?: { before: string; strong: string };
  skills: string[];
};

export const timeline: TimelineEntry[] = [
  {
    period: 'Mar 2026 — Present',
    title: 'Founding Member',
    company: 'DevAccelerator · London, UK · Remote',
    description:
      'Founding member of a remote talent accelerator for software developers — helping build the program and community that levels up the next generation of engineers.',
    skills: ['Community', 'Mentorship', 'Startup'],
  },
  {
    period: 'Oct 2025 — Present',
    title: 'Full Stack Developer & Digital Marketing Systems Manager',
    company: 'Collab Collective Studio · Miami, FL · Remote',
    highlight: { before: 'Architected ', strong: 'Collab Map' },
    description:
      ' — a full-stack field-sales platform (Next.js 14, TypeScript, Supabase + PostGIS, Google Maps) unifying 3,000+ retail stores into one real-time dashboard with mobile GPS check-ins and route optimization. Also built AI-powered marketing automations (n8n, custom AI agents, APIs) and custom Wix/Shopify storefronts.',
    skills: ['Next.js', 'TypeScript', 'Supabase', 'n8n', 'AI Agents'],
  },
  {
    period: 'Jan 2023 — Jan 2026',
    title: 'Lead Automation Architect',
    company: 'NexDevp · Bogotá, Colombia · Remote',
    description:
      'Designed scalable, AI-driven automation ecosystems that turned fragmented operations into modular digital solutions — deploying autonomous AI agents and API integrations across CRMs, databases, and e-commerce platforms to eliminate operational friction.',
    skills: ['n8n', 'AI Agents', 'API Integration', 'iPaaS'],
  },
  {
    period: 'Dec 2023 — Dec 2025',
    title: 'Data Analyst & Crypto Market Researcher',
    company: 'Freelance · Remote',
    description:
      'Built data-driven trading strategies for crypto markets — analyzing price trends, on-chain metrics, and market sentiment to turn complex datasets into actionable, risk-managed insights.',
    skills: ['DeFi', 'Blockchain', 'On-chain Analytics', 'Data'],
  },
  {
    period: 'Oct 2022 — Dec 2025',
    title: 'Web Developer',
    company: 'App Abundance · Turmero, Venezuela · Remote',
    description:
      'My first professional programming role — owning end-to-end development of dynamic, responsive web solutions with a strong focus on UI/UX and back-end integration, while managing client relationships and project handovers.',
    skills: ['JavaScript', 'HTML', 'CSS', 'UI/UX', 'GitHub'],
  },
  {
    period: 'Apr 2024 — Sep 2024',
    title: 'Digital Marketing & Content Manager',
    company: 'Ferre Newlink · Maracay, Venezuela · Hybrid',
    description:
      'Led strategy, execution, and optimization of all digital marketing and sales initiatives — managing a small cross-functional team to grow brand visibility, engagement, and sales.',
    skills: ['Marketing Strategy', 'Team Leadership', 'Content'],
  },
  {
    period: 'Jan 2022 — Dec 2027',
    title: 'B.S. in Software Development',
    company: 'Brigham Young University–Idaho',
    description:
      'Software engineering principles, OOP, and full-stack design — frontend, backend, and database management. Complemented by 7 industry certifications including Web3 Masterclass and Prompt Engineering Bootcamp (Zero To Mastery).',
    skills: ['OOP', 'Algorithms', 'Databases'],
  },
];

// Work & education history table on the Archive page.
export type HistoryEntry = {
  period: string;
  role: string;
  company: string;
  description: string;
  tags: string[];
  // The first `highlight` tags are rendered with the accent style.
  highlight: number;
};

export const history: HistoryEntry[] = [
  {
    period: 'Mar 2026 — Present',
    role: 'Founding Member',
    company: 'DevAccelerator · London, UK · Remote',
    description:
      'Founding member of a remote talent accelerator for software developers — helping build the program and community that levels up the next generation of engineers.',
    tags: ['Community', 'Mentorship', 'Startup'],
    highlight: 2,
  },
  {
    period: 'Oct 2025 — Present',
    role: 'Full Stack Developer & Systems Manager',
    company: 'Collab Collective Studio · Miami, FL · Remote',
    description:
      'Architected Collab Map — a full-stack field-sales platform (Next.js 14, TypeScript, Supabase + PostGIS, Google Maps) coordinating field reps across 3,000+ retail stores with route optimization and Kalman-smoothed GPS check-ins. Shipped AI-powered marketing automation workflows and custom Shopify storefronts.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'n8n', 'AI Agents'],
    highlight: 2,
  },
  {
    period: 'Jan 2023 — Jan 2026',
    role: 'Lead Automation Architect',
    company: 'NexDevp · Bogotá, Colombia · Remote',
    description:
      'Designed and deployed modular AI-driven automation ecosystems. Integrated CRMs, databases, and e-commerce platforms to eliminate operational friction and orchestrate autonomous AI agents.',
    tags: ['n8n', 'AI Agents', 'API Integration', 'iPaaS'],
    highlight: 2,
  },
  {
    period: 'Dec 2023 — Dec 2025',
    role: 'Data Analyst & Crypto Researcher',
    company: 'Freelance · Remote',
    description:
      'Built data-driven trading strategies for cryptocurrency markets. Analyzed price trends, on-chain metrics, and market sentiment to turn complex datasets into actionable, risk-managed insights.',
    tags: ['DeFi', 'Blockchain', 'On-chain Analytics', 'Data Analysis'],
    highlight: 2,
  },
  {
    period: 'Oct 2022 — Dec 2025',
    role: 'Web Developer',
    company: 'App Abundance · Turmero, Venezuela · Remote',
    description:
      'First professional web engineering role. Owned end-to-end development of dynamic, responsive web solutions with a strong focus on UI/UX and backend integrations, managed client relationships and project delivery.',
    tags: ['JavaScript', 'HTML / CSS', 'UI/UX Design', 'Backend Integration', 'GitHub'],
    highlight: 2,
  },
  {
    period: 'Apr 2024 — Sep 2024',
    role: 'Digital Marketing & Content Manager',
    company: 'Ferre Newlink · Maracay, Venezuela · Hybrid',
    description:
      'Led strategy, execution, and optimization of all digital marketing and sales initiatives, managing a small cross-functional team to grow brand visibility, engagement, and sales.',
    tags: ['Marketing Strategy', 'Team Leadership', 'Content Strategy'],
    highlight: 0,
  },
  {
    period: 'Apr 2019 — Oct 2022',
    role: 'Electronic Device Repair Technician',
    company: 'Freelance · Turmero, Venezuela · On-site',
    description:
      'Provided diagnostic, hardware repair, and software maintenance services for smartphones, computers, tablets, and laptops. Formed my analytical foundation in hardware diagnostics and system troubleshooting.',
    tags: ['Hardware Diagnostics', 'System Restoration', 'Troubleshooting'],
    highlight: 0,
  },
  {
    period: 'Jan 2022 — Dec 2027',
    role: 'B.S. in Software Development',
    company: 'Brigham Young University–Idaho · Remote',
    description:
      'Studied software engineering principles, algorithms, OOP, database design, and full-stack development. Complemented by 7 industry certifications including Web3 Masterclass and Prompt Engineering Bootcamp.',
    tags: ['OOP', 'Algorithms', 'Databases', 'Software Engineering'],
    highlight: 2,
  },
];
