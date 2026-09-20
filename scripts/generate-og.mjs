/**
 * Renders public/og-image.png (1200x630), the card shown when the site is
 * shared on LinkedIn, X, Slack, or WhatsApp.
 *
 * Run locally and commit the output - build hosts do not have the same fonts.
 * Run: npm run generate:og
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, '..', 'public', 'og-image.png')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const NAME = 'Chandraj N'
const ROLE = 'Software Engineer'
const LINE = 'Auth infrastructure · Micro-frontend performance · AI tooling'
const URL = 'developedbycj.netlify.app'

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FF6B35"/>
      <stop offset="100%" stop-color="#FF6B35"/>
    </linearGradient>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#FF6B35" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#FF6B35" stop-opacity="0.04"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="#0A0B0D"/>
  <ellipse cx="960" cy="120" rx="460" ry="260" fill="url(#glow)"/>
  <rect x="0" y="0" width="1200" height="8" fill="url(#g)"/>

  <text x="80" y="250" font-family="Helvetica, Arial, sans-serif" font-size="82" font-weight="700" fill="#E8EAED">${esc(NAME)}</text>
  <text x="80" y="330" font-family="Helvetica, Arial, sans-serif" font-size="46" font-weight="600" fill="url(#g)">${esc(ROLE)}</text>
  <text x="80" y="404" font-family="Helvetica, Arial, sans-serif" font-size="27" font-weight="400" fill="#9BA1AC">${esc(LINE)}</text>

  <rect x="80" y="470" width="310" height="58" rx="29" fill="none" stroke="#23272F" stroke-width="2"/>
  <text x="112" y="507" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="500" fill="#9BA1AC">${esc(URL)}</text>
</svg>`

await sharp(Buffer.from(svg)).png().toFile(OUT)
console.log(`  wrote ${path.relative(process.cwd(), OUT)}`)
