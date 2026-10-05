import { projects } from '../data/projects'
import { useI18n } from '../i18n/context'
import Section from '../components/Section'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'

export default function ProjectsSection() {
  const { t } = useI18n()

  return (
    <Section
      id="projects"
      eyebrow={t('projects.eyebrow')}
      title={t('projects.title')}
      description={t('projects.description')}
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal as="li" key={project.slug} delay={Math.min(i, 5) * 0.05} className="list-none">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
