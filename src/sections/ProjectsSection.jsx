import { projects } from '../data/projects'
import { useI18n } from '../i18n/context'
import Section from '../components/Section'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'

export default function ProjectsSection() {
  const { t } = useI18n()
  const ordered = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)]

  return (
    <Section
      id="projects"
      title={t('projects.title')}
      description={t('projects.description')}
    >
      {/*
        Bento: featured projects take the first row as two wide tiles, the rest
        share the second row - exactly one cell per project, no empty slot. On
        two-column screens an odd last project spans the row instead of
        leaving a hole.
      */}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
        {ordered.map((project, i) => {
          const lastOdd = i === ordered.length - 1 && ordered.length % 2 === 1
          const span = project.featured ? 'lg:col-span-3' : 'lg:col-span-2'
          return (
            <Reveal
              as="li"
              key={project.slug}
              delay={Math.min(i, 5) * 0.05}
              className={`list-none ${span} ${lastOdd ? 'sm:col-span-2' : ''}`}
            >
              <ProjectCard project={project} featured={project.featured} />
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
