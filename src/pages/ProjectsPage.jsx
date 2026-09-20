import { useMemo, useState } from 'react'
import { allTech, projects } from '../data/projects'
import { useI18n } from '../i18n/context'
import Seo from '../components/Seo'
import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'

const ALL = '__all__'
const fill = (str, vars) => String(str).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`)

export default function ProjectsPage() {
  const { t } = useI18n()
  const [filter, setFilter] = useState(ALL)

  const visible = useMemo(
    () => (filter === ALL ? projects : projects.filter((p) => p.tech.includes(filter))),
    [filter],
  )

  return (
    <>
      <Seo title={t('nav.projects')} description={t('projects.description')} path="/projects" />
      <Page>
        <PageHeader eyebrow={t('projects.eyebrow')} title={t('projects.title')} description={t('projects.description')} />

        <div className="mb-8">
          <h2 className="sr-only" id="filter-heading">
            {t('projects.filterHeading')}
          </h2>
          <ul aria-labelledby="filter-heading" className="flex flex-wrap gap-2">
            {[ALL, ...allTech].map((tech) => {
              const active = filter === tech
              return (
                <li key={tech}>
                  <button
                    type="button"
                    onClick={() => setFilter(tech)}
                    aria-pressed={active}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                      active
                        ? 'gradient-bg border-transparent text-white'
                        : 'border-line bg-elevated text-muted hover:border-accent/50 hover:text-fg'
                    }`}
                  >
                    {tech === ALL ? t('projects.filterAll') : tech}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <p aria-live="polite" className="sr-only">
          {fill(t('projects.shown'), { count: visible.length })}
        </p>

        {visible.length ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((project, i) => (
              <Reveal as="li" key={project.slug} delay={Math.min(i, 5) * 0.05} className="list-none">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <p className="card p-8 text-center text-muted">{fill(t('projects.none'), { tech: filter })}</p>
        )}
      </Page>
    </>
  )
}
