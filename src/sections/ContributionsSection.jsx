import { lazy, Suspense } from 'react'
import contributions from '../data/contributions.json'
import { useI18n } from '../i18n/context'
import Section from '../components/Section'
import CountUp from '../components/CountUp'
import Reveal from '../components/Reveal'
import SkylineFallback from '../components/three/SkylineFallback'

// three.js is already a lazy chunk for the globe; this reuses it.
const Skyline3D = lazy(() => import('../components/three/Skyline3D'))

const fill = (str, vars) => String(str).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`)

export default function ContributionsSection() {
  const { t, locale } = useI18n()
  const { total, activeDays, longestStreak, busiestDay, accounts, generatedAt } = contributions

  const stats = [
    { id: 'total', value: total },
    { id: 'activeDays', value: activeDays },
    { id: 'streak', value: longestStreak },
    { id: 'busiest', value: busiestDay.count },
  ]

  const updated = new Date(generatedAt).toLocaleDateString(locale, { month: 'short', year: 'numeric' })

  return (
    <Section
      id="contributions"
      alt
      fullHeight
      eyebrow={t('contributions.eyebrow')}
      title={t('contributions.title')}
      description={t('contributions.description')}
    >
      {/* Flexes to whatever height is left after the heading and the stats. */}
      <div className="card relative min-h-[15rem] flex-1 overflow-hidden">
        <div className="absolute inset-3 md:inset-4">
          <Suspense fallback={<SkylineFallback />}>
            <Skyline3D />
          </Suspense>
        </div>
      </div>

      <p className="mt-2 shrink-0 text-center text-xs text-muted">
        {t('contributions.hint')}
      </p>

      <dl className="mt-6 grid shrink-0 grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.id} delay={i * 0.08}>
            <dd className="text-accent text-3xl font-bold tabular-nums md:text-4xl" dir="ltr">
              <CountUp to={stat.value} />
            </dd>
            <dt className="mt-2 text-sm font-semibold text-fg">{t(`contributions.${stat.id}`)}</dt>
          </Reveal>
        ))}
      </dl>

      <p className="mt-5 shrink-0 text-xs text-muted">
        {fill(t('contributions.accounts'), { count: accounts.length, date: updated })}
      </p>
    </Section>
  )
}
