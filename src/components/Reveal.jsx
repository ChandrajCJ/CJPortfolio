import { motion, useReducedMotion } from 'framer-motion'

/**
 * Scroll-triggered entrance. Collapses to a plain <div> when the visitor has
 * asked for reduced motion, so nothing animates and nothing is hidden.
 */
export default function Reveal({ children, delay = 0, y = 16, className = '', as = 'div' }) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as] ?? motion.div

  if (reduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
