import { FiGlobe, FiMapPin } from 'react-icons/fi'
import { profile } from '../data/profile'
import { education } from '../data/education'
import { useI18n } from '../i18n/context'
import Seo from '../components/Seo'
import Hero from '../sections/Hero'
import Stats from '../sections/Stats'
import Reveal from '../components/Reveal'
import TiltCard from '../components/TiltCard'
import Portrait from '../components/Portrait'
import SectionHeading from '../components/SectionHeading'

export default function Home() {
  const { t } = useI18n()
  const location = t(`education.locations.${profile.locationKey}`)

  return (
    <>
      <Seo path="/home" />
      <Hero />
      <Stats />

      <section className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
        <SectionHeading eyebrow={t('home.aboutEyebrow')} title={t('home.aboutTitle')} />

        <div className="grid gap-4 md:grid-cols-3">
          <Reveal className="md:col-span-2">
            <TiltCard max={4} className="card h-full p-6 md:p-8">
              <p className="text-base leading-relaxed text-muted md:text-lg">{t('meta.summary')}</p>
            </TiltCard>
          </Reveal>

          <div className="grid gap-4">
            <Reveal delay={0.06}>
              <TiltCard max={6} className="card p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">{t('home.currently')}</p>
                <p className="mt-2 text-lg font-semibold text-fg">{t('meta.role')}</p>
                <p className="gradient-text text-sm font-semibold">{profile.company}</p>
              </TiltCard>
            </Reveal>

            <Reveal delay={0.12}>
              <TiltCard max={6} className="card p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">{t('home.education')}</p>
                <p className="mt-2 text-sm font-semibold text-fg">{t('home.degreeShort')}</p>
                <p className="text-sm text-muted">{t(`education.${education[0].id}.detail`)}</p>
              </TiltCard>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <TiltCard max={6} className="card h-full overflow-hidden p-3">
              <Portrait />
            </TiltCard>
          </Reveal>

          <Reveal delay={0.16}>
            <TiltCard max={6} className="card flex h-full items-center gap-3 p-6">
              <FiMapPin aria-hidden="true" className="shrink-0 text-accent" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">{t('home.basedIn')}</p>
                <p className="mt-1 text-sm font-semibold text-fg">{location}</p>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.2} className="md:col-span-2">
            <TiltCard max={4} className="card flex h-full items-center gap-3 p-6">
              <FiGlobe aria-hidden="true" className="shrink-0 text-accent" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">{t('home.languages')}</p>
                <p className="mt-1 text-sm font-semibold text-fg">{profile.spoken.join(' · ')}</p>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </section>
    </>
  )
}
