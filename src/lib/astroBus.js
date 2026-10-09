/**
 * Shared state for the Astro orb that travels down the home page.
 *
 * Plain mutable fields, not React state: the trail writes them every frame
 * and the globe reads them inside its own render loop, so neither side should
 * re-render for it. Components that do need to react (the chat button's
 * nudge) subscribe to dock changes, which happen a handful of times per visit.
 */
const listeners = new Set()

export const astro = {
  /** Stop the orb is resting on, or null while it's travelling. */
  docked: null,
  /** Stop the orb is resting on or heading to. The globe turns home for it. */
  target: null,
  /** Where the globe's home marker is, as fractions of the canvas, refreshed by the globe each frame. */
  globePoint: null,
}

export function setDocked(id) {
  if (astro.docked === id) return
  astro.docked = id
  listeners.forEach((fn) => fn(id))
}

export function onDock(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
