import { useRef } from 'react'
import { motion, useTransform } from 'framer-motion'
import { signature } from '../../data/signature'
import useDrawProgress, { span } from '../../hooks/useDrawProgress'

const DRAW_END = 0.85 // outlines finish here, then the ink fills in

/** One glyph: traced in its own slice of the scroll, so the name writes left to right. */
function Glyph({ d, progress, from, to }) {
  const pathLength = useTransform(progress, (v) => span(v, from, to))
  const fillOpacity = useTransform(progress, (v) => span(v, DRAW_END, 1))
  return (
    <motion.path
      d={d}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinejoin="round"
      style={{ pathLength, fillOpacity }}
    />
  )
}

/** The contact section's sign-off: the name writes itself as you arrive. */
export default function Signature({ className = '' }) {
  const ref = useRef(null)
  const progress = useDrawProgress(ref, ['start 95%', 'center 55%'])
  const n = signature.paths.length

  return (
    <div ref={ref} aria-hidden="true" className={className}>
      <svg viewBox={signature.viewBox} className="h-auto w-full overflow-visible">
        {signature.paths.map((d, i) => (
          <Glyph key={i} d={d} progress={progress} from={(i / n) * DRAW_END} to={((i + 1) / n) * DRAW_END} />
        ))}
        {/* Invisible marker on the j's dot: the Astro orb lands here on its way down the page. */}
        <circle data-astro="jdot" cx={signature.dot.x} cy={signature.dot.y} r={signature.dot.r} fill="none" />
      </svg>
    </div>
  )
}
