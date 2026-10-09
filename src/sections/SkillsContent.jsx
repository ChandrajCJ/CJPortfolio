import { skillGroups } from '../data/skills'
import { useI18n } from '../i18n/context'
import Reveal from '../components/Reveal'
import TechPill from '../components/TechPill'

export default function SkillsContent() {
  const { t } = useI18n()

  return (
    <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
      {skillGroups.map((group, i) => (
        <Reveal key={group.id} delay={i * 0.04}>
          <div className="h-full border-t border-line pt-5">
            <h3 className="text-sm font-semibold text-fg">
              {t(`skills.groups.${group.id}`)}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {group.items.map((item, j) => (
                <li key={item}>
                  {/* The first skill is one of Astro's stops on its way down the page. */}
                  <TechPill data-astro={i === 0 && j === 0 ? 'skill' : undefined}>{item}</TechPill>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
