import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { astro, setDocked } from '../lib/astroBus'

/** The middle of the viewport: a stop is reached when its centre crosses it. */
const READING_LINE = 0.5
/** Share of each leg spent resting at either end, so the orb visibly docks... */
const DWELL = 0.2
/**
 * ...capped as a share of the viewport. This is also how close to the middle a
 * stop's centre must be for the orb to rest on it: within 12% of the screen
 * height either side, so it only docks on what's in the middle of the view.
 */
const MAX_DWELL = 0.12
/** Shortest rest at a stop, as a share of the viewport height of scrolling. */
const MIN_DOCK = 0.1
/**
 * Scroll a leg should take, per pixel the orb crosses on screen, up to half a
 * viewport. Where two stops are close in the page but far apart on screen
 * (the globe and the OAuth panel sit side by side), the leg borrows scroll
 * from the rests at either end so the flight isn't a blink.
 */
const TRAVEL_PER_PX = 0.6
const MAX_TRAVEL = 0.5
/** A pinned stop may take the orb this early (share of the viewport), once it's fully in view. */
const PINNED_REACH = 0.3
/** Gap kept between a travelling orb and the viewport edges. */
const EDGE = 16
/** At the bottom of the page: rest on the last stop this long (ms), then fly home over HOP_MS. */
const HOLD_MS = 900
const HOP_MS = 900

/**
 * The stops, in page order. Each names a `data-astro` element and the point on
 * it the orb rests at: fx/fy as fractions of its box, dx/dy as a pixel nudge.
 * The orb rests there only while the element's centre is near the middle of
 * the viewport, and travels between stops the rest of the time.
 * `pinned` stops sit in a sticky column, so their place in the page flow (not
 * where they're pinned on screen) decides when they reach the middle.
 * Mirrored for right-to-left layouts. Missing or hidden stops are skipped, so
 * a closed tab or a phone layout just shortens the route.
 */
const STOPS = [
  { id: 'portrait', fx: 1, fy: 0, dx: -18, dy: 18 },
  { id: 'hobbies', fx: 1, fy: 0, dx: -20, dy: 20 },
  // Lands on the home marker once the globe reports it. Centred in the view,
  // the globe is always fully on screen (its height is capped to fit).
  { id: 'globe', fx: 0.5, fy: 0.5, pinned: true },
  { id: 'oauth', fx: 1, fy: 0, dx: -12, dy: 12 },
  { id: 'snyk', fx: 1, fy: 0, dx: -12, dy: 12 },
  { id: 'skill', fx: 1, fy: 0.5, dx: 14 },
  { id: 'project', fx: 1, fy: 0, dx: -22, dy: 22 },
  { id: 'peak', fx: 0.5, fy: 0.5 },
  // The dot of the j in the signature: the orb lands as the tittle.
  { id: 'jdot', fx: 0.5, fy: 0.5 },
  // Not a scroll stop: the chat button is fixed, so once the page is scrolled
  // to the end the orb rests on the last stop for a moment, then flies here.
  { id: 'chat', fx: 0.5, fy: 0.5, home: true },
]

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const smoothstep = (t) => t * t * (3 - 2 * t)

/** Quadratic arc from a to b, bowed sideways so legs read as flight, not a ruler line. */
function arcPoint(a, b, t, side, maxBow) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.hypot(dx, dy) || 1
  const bow = Math.min(maxBow, len * 0.2) * side
  const cx = (a.x + b.x) / 2 + (-dy / len) * bow
  const cy = (a.y + b.y) / 2 + (dx / len) * bow
  const u = 1 - t
  return { x: u * u * a.x + 2 * u * t * cx + t * t * b.x, y: u * u * a.y + 2 * u * t * cy + t * t * b.y }
}

/**
 * Astro, the chat assistant, as a small orb that travels the home page with
 * the scroll. It rests on one element per section (the portrait, the hobbies
 * tile, the globe's home marker, the OAuth and Snyk panels, a skill, the featured
 * project, the busiest day, the dot of the j in the signature) and finally
 * docks into the chat button.
 *
 * Everything is measured from the live layout each frame and written straight
 * to the DOM, so it follows sticky columns, reveals and resizes without React
 * renders. Hidden entirely under reduced motion.
 */
export default function AstroTrail() {
  const reduced = useReducedMotion()
  const layerRef = useRef(null)
  const orbRef = useRef(null)
  const tailRefs = [useRef(null), useRef(null)]

  useEffect(() => {
    if (reduced) return undefined
    const layer = layerRef.current
    const orb = orbRef.current
    const tails = tailRefs.map((r) => r.current)
    const cache = new Map()
    const trail = [null, null]
    let dockedEl = null
    let frame
    let lastTime = performance.now()
    let endSince = null // when the page reached the bottom with the orb resting on the last stop
    let hop = 0 // progress of the flight home, 0 to 1

    const find = (selector) => {
      let el = cache.get(selector)
      if (!el || !el.isConnected) {
        el = document.querySelector(selector)
        cache.set(selector, el)
      }
      return el
    }

    const markDocked = (el, id) => {
      if (el === dockedEl) return
      dockedEl?.removeAttribute('data-astro-docked')
      el?.setAttribute('data-astro-docked', '')
      dockedEl = el
      setDocked(id)
    }

    const tick = (now) => {
      frame = requestAnimationFrame(tick)
      const dt = Math.min(100, now - lastTime)
      lastTime = now
      if (document.hidden) return

      const vh = window.innerHeight
      const line = vh * READING_LINE
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - vh
      const rtl = document.documentElement.dir === 'rtl'
      // Reachable range of the reading line, in viewport space for this frame.
      const first = line - scrollY
      const last = line + maxScroll - scrollY

      const points = []
      let home = null
      for (const stop of STOPS) {
        const el = find(`[data-astro="${stop.id}"]`)
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (!r.width || !r.height) continue
        const fx = rtl ? 1 - stop.fx : stop.fx
        let x = r.left + fx * r.width + (rtl ? -1 : 1) * (stop.dx ?? 0)
        let y = r.top + stop.fy * r.height + (stop.dy ?? 0)
        const gp = stop.id === 'globe' ? astro.globePoint : null
        if (gp?.front) {
          x = r.left + gp.x * r.width
          y = r.top + gp.y * r.height
        }
        // A stop meets the reading line when its centre reaches the middle of the screen.
        let reachAt = r.top + r.height / 2
        if (stop.pinned) {
          // Measure from where the sticky column would be unpinned: the top of its row.
          const pin = el.closest('.lg\\:sticky')
          if (pin && getComputedStyle(pin).position === 'sticky') {
            reachAt += pin.parentElement.getBoundingClientRect().top - pin.getBoundingClientRect().top
          }
        }
        if (stop.home) {
          home = { id: stop.id, el, x, y }
          continue
        }
        // `mark`: where the reading line must be for this stop to count as reached.
        let mark = Math.min(last, Math.max(first, reachAt))
        if (points.length) mark = Math.max(mark, points[points.length - 1].mark)
        points.push({ id: stop.id, el, x, y, mark, pinned: stop.pinned })
      }

      if (!points.length) {
        layer.dataset.state = 'off'
        return
      }

      // Each stop's rest, as a range of the reading line: centred on the stop,
      // within MAX_DWELL of the middle, and no more than a share of the gap to
      // either neighbour.
      const reach = vh * MAX_DWELL
      const minDock = vh * MIN_DOCK
      const n = points.length
      points.forEach((p, k) => {
        const gapPrev = k ? p.mark - points[k - 1].mark : Infinity
        const gapNext = k < n - 1 ? points[k + 1].mark - p.mark : Infinity
        const d = Math.min(reach, Math.min(gapPrev, gapNext) * DWELL)
        p.in = p.pinned ? p.mark - Math.min(vh * PINNED_REACH, gapPrev / 2) : p.mark - d
        p.out = p.mark + d
      })
      // Give legs that cross a lot of screen for little scroll some room:
      // leave the earlier stop sooner, then reach the next one a little later.
      for (let k = 0; k < n - 1; k++) {
        const a = points[k]
        const b = points[k + 1]
        const need = Math.min(vh * MAX_TRAVEL, Math.hypot(b.x - a.x, b.y - a.y) * TRAVEL_PER_PX)
        let short = need - (b.in - a.out)
        const give = Math.min(short, a.out - (a.in + minDock))
        if (give > 0) {
          a.out -= give
          short -= give
        }
        // Never so late that the page can't scroll far enough to reach it.
        const take = Math.min(short, Math.min(b.mark + reach - minDock, last) - b.in)
        if (take > 0) {
          b.in += take
          b.out = Math.max(b.out, b.in + minDock)
        }
      }

      // Where the reading line is: resting at a stop, or on the leg after it.
      const i = points.findLastIndex((p) => p.in <= line)
      let pos
      let docked = null
      let target
      let waiting = false
      if (i === -1) {
        // Before the first stop nears the middle (a phone's hero puts the
        // portrait low on screen), stay out of sight rather than dock early.
        pos = points[0]
        target = points[0].id
        waiting = true
      } else if (i === n - 1 || line <= points[i].out) {
        pos = points[i]
        docked = points[i]
        target = points[i].id
      } else {
        const a = points[i]
        const b = points[i + 1]
        const travel = b.in - a.out
        const t = travel > 0 ? clamp01((line - a.out) / travel) : 1
        // Ease in and out on short legs; on legs longer than the screen, lean
        // linear so the orb keeps pace with the scroll instead of running ahead.
        const soft = Math.min(1, vh / Math.max(travel, 1))
        const g = t + (smoothstep(t) - t) * soft
        pos = arcPoint(a, b, g, i % 2 ? 1 : -1, Math.min(140, window.innerWidth * 0.12))
        pos = {
          x: Math.min(window.innerWidth - EDGE, Math.max(EDGE, pos.x)),
          y: Math.min(vh - EDGE, Math.max(EDGE, pos.y)),
        }
        target = b.id
      }

      // The flight home: only from a rest on the last stop at the very bottom of the page.
      const atEnd = docked === points[n - 1] && line >= last - 2
      endSince = atEnd ? (endSince ?? now) : null
      const goingHome = home && atEnd && now - endSince > HOLD_MS
      hop = clamp01(hop + (goingHome ? dt / HOP_MS : -dt / (HOP_MS / 2)))
      if (home && hop > 0) {
        const from = points[n - 1]
        pos = arcPoint(from, home, smoothstep(hop), 1, Math.min(140, window.innerWidth * 0.12))
        docked = hop >= 1 ? home : null
        target = home.id
      }

      astro.target = target
      markDocked(docked?.el ?? null, docked?.id ?? null)
      layer.dataset.state = waiting ? 'wait' : docked ? (docked.id === 'chat' ? 'home' : 'docked') : 'travel'
      layer.dataset.at = docked?.id ?? ''

      orb.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      // Two lagging copies make a short comet tail while moving and fold under the orb at rest.
      let lead = pos
      trail.forEach((t, k) => {
        const next = t ? { x: t.x + (lead.x - t.x) * 0.3, y: t.y + (lead.y - t.y) * 0.3 } : { ...lead }
        trail[k] = next
        tails[k].style.transform = `translate3d(${next.x}px, ${next.y}px, 0)`
        lead = next
      })
      if (!layer.dataset.ready) layer.dataset.ready = 'true'
    }

    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      dockedEl?.removeAttribute('data-astro-docked')
      setDocked(null)
      astro.target = null
    }
    // tailRefs is a fresh array each render but its refs are stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  if (reduced) return null

  return (
    <div ref={layerRef} aria-hidden="true" className="astro-layer pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <span ref={tailRefs[1]} className="absolute left-0 top-0">
        <span className="astro-tail astro-tail-2" />
      </span>
      <span ref={tailRefs[0]} className="absolute left-0 top-0">
        <span className="astro-tail astro-tail-1" />
      </span>
      <span ref={orbRef} className="absolute left-0 top-0">
        <span className="astro-orb" />
      </span>
    </div>
  )
}
