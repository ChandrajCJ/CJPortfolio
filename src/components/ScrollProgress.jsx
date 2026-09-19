import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

/** Gradient progress bar pinned under the header. */
export default function ScrollProgress() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 })

  if (reduced) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="gradient-bg fixed inset-x-0 top-16 z-50 h-[2px] origin-left"
    />
  )
}
