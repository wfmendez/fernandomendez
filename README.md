# Fernando Mendez — Portfolio

A developer portfolio built with **Next.js (App Router) + TypeScript**, with Three.js WebGL
scenes, a custom cursor, scroll animations, and a working contact form.

```
├── app/
│   ├── layout.tsx         # Root layout: fonts, shared metadata, preloader + cursor shell
│   ├── globals.css        # Site-wide styles (responsive, reduced-motion, touch handling)
│   ├── page.tsx           # Home: hero, featured projects, contact
│   ├── about/page.tsx     # About: bio, skills, experience, education, service
│   ├── archive/           # Full project + work history tables (page.tsx, archive.css)
│   ├── not-found.tsx      # Branded 404
│   ├── robots.ts          # /robots.txt
│   └── sitemap.ts         # /sitemap.xml
├── components/            # Navbar, Footer, ContactForm, WebGL canvases, SiteShell, icons…
├── data/                  # Page content: projects, experience, skills, site constants
├── lib/                   # Animation helpers, page effects, Three.js setup
├── public/assets/         # Favicon + social share image
└── next.config.ts         # Security/cache headers and redirects from the old *.html URLs
```

Most content edits happen in `data/` — add a project to `data/projects.ts` or a role to
`data/experience.ts` and the pages pick it up.

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

- **Vercel:** import the repo at [vercel.com/new](https://vercel.com/new) — the Next.js preset
  is detected automatically.
- **Netlify:** connect the repo; `netlify.toml` sets the build command and Netlify applies
  its Next.js runtime.

Security and cache headers live in `next.config.ts`, so they apply on any host.

---

## 🛠️ Tech

Next.js · React · TypeScript · [Three.js](https://threejs.org) (loaded on demand) ·
Google Fonts (Inter, Syne) · [Web3Forms](https://web3forms.com) for the contact form.

## ♿ Accessibility & performance notes

- Respects `prefers-reduced-motion` — disables WebGL scenes, the custom cursor, and animations.
- Custom cursor and magnetic/tilt effects are disabled on touch devices.
- WebGL scenes pause when off-screen or when the browser tab is hidden, and free their GPU
  resources when you navigate away.
- Decorative SVGs are hidden from screen readers; keyboard focus is visible throughout.
