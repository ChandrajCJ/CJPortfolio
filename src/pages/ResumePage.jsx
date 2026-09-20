import { FiDownload, FiExternalLink, FiPrinter } from 'react-icons/fi'
import { profile } from '../data/profile'
import { experience } from '../data/experience'
import { education } from '../data/education'
import { certifications } from '../data/certifications'
import { skillGroups } from '../data/skills'
import { projects } from '../data/projects'
import { useI18n } from '../i18n/context'
import Seo from '../components/Seo'

function Section({ title, children }) {
  return (
    <section className="mt-8 break-inside-avoid">
      <h2 className="border-b border-line pb-1 text-xs font-bold uppercase tracking-[0.18em] text-accent print:text-black">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

/**
 * Machine-readable résumé. The PDF stays downloadable, but this page is what
 * search engines and ATS parsers can actually read.
 */
export default function ResumePage() {
  const { t } = useI18n()
  const featured = projects.filter((p) => p.featured)

  return (
    <>
      <Seo title={t('resume.title')} description={t('meta.summary')} path="/resume" />

      <div className="mx-auto max-w-3xl px-5 pb-24 pt-28 md:px-8 md:pt-36 print:max-w-none print:px-0 print:pt-0">
        <div className="mb-8 flex flex-wrap gap-3 print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-5 text-sm font-medium text-fg transition-colors hover:bg-elevated"
          >
            <FiPrinter aria-hidden="true" /> {t('resume.print')}
          </button>
          <a
            href={profile.cv}
            download
            className="btn-accent inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium"
          >
            <FiDownload aria-hidden="true" /> {t('resume.downloadPdf')}
          </a>
        </div>

        <article className="resume-sheet">
          <header className="border-b border-line pb-6">
            <h1 className="text-3xl font-bold text-fg print:text-black">{profile.name}</h1>
            <p className="mt-1 text-lg font-medium text-accent print:text-black">{t('meta.role')}</p>
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted print:text-black" dir="ltr">
              <span>{t(`education.locations.${profile.locationKey}`)}</span>
              <span aria-hidden="true">·</span>
              <a href={`mailto:${profile.email}`} className="underline underline-offset-2">
                {profile.email}
              </a>
              <span aria-hidden="true">·</span>
              <a href={profile.siteUrl} className="underline underline-offset-2">
                {profile.siteUrl.replace('https://', '')}
              </a>
            </p>
          </header>

          <Section title={t('resume.summary')}>
            <p className="text-sm leading-relaxed text-muted print:text-black">{t('meta.summary')}</p>
          </Section>

          <Section title={t('resume.skills')}>
            <dl className="space-y-2">
              {skillGroups.map((group) => (
                <div key={group.id} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                  <dt className="min-w-[10rem] text-sm font-semibold text-fg print:text-black">
                    {t(`skills.groups.${group.id}`)}
                  </dt>
                  <dd className="text-sm text-muted print:text-black">{group.items.join(', ')}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title={t('resume.experience')}>
            <div className="space-y-6">
              {experience.map((job) => (
                <div key={job.id} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="text-base font-semibold text-fg print:text-black">
                      {t(`experience.${job.id}.role`)}, {job.company}
                    </h3>
                    <p className="text-xs font-medium text-muted print:text-black" dir="ltr">
                      {job.start} — {job.end ?? t('experience.present')}
                    </p>
                  </div>
                  <ul className="mt-2 space-y-1.5">
                    {(t(`experience.${job.id}.highlights`) ?? []).map((point) => (
                      <li key={point} className="flex gap-2 text-sm leading-relaxed text-muted print:text-black">
                        <span aria-hidden="true">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section title={t('resume.education')}>
            {education.slice(0, 1).map((item) => (
              <div key={item.id} className="flex flex-wrap items-baseline justify-between gap-x-4">
                <div>
                  <h3 className="text-base font-semibold text-fg print:text-black">{t(`education.${item.id}.title`)}</h3>
                  <p className="text-sm text-muted print:text-black">
                    {item.institute} · {t(`education.${item.id}.detail`)}
                  </p>
                </div>
                <p className="text-xs font-medium text-muted print:text-black" dir="ltr">
                  {item.date}
                </p>
              </div>
            ))}
          </Section>

          <Section title={t('resume.projects')}>
            <div className="space-y-4">
              {featured.map((p) => (
                <div key={p.slug} className="break-inside-avoid">
                  <h3 className="text-sm font-semibold text-fg print:text-black">
                    {t(`projects.${p.slug}.title`)}{' '}
                    <span className="font-normal text-muted print:text-black">| {p.tech.join(', ')}</span>
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted print:text-black">
                    {t(`projects.${p.slug}.description`)}
                  </p>
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      dir="ltr"
                      className="mt-1 inline-flex items-center gap-1 text-xs text-accent underline underline-offset-2 print:text-black"
                    >
                      {p.demo.replace('https://', '').replace(/\/$/, '')}
                      <FiExternalLink aria-hidden="true" className="print:hidden" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Section>

          <Section title={t('resume.certifications')}>
            <ul className="grid gap-1 sm:grid-cols-2">
              {certifications.map((c) => (
                <li key={c.title} className="text-sm text-muted print:text-black">
                  {c.title}
                  {c.issuer ? `, ${c.issuer}` : ''} {c.year}
                </li>
              ))}
            </ul>
          </Section>

          <Section title={t('resume.languages')}>
            <p className="text-sm text-muted print:text-black">{profile.spoken.join(', ')}</p>
          </Section>
        </article>
      </div>
    </>
  )
}
