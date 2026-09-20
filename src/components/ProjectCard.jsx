import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiExternalLink, FiGithub } from 'react-icons/fi'
import { getProjectImage } from '../lib/images'
import { useI18n } from '../i18n/context'
import TechPill from './TechPill'
import TiltCard from './TiltCard'

export default function ProjectCard({ project }) {
  const { t } = useI18n()
  const image = getProjectImage(project.image)
  const title = t(`projects.${project.slug}.title`)

  return (
    <TiltCard
      as="article"
      max={6}
      className="card group relative flex h-full flex-col overflow-hidden transition-colors hover:border-accent/50 focus-within:border-accent/50"
    >
      <div className="aspect-[16/9] overflow-hidden bg-elevated">
        {image ? (
          <img
            src={image.src}
            srcSet={image.srcSet}
            sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 90vw"
            alt=""
            width="640"
            height="360"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center">
            <span className="text-accent text-3xl font-bold">{title.charAt(0)}</span>
          </div>
        )}
      </div>

      <div className="relative z-[2] flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-fg">
            <Link to={`/projects/${project.slug}`} className="after:absolute after:inset-0 focus-visible:underline">
              {title}
            </Link>
          </h3>
          <span className="shrink-0 text-xs font-medium text-muted" dir="ltr">
            {project.year}
          </span>
        </div>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t(`projects.${project.slug}.blurb`)}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((tech) => (
            <li key={tech}>
              <TechPill>{tech}</TechPill>
            </li>
          ))}
          {project.tech.length > 4 && (
            <li>
              <TechPill>+{project.tech.length - 4}</TechPill>
            </li>
          )}
        </ul>

        <div className="relative z-10 mt-5 flex items-center gap-4 border-t border-line pt-4 text-sm">
          <Link to={`/projects/${project.slug}`} className="inline-flex items-center gap-1 font-medium text-accent">
            {t('common.details')} <FiArrowUpRight aria-hidden="true" className="rtl:-scale-x-100" />
          </Link>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg"
            >
              <FiExternalLink aria-hidden="true" />
              <span>{t('common.liveDemo')}</span>
              <span className="sr-only">
                — {title} ({t('common.opensInNewTab')})
              </span>
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg"
            >
              <FiGithub aria-hidden="true" />
              <span>{t('common.code')}</span>
              <span className="sr-only">
                — {title} ({t('common.opensInNewTab')})
              </span>
            </a>
          )}
        </div>
      </div>
    </TiltCard>
  )
}
