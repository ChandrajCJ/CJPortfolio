import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

/**
 * Counts from 0 to `to` the first time it scrolls into view.
 *
 * Deliberately a plain rAF loop rather than framer's `animate`: a `hasRun`
 * guard makes it impossible for an effect re-run to restart (and then cancel)
 * the tween, which previously left the counter stranded at 0.
 */
export default function CountUp({ to, decimals = 0, duration = 1600, className = '' }) {
  const ref = useRef(null)
  const hasRun = useRef(false)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView || hasRun.current) return
    hasRun.current = true

    if (reduced) {
      setValue(to)
      return
    }

    let frame
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setValue(to * easeOutExpo(progress))
      if (progress < 1) frame = requestAnimationFrame(tick)
      else setValue(to)
    }
    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [inView, reduced, to, duration])

  return (
    <span ref={ref} className={className}>
      {value.toFixed(decimals)}
    </span>
  )
}
