import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

/** How often to re-check what is under the pointer. Cheap enough to be
 *  imperceptible, ~15x less work than testing on every mouse event. */
const HIT_TEST_MS = 80

const VARIANTS = {
  default: { width: 28, height: 28, borderRadius: 14, opacity: 1 },
  link: { width: 52, height: 52, borderRadius: 26, opacity: 1 },
  text: { width: 3, height: 28, borderRadius: 2, opacity: 1 },
}

/**
 * Pointer ring driven by motion values, so tracking never triggers a React
 * render.
 *
 * Two things matter for smoothness here, both learned the hard way:
 * - The hit test (elementFromPoint + closest) forces layout, so it is time
 *   throttled and only calls setState when the variant actually changes.
 * - No mix-blend-mode. Blending a fixed element over the page forces a
 *   full-viewport recomposite every frame, which is very visible on pages with
 *   a live WebGL canvas underneath.
 */
export default function Cursor() {
  const reduced = useReducedMotion()
  const [variant, setVariant] = useState('default')
  const [visible, setVisible] = useState(false)

  // Refs mirror state so the listener never needs re-binding.
  const variantRef = useRef('default')
  const visibleRef = useRef(false)
  const posRef = useRef({ x: 0, y: 0 })
  const lastTestRef = useRef(0)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 750, damping: 45, mass: 0.22 })
  const springY = useSpring(y, { stiffness: 750, damping: 45, mass: 0.22 })

  useEffect(() => {
    if (reduced) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const hitTest = () => {
      const { x: cx, y: cy } = posRef.current
      const el = document.elementFromPoint(cx, cy)

      let next = 'default'
      if (el) {
        if (el.closest('a, button, [role="tab"], input, textarea, select, summary')) next = 'link'
        else if (el.closest('p, h1, h2, h3, h4, li, blockquote, label')) next = 'text'
      }

      if (next !== variantRef.current) {
        variantRef.current = next
        setVariant(next)
      }
    }

    const onMove = (e) => {
      // Position updates are cheap - do them on every event.
      x.set(e.clientX)
      y.set(e.clientY)
      posRef.current.x = e.clientX
      posRef.current.y = e.clientY

      if (!visibleRef.current) {
        visibleRef.current = true
        setVisible(true)
      }

      const now = e.timeStamp || performance.now()
      if (now - lastTestRef.current >= HIT_TEST_MS) {
        lastTestRef.current = now
        hitTest()
      }
    }

    const onLeave = () => {
      visibleRef.current = false
      setVisible(false)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [reduced, x, y])

  if (reduced) return null

  const shape = VARIANTS[variant]

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%', willChange: 'transform' }}
      animate={visible ? shape : { ...shape, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
      className={`pointer-events-none fixed left-0 top-0 z-[999] hidden border-2 border-accent md:block ${
        variant === 'link' ? 'bg-accent/15' : variant === 'text' ? 'border-0 bg-accent' : ''
      }`}
    />
  )
}
