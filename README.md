# Fernando Mendez — Portfolio

A developer portfolio built with **Next.js (App Router) + TypeScript**. The design is a working
notebook ("Cuaderno"): ruled paper, ink, a red margin line and handwritten notes. Client projects
are shown as large chapters, each with a dated logbook of how it was built.

```
├── app/
│   ├── layout.tsx         # Root layout: fonts, shared metadata, page effects
│   ├── globals.css        # Site-wide styles (responsive, reduced-motion, touch handling)
│   ├── page.tsx           # Home: hero, featured projects, contact
│   ├── about/page.tsx     # About: bio, skills, experience, education, service
│   ├── archive/           # Full project + work history tables (page.tsx, archive.css)
│   ├── work/[slug]/       # Project logbooks (case studies) generated from data/cases.ts
│   ├── not-found.tsx      # Branded 404
│   ├── robots.ts          # /robots.txt
│   └── sitemap.ts         # /sitemap.xml
├── components/            # Navbar, Footer, ProjectChapter, HandNote, ContactForm, icons…
├── data/                  # Page content: projects, case logbooks, experience, skills, site constants
├── assets/projects/       # Project screenshots (imported by data/cases.ts)
├── lib/                   # Scroll effects
├── public/assets/         # Favicon + social share image
└── next.config.ts         # Security/cache headers and redirects from the old *.html URLs
```

Most content edits happen in `data/`: add a project to `data/projects.ts` or a role to
`data/experience.ts` and the pages pick it up.

### Adding a project logbook

1. Add screenshots to `assets/projects/`.
2. Add an entry to `data/cases.ts`: facts, stats, the week index and the dated log entries.
   A good first draft comes from the project's history:
   `git log --reverse --date=short --format='%ad %s'`. Keep the entries that tell a decision or a
   visible change, and rewrite them in plain language.
3. Set `caseSlug` on the project in `data/projects.ts`. The home page chapter then uses the
   screenshot and links to `/work/<slug>`.

---

## 🖥️ Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`.

---

## ✉️ Contact form

Get a free access key at [web3forms.com](https://web3forms.com) and set it as an environment
variable (locally in `.env.local`, and in your host's project settings):

```bash
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-key
```

Until it is set, the form falls back to opening the visitor's email app (`mailto:`), so it
never looks broken. Unsent drafts are kept in `localStorage`.

## 🖼️ Social image

`public/assets/og-image.png` (1200×630) is generated from `og-image.svg`. If you edit the SVG,
re-export it:
`npx sharp-cli -i public/assets/og-image.svg -o public/assets/og-image.png resize 1200 630`.
Verify the share preview with [opengraph.xyz](https://www.opengraph.xyz) after deploying.

---

## 🚀 Deploy

- **Vercel:** import the repo at [vercel.com/new](https://vercel.com/new). `vercel.json` pins the
  Next.js framework preset, so older project settings from the static-site days don't apply.
- **Netlify:** connect the repo; `netlify.toml` sets the build command and Netlify applies
  its Next.js runtime.

Security and cache headers live in `next.config.ts`, so they apply on any host.

---

## 🛠️ Tech

Next.js · React · TypeScript · Google Fonts (Bricolage Grotesque, Instrument Sans, JetBrains Mono,
Caveat) · [Web3Forms](https://web3forms.com) for the contact form.

## ♿ Accessibility & performance notes

- Respects `prefers-reduced-motion`: reveals, counters and smooth scrolling are turned off.
- Screenshots use `next/image` with blur placeholders and responsive sizes.
- Decorative SVGs are hidden from screen readers; keyboard focus is visible throughout.
