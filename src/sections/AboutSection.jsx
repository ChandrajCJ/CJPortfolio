import { Bicycle, FilmSlate, Globe, MapPin, PersonSimpleRun, PersonSimpleSwim } from '@phosphor-icons/react'
import { profile } from '../data/profile'
import { education } from '../data/education'
import { useI18n } from '../i18n/context'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import Portrait from '../components/Portrait'

/** Icons keyed by the hobby ids in profile.hobbies. */
const HOBBY_ICONS = {
  swimming: PersonSimpleSwim,
  running: PersonSimpleRun,
  cycling: Bicycle,
  cinema: FilmSlate,
}

/**
 * Bento grid. Spans are chosen so the 3-column layout tiles completely with no
 * empty cells: portrait+summary fill rows 1-2, three cards fill row 3, and
 * languages+focus fill row 4.
 */
export default function AboutSection() {
  const { t } = useI18n()

  return (
    <Section id="about" alt screen title={t('home.aboutTitle')}>
      <div className="grid auto-rows-auto gap-4 md:grid-cols-3">
        <Reveal className="md:col-span-1 md:row-span-2">
          <div className="card h-full overflow-hidden p-3">
            <Portrait className="h-full" />
          </div>
        </Reveal>

        <Reveal delay={0.05} className="md:col-span-2 md:row-span-2">
          <div className="card flex h-full flex-col justify-center p-6 md:p-8">
            <p className="text-base leading-relaxed text-muted md:text-lg">{t('meta.summary')}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card h-full p-6">
            <p className="text-xs font-medium text-muted">{t('home.currently')}</p>
            <p className="mt-2 text-lg font-semibold text-fg">{t('meta.role')}</p>
            <p className="text-accent text-sm font-semibold">{profile.company}</p>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="card h-full p-6">
            <p className="text-xs font-medium text-muted">{t('home.education')}</p>
            <p className="mt-2 text-sm font-semibold text-fg">{t('home.degreeShort')}</p>
            <p className="text-sm text-muted">{t(`education.${education[0].id}.detail`)}</p>
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="card flex h-full items-start gap-3 p-6">
            <MapPin aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
            <div>
              <p className="text-xs font-medium text-muted">{t('home.basedIn')}</p>
              <p className="mt-2 text-sm font-semibold text-fg">
                {t(`education.locations.${profile.locationKey}`)}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.22} className="md:col-span-2">
          <div data-astro="hobbies" className="card flex h-full flex-col justify-center p-6">
            <p className="text-xs font-medium text-muted">{t('home.hobbies')}</p>
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
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="card flex h-full items-start gap-3 p-6">
            <Globe aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
            <div>
              <p className="text-xs font-medium text-muted">{t('home.languages')}</p>
              <p className="mt-2 text-sm font-semibold text-fg">{profile.spoken.join(', ')}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
