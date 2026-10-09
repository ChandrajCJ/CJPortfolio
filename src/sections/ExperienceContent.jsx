import { lazy, Suspense, useRef } from 'react'
import { GitMerge } from '@phosphor-icons/react'
import { experience } from '../data/experience'
import { regions } from '../data/topology'
import { useI18n } from '../i18n/context'
import Reveal from '../components/Reveal'
import Emphasis from '../components/Emphasis'
import GlobeFallback from '../components/three/GlobeFallback'
import GitGraph from '../components/scroll-art/GitGraph'
import TotpRing from '../components/scroll-art/TotpRing'
import TokenAssemble from '../components/scroll-art/TokenAssemble'
import GreetingCycle from '../components/scroll-art/GreetingCycle'
import FindingsBar from '../components/scroll-art/FindingsBar'

const Globe3D = lazy(() => import('../components/three/Globe3D'))

/**
 * Scroll-drawn illustrations, looked up by highlight id: each sits beside the
 * bullet it illustrates (the authenticator ring beside MFA, the token beside
 * OAuth, and so on). Decorative - the bullet text carries the meaning.
 */
/** Highlight panels the Astro orb rests on as it travels the page (components/AstroTrail). */
const ASTRO_STOPS = ['oauth', 'snyk']

const HIGHLIGHT_ART = {
  mfa: TotpRing,
  oauth: TokenAssemble,
  bidi: GreetingCycle,
  snyk: FindingsBar,
}

// A role another role was promoted from sits on the git graph's branch lane.
const onBranch = (id) => experience.some((job) => job.promotedFrom === id)

export default function ExperienceContent() {
  const { t } = useI18n()
  const listRef = useRef(null)
  const mergeRef = useRef(null)

  return (
    <>

      <div ref={listRef} className="relative">
        <GitGraph listRef={listRef} mergeRef={mergeRef} />

        <ol className="space-y-20 ps-6 md:ps-10">
          {experience.map((job) => (
            <li key={job.id} className="relative">
              <span
                aria-hidden="true"
                className={`absolute top-2 h-3.5 w-3.5 rounded-full border-4 border-bg ${
                  onBranch(job.id) ? '-start-[18px] md:-start-[34px]' : '-start-[30px] md:-start-[46px]'
                } ${job.current ? 'bg-accent' : 'bg-line'}`}
              />

              <div className="grid gap-8 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] xl:gap-14">
                {/* Role details stay pinned on wide screens while the highlights scroll past. */}
                <Reveal className="lg:sticky lg:top-24 lg:self-start">
                  <p className="text-sm text-muted">
                    {job.start} - {job.end ?? t('experience.present')}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-fg md:text-2xl">{t(`experience.${job.id}.role`)}</h3>
                  <p className="mt-1 text-sm font-medium text-accent">{job.company}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{t(`experience.${job.id}.summary`)}</p>

                  {job.globe && (
                    <figure className="mt-6">
                      {/* Capped by viewport height so the pinned column never outgrows the screen: 26.5rem is the sticky top offset plus the role text and caption at their tallest (1024px wide), plus a margin. */}
                      <div data-astro="globe" className="mx-auto w-full max-w-[16rem] lg:mx-0 lg:max-w-[min(100%,calc(100vh-26.5rem))]">
                        <Suspense fallback={<GlobeFallback />}>
                          <Globe3D />
                        </Suspense>
                      </div>
                      <figcaption className="mt-3 text-center lg:text-start">
                        <p className="text-xs font-medium text-fg">{t('globe.title')}</p>
                        <p className="mt-1 text-xs text-muted">
                          {regions.map((r) => t(`globe.names.${r.id}`)).join(', ')}
                        </p>
                        <p className="mt-1 text-[11px] text-muted [@media(pointer:coarse)]:hidden">{t('globe.hint')}</p>
                      </figcaption>
                    </figure>
                  )}
                </Reveal>

                <div className="xp-list space-y-8">
                  {job.groups.map((group, gi) => (
                    <Reveal key={group.id} delay={gi * 0.06}>
                      <p className="text-xs font-medium text-muted">
                        {t(`experience.groups.${group.id}`)}
                      </p>
                      <ul className="mt-2">
                        {group.items.map((id) => {
                          const Art = HIGHLIGHT_ART[id]
                          return (
                            <li
                              key={id}
                              className={`xp-row border-s-2 border-line py-3 ps-4 transition-colors duration-300 hover:border-accent ${
                                Art ? 'grid gap-4 sm:grid-cols-[minmax(0,1fr)_10rem] sm:gap-6' : ''
                              }`}
                            >
                              <div>
                                <h4 className="xp-title font-semibold text-fg transition-colors duration-300">
                                  {t(`experience.${job.id}.highlights.${id}.title`)}
                                </h4>
                                <p className="xp-detail mt-1.5 text-sm leading-relaxed text-muted transition-colors duration-300">
                                  <Emphasis className="font-semibold text-fg transition-colors duration-300">
                                    {t(`experience.${job.id}.highlights.${id}.detail`)}
                                  </Emphasis>
                                </p>
                              </div>
                              {Art && (
                                // Raised panel so the drawing reads as an illustration, not more row text.
                                <div
                                  data-astro={ASTRO_STOPS.includes(id) ? id : undefined}
                                  className="w-full max-w-[10rem] self-center rounded-xl border border-line bg-elevated p-3 shadow-[inset_0_1px_0_rgb(var(--fg)/0.06),0_10px_24px_-14px_rgb(0_0_0/0.6)]"
                                >
                                  <Art />
                                </div>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    </Reveal>
                  ))}
                </div>
              </div>

              {job.promotedFrom && (
                <div ref={mergeRef} className="relative mt-14 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="absolute -start-[33px] grid h-5 w-5 place-items-center rounded-full border border-line bg-bg text-accent md:-start-[49px]"
                  >
                    <GitMerge className="h-3 w-3" />
                  </span>
                  <p className="flex gap-2 text-xs">
                    <span className="font-medium text-fg">{t('experience.promoted')}</span>
                    <span className="text-muted">{job.start}</span>
                  </p>
                  <span aria-hidden="true" className="flex-1 border-t border-dashed border-line" />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}
