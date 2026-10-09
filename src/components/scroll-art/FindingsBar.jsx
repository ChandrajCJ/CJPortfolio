import { useRef } from 'react'
import { motion, useTransform } from 'framer-motion'
import { useI18n } from '../../i18n/context'
import useDrawProgress, { span, useStep } from '../../hooks/useDrawProgress'

const START = 500

/**
 * Beside the Snyk highlight: open findings run from 500+ to zero. Only the two
 * real endpoints are claimed - the bar empties evenly, with no invented curve
 * in between.
 */
export default function FindingsBar() {
  const { t } = useI18n()
  const ref = useRef(null)
  const progress = useDrawProgress(ref, ['start 90%', 'end 40%'])
  const left = useTransform(progress, (v) => 1 - span(v, 0.1, 0.9))
  const count = useStep(progress, (v) => {
    const f = span(v, 0.1, 0.9)
    if (f <= 0) return `${START}+`
    return String(Math.round(START * (1 - f)))
  })

  return (
    <div ref={ref} aria-hidden="true">
      <p className="text-accent text-2xl font-bold tabular-nums" dir="ltr">
        {count}
      </p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-line">
        <motion.div style={{ scaleX: left }} className="bg-accent h-full origin-left rounded-full rtl:origin-right" />
      </div>
      <p className="mt-2 text-[11px] text-muted">{t('art.findings')}</p>
    </div>
  )
}
