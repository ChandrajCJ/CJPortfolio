/**
 * Generates responsive WebP derivatives for project screenshots.
 *
 * Source screenshots are ~1900px wide PNGs (~1-2MB each) but are rendered into
 * cards a few hundred pixels wide. This emits two WebP widths per image so the
 * browser can pick via srcset, cutting payload by ~95%.
 *
 * Run: npm run optimize:images
 */
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC_DIR = path.join(__dirname, '..', 'src', 'assets', 'raw')
const OUT_DIR = path.join(__dirname, '..', 'src', 'assets', 'optimized')

/** Widths to emit. Cards render ~320-640px; the 1280 covers retina + detail pages. */
const WIDTHS = [640, 1280]
const QUALITY = 78

const kb = (bytes) => `${(bytes / 1024).toFixed(0)}KB`

async function main() {
  await mkdir(OUT_DIR, { recursive: true })

  let files
  try {
    files = await readdir(SRC_DIR)
  } catch {
    console.error(`No source directory at ${SRC_DIR} - nothing to optimize.`)
    process.exit(1)
  }

  const images = files.filter((f) => /\.(png|jpe?g)$/i.test(f))
  if (!images.length) {
    console.error(`No raster images found in ${SRC_DIR}`)
    process.exit(1)
  }

  let before = 0
  let after = 0

  for (const file of images) {
    const inPath = path.join(SRC_DIR, file)
    const base = file.replace(/\.(png|jpe?g)$/i, '')
    const { size: originalSize } = await stat(inPath)
    before += originalSize

    const meta = await sharp(inPath).metadata()
    const produced = []

    for (const width of WIDTHS) {
      // Never upscale past the source.
      if (meta.width && width > meta.width && width !== WIDTHS[0]) continue

      const outPath = path.join(OUT_DIR, `${base}-${width}.webp`)
      const buf = await sharp(inPath)
        .resize({ width: Math.min(width, meta.width ?? width), withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toBuffer()

      await writeFile(outPath, buf)
      after += buf.byteLength
      produced.push(`${width}w ${kb(buf.byteLength)}`)
    }

    console.log(`  ${file.padEnd(22)} ${kb(originalSize).padStart(7)}  ->  ${produced.join(', ')}`)
  }

  const saved = ((1 - after / before) * 100).toFixed(1)
  console.log(`\n  ${images.length} images: ${kb(before)} -> ${kb(after)} (${saved}% smaller)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
