import { useRef } from 'react'
import { motion, useTransform } from 'framer-motion'
import { useI18n } from '../../i18n/context'
import useDrawProgress, { useStep } from '../../hooks/useDrawProgress'

// Demo values, labelled as such on screen - never a real one-time code.
const CODES = ['482 913', '730 256', '159 804']
const CYCLES = 2

/** Beside the MFA highlight: an authenticator's 30-second ring runs down and the code rolls over. */
export default function TotpRing() {
  const { t } = useI18n()
  const ref = useRef(null)
  const progress = useDrawProgress(ref, ['start 90%', 'end 35%'])

  const remaining = useTransform(progress, (v) => (v >= 1 ? 1 : 1 - ((v * CYCLES) % 1)))
  const code = useStep(progress, (v) => CODES[Math.min(CYCLES, Math.floor(v * CYCLES))])
  const seconds = useStep(progress, (v) => (v >= 1 ? 30 : Math.max(1, Math.ceil(30 * (1 - ((v * CYCLES) % 1))))))

  return (
    <div ref={ref} aria-hidden="true" className="text-fg">
      <svg viewBox="0 0 120 120" className="h-auto w-full">
        <circle cx="60" cy="60" r="50" fill="none" stroke="rgb(var(--line))" strokeWidth="5" />
        <motion.circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="rgb(var(--accent))"
          strokeWidth="5"
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
          style={{ pathLength: remaining }}
        />
        <text x="60" y="62" textAnchor="middle" className="fill-current font-mono" fontSize="17" letterSpacing="1">
          {code}
        </text>
        <text x="60" y="80" textAnchor="middle" className="fill-muted" fontSize="10">
          {seconds}s
        </text>
      </svg>
      <p className="mt-1 text-center text-[11px] text-muted">{t('art.demo')}</p>
    </div>
  )
}
