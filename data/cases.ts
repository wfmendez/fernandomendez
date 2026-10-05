import type { StaticImageData } from 'next/image';
import amarhteHome from '@/assets/projects/amarhte-home.jpg';
import amarhteMobile from '@/assets/projects/amarhte-mobile.jpg';
import amarhtePaths from '@/assets/projects/amarhte-paths.jpg';
import cilFeedback from '@/assets/projects/cil-feedback.jpg';
import cilMobile from '@/assets/projects/cil-mobile.jpg';
import cilMock from '@/assets/projects/cil-mock.jpg';
import cilPractice from '@/assets/projects/cil-practice.jpg';
import cilWriting from '@/assets/projects/cil-writing.jpg';
import estacaAssistant from '@/assets/projects/estaca-assistant.jpg';
import estacaHero from '@/assets/projects/estaca-hero.jpg';
import estacaHome from '@/assets/projects/estaca-home.jpg';
import estacaMobile from '@/assets/projects/estaca-mobile.jpg';
import kenhionHome from '@/assets/projects/kenhion-home.jpg';
import kenhionMobile from '@/assets/projects/kenhion-mobile.jpg';
import kenhionProduct from '@/assets/projects/kenhion-product.jpg';
import kenhionShop from '@/assets/projects/kenhion-shop.jpg';
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
    tagline: 'Pick your goal.',
    intro:
      'A study app for the Cambridge B1 Preliminary, B2 First and C1 Advanced exams. Every exercise explains why the answer is the answer, it works offline without an account, and an optional AI review comments on your writing. Cíl is Czech for goal.',
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
        title: 'Cíl ships',
        text: 'Exam practice for B1, B2 and C1 in its own app. Deliberately not called anything with "Cambridge" in the name: it is an unofficial study aid and should not suggest otherwise.',
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
    slug: 'kenhion-allen',
    name: 'Kenhion Allen',
    eyebrow: 'Client case · 2026',
    tagline: 'Más allá del límite.',
    intro:
      'An online shop for a sportswear brand from Maracay, Venezuela. Customers browse the KA ELITE collection, pick colour and size, get a wholesale discount from six pieces, and send the order over WhatsApp with a PDF receipt. Payment is arranged in the chat.',
    url: 'https://kenhion-allen.vercel.app',
    links: [{ href: 'https://github.com/wfmendez/kenhion-allen', label: 'Source on GitHub' }],
    cover: {
      src: kenhionHome,
      alt: 'Kenhion Allen home page: the slogan "Más allá del límite" in gold script next to an athlete training on rings',
    },
    mobile: { src: kenhionMobile, alt: 'Kenhion Allen home page on a phone' },
    facts: [
      { label: 'Dates', value: 'Aug 12 – Oct 2, 2026' },
      { label: 'Client', value: 'Sportswear brand · Maracay' },
      { label: 'Stack', value: 'Next.js 16 · Zod · react-pdf · Playwright' },
    ],
    stats: [
      { value: '21', label: 'pull requests' },
      { value: '19', label: 'test files' },
      { value: '6', label: 'build phases' },
    ],
    weeks: [
      { id: 'demo', label: 'Aug 12 · Redesign demo' },
      { id: 'phases', label: 'Sep 25 · Phases 0–3' },
      { id: 'checkout', label: 'Sep 29 · Checkout & CI' },
      { id: 'collection', label: 'Oct 1–2 · KA ELITE & launch' },
    ],
    entries: [
      {
        date: 'Aug 12',
        weekId: 'demo',
        kind: 'launch',
        title: 'A redesign demo for the brand',
        text: 'A light boutique redesign of the shop, migrated the same day to Next.js with a fully responsive layout.',
      },
      {
        date: 'Sep 25',
        weekId: 'phases',
        kind: 'decision',
        title: 'Rebuilt in phases, one pull request each',
        text: 'Phase 0 set up the tooling: strict TypeScript, ESLint, Prettier, Vitest and Playwright. Every phase after it shipped as its own reviewed pull request.',
      },
      {
        date: 'Sep 25',
        kind: 'build',
        title: 'Business rules first, with tests',
        text: 'Catalog, cart, customer and order were modelled with Zod and covered by tests before any page existed, including the 15% wholesale discount from six pieces.',
      },
      {
        date: 'Sep 25',
        kind: 'design',
        title: 'A design system for the new brand',
        text: 'Brand tokens on Tailwind CSS v4, then a multi-page site: a shop with filters kept in the URL, services, gallery, about and FAQ.',
        image: {
          src: kenhionShop,
          alt: 'Kenhion Allen shop page with search, gender filters, sorting and the KA ELITE products',
          caption: 'The shop, with filters kept in the URL',
        },
      },
      {
        date: 'Sep 29',
        weekId: 'checkout',
        kind: 'build',
        title: 'Checkout with a PDF receipt',
        text: 'A checkout form validated with react-hook-form and Zod, a non-fiscal PDF receipt generated in the browser, and the order sent through WhatsApp.',
      },
      {
        date: 'Sep 29',
        kind: 'build',
        title: 'Quality on every change',
        text: 'Continuous integration with unit tests, Playwright end-to-end tests with axe accessibility checks, and Lighthouse CI.',
      },
      {
        date: 'Oct 1',
        weekId: 'collection',
        kind: 'content',
        title: 'The KA ELITE collection',
        text: 'A single catalog with new photos and a colour selector per product, and the brand emblem redrawn from the official logo.',
        image: {
          src: kenhionProduct,
          alt: 'Product page for the men’s short: price, colour swatches, size selector and quantity',
          caption: 'Colour and size on every product',
        },
      },
      {
        date: 'Oct 1',
        kind: 'build',
        title: 'Sharper, lighter photos',
        text: 'Product photos moved to AVIF at quality 90 and are served at the right width. The gold gradient slogan no longer clips.',
      },
      {
        date: 'Oct 1',
        kind: 'decision',
        title: 'A set counts as two pieces',
        text: 'The biker and top set now counts as two pieces toward the wholesale discount, as the brand sells it.',
      },
      {
        date: 'Oct 2',
        kind: 'launch',
        title: 'Client changes before launch',
        text: 'Shipping, payments and the home and About copy updated with the client’s feedback.',
      },
    ],
  },
  {
    slug: 'estaca-caracas',
    name: 'Estaca Caracas',
    eyebrow: 'Volunteer project · 2026',
    tagline: 'Fe · Familia · Servicio.',
    intro:
      'A website for a stake of The Church of Jesus Christ of Latter-day Saints in Caracas. It began as the page for a stake conference and became a permanent portal for anyone who wants to learn about the Church, with an AI assistant that answers questions in a warm, personal voice.',
    url: 'https://www.estacacaracas.com',
    cover: {
      src: estacaHome,
      alt: 'Estaca Caracas home: "Un lugar para acercarte a Jesucristo" in large serif type on a cream background',
    },
    mobile: { src: estacaMobile, alt: 'Estaca Caracas home page on a phone' },
    facts: [
      { label: 'Dates', value: 'Apr 23 – Jul 20, 2026' },
      { label: 'Role', value: 'Volunteer · design and development' },
      { label: 'Stack', value: 'HTML · CSS · JS · Vercel Functions · Groq' },
    ],
    stats: [
      { value: '119', label: 'commits' },
      { value: '1', label: 'day to first launch' },
      { value: '3', label: 'months of updates' },
    ],
    weeks: [
      { id: 'conference', label: 'Apr 23–25 · Conference site' },
      { id: 'assistant', label: 'Apr 28 · AI assistant' },
      { id: 'may', label: 'May · Leads and speed' },
      { id: 'portal', label: 'Jul 20 · Portal' },
    ],
    entries: [
      {
        date: 'Apr 23',
        weekId: 'conference',
        kind: 'launch',
        title: 'A site for the stake conference, in a day',
        text: 'Schedule, invitation, contact form and complete SEO and social metadata, live the same day.',
      },
      {
        date: 'Apr 24',
        kind: 'design',
        title: 'A full UX pass',
        text: 'The hero became two columns with the scripture beside the image, and content, mobile, desktop and performance were reviewed end to end.',
        image: {
          src: estacaHero,
          alt: 'Estaca Caracas hero: a scripture from Matthew 11:28 over a painting of Jesus embracing a woman and a child',
          caption: 'The hero, with the scripture beside the image',
        },
      },
      {
        date: 'Apr 25',
        kind: 'build',
        title: 'Its own domain and faster pages',
        text: 'Moved to estacacaracas.com, preloaded the main image, compressed photos, fixed contrast and layout shift, and added structured data for the organisation.',
      },
      {
        date: 'Apr 25',
        kind: 'design',
        title: 'A contact form that adapts',
        text: 'Email comes first by default. The phone number only becomes required when someone chooses WhatsApp or a call, with a friendly fallback if sending fails.',
      },
      {
        date: 'Apr 28',
        weekId: 'assistant',
        kind: 'build',
        title: 'An AI missionary assistant',
        text: 'A chatbot on Groq (Llama 3.1 8B) grounded in official Church content, written in a warm, member-like voice. It offers a free Book of Mormon and says it is an AI when asked.',
        image: {
          src: estacaAssistant,
          alt: 'The open assistant panel: suggested questions and an offer to request a free Book of Mormon',
          caption: 'The assistant, with suggested questions',
        },
      },
      {
        date: 'Apr 28',
        kind: 'build',
        title: 'Local SEO for Caracas',
        text: 'Structured data for a religious organisation and its place, geographic metadata and local FAQs.',
      },
      {
        date: 'May 16',
        weekId: 'may',
        kind: 'build',
        title: 'WhatsApp, one tap away',
        text: 'A floating WhatsApp button, with every tap counted as a lead.',
      },
      {
        date: 'May 21',
        kind: 'build',
        title: 'Speed and security',
        text: 'A Content-Security-Policy, PWA icons, no layout shift on the hero, and interactive scripts deferred until the page is idle.',
      },
      {
        date: 'Jul 20',
        weekId: 'portal',
        kind: 'decision',
        title: 'From event page to information portal',
        text: 'After the conference, the site became a permanent portal about the stake and the Church instead of being taken down.',
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
