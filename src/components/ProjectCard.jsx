import { Link } from 'react-router-dom'
import { ArrowSquareOut, ArrowUpRight, GithubLogo } from '@phosphor-icons/react'
import { getProjectImage } from '../lib/images'
import { useI18n } from '../i18n/context'
import TechPill from './TechPill'
import TiltCard from './TiltCard'

/**
 * `flagship` lays the card out side by side (image beside the text) from
 * tablet width up, for the one project that spans the whole row.
 */
export default function ProjectCard({ project, featured = false, flagship = false, astro }) {
  const { t } = useI18n()
  const image = getProjectImage(project.image)
  const title = t(`projects.${project.slug}.title`)

  return (
    <TiltCard
      as="article"
      max={6}
      data-astro={astro}
      className={`card group relative flex h-full flex-col overflow-hidden transition-colors hover:border-accent/50 focus-within:border-accent/50 ${
        flagship ? 'md:flex-row' : ''
      }`}
    >
      <div className={`aspect-[16/9] overflow-hidden bg-elevated ${flagship ? 'md:aspect-auto md:w-1/2 md:shrink-0' : ''}`}>
        {image ? (
          <img
            src={image.src}
            srcSet={image.srcSet}
            sizes={
              flagship
                ? '(min-width: 1024px) 580px, (min-width: 768px) 50vw, 90vw'
                : featured
                  ? '(min-width: 1024px) 560px, (min-width: 768px) 45vw, 90vw'
                  : '(min-width: 1024px) 360px, (min-width: 768px) 45vw, 90vw'
            }
            alt=""
            width="640"
            height="360"
            loading="lazy"
            decoding="async"
            className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              flagship ? 'object-left-top' : 'object-top'
            }`}
          />
        ) : (
          <div className="grid h-full w-full place-items-center">
            <span className="text-accent text-3xl font-bold">{title.charAt(0)}</span>
          </div>
        )}
      </div>

      <div className={`relative z-[2] flex flex-1 flex-col p-5 ${flagship ? 'md:justify-center md:p-8' : ''}`}>
        <div className="flex items-start justify-between gap-3">
          <h3 className={`font-semibold text-fg ${flagship ? 'text-2xl' : featured ? 'text-xl' : 'text-lg'}`}>
            <Link
              to={`/projects/${project.slug}`}
              data-umami-event="project-open"
              data-umami-event-project={project.slug}
              className="after:absolute after:inset-0 focus-visible:underline"
            >
              {title}
            </Link>
          </h3>
          <span className="shrink-0 text-xs font-medium text-muted" dir="ltr">
            {project.year}
          </span>
        </div>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t(`projects.${project.slug}.blurb`)}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <li key={tech}>
              <TechPill>{tech}</TechPill>
            </li>
          ))}
        </ul>

        <div className="relative z-10 mt-5 flex items-center gap-4 border-t border-line pt-4 text-sm">
          <Link
            to={`/projects/${project.slug}`}
            data-umami-event="project-open"
            data-umami-event-project={project.slug}
            className="inline-flex items-center gap-1 font-medium text-accent"
          >
            {t('common.details')} <ArrowUpRight aria-hidden="true" className="rtl:-scale-x-100" />
          </Link>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              data-umami-event="project-demo"
              data-umami-event-project={project.slug}
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg"
            >
              <ArrowSquareOut aria-hidden="true" />
              <span>{t('common.liveDemo')}</span>
              <span className="sr-only">
                , {title} ({t('common.opensInNewTab')})
              </span>
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              data-umami-event="project-code"
              data-umami-event-project={project.slug}
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg"
            >
              <GithubLogo aria-hidden="true" />
              <span>{t('common.code')}</span>
              <span className="sr-only">
                , {title} ({t('common.opensInNewTab')})
              </span>
            </a>
          )}
        </div>
      </div>
    </TiltCard>
  )
}
