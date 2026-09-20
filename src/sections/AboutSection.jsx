import { FiGlobe, FiMapPin } from 'react-icons/fi'
import { FaBicycle, FaFilm, FaRunning, FaSwimmer } from 'react-icons/fa'
import { profile } from '../data/profile'
import { education } from '../data/education'
import { useI18n } from '../i18n/context'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import TiltCard from '../components/TiltCard'
import Portrait from '../components/Portrait'

/** Icons keyed by the hobby ids in profile.hobbies. */
const HOBBY_ICONS = {
  swimming: FaSwimmer,
  running: FaRunning,
  cycling: FaBicycle,
  cinema: FaFilm,
}

/**
 * Bento grid. Spans are chosen so the 3-column layout tiles completely with no
 * empty cells: portrait+summary fill rows 1-2, three cards fill row 3, and
 * languages+focus fill row 4.
 */
export default function AboutSection() {
  const { t } = useI18n()

  return (
    <Section id="about" alt eyebrow={t('home.aboutEyebrow')} title={t('home.aboutTitle')}>
      <div className="grid auto-rows-auto gap-4 md:grid-cols-3">
        <Reveal className="md:col-span-1 md:row-span-2">
          <TiltCard max={6} className="card h-full overflow-hidden p-3">
            <Portrait className="h-full" />
          </TiltCard>
        </Reveal>

        <Reveal delay={0.05} className="md:col-span-2 md:row-span-2">
          <TiltCard max={4} className="card flex h-full flex-col justify-center p-6 md:p-8">
            <p className="text-base leading-relaxed text-muted md:text-lg">{t('meta.summary')}</p>
          </TiltCard>
        </Reveal>

        <Reveal delay={0.1}>
          <TiltCard max={6} className="card h-full p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted font-mono">{t('home.currently')}</p>
            <p className="mt-2 text-lg font-semibold text-fg">{t('meta.role')}</p>
            <p className="text-accent text-sm font-semibold">{profile.company}</p>
          </TiltCard>
        </Reveal>

        <Reveal delay={0.14}>
          <TiltCard max={6} className="card h-full p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted font-mono">{t('home.education')}</p>
            <p className="mt-2 text-sm font-semibold text-fg">{t('home.degreeShort')}</p>
            <p className="text-sm text-muted">{t(`education.${education[0].id}.detail`)}</p>
          </TiltCard>
        </Reveal>

        <Reveal delay={0.18}>
          <TiltCard max={6} className="card flex h-full items-start gap-3 p-6">
            <FiMapPin aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted font-mono">{t('home.basedIn')}</p>
              <p className="mt-2 text-sm font-semibold text-fg">
                {t(`education.locations.${profile.locationKey}`)}
              </p>
            </div>
          </TiltCard>
        </Reveal>

        <Reveal delay={0.22} className="md:col-span-2">
          <TiltCard max={4} className="card flex h-full flex-col justify-center p-6">
            <p className="font-mono text-xs uppercase tracking-wider text-muted">{t('home.hobbies')}</p>
            <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
              {profile.hobbies.map((id) => {
                const Icon = HOBBY_ICONS[id]
                return (
                  <li key={id} className="flex items-center gap-2 text-sm font-medium text-fg">
                    {Icon && <Icon aria-hidden="true" className="shrink-0 text-accent" />}
                    {t(`hobbies.${id}`)}
                  </li>
                )
              })}
            </ul>
          </TiltCard>
        </Reveal>

        <Reveal delay={0.26}>
          <TiltCard max={6} className="card flex h-full items-start gap-3 p-6">
            <FiGlobe aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted font-mono">{t('home.languages')}</p>
              <p className="mt-2 text-sm font-semibold text-fg">{profile.spoken.join(' · ')}</p>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </Section>
  )
}
