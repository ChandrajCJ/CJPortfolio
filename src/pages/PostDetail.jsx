import { Link, useParams } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { getPost } from '../data/posts'
import { useI18n } from '../i18n/context'
import Seo from '../components/Seo'
import TechPill from '../components/TechPill'
import NotFound from './NotFound'

export default function PostDetail() {
  const { slug } = useParams()
  const { t, locale } = useI18n()
  const post = getPost(slug)

  if (!post) return <NotFound />

  return (
    <>
      <Seo title={post.title} description={post.summary} path={`/writing/${post.slug}`} type="article" />

      <article className="mx-auto max-w-2xl px-5 pb-24 pt-28 md:px-8 md:pt-36">
        <Link
          to="/writing"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-fg"
        >
          <FiArrowLeft aria-hidden="true" className="rtl:rotate-180" /> {t('common.allWriting')}
        </Link>

        <header className="mt-8">
          <p className="text-xs uppercase tracking-wider text-muted">
            {new Date(post.date).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })}
            {post.readingMinutes ? ` · ${post.readingMinutes} ${t('common.minRead')}` : ''}
          </p>
          <h1 className="gradient-text mt-2 text-3xl font-bold md:text-4xl">{post.title}</h1>
          {post.tags?.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <TechPill>{tag}</TechPill>
                </li>
              ))}
            </ul>
          )}
        </header>

        <div className="mt-8 space-y-5">
          {post.body?.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </>
  )
}
