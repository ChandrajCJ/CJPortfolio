/**
 * Converts Natural Earth 110m country boundaries into a compact list of
 * lon/lat polylines for the 3D globe.
 *
 * Output is a flat array of arrays: [[lon, lat, lon, lat, ...], ...]. Rounding
 * to 2 decimals (~1km) and dropping near-duplicate points keeps the payload
 * small; it only ever loads inside the lazy three.js chunk.
 *
 * Run: npm run generate:borders
 */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { feature, mesh } from 'topojson-client'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC = path.join(__dirname, '..', 'node_modules', 'world-atlas', 'countries-110m.json')
const OUT = path.join(__dirname, '..', 'src', 'data', 'borders.json')

const round = (n) => Math.round(n * 100) / 100

/** Drop consecutive points closer than `eps` degrees to thin dense coastlines. */
function simplify(ring, eps = 1.0) {
  const out = []
  let last = null
  for (const [lon, lat] of ring) {
    if (!Number.isFinite(lon) || !Number.isFinite(lat)) continue
    if (last && Math.abs(lon - last[0]) < eps && Math.abs(lat - last[1]) < eps) continue
    out.push([round(lon), round(lat)])
    last = [lon, lat]
  }
  // Keep the true final vertex so shapes still close cleanly.
  const final = ring[ring.length - 1]
  if (final && out.length && (out[out.length - 1][0] !== round(final[0]) || out[out.length - 1][1] !== round(final[1]))) {
    out.push([round(final[0]), round(final[1])])
  }
  return out
}

function collect(geometry, lines) {
  const { type, coordinates } = geometry
  if (type === 'LineString') {
    const s = simplify(coordinates)
    if (s.length > 1) lines.push(s)
  } else if (type === 'MultiLineString' || type === 'Polygon') {
    for (const part of coordinates) {
      const s = simplify(part)
      if (s.length > 1) lines.push(s)
    }
  } else if (type === 'MultiPolygon') {
    for (const poly of coordinates) {
      for (const part of poly) {
        const s = simplify(part)
        if (s.length > 1) lines.push(s)
      }
    }
  }
}

const topo = JSON.parse(await readFile(SRC, 'utf8'))

const lines = []
// Interior borders shared between countries...
collect(mesh(topo, topo.objects.countries, (a, b) => a !== b), lines)
// ...plus coastlines, so islands and continent outlines are present too.
for (const f of feature(topo, topo.objects.countries).features) {
  collect(f.geometry, lines)
}

// Flatten to [lon, lat, lon, lat, ...] per line - smaller than nested pairs.
const flat = lines.map((line) => line.flat())
await writeFile(OUT, JSON.stringify(flat), 'utf8')

const points = flat.reduce((n, l) => n + l.length / 2, 0)
const bytes = JSON.stringify(flat).length
console.log(`  wrote borders.json — ${flat.length} polylines, ${points} points, ${(bytes / 1024).toFixed(0)}KB`)
