import type { StaticImageData } from 'next/image';
import amarhteHome from '@/assets/projects/amarhte-home.jpg';
import amarhteMobile from '@/assets/projects/amarhte-mobile.jpg';
import amarhtePaths from '@/assets/projects/amarhte-paths.jpg';
import cilFeedback from '@/assets/projects/cil-feedback.jpg';
import cilMobile from '@/assets/projects/cil-mobile.jpg';
import cilMock from '@/assets/projects/cil-mock.jpg';
import cilPractice from '@/assets/projects/cil-practice.jpg';
import cilWriting from '@/assets/projects/cil-writing.jpg';
import trayectoAscend from '@/assets/projects/trayecto-ascend.jpg';
import trayectoHome from '@/assets/projects/trayecto-home.jpg';
import trayectoMobile from '@/assets/projects/trayecto-mobile.jpg';
import trayectoQuiz from '@/assets/projects/trayecto-quiz.jpg';
import trayectoVision from '@/assets/projects/trayecto-vision.jpg';

export type LogKind = 'launch' | 'decision' | 'design' | 'build' | 'content';

export type LogEntry = {
  date: string;
  kind: LogKind;
  title: string;
  text: string;
  // Anchor for the week navigation; set on the first entry of each week.
  weekId?: string;
  // Where the entry comes from, shown in small print.
  source?: string;
  image?: { src: StaticImageData; alt: string; caption: string };
};

// A client project told as a dated logbook, built from its git history.
export type CaseStudy = {
  slug: string;
  name: string;
  eyebrow: string;
  tagline: string;
  intro: string;
  url: string;
  // Extra links shown next to the main URL (downloads, source code…).
  links?: { href: string; label: string }[];
  cover: { src: StaticImageData; alt: string };
  mobile?: { src: StaticImageData; alt: string };
  facts: { label: string; value: string }[];
  stats: { value: string; label: string }[];
  weeks: { id: string; label: string }[];
  entries: LogEntry[];
};

export const cases: CaseStudy[] = [
  {
    slug: 'cil',
    name: 'Cíl',
    eyebrow: 'Own product · 2026',
    tagline: 'Diligence gets you to the goal.',
    intro:
      'A study app for the Cambridge B1 Preliminary, B2 First and C1 Advanced exams. Every exercise explains why the answer is the answer, it works offline without an account, and an optional AI review comments on your writing. Cíl is Czech for goal; it was split off from Píle, Czech for diligence.',
    url: 'https://cambridge-helper-cumorah.vercel.app',
    links: [
      { href: 'https://github.com/wfmendez/cambridge-helper-cumorah/releases/latest', label: 'Android & Windows downloads' },
      { href: 'https://github.com/wfmendez/cambridge-helper-cumorah', label: 'Source on GitHub' },
    ],
    cover: {
      src: cilPractice,
      alt: 'Cíl practice screen: goal chips for B1, B2 and C1, a goal card and topic cards such as Present perfect and Passive voice',
    },
    mobile: { src: cilMobile, alt: 'Cíl practice screen on a phone, with the bottom navigation bar' },
    facts: [
      { label: 'Dates', value: 'Sep 29 – 30, 2026' },
      { label: 'Platforms', value: 'Android · Windows · Web' },
      { label: 'Stack', value: 'Flutter · Vercel Functions · Groq / Anthropic' },
    ],
    stats: [
      { value: '240', label: 'exam questions' },
      { value: '22', label: 'writing tasks' },
      { value: '33', label: 'commits' },
    ],
    weeks: [
      { id: 'launch-day', label: 'Sep 29 · Launch day' },
      { id: 'early-hours', label: 'Sep 30 · Early hours' },
      { id: 'afternoon', label: 'Sep 30 · Afternoon' },
    ],
    entries: [
      {
        date: 'Sep 29',
        weekId: 'launch-day',
        kind: 'launch',
        title: 'Cíl ships, split off from Píle',
        text: 'Exam practice pulled out of Píle into its own app. Deliberately not called anything with "Cambridge" in the name: it is an unofficial study aid and should not suggest otherwise.',
      },
      {
        date: 'Sep 29',
        kind: 'decision',
        title: 'The site follows main, downloads follow tags',
        text: 'Every push updates the web app, while Android and Windows builds are only published from version tags. Vercel builds the Flutter web app itself with a pinned SDK, so no extra tokens are needed.',
      },
      {
        date: 'Sep 29',
        kind: 'design',
        title: 'Made for laptops too',
        text: 'A navigation rail on desktop, constrained page widths, and writing, speaking and answer sheets reworked for wide screens.',
      },
      {
        date: 'Sep 29',
        kind: 'build',
        title: 'AI reviews for writing',
        text: 'An optional review of a written answer through a serverless function: Groq first, Anthropic as a fallback, structured output and strict input limits. Drafts are not stored or logged, and the feedback keeps facts and valid spelling variants intact.',
        image: {
          src: cilWriting,
          alt: 'The Cíl writing editor: the B2 essay task and checklist on the left, a word counter and answer box on the right',
          caption: 'The writing editor, with word count, timer and review button',
        },
      },
      {
        date: 'Sep 30',
        weekId: 'early-hours',
        kind: 'design',
        title: 'A goal of your own',
        text: 'An optional nickname, reason, target date and daily target. Encouragement after answers, study reminders, and illustrations that animate once and respect reduced motion.',
        image: {
          src: cilFeedback,
          alt: 'A solved exercise: the correct answer highlighted, a "Well done" card with a medal and the explanation of the rule',
          caption: 'Every answer comes with the reason it is right',
        },
      },
      {
        date: 'Sep 30',
        kind: 'build',
        title: 'Signed Android downloads',
        text: 'Android releases publish on their own, without waiting for Windows, and the workflow refuses any APK that is not properly signed.',
      },
      {
        date: 'Sep 30',
        kind: 'design',
        title: 'Feedback for every answer in the mock tests',
        text: 'After marking, each answer says whether it is correct, incorrect, partial or blank, and why. The explanations work offline.',
      },
      {
        date: 'Sep 30',
        kind: 'content',
        title: 'Original papers and a free listening library',
        text: 'Practice papers written for Cíl with a comment for every answer, commented model essays, and British Council listening lessons linked rather than copied.',
        image: {
          src: cilMock,
          alt: 'The Mock tests screen listing papers written for Cíl, each with its time, questions and marks',
          caption: 'Mock tests written for Cíl, with the text included',
        },
      },
      {
        date: 'Sep 30',
        weekId: 'afternoon',
        kind: 'decision',
        title: 'Reviews that read what the learner wrote',
        text: 'The AI review first checks whether the answer does what the task asked, then builds its suggestions on the learner’s own sentences instead of rewriting them.',
      },
      {
        date: 'Sep 30',
        kind: 'content',
        title: 'Three times the B1 practice',
        text: 'B1 items went from 21 to 63 across three new topics, plus an original B1 Reading paper.',
      },
    ],
  },
  {
    slug: 'amarhte',
    name: 'Amarhte',
    eyebrow: 'Client case · 2026',
    tagline: 'Start with amarhte.',
    intro:
      'A website for an integral-wellbeing studio in Madrid offering emotional support, therapeutic Reiki, Ayurvedic massage and coaching. Most visitors arrive not knowing where to start, so the site is built to guide them instead of selling to them.',
    url: 'https://amarhte.com',
    cover: {
      src: amarhteHome,
      alt: 'Amarhte home page: the headline "Empieza por amarhte" next to a photo of the waiting room',
    },
    mobile: { src: amarhteMobile, alt: 'Amarhte home page on a phone' },
    facts: [
      { label: 'Dates', value: 'Jul 14 – Aug 4, 2026' },
      { label: 'Location', value: 'Madrid · in person and online' },
      { label: 'Stack', value: 'Next.js 16 · next-intl · Cal.com' },
    ],
    stats: [
      { value: '22', label: 'days' },
      { value: '98', label: 'commits' },
      { value: '3', label: 'languages' },
    ],
    weeks: [
      { id: 'week-1', label: 'Week 1 · Jul 14–20' },
      { id: 'week-2', label: 'Week 2 · Jul 21–27' },
      { id: 'week-3', label: 'Week 3 · Jul 28–Aug 3' },
      { id: 'wrap-up', label: 'Wrap-up · Aug 4' },
    ],
    entries: [
      {
        date: 'Jul 14',
        weekId: 'week-1',
        kind: 'launch',
        title: 'First version goes live: "Amarhte Relax"',
        text: 'A static site to get the studio online from day one. The same day, images and the mobile layout were fixed.',
      },
      {
        date: 'Jul 16',
        kind: 'build',
        title: 'Migrated to Next.js, new support paths',
        text: 'The offer was reorganised into paths, the metadata localised and the headings made easier to navigate with a screen reader.',
      },
      {
        date: 'Jul 20',
        kind: 'build',
        title: 'The Dosha Test',
        text: 'An Ayurvedic quiz that scores answers into Vata, Pitta or Kapha, including mixed and balanced results, and hands the conversation over to WhatsApp.',
      },
      {
        date: 'Jul 21',
        weekId: 'week-2',
        kind: 'decision',
        title: 'Cutting the cart and the shop',
        text: 'The shop repeated what the support paths already offered. It went away, and every button now leads to WhatsApp: the studio closes with a conversation, not a checkout.',
        source: '2 commits · "Remove cart…", "Remove Shop section…"',
      },
      {
        date: 'Jul 21',
        kind: 'design',
        title: 'A colour for each dosha',
        text: 'Vata blue, Pitta terracotta, Kapha green. Quiz progress is saved in the browser, so visitors can pick up where they left off.',
      },
      {
        date: 'Jul 23',
        kind: 'design',
        title: 'Shuffled questions and illustrated mascots',
        text: 'Questions and answer options change order on every attempt. Each result gets its own mascot and a personal invitation to continue on WhatsApp.',
      },
      {
        date: 'Jul 27',
        kind: 'decision',
        title: 'Less text up top, interactive paths',
        text: 'The hero was cut down to one headline and two buttons. The paths became dialogs where visitors pick a treatment and ask about it directly.',
        image: {
          src: amarhtePaths,
          alt: 'The "Cuatro caminos para volver a ti" section with arch-shaped photos',
          caption: 'The support paths after the redesign',
        },
      },
      {
        date: 'Jul 30',
        weekId: 'week-3',
        kind: 'content',
        title: 'Official photos, video and "Amarhte Universe"',
        text: 'Low-resolution photos were replaced with the studio’s official ones. The El Reencuentro video arrived, along with a new page for projects in the making.',
      },
      {
        date: 'Aug 3',
        kind: 'build',
        title: 'Online booking with Cal.com',
        text: 'The calendar was embedded on the booking page and tuned until the widget and the header lined up with no inner scrollbars.',
      },
      {
        date: 'Aug 4',
        weekId: 'wrap-up',
        kind: 'launch',
        title: 'Social links and the map',
        text: 'Instagram, Facebook, TikTok and YouTube in the footer, a social section on the About page and the final Google Maps link.',
      },
    ],
  },
  {
    slug: 'trayecto',
    name: 'Trayecto',
    eyebrow: 'Own product · 2026',
    tagline: 'Your future has no borders.',
    intro:
      'An AI system for people in Latin America who want an international remote career. It started as FPY Academy, a learning platform, and over five months became two products: Vision, for deciding where you are going, and Ascend, for landing the remote job.',
    url: 'https://trayecto.app',
    cover: {
      src: trayectoHome,
      alt: 'Trayecto home page: the headline "Tu futuro no tiene fronteras" next to a dotted globe',
    },
    mobile: { src: trayectoMobile, alt: 'Trayecto home page on a phone' },
    facts: [
      { label: 'Dates', value: 'Apr 17 – Sep 29, 2026' },
      { label: 'Role', value: 'Founder · design and development' },
      { label: 'Stack', value: 'Next.js 15 · Prisma · NextAuth · Groq' },
    ],
    stats: [
      { value: '447', label: 'commits' },
      { value: '49', label: 'test files' },
      { value: '3', label: 'languages' },
    ],
    weeks: [
      { id: 'april', label: 'April · The MVP' },
      { id: 'may', label: 'May · Job Hub' },
      { id: 'june', label: 'June · Vision & Ascend' },
      { id: 'rebrand', label: 'Jun 29 · Trayecto' },
      { id: 'september', label: 'September · Relaunch' },
    ],
    entries: [
      {
        date: 'Apr 17',
        weekId: 'april',
        kind: 'launch',
        title: 'Day one: the FPY Academy MVP',
        text: 'It started as a learning platform. On its first day it already had course search, quizzes, PDF completion certificates, Google sign-in, file uploads and a welcome email.',
      },
      {
        date: 'Apr 18',
        kind: 'build',
        title: 'An AI tutor inside every lesson',
        text: 'Assignments, a lesson editor and an AI tutor that answers in the context of the lesson. The same day: the landing page, SEO, rate limiting and video progress tracking.',
      },
      {
        date: 'May 12',
        weekId: 'may',
        kind: 'build',
        title: 'CV Builder with AI',
        text: 'Six templates and a language selector. Four days later it grew into the Job Hub: match score, cover letters and a drag-and-drop board for applications.',
      },
      {
        date: 'Jun 1',
        weekId: 'june',
        kind: 'decision',
        title: 'Two products instead of one catalog',
        text: 'The platform split into Vision, for personal clarity, and Ascend, the path to a remote job. Two days later the course catalog left the main flow.',
        image: {
          src: trayectoAscend,
          alt: 'Ascend landing page: "El ascenso a tu empleo remoto" with a mountain path illustration',
          caption: 'Ascend, the job-search half of the product',
        },
      },
      {
        date: 'Jun 5',
        kind: 'build',
        title: 'English and Spanish, LinkedIn import',
        text: 'A global EN/ES switch, sign-in with LinkedIn and GitHub, profile import from a LinkedIn PDF, and remote job search across We Work Remotely and Remotive.',
      },
      {
        date: 'Jun 10',
        kind: 'decision',
        title: 'Getting paid from Venezuela',
        text: 'Three pricing tiers and access gated by product. Card payments do not reach everyone in Venezuela, so a manual WhatsApp channel with local payment methods sits next to them.',
      },
      {
        date: 'Jun 13',
        kind: 'design',
        title: 'A personality test with its own model',
        text: 'Forty questions, sixteen profiles, and the remote roles that fit each one. Public and shareable without an account, it became the main way in for new users.',
        image: {
          src: trayectoQuiz,
          alt: 'The Trayecto personality test start card: "¿Cuál es tu perfil de carrera remota?"',
          caption: 'The free test, the front door of the product',
        },
      },
      {
        date: 'Jun 15',
        kind: 'build',
        title: 'Installable app with push notifications',
        text: 'Trayecto became a PWA with a bottom navigation bar on phones, push notifications and an Ikigai canvas.',
      },
      {
        date: 'Jun 16',
        kind: 'decision',
        title: 'Vision becomes free',
        text: 'Vision opened to every user at no cost, so anyone can start with clarity before paying for the job search.',
        image: {
          src: trayectoVision,
          alt: 'Vision landing page: "Primero el árbol. Luego el bosque."',
          caption: 'Vision, free for everyone',
        },
      },
      {
        date: 'Jun 19',
        kind: 'build',
        title: 'A test suite and a change policy',
        text: 'Coverage for sign-in, payment webhooks, the browser extension and core helpers, plus a written policy for how changes are developed and tested.',
      },
      {
        date: 'Jun 29',
        weekId: 'rebrand',
        kind: 'decision',
        title: 'FPY Academy becomes Trayecto',
        text: 'A complete rebrand, down to the data model: fields were renamed in code and mapped to the existing columns, so no data had to move.',
      },
      {
        date: 'Sep 20',
        weekId: 'september',
        kind: 'build',
        title: 'Cheaper, faster AI',
        text: 'Groq goes first and Claude only steps in when the quota runs out. The fixed part of the CV prompt comes first so it gets cached, and job-post analysis is cached by a hash of the listing.',
      },
      {
        date: 'Sep 29',
        kind: 'launch',
        title: 'Audit before the relaunch',
        text: 'A security and quality pass: patched dependencies, rate limits on the AI endpoints, CI on every change and a playbook for the relaunch.',
      },
    ],
  },
];

export const getCase = (slug: string) => cases.find(c => c.slug === slug);
