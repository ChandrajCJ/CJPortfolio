# Chandraj N — Portfolio

Personal portfolio built with React 18, Vite 5 and Tailwind CSS, with a
a 3D deployment-topology globe, scroll-driven motion, six-language support
(including RTL), and an AI assistant grounded in the CV.

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
| `npm run generate:borders` | Regenerates `src/data/borders.json` for the globe |

## Structure

The portfolio is **one scrolling page** at `/home`. Navigation links are in-page
anchors with smooth scrolling and active-section highlighting. Only detail views
get their own route.

| Route | Page |
| --- | --- |
| `/` | Redirects to `/home` |
| `/home` | Hero → stats → about → experience → skills → projects → contact |
| `/resume` | HTML résumé (print-optimised) |
| `/projects/:slug` | Project write-up |
| `/writing/:slug` | Blog post |

Within the scrolling page, two sections are tab groups:

- **Experience** — Experience · Education
- **Skills** — Skills · Certifications

Older section routes (`/experience`, `/skills`, `/education`, `/certifications`,
`/projects`, `/contact`) redirect to their anchor on `/home`, so existing links
keep working.

## Internationalisation

Six locales: English, Tamil, Hindi, Arabic, German, Japanese. Arabic sets
`dir="rtl"` on `<html>`, and the layout uses CSS logical properties
(`ms-`/`me-`, `ps-`/`pe-`, `start-`/`end-`) so it genuinely mirrors rather than
just swapping text.

- Strings live in `src/locales/<code>.js`; `src/data/` holds only structure
  (ids, dates, links, tech names).
- Each locale is a separate chunk (~6 KB gzip) loaded on demand — visitors
  download only their own language.
- Missing keys fall back to English rather than rendering a raw key.
- To add a locale: add an entry to `src/i18n/config.js` and a matching file in
  `src/locales/`.

**Translation review:** English is the source of truth. The Tamil, Hindi,
Arabic, German and Japanese copy is machine-translated and has not been
reviewed by a native speaker — check it before treating it as final.

## Astro (AI assistant)

A floating assistant that answers questions about the CV. The model call runs in
a Netlify Function (`netlify/functions/astro.mjs`) so the API key stays
server-side — it is never shipped to the browser.

- Set `ANTHROPIC_API_KEY` in the Netlify UI. **No `VITE_` prefix** — that would
  inline it into the client bundle and leak it.
- Without the key, `/api/astro` returns 503 and the widget degrades to a
  "contact me directly" message.
- Its knowledge base is `netlify/functions/_knowledge.js`. Update it when the CV
  changes, or Astro will answer from stale facts.
- Grounding: it answers only from that profile, refuses to invent details, and
  client-supplied `system` turns are rejected before reaching the model.
- Uses `claude-opus-5` at `effort: low` with the profile cached as a stable
  prompt prefix. Each answer is capped at 1024 output tokens.

For a full local round-trip (functions included), use `netlify dev` rather than
`npm run preview` — Vite's preview server does not run Netlify Functions, so
`/api/astro` 404s and the widget shows its error state.

## Project layout

```
netlify/functions/ Serverless functions (Astro chat endpoint)
public/            Static files served as-is (CV, favicon, OG image, robots, sitemap)
scripts/           Build-time generators (images, OG card, sitemap)
src/
  assets/raw/      Full-size source screenshots (never shipped)
  assets/optimized/ Generated WebP derivatives at 640w and 1280w
  components/      Reusable UI
  components/three/ react-three-fiber topology globe (lazy-loaded)
  i18n/            Locale provider, context and config
  locales/         One file per language
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
| `topology.js` | Origin, regions and environment counts behind the 3D globe |
| `borders.json` | Generated country borders — do not edit by hand |
| `nav.js` | Primary navigation entries |
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
| `three` | ~226 KB | lazily, with the Experience section |
| `Globe3D` | ~31 KB | lazily, with the Experience section (includes border geometry) |
| locale | ~6 KB | lazily, only the visitor's language |

The WebGL canvas caps DPR at 1.75 and pauses its render loop when scrolled out
of view or when the tab is hidden. If WebGL is unavailable, a static gradient
renders instead.

## Adding your photo

Drop an image at `public/portrait.jpg` (portrait orientation, ideally around
720x900 or larger — it is rendered at a 4:5 aspect ratio). It becomes the hero
visual and the About tile automatically. If the file is absent both fall back to
a framed monogram, so the layout is identical either way and nothing breaks.

## Colour

One accent, no gradients. Tokens live on `:root` in `src/index.css`, with a
`.light` override. `--on-accent` exists because the accent's luminance differs
per theme: white on the bright dark-mode orange is 2.84:1 and fails AA, whereas
dark text on it is 6.94:1. Use the `.btn-accent` class for anything with text on
an accent fill so the right pairing is applied automatically.

The globe takes its colours as a prop (`GLOBE_PALETTES` in
`src/components/three/globePalettes.js`) rather than from theme context —
react-three-fiber renders into its own reconciler root, so React context does
not cross the `<Canvas>` boundary.

## Accessibility

- Skip link, landmark elements, and a single visible focus ring throughout
- Every icon-only control has an accessible name
- `prefers-reduced-motion` disables smooth scrolling, the 3D float, tilt,
  magnetic buttons, the custom cursor, and all scroll animations
- Body and muted text clear WCAG AA (7:1) in both themes
- Contact form has real labels, inline errors, and `aria-live` status
- RTL layouts mirror via logical properties, not hard-coded left/right

## Deployment

Netlify, configured in `netlify.toml` (SPA fallback via `public/_redirects`,
security headers, immutable caching for fingerprinted assets).
