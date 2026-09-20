import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiExternalLink } from 'react-icons/fi'
import { posts } from '../data/posts'
import { useI18n } from '../i18n/context'
import Seo from '../components/Seo'
import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import TechPill from '../components/TechPill'
import NotFound from './NotFound'

export default function WritingPage() {
  const { t, locale } = useI18n()

  // No posts yet - don't ship an empty section, 404 the route instead.
  if (!posts.length) return <NotFound />

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <>
      <Seo title={t('nav.writing')} description={t('writing.description')} path="/writing" />
      <Page>
        <PageHeader eyebrow={t('writing.eyebrow')} title={t('writing.title')} description={t('writing.description')} />

        <ul className="grid gap-5 md:grid-cols-2">
          {posts.map((post, i) => (
            <Reveal as="li" key={post.slug} delay={i * 0.05}>
              <article className="card group relative h-full p-6 transition-colors hover:border-accent/50">
                <p className="text-xs uppercase tracking-wider text-muted">
                  {formatDate(post.date)}
                  {post.readingMinutes ? ` · ${post.readingMinutes} ${t('common.minRead')}` : ''}
                </p>

                <h2 className="mt-2 text-lg font-semibold text-fg">
                  {post.externalUrl ? (
                    <a href={post.externalUrl} target="_blank" rel="noreferrer noopener" className="after:absolute after:inset-0">
                      {post.title}
                    </a>
                  ) : (
                    <Link to={`/writing/${post.slug}`} className="after:absolute after:inset-0">
                      {post.title}
                    </Link>
                  )}
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-muted">{post.summary}</p>

                {post.tags?.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <li key={tag}>
                        <TechPill>{tag}</TechPill>
                      </li>
                    ))}
                  </ul>
                )}

                <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  {post.externalUrl ? (
                    <>
                      {t('writing.readExternally')} <FiExternalLink aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      {t('common.readMore')} <FiArrowUpRight aria-hidden="true" className="rtl:-scale-x-100" />
                    </>
                  )}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </Page>
    </>
  )
}
