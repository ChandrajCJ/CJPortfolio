import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion } from 'framer-motion'

/** Hit-test interval. Cheap enough to be imperceptible when hovering. */
const HIT_TEST_MS = 90

/** Fixed box size; every state is expressed as a scale of this. */
const SIZE = 30

/**
 * Pointer ring.
 *
 * Three rules keep this smooth, each learned from breaking it:
 * - Position is written straight to motion values with no spring, so the ring
 *   sits exactly on the pointer instead of trailing it.
 * - Only `scale` is animated. Animating width/height/borderRadius triggers
 *   layout on every frame of the morph, which is what made it stutter.
 * - No mix-blend-mode: a blended fixed layer forces a full-viewport
 *   recomposite on every move.
 */
export default function Cursor() {
  const reduced = useReducedMotion()
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  const hoveringRef = useRef(false)
  const visibleRef = useRef(false)
  const posRef = useRef({ x: 0, y: 0 })
  const lastTestRef = useRef(0)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  useEffect(() => {
    if (reduced) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const hitTest = () => {
      const { x: cx, y: cy } = posRef.current
      const el = document.elementFromPoint(cx, cy)
      const next = Boolean(el?.closest('a, button, [role="tab"], input, textarea, select, summary'))
      if (next !== hoveringRef.current) {
        hoveringRef.current = next
        setHovering(next)
      }
    }

    const onMove = (e) => {
      // Direct write - no spring, no React render.
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

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x,
        y,
        width: SIZE,
        height: SIZE,
        translateX: '-50%',
        translateY: '-50%',
        willChange: 'transform',
      }}
      // Transform + opacity only: both are compositor-only properties.
      animate={{ scale: visible ? (hovering ? 1.75 : 1) : 0.4, opacity: visible ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 34, mass: 0.4 }}
      className={`pointer-events-none fixed left-0 top-0 z-[999] hidden rounded-full border-2 border-accent md:block ${
        hovering ? 'bg-accent/15' : ''
      }`}
    />
  )
}
