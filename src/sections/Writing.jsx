import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiExternalLink } from 'react-icons/fi'
import { posts } from '../data/posts'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import TechPill from '../components/TechPill'

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

/** Renders nothing until there is at least one post - an empty blog is worse than none. */
export default function Writing() {
  if (!posts.length) return null

  return (
    <section id="writing" className="border-t border-line px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-content">
        <SectionHeading eyebrow="Writing" title="Notes & write-ups" description="Things I've learned worth writing down." />

        <ul className="grid gap-5 md:grid-cols-2">
          {posts.map((post, i) => (
            <Reveal as="li" key={post.slug} delay={i * 0.05}>
              <article className="card group relative h-full p-6 transition-colors hover:border-accent/50">
                <p className="text-xs uppercase tracking-wider text-muted">
                  {formatDate(post.date)}
                  {post.readingMinutes ? ` · ${post.readingMinutes} min read` : ''}
                </p>

                <h3 className="mt-2 text-lg font-semibold text-fg">
                  {post.externalUrl ? (
                    <a
                      href={post.externalUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="after:absolute after:inset-0"
                    >
                      {post.title}
                    </a>
                  ) : (
                    <Link to={`/writing/${post.slug}`} className="after:absolute after:inset-0">
                      {post.title}
                    </Link>
                  )}
                </h3>

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
                      Read externally <FiExternalLink aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      Read more <FiArrowUpRight aria-hidden="true" />
                    </>
                  )}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
