import { skillGroups } from '../data/skills'
import { useI18n } from '../i18n/context'
import Reveal from '../components/Reveal'
import TechPill from '../components/TechPill'
import TiltCard from '../components/TiltCard'
import Marquee from '../components/Marquee'

const ALL_TECH = [...new Set(skillGroups.flatMap((g) => g.items))]

export default function SkillsContent() {
  const { t } = useI18n()

  return (
    <>
      <div className="mb-12">
        <Marquee items={ALL_TECH} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal key={group.id} delay={i * 0.04}>
            <TiltCard max={5} className="card h-full p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                {t(`skills.groups.${group.id}`)}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li key={item}>
                    <TechPill>{item}</TechPill>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </>
  )
}
