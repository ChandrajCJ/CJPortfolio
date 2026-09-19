import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

/**
 * 3D tilt plus a radial spotlight that tracks the pointer. The spotlight is a
 * CSS custom property, so it costs no React renders.
 */
export default function TiltCard({ children, className = '', max = 8, as = 'div' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 220, damping: 22 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 220, damping: 22 })

  const MotionTag = motion[as] ?? motion.div

  if (reduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width
    const ny = (e.clientY - rect.top) / rect.height
    px.set(nx)
    py.set(ny)
    el.style.setProperty('--spot-x', `${nx * 100}%`)
    el.style.setProperty('--spot-y', `${ny * 100}%`)
  }

  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <MotionTag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`spotlight relative [transform-style:preserve-3d] ${className}`}
    >
      {children}
    </MotionTag>
  )
}
