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
    period: 'Sep 2026 — Present',
    title: 'AV Specialist & Technical Support (Internship)',
    company: 'Cumorah Academy · Načeradec, Czechia · On-site',
    description:
      'Set up, test and maintain the computers, projectors, displays and sound for classes, workshops and campus events, and give on-site support to students, teachers and staff.',
    skills: ['Technical Support', 'AV Systems', 'Troubleshooting'],
  },
  {
    period: 'Mar 2026 — Present',
    title: 'Founding Member',
    company: 'DevAccelerator · London, UK · Remote',
    description:
      'Founding member of a remote community of software developers and tech professionals: technical and career events, collaborative projects, and shared job opportunities across international markets.',
    skills: ['Community', 'Networking', 'Collaboration'],
  },
  {
    period: 'Oct 2025 — Present',
    title: 'Full-Stack Product Engineer & Automation Systems Manager',
    company: 'Collab Collective Studio · Miami, FL · Remote',
    highlight: { before: 'Architected and shipped ', strong: 'Collab Map' },
    description:
      ' — a field-sales operations platform coordinating 5,000+ retail locations, with a real-time dashboard, a mobile-first rep app, GPS-assisted check-ins and route optimization. Reps log visits 4× faster. Also built AI automation workflows (n8n, APIs) and integrated Shopify, Airtable, GoHighLevel and Odoo.',
    skills: ['Next.js', 'TypeScript', 'Supabase', 'n8n', 'AI Agents'],
  },
  {
    period: 'Jan 2023 — Present',
    title: 'Co-Founder & AI Automation Architect',
    company: 'NexDevp · Bogotá, Colombia · Remote',
    description:
      'Co-founded a studio that builds custom software, AI agents and process automation for businesses. Led the architecture of production products — web apps, Flutter apps, PWAs and internal tools — such as CocinerHosp, which cut daily production planning in hospital catering from 30 to 2 minutes.',
    skills: ['Full-Stack', 'AI Agents', 'n8n', 'Flutter', 'Architecture'],
  },
  {
    period: 'Jun 2026 — Jul 2026',
    title: 'AI Product Engineer (Full-Stack)',
    company: 'Hutrit · Madrid, Spain · Remote',
    description:
      'Built full-stack features and internal tools for AI-powered workflows: dashboards that turn technical activity into business value, real-time feedback and task visibility, and tests around authorization and sensitive data.',
    skills: ['AI Products', 'WebSockets', 'Dashboards', 'Claude Code'],
  },
  {
    period: 'Dec 2023 — Jun 2026',
    title: 'Independent Data Analyst & Market Researcher',
    company: 'Freelance · Remote',
    description:
      'Analyzed price behavior, market sentiment and on-chain data in fast-moving digital markets, building research workflows that turned complex data into actionable, risk-aware insights.',
    skills: ['DeFi', 'Blockchain', 'On-chain Analytics', 'Data'],
  },
  {
    period: 'Oct 2022 — Dec 2025',
    title: 'Founder & Freelance Web Developer',
    company: 'App Abundance · Turmero, Venezuela · Remote',
    description:
      'My first professional programming practice — end-to-end responsive websites for small businesses, from discovery and requirements to UI, backend integration, handover and post-launch support.',
    skills: ['JavaScript', 'HTML', 'CSS', 'UI/UX', 'GitHub'],
  },
  {
    period: 'Apr 2024 — Sep 2024',
    title: 'Digital Marketing & Content Manager',
    company: 'Ferre Newlink · Maracay, Venezuela · Hybrid',
    description:
      'Led digital marketing and content operations — campaigns, a small cross-functional team, and performance metrics to grow brand visibility, leads and engagement.',
    skills: ['Marketing Strategy', 'Team Leadership', 'Content'],
  },
  {
    period: 'Jan 2022 — Dec 2027',
    title: 'B.S. in Software Development',
    company: 'Brigham Young University–Idaho',
    description:
      'Software engineering principles, OOP, and full-stack design — frontend, backend, and database management. Complemented by industry certifications from Anthropic and Zero To Mastery.',
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
    period: 'Sep 2026 — Present',
    role: 'AV Specialist & Technical Support (Internship)',
    company: 'Cumorah Academy · Načeradec, Czechia · On-site',
    description:
      'Set up, configure and maintain computers, projectors, displays, microphones and speakers for classes, workshops and campus events. Diagnose hardware, software and connectivity issues and support students, teachers and staff on site.',
    tags: ['Technical Support', 'AV Systems', 'Troubleshooting'],
    highlight: 0,
  },
  {
    period: 'Mar 2026 — Present',
    role: 'Founding Member',
    company: 'DevAccelerator · London, UK · Remote',
    description:
      'Founding member of a remote community of software developers and tech professionals. Take part in technical and career events and collaborative projects, and share job opportunities and resources.',
    tags: ['Community', 'Networking', 'Collaboration'],
    highlight: 0,
  },
  {
    period: 'Oct 2025 — Present',
    role: 'Full-Stack Product Engineer & Automation Systems Manager',
    company: 'Collab Collective Studio · Miami, FL · Remote',
    description:
      'Architected and shipped Collab Map, a field-sales operations platform coordinating 5,000+ retail locations: real-time dashboard, mobile-first rep app, GPS-assisted check-ins, route optimization and role-based access. Reps log visits 4× faster. Built AI automation workflows with n8n and integrated Shopify, Airtable, GoHighLevel and Odoo.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'n8n', 'AI Agents'],
    highlight: 2,
  },
  {
    period: 'Jan 2023 — Present',
    role: 'Co-Founder & AI Automation Architect',
    company: 'NexDevp · Bogotá, Colombia · Remote',
    description:
      'Co-founded a studio for custom software, AI agents and process automation. Lead the architecture of production products — web apps, Flutter apps, PWAs, internal tools and WhatsApp AI agents — and client websites in Spain and Brazil. CocinerHosp cut daily production planning in hospital catering from 30 to 2 minutes and helped reduce food waste by 30%.',
    tags: ['Full-Stack', 'AI Agents', 'n8n', 'Flutter', 'Architecture'],
    highlight: 2,
  },
  {
    period: 'Jun 2026 — Jul 2026',
    role: 'AI Product Engineer (Full-Stack)',
    company: 'Hutrit · Madrid, Spain · Remote',
    description:
      'Built full-stack features and internal tools for AI-powered workflows across frontend, backend, APIs and real-time systems. Designed dashboards and UX for AI-assisted work, and added tests around authorization, sensitive data handling and UI behavior.',
    tags: ['AI Products', 'WebSockets', 'Dashboards', 'Claude Code'],
    highlight: 2,
  },
  {
    period: 'Dec 2023 — Jun 2026',
    role: 'Independent Data Analyst & Market Researcher',
    company: 'Freelance · Remote',
    description:
      'Conducted independent data analysis and market research in fast-moving digital markets. Analyzed price behavior, market sentiment and on-chain data, and built research workflows that turned complex information into actionable insights.',
    tags: ['DeFi', 'Blockchain', 'On-chain Analytics', 'Data Analysis'],
    highlight: 2,
  },
  {
    period: 'Oct 2022 — Dec 2025',
    role: 'Founder & Freelance Web Developer',
    company: 'App Abundance · Turmero, Venezuela · Remote',
    description:
      'Founded a freelance web development practice for small businesses. Delivered end-to-end projects, from discovery and requirements to UI implementation, backend integration, handover and post-launch support.',
    tags: ['JavaScript', 'HTML / CSS', 'UI/UX Design', 'Backend Integration', 'GitHub'],
    highlight: 2,
  },
  {
    period: 'Apr 2024 — Sep 2024',
    role: 'Digital Marketing & Content Manager',
    company: 'Ferre Newlink · Maracay, Venezuela · Hybrid',
    description:
      'Led digital marketing and content operations, coordinating a small cross-functional team and monitoring campaign metrics to grow brand visibility, lead generation and engagement.',
    tags: ['Marketing Strategy', 'Team Leadership', 'Content Strategy'],
    highlight: 0,
  },
  {
    period: 'Apr 2019 — Oct 2022',
    role: 'Independent Hardware & Software Repair Technician',
    company: 'Freelance · Turmero, Venezuela · On-site',
    description:
      'Repaired and maintained smartphones, computers, tablets and laptops: diagnostics, troubleshooting, system optimization and basic data recovery, with direct client communication and follow-up.',
    tags: ['Hardware Diagnostics', 'System Restoration', 'Troubleshooting'],
    highlight: 0,
  },
  {
    period: 'Jan 2022 — Dec 2027',
    role: 'B.S. in Software Development',
    company: 'Brigham Young University–Idaho · Remote',
    description:
      'Studied software engineering principles, algorithms, OOP, database design, and full-stack development. Complemented by industry certifications from Anthropic and Zero To Mastery.',
    tags: ['OOP', 'Algorithms', 'Databases', 'Software Engineering'],
    highlight: 2,
  },
];
