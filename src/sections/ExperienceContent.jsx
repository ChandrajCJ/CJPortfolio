import { lazy, Suspense, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { experience } from '../data/experience'
import { environmentCounts, hyperscalers, regions } from '../data/topology'
import { useI18n } from '../i18n/context'
import Reveal from '../components/Reveal'
import TechPill from '../components/TechPill'
import GlobeFallback from '../components/three/GlobeFallback'

const Globe3D = lazy(() => import('../components/three/Globe3D'))

export default function ExperienceContent() {
  const { t } = useI18n()
  const listRef = useRef(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 32, restDelta: 0.001 })

  return (
    <>
      <section aria-labelledby="globe-heading" className="card mb-16 overflow-hidden p-6 md:p-8">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted font-mono">{t('globe.eyebrow')}</p>
            <h3 id="globe-heading" className="mt-2 text-2xl font-bold text-fg md:text-3xl">
              {t('globe.title')}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">{t('globe.description')}</p>

            <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted font-mono">{t('globe.regions')}</dt>
                <dd className="text-accent text-2xl font-bold">{regions.length}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted font-mono">{t('globe.hyperscalers')}</dt>
                <dd className="text-accent text-2xl font-bold">{hyperscalers.length}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted font-mono">{t('globe.production')}</dt>
                <dd className="text-accent text-2xl font-bold">{environmentCounts.production}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted font-mono">{t('globe.staging')}</dt>
                <dd className="text-2xl font-bold text-fg">{environmentCounts.staging}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted font-mono">{t('globe.development')}</dt>
                <dd className="text-2xl font-bold text-fg">{environmentCounts.development}</dd>
              </div>
            </dl>

            <ul className="mt-6 flex flex-wrap gap-1.5">
              {regions.map((r) => (
                <li key={r.id}>
                  <TechPill>
                    {r.label} · {r.city}
                  </TechPill>
                </li>
              ))}
              {hyperscalers.map((h) => (
                <li key={h}>
                  <TechPill>{h}</TechPill>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Suspense fallback={<GlobeFallback />}>
              <Globe3D />
            </Suspense>
            <p className="mt-3 text-center text-xs text-muted">{t('globe.hint')}</p>
          </div>
        </div>
      </section>

      <div ref={listRef} className="relative">
        <div aria-hidden="true" className="absolute start-0 top-0 h-full w-px bg-line" />
        {!reduced && (
          <motion.div
            aria-hidden="true"
            style={{ scaleY }}
            className="bg-accent absolute start-0 top-0 h-full w-px origin-top"
          />
        )}

        <ol className="space-y-12 ps-6 md:ps-10">
          {experience.map((job, i) => (
            <Reveal as="li" key={job.id} delay={i * 0.08} className="relative">
              <span
                aria-hidden="true"
                className={`absolute -start-[26px] top-2 h-3.5 w-3.5 rounded-full border-4 border-bg md:-start-[42px] ${
                  job.current ? 'bg-accent' : 'bg-line'
                }`}
              />

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-xl font-semibold text-fg md:text-2xl">{t(`experience.${job.id}.role`)}</h3>
                {job.current && (
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                    {t('common.current')}
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm font-medium text-accent">{job.company}</p>
              <p className="text-xs uppercase tracking-wider text-muted font-mono">
                {job.start} — {job.end ?? t('experience.present')}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-muted">{t(`experience.${job.id}.summary`)}</p>

              <ul className="mt-4 space-y-2.5">
                {(t(`experience.${job.id}.highlights`) ?? []).map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {job.tech.map((tech) => (
                  <li key={tech}>
                    <TechPill>{tech}</TechPill>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </>
  )
}
