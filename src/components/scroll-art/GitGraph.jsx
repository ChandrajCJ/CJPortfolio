import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { span } from '../../hooks/useDrawProgress'

const MAIN = 0.5 // x of the main lane: the old timeline line
const BRANCH = 12.5 // x of the intern branch, inside the gutter

/**
 * The experience timeline drawn as a git graph. Main runs down from the
 * current role to the "Promoted" marker, where the intern branch merges in;
 * below that the branch lane carries the internship. Both draw as you scroll,
 * main first, then the branch.
 *
 * A "commit head" dot rides the tip of the drawn line so the progress is
 * visible at a glance, not just a slightly brighter rule.
 *
 * Geometry is measured from the list, so it follows any copy length or
 * language. Mirrored for right-to-left layouts.
 */
export default function GitGraph({ listRef, mergeRef }) {
  const reduced = useReducedMotion()
  const [geo, setGeo] = useState(null)
  const branchRef = useRef(null)
  const headRef = useRef(null)

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return undefined
    const measure = () => {
      const top = list.getBoundingClientRect().top
      const merge = mergeRef.current?.getBoundingClientRect()
      const h = list.offsetHeight
      setGeo({ h, mergeY: merge ? merge.top + merge.height / 2 - top : h })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(list)
    return () => ro.disconnect()
  }, [listRef, mergeRef])

  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 32, restDelta: 0.001 })
  const finished = useMotionValue(1)
  const progress = reduced ? finished : smooth

  const split = geo ? geo.mergeY / geo.h : 0.5
  const mainLength = useTransform(progress, (v) => span(v, 0, split))
  const branchLength = useTransform(progress, (v) => span(v, split, 1))

  // Move the head imperatively: no React render per scroll frame.
  const placeHead = (v) => {
    const head = headRef.current
    if (!head || !geo) return
    let x = MAIN
    let y = geo.mergeY * span(v, 0, split)
    if (v > split && branchRef.current) {
      const path = branchRef.current
      const pt = path.getPointAtLength(path.getTotalLength() * span(v, split, 1))
      x = pt.x
      y = pt.y
    }
    head.setAttribute('cx', x)
    head.setAttribute('cy', y)
    head.setAttribute('opacity', v > 0.001 ? 1 : 0)
  }
  useMotionValueEvent(progress, 'change', placeHead)

  if (!geo) return null
  const { h, mergeY } = geo
  const branch = `M${MAIN} ${mergeY} C${MAIN} ${mergeY + 14} ${BRANCH} ${mergeY + 10} ${BRANCH} ${mergeY + 26} L${BRANCH} ${h}`

  return (
    <svg
      aria-hidden="true"
      width="14"
      height={h}
      className="pointer-events-none absolute start-0 top-0 overflow-visible rtl:-scale-x-100"
    >
      <path d={`M${MAIN} 0 V${h}`} fill="none" stroke="rgb(var(--line))" strokeWidth="1" />
      <path d={branch} fill="none" stroke="rgb(var(--line))" strokeWidth="1" />
      <motion.path
        d={`M${MAIN} 0 V${mergeY}`}
        fill="none"
        stroke="rgb(var(--accent))"
        strokeWidth="2"
        style={{ pathLength: mainLength }}
      />
      <motion.path
        ref={branchRef}
        d={branch}
        fill="none"
        stroke="rgb(var(--accent))"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ pathLength: branchLength }}
      />
      <circle
        ref={(el) => {
          headRef.current = el
          if (el) placeHead(progress.get())
        }}
        r="4"
        fill="rgb(var(--accent))"
        stroke="rgb(var(--bg))"
        strokeWidth="2"
        opacity="0"
      />
    </svg>
  )
}
