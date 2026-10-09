import { useMemo, useRef } from 'react'
import { motion, useTransform } from 'framer-motion'
import contributions from '../../data/contributions.json'
import { useI18n } from '../../i18n/context'
import useDrawProgress, { span, useStep } from '../../hooks/useDrawProgress'

const W = 600
const H = 56
const DAYS_PER_WEEK = 7

/**
 * Under the Open source heading: the year's real activity, summed per week,
 * draws left to right; then the week holding the busiest day gets marked.
 */
export default function ContributionsLine() {
  const { t, locale } = useI18n()
  const ref = useRef(null)
  const progress = useDrawProgress(ref, ['start 92%', 'start 35%'])

  const { d, area, peak } = useMemo(() => {
    const weeks = []
    contributions.days.forEach((day, i) => {
      const w = Math.floor(i / DAYS_PER_WEEK)
      weeks[w] = (weeks[w] ?? 0) + day.count
    })
    const max = Math.max(...weeks, 1)
    const points = weeks.map((v, i) => [(i / (weeks.length - 1)) * W, H - 4 - (v / max) * (H - 10)])
    const busiestIndex = contributions.days.findIndex((day) => day.date === contributions.busiestDay.date)
    const peakWeek = Math.max(0, Math.floor(busiestIndex / DAYS_PER_WEEK))
    const line = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
    return {
      d: line,
      area: `${line} L${W} ${H - 4} L0 ${H - 4} Z`,
      peak: { x: points[peakWeek][0], y: points[peakWeek][1] },
    }
  }, [])

  const pathLength = useTransform(progress, (v) => span(v, 0, 0.85))
  const areaOpacity = useTransform(progress, (v) => 0.14 * span(v, 0.6, 0.95))
  const marked = useStep(progress, (v) => v >= 0.85)
  const date = new Date(contributions.busiestDay.date).toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' })
  const nearEnd = peak.x / W > 0.7

  return (
    <div ref={ref} aria-hidden="true" className="relative shrink-0 text-fg">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-14 w-full overflow-visible">
        <line x1="0" y1={H - 4} x2={W} y2={H - 4} stroke="rgb(var(--line))" vectorEffect="non-scaling-stroke" />
        <motion.path d={area} fill="rgb(var(--accent))" stroke="none" style={{ opacity: areaOpacity }} />
        <motion.path
          d={d}
          fill="none"
          stroke="rgb(var(--accent))"
          strokeWidth="2"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength }}
        />
      </svg>
      {/* HTML marker so it stays round under the stretched viewBox. */}
      <div
        className={`absolute transition-opacity duration-300 ${marked ? 'opacity-100' : 'opacity-0'}`}
        style={{ left: `${(peak.x / W) * 100}%`, top: `${(peak.y / H) * 100}%` }}
      >
        <span data-astro="peak" className="bg-accent absolute block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full" />
        <span
          className={`absolute -top-6 whitespace-nowrap text-[11px] text-muted ${nearEnd ? 'right-2' : 'left-2'}`}
          dir="ltr"
        >
          {t('contributions.busiest')}: {contributions.busiestDay.count}, {date}
        </span>
      </div>
    </div>
  )
}
