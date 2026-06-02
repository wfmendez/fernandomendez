# Fernando Mendez — Portfolio

A premium, single-page developer portfolio. Pure **HTML + CSS + vanilla JS**, with
Three.js WebGL scenes, a custom cursor, scroll animations, and a working contact form.
No build step required.

```
portfolio/
├── index.html          # All markup + SEO/social meta + JSON-LD
├── css/style.css       # Styles, responsive, reduced-motion + touch handling
├── js/main.js          # Cursor, WebGL scenes, scroll reveal, contact form
├── assets/
│   ├── favicon.svg      # Site icon
│   ├── og-image.svg     # Social share card (source)
│   └── og-image.png     # Social share card (1200×630, already generated)
├── 404.html            # Branded not-found page
├── robots.txt          # Search engine rules + sitemap pointer
├── sitemap.xml         # Single-page sitemap
├── netlify.toml        # Netlify config (headers + caching)
└── vercel.json         # Vercel config (headers + caching)
```

---

## ✅ Before you go live (do these first)

The code ships with searchable placeholder tokens. Open a global find-and-replace in
your editor and swap each token:

| Token to find | Replace with | Files |
|---|---|---|
| `your-domain.com` | Your real domain (e.g. `fernandomendez.dev`) | `index.html`, `robots.txt`, `sitemap.xml` |
| `your-username` | Your GitHub username | `index.html` |
| `your-linkedin` | Your LinkedIn handle | `index.html` |
| `REPLACE-WITH-LIVE-DEMO` | Each project's live URL | `index.html` |
| `REPLACE-WITH-REPO` | Each project's GitHub repo | `index.html` |
| `YOUR_WEB3FORMS_ACCESS_KEY` | Your Web3Forms key (see below) | `index.html` |

Then:

1. **Contact form key** — go to [web3forms.com](https://web3forms.com), enter your email,
   copy the free access key, and paste it into the hidden `access_key` input in `index.html`.
   *Until you do this, the form automatically falls back to opening the visitor's email app
   (`mailto:`), so it never looks broken.*
2. **Social image** — `assets/og-image.png` (1200×630) is already generated from `og-image.svg`.
   If you edit the SVG, re-export it:
   `npx sharp-cli -i assets/og-image.svg -o assets/og-image.png resize 1200 630`.
3. **Verify share preview** with [opengraph.xyz](https://www.opengraph.xyz) after deploying.

---

## 🚀 Deploy

It's a static site, so any host works. Pick one:

### Netlify (easiest, includes form fallback)
- **Drag & drop:** zip the folder (or drag it) onto [app.netlify.com/drop](https://app.netlify.com/drop).
- **From Git:** push to GitHub, "Add new site" → pick the repo. Publish directory: `.` (root).
  No build command. `netlify.toml` is picked up automatically.

### Vercel
- `npm i -g vercel` then run `vercel` in this folder, **or** import the repo at
  [vercel.com/new](https://vercel.com/new). Framework preset: **Other**. `vercel.json` is auto-detected.

### GitHub Pages
- Push to a repo, then **Settings → Pages → Deploy from branch** → `main` / root.
- Your URL will be `https://your-username.github.io/<repo>/`. If hosting in a subfolder,
  update the absolute URLs in the meta tags accordingly (or use a custom domain).

### Cloudflare Pages
- [dash.cloudflare.com](https://dash.cloudflare.com) → Pages → connect repo.
  Build command: *(none)*. Output directory: `/`.

---

## 🖥️ Run locally

From this folder:

```bash
npx serve -l 3333 .
```

Then open <http://localhost:3333>. (A VS Code launch config already exists in `.claude/launch.json`.)

---

## 🛠️ Tech

Vanilla HTML/CSS/JS · [Three.js r128](https://threejs.org) (CDN) · Google Fonts (Inter, Syne) ·
[Web3Forms](https://web3forms.com) for the contact form.

## ♿ Accessibility & performance notes

- Respects `prefers-reduced-motion` — disables WebGL scenes, the custom cursor, and animations.
- Custom cursor and magnetic/tilt effects are disabled on touch devices.
- WebGL scenes pause when off-screen or when the browser tab is hidden (saves battery/GPU).
- Decorative SVGs are hidden from screen readers; keyboard focus is visible throughout.
