import { FiBookOpen } from 'react-icons/fi'
import { education } from '../data/education'
import { useI18n } from '../i18n/context'
import Reveal from '../components/Reveal'

export default function EducationContent() {
  const { t } = useI18n()

  return (
    <ol className="relative space-y-8 border-s border-line ps-8">
      {education.map((item, i) => {
        const detailKey = `education.${item.id}.detail`
        const detail = t(detailKey)
        return (
          <Reveal as="li" key={item.id} delay={i * 0.06} className="relative">
            <span
              aria-hidden="true"
              className="gradient-bg absolute -start-[41px] grid h-6 w-6 place-items-center rounded-full text-xs text-white"
            >
              <FiBookOpen />
            </span>
            <p className="text-xs font-medium uppercase tracking-wider text-muted">{item.date}</p>
            <h3 className="mt-1 text-lg font-semibold text-fg">{t(`education.${item.id}.title`)}</h3>
            <p className="text-sm text-muted">{item.institute}</p>
            <p className="text-sm text-muted">{t(`education.locations.${item.locationKey}`)}</p>
            {detail !== detailKey && <p className="mt-1 text-sm font-medium text-accent">{detail}</p>}
          </Reveal>
        )
      })}
    </ol>
  )
}
