import { useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { useI18n } from '../../i18n/context'
import useDrawProgress, { useStep } from '../../hooks/useDrawProgress'

// One per language the site ships in, in the switcher's order.
const GREETINGS = [
  { text: 'Hello', lang: 'en', dir: 'ltr' },
  { text: 'வணக்கம்', lang: 'ta', dir: 'ltr' },
  { text: 'नमस्ते', lang: 'hi', dir: 'ltr' },
  { text: 'مرحبًا', lang: 'ar', dir: 'rtl' },
  { text: 'Hallo', lang: 'de', dir: 'ltr' },
  { text: 'こんにちは', lang: 'ja', dir: 'ltr' },
]

/** Beside the region-aware login highlight: one greeting through all six languages, flipping for Arabic. */
export default function GreetingCycle() {
  const { t } = useI18n()
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const progress = useDrawProgress(ref, ['start 90%', 'end 30%'])
  const index = useStep(progress, (v) => Math.min(GREETINGS.length - 1, Math.floor(v * GREETINGS.length)))
  const greeting = GREETINGS[index]
  const Arrow = greeting.dir === 'rtl' ? ArrowLeft : ArrowRight

  return (
    <div ref={ref} aria-hidden="true" className="text-center">
      <div className="relative h-9 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={greeting.lang}
            lang={greeting.lang}
            dir={greeting.dir}
            initial={reduced ? false : { y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { y: -18, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="text-accent text-2xl font-semibold leading-9"
          >
            {greeting.text}
          </motion.p>
        </AnimatePresence>
      </div>
      <p className="mt-1 flex items-center justify-center gap-1 text-[11px] text-muted" dir="ltr">
        <Arrow />
        {t(greeting.dir === 'rtl' ? 'art.rtl' : 'art.ltr')}
      </p>
    </div>
  )
}
