import { useState } from 'react'
import { useMotionValue, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'

/**
 * How far an element has travelled through the viewport, 0 to 1, for drawings
 * that follow the scroll. With reduced motion the value is pinned at 1, so
 * every drawing simply shows its finished state.
 *
 * `offset` follows Motion's useScroll: by default drawing starts as the
 * element's top enters the bottom 15% of the screen and finishes once its
 * centre reaches the middle.
 */
export default function useDrawProgress(ref, offset = ['start 85%', 'center 50%']) {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset })
  const finished = useMotionValue(1)
  return reduced ? finished : scrollYProgress
}

/**
 * React state derived from a motion value, for the parts of a drawing that are
 * text (a countdown, a rolling code). Re-renders only when `fn` returns a new
 * value, not on every frame.
 */
export function useStep(value, fn) {
  const [state, setState] = useState(() => fn(value.get()))
  useMotionValueEvent(value, 'change', (v) => setState(fn(v)))
  return state
}

/** Maps progress into a sub-range: 0 before `from`, 1 after `to`. */
export const span = (v, from, to) => Math.min(1, Math.max(0, (v - from) / (to - from)))
