import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

/**
 * Pointer ring driven by motion values, so tracking never triggers a React
 * render. `mix-blend-difference` makes it legible on any background; it grows
 * over interactive elements and collapses to a bar over text.
 */
export default function Cursor() {
  const reduced = useReducedMotion()
  const [variant, setVariant] = useState('default')
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 600, damping: 45, mass: 0.3 })
  const springY = useSpring(y, { stiffness: 600, damping: 45, mass: 0.3 })

  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)

      const el = document.elementFromPoint(e.clientX, e.clientY)
      if (!el) return
      if (el.closest('a, button, [role="tab"], input, textarea, select')) setVariant('link')
      else if (el.closest('p, h1, h2, h3, h4, li, blockquote')) setVariant('text')
      else setVariant('default')
    }

    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [reduced, visible, x, y])

  if (reduced) return null

  const variants = {
    default: { width: 28, height: 28, borderRadius: 14, opacity: 1 },
    link: { width: 56, height: 56, borderRadius: 28, opacity: 1 },
    text: { width: 3, height: 30, borderRadius: 2, opacity: 1 },
  }

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      animate={visible ? variants[variant] : { ...variants[variant], opacity: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="pointer-events-none fixed left-0 top-0 z-[999] hidden bg-white mix-blend-difference md:block"
    />
  )
}
