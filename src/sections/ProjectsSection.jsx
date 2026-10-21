import { projects } from '../data/projects'
import { useI18n } from '../i18n/context'
import Section from '../components/Section'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'

export default function ProjectsSection() {
  const { t } = useI18n()
  const ordered = [
    ...projects.filter((p) => p.flagship),
    ...projects.filter((p) => p.featured && !p.flagship),
    ...projects.filter((p) => !p.featured && !p.flagship),
  ]
  // The flagship takes a whole row, so odd/even counting starts after it.
  const tiled = ordered.filter((p) => !p.flagship).length

  return (
    <Section
      id="projects"
      title={t('projects.title')}
      description={t('projects.description')}
    >
      {/*
        Bento: the flagship project takes a full row of its own, featured
        projects the next row as two wide tiles, and the rest share the row
        after - exactly one cell per project, no empty slot. On two-column
        screens an odd last project spans the row instead of leaving a hole.
      */}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
        {ordered.map((project, i) => {
          const lastOdd = i === ordered.length - 1 && tiled % 2 === 1
          const span = project.flagship
            ? 'sm:col-span-2 lg:col-span-6'
            : project.featured
              ? 'lg:col-span-3'
              : 'lg:col-span-2'
          return (
            <Reveal
              as="li"
              key={project.slug}
              delay={Math.min(i, 5) * 0.05}
              className={`list-none ${span} ${lastOdd ? 'sm:col-span-2' : ''}`}
            >
              <ProjectCard
                project={project}
                featured={project.featured}
                flagship={project.flagship}
                astro={i === 0 ? 'project' : undefined}
              />
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
