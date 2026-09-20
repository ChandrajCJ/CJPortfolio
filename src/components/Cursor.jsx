import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion } from 'framer-motion'

/** Hit-test interval. Cheap enough to be imperceptible when hovering. */
const HIT_TEST_MS = 90

/** Fixed box size; every state is a pure transform of this. */
const SIZE = 30

/**
 * Each state is expressed as scaleX/scaleY on one fixed-size circle, never as
 * width/height. A circle scaled thin reads as a text bar because the border
 * radius scales with it, so the original three looks survive without ever
 * touching layout.
 */
const STATES = {
  default: { scaleX: 1, scaleY: 1 },
  link: { scaleX: 1.75, scaleY: 1.75 },
  text: { scaleX: 0.12, scaleY: 0.95 },
}

/**
 * Pointer ring.
 *
 * Three rules keep this smooth, each learned by breaking it:
 * - Position is written straight to the motion values, no spring, so the ring
 *   sits on the pointer instead of easing toward it.
 * - Only transforms and opacity animate. Animating width/height/borderRadius
 *   forces layout on every frame of the morph.
 * - The blend lives on this 30px element only. A *full-screen* blend layer (the
 *   old grain overlay) is what made blending expensive; a small one is not.
 */
export default function Cursor() {
  const reduced = useReducedMotion()
  const [variant, setVariant] = useState('default')
  const [visible, setVisible] = useState(false)

  const variantRef = useRef('default')
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

  const state = STATES[variant]

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
      animate={{
        scaleX: visible ? state.scaleX : 0.4,
        scaleY: visible ? state.scaleY : 0.4,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 34, mass: 0.4 }}
      className="pointer-events-none fixed left-0 top-0 z-[999] hidden rounded-full bg-white mix-blend-difference md:block"
    />
  )
}
