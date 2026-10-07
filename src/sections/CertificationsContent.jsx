import { ArrowSquareOut, Medal } from '@phosphor-icons/react'
import { certifications } from '../data/certifications'
import { useI18n } from '../i18n/context'
import Reveal from '../components/Reveal'

export default function CertificationsContent() {
  const { t } = useI18n()

  return (
    <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
      {certifications.map((cert, i) => (
        <Reveal as="li" key={cert.title} delay={Math.min(i, 8) * 0.03}>
          <div className="flex h-full gap-3 border-t border-line pt-4">
            <Medal aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-fg">{cert.title}</p>
              <p className="mt-1 text-xs text-muted">{[cert.issuer, cert.year].filter(Boolean).join(' · ')}</p>
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="relative z-[2] mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent"
                >
                  {t('certifications.verify')} <ArrowSquareOut aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </Reveal>
      ))}
    </ul>
  )
}
