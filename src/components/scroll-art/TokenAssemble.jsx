import { useRef } from 'react'
import { Check } from '@phosphor-icons/react'
import { useI18n } from '../../i18n/context'
import useDrawProgress, { span, useStep } from '../../hooks/useDrawProgress'

// An illustrative token: the header and payload decode to {"alg":"RS256"} and
// {"sub":"visitor"}; the signature is filler. Not a credential.
const PARTS = ['eyJhbGciOiJSUzI1NiJ9', 'eyJzdWIiOiJ2aXNpdG9yIn0', 'kH8xQ2pV9cTzL0aW']
const TONES = ['text-accent', 'text-fg', 'text-muted']

/** Beside the OAuth highlight: header, payload and signature write in, then the token verifies. */
export default function TokenAssemble() {
  const { t } = useI18n()
  const ref = useRef(null)
  const progress = useDrawProgress(ref, ['start 90%', 'end 40%'])

  const shown = useStep(progress, (v) =>
    PARTS.map((part, i) => Math.round(part.length * span(v, i * 0.28, i * 0.28 + 0.28))).join(','),
  )
  const verified = useStep(progress, (v) => v >= 0.9)
  const counts = shown.split(',').map(Number)

  return (
    <div ref={ref} aria-hidden="true" className="font-mono text-[10.5px] leading-[1.15rem]" dir="ltr">
      {PARTS.map((part, i) => (
        <div key={part} className={`break-all ${TONES[i]}`}>
          {part.slice(0, counts[i])}
          {counts[i] === part.length && i < PARTS.length - 1 ? '.' : ''}
        </div>
      ))}
      <p className={`mt-1.5 flex items-center gap-1 font-sans text-[11px] font-medium text-accent transition-opacity duration-300 ${verified ? 'opacity-100' : 'opacity-0'}`}>
        <Check weight="bold" />
        {t('art.verified')}
      </p>
    </div>
  )
}
