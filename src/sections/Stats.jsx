import { stats } from '../data/stats'
import { useI18n } from '../i18n/context'
import CountUp from '../components/CountUp'
import Reveal from '../components/Reveal'

export default function Stats() {
  const { t } = useI18n()

  return (
    <section aria-label={t('stats.heading')} className="relative border-y border-line bg-surface/40 px-5 py-14 md:px-8">
      <div className="mx-auto grid max-w-content gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.id} delay={i * 0.08} className="text-center lg:text-start">
            <p className="text-accent text-4xl font-bold tabular-nums md:text-5xl" dir="ltr">
              <CountUp to={stat.value} />
              {stat.suffix}
            </p>
            <p className="mt-2 text-sm font-semibold text-fg">{t(`stats.${stat.id}.label`)}</p>
            <p className="mt-1 text-xs text-muted">{t(`stats.${stat.id}.detail`)}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
