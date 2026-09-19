# Chandraj N — Portfolio

Personal portfolio built with React 18, Vite 5 and Tailwind CSS, with a
react-three-fiber hero and scroll-driven motion throughout.

**Live:** https://developedbycj.netlify.app

---

## Quick start

```bash
npm install
cp .env.example .env   # fill in your EmailJS keys
npm run dev
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Regenerates the sitemap, then builds to `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | ESLint, zero-warnings enforced |
| `npm run optimize:images` | Rebuilds responsive WebP from `src/assets/raw/` |
| `npm run generate:og` | Regenerates `public/og-image.png` |
| `npm run generate:sitemap` | Regenerates `public/sitemap.xml` (runs on `prebuild`) |

## Project layout

```
public/            Static files served as-is (CV, favicon, OG image, robots, sitemap)
scripts/           Build-time generators (images, OG card, sitemap)
src/
  assets/raw/      Full-size source screenshots (never shipped)
  assets/optimized/ Generated WebP derivatives at 640w and 1280w
  components/      Reusable UI
  components/three/ react-three-fiber hero scene (lazy-loaded)
  context/         Theme provider
  data/            All site content lives here - edit these, not components
  hooks/           Custom hooks
  lib/             Helpers (responsive image resolution)
  pages/           Routed pages
  sections/        Home-page sections
```

## Editing content

All copy lives in `src/data/` — you should rarely need to touch a component:

| File | Holds |
| --- | --- |
| `profile.js` | Name, role, tagline, socials, CV path, site URL |
| `experience.js` | Roles and bullet points |
| `projects.js` | Projects, tech, demo/repo links, write-ups |
| `skills.js` | Grouped tech stack |
| `education.js` / `certifications.js` | Timeline and certificates |
| `stats.js` | Headline metrics on the home page |
| `posts.js` | Blog posts — section stays hidden while empty |
| `testimonials.js` | Recommendations — section stays hidden while empty |

### Adding a project

Add an entry to `src/data/projects.js`. To include a screenshot, drop the
full-size image in `src/assets/raw/<slug>.png` and run:

```bash
npm run optimize:images
```

Then set `image: '<slug>'`. A project with `image: null` renders a lettermark
instead. A route at `/projects/<slug>` and a sitemap entry are created
automatically.

## Images

Source screenshots are ~1900px PNGs; the build emits 640w and 1280w WebP and
serves them via `srcset`. This cut the shipped image payload from **9.3 MB to
487 KB (-94.8%)**.

Sources stay in `src/assets/raw/` for regeneration and are never bundled.

## Environment variables

Copy `.env.example` to `.env`:

- `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`
  — contact form. These are public-by-design browser keys, so **restrict the
  allowed domains in the EmailJS dashboard** or the form can be used to spam you.
- `VITE_PLAUSIBLE_DOMAIN` — optional analytics. Leave blank and no third-party
  script is loaded at all.

## Performance

Chunks are split so the heavy 3D scene never blocks first paint:

| Chunk | Gzipped | Loads |
| --- | --- | --- |
| `react` | ~53 KB | initial |
| `motion` | ~38 KB | initial |
| `index` | ~36 KB | initial |
| `three` | ~223 KB | lazily, after the hero mounts |

The WebGL canvas caps DPR at 1.75 and pauses its render loop when scrolled out
of view or when the tab is hidden. If WebGL is unavailable, a static gradient
renders instead.

## Accessibility

- Skip link, landmark elements, and a single visible focus ring throughout
- Every icon-only control has an accessible name
- `prefers-reduced-motion` disables smooth scrolling, the 3D float, tilt,
  magnetic buttons, the custom cursor, and all scroll animations
- Body and muted text clear WCAG AA (7:1) in both themes
- Contact form has real labels, inline errors, and `aria-live` status

## Deployment

Netlify, configured in `netlify.toml` (SPA fallback via `public/_redirects`,
security headers, immutable caching for fingerprinted assets).
