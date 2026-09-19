/**
 * Resolves the responsive WebP derivatives emitted by scripts/optimize-images.mjs.
 *
 * Files are named `<slug>-<width>.webp`. Vite hashes the URLs at build time, so
 * we glob them eagerly and index by slug.
 */
const modules = import.meta.glob('../assets/optimized/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

const bySlug = {}

for (const [filePath, url] of Object.entries(modules)) {
  const file = filePath.split('/').pop() ?? ''
  const match = file.match(/^(.+)-(\d+)\.webp$/)
  if (!match) continue

  const [, slug, width] = match
  bySlug[slug] ??= {}
  bySlug[slug][Number(width)] = url
}

/**
 * @param {string|null|undefined} slug
 * @returns {{ src: string, srcSet: string } | null}
 */
export function getProjectImage(slug) {
  if (!slug) return null
  const widths = bySlug[slug]
  if (!widths) return null

  const sorted = Object.keys(widths)
    .map(Number)
    .sort((a, b) => a - b)
  if (!sorted.length) return null

  return {
    src: widths[sorted[0]],
    srcSet: sorted.map((w) => `${widths[w]} ${w}w`).join(', '),
  }
}

export default getProjectImage
