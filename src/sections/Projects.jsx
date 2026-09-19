import { useMemo, useState } from 'react'
import { allTech, projects } from '../data/projects'
import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'

const ALL = 'All'

export default function Projects() {
  const [filter, setFilter] = useState(ALL)

  const visible = useMemo(
    () => (filter === ALL ? projects : projects.filter((p) => p.tech.includes(filter))),
    [filter],
  )

  const filters = [ALL, ...allTech]

  return (
    <section id="projects" className="border-t border-line bg-surface/30 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-content">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built"
          description="A mix of production work and side projects. Click any card for the full write-up."
        />

        <div className="mb-8">
          <h3 className="sr-only" id="filter-heading">
            Filter projects by technology
          </h3>
          <ul aria-labelledby="filter-heading" className="thin-scroll flex flex-wrap gap-2">
            {filters.map((tech) => {
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
                    {tech}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Announce result count changes to screen readers. */}
        <p aria-live="polite" className="sr-only">
          {visible.length} {visible.length === 1 ? 'project' : 'projects'} shown
          {filter !== ALL ? ` for ${filter}` : ''}
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
          <p className="card p-8 text-center text-muted">No projects use {filter} yet.</p>
        )}
      </div>
    </section>
  )
}
