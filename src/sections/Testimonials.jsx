import { FiExternalLink } from 'react-icons/fi'
import { testimonials } from '../data/testimonials'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

/** Renders nothing until real recommendations are added. */
export default function Testimonials() {
  if (!testimonials.length) return null

  return (
    <section id="testimonials" className="border-t border-line bg-surface/30 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-content">
        <SectionHeading eyebrow="Testimonials" title="What people say" />

        <ul className="grid gap-5 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={`${t.name}-${i}`} delay={i * 0.05}>
              <figure className="card h-full p-6">
                <blockquote className="text-sm leading-relaxed text-muted">“{t.quote}”</blockquote>
                <figcaption className="mt-5 border-t border-line pt-4">
                  <p className="text-sm font-semibold text-fg">{t.name}</p>
                  <p className="text-xs text-muted">{[t.role, t.company].filter(Boolean).join(' · ')}</p>
                  {t.url && (
                    <a
                      href={t.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-accent"
                    >
                      Source <FiExternalLink aria-hidden="true" />
                    </a>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
