/**
 * Emits public/sitemap.xml from the project + post data so new routes are
 * always listed. Runs automatically before every build.
 */
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { projects } from '../src/data/projects.js'
import { posts } from '../src/data/posts.js'
import { profile } from '../src/data/profile.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, '..', 'public', 'sitemap.xml')
const today = new Date().toISOString().slice(0, 10)

const STATIC_ROUTES = [
  '/home',
  '/experience',
  '/experience/education',
  '/skills',
  '/skills/certifications',
  '/projects',
  '/resume',
  '/contact',
]

const routes = [
  { loc: '/', priority: '1.0', changefreq: 'monthly' },
  ...STATIC_ROUTES.map((loc) => ({ loc, priority: '0.9', changefreq: 'monthly' })),
  ...projects.map((p) => ({ loc: `/projects/${p.slug}`, priority: '0.8', changefreq: 'yearly' })),
  ...posts.map((p) => ({ loc: `/writing/${p.slug}`, priority: '0.7', changefreq: 'yearly' })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${profile.siteUrl}${r.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

await writeFile(OUT, xml, 'utf8')
console.log(`  wrote sitemap.xml (${routes.length} routes)`)
