import { Link, useParams } from 'react-router-dom'
import { FiArrowLeft, FiExternalLink, FiGithub } from 'react-icons/fi'
import { getProject, projects } from '../data/projects'
import { getProjectImage } from '../lib/images'
import Seo from '../components/Seo'
import TechPill from '../components/TechPill'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (!project) return <NotFound />

  const image = getProjectImage(project.image)
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3)

  return (
    <>
      <Seo
        title={project.title}
        description={project.blurb}
        path={`/projects/${project.slug}`}
        type="article"
      />

      <article className="mx-auto max-w-3xl px-5 pb-20 pt-28 md:px-8 md:pt-36">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-fg"
        >
          <FiArrowLeft aria-hidden="true" /> All projects
        </Link>

        <header className="mt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">{project.year}</p>
          <h1 className="gradient-text mt-2 text-3xl font-bold md:text-5xl">{project.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer noopener"
                className="gradient-bg inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium text-white"
              >
                View live <FiExternalLink aria-hidden="true" />
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-5 text-sm font-medium text-fg"
              >
                <FiGithub aria-hidden="true" /> Source code
              </a>
            )}
          </div>
        </header>

        {image && (
          <img
            src={image.src}
            srcSet={image.srcSet}
            sizes="(min-width: 768px) 768px, 92vw"
            alt={`Screenshot of the ${project.title} interface`}
            width="1280"
            height="720"
            loading="lazy"
            decoding="async"
            className="mt-10 w-full rounded-xl border border-line object-cover"
          />
        )}

        {project.highlights.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-fg">Highlights</h2>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-fg">Built with</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li key={tech}>
                <TechPill>{tech}</TechPill>
              </li>
            ))}
          </ul>
        </section>

        {others.length > 0 && (
          <nav aria-label="More projects" className="mt-16 border-t border-line pt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">More projects</h2>
            <ul className="mt-4 divide-y divide-line">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/projects/${p.slug}`}
                    className="flex items-center justify-between gap-4 py-3 text-sm transition-colors hover:text-accent"
                  >
                    <span className="font-medium text-fg">{p.title}</span>
                    <span className="text-muted">{p.year}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </article>
    </>
  )
}
