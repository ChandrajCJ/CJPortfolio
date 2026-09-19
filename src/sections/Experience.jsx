import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { experience } from '../data/experience'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import TechPill from '../components/TechPill'

export default function Experience() {
  const listRef = useRef(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 75%', 'end 60%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 32, restDelta: 0.001 })

  return (
    <section id="experience" className="border-t border-line px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-content">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          description="Authentication infrastructure, access control, and AI-assisted developer tooling for an enterprise SaaS platform."
        />

        <div ref={listRef} className="relative">
          {/* Track + the line that draws itself as you scroll. */}
          <div aria-hidden="true" className="absolute left-0 top-0 h-full w-px bg-line" />
          {!reduced && (
            <motion.div
              aria-hidden="true"
              style={{ scaleY }}
              className="gradient-bg absolute left-0 top-0 h-full w-px origin-top"
            />
          )}

          <ol className="space-y-12 pl-6 md:pl-10">
            {experience.map((job, i) => (
              <Reveal as="li" key={job.id} delay={i * 0.08} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[26px] top-2 h-3.5 w-3.5 rounded-full border-4 border-bg md:-left-[42px] ${
                    job.current ? 'gradient-bg' : 'bg-line'
                  }`}
                />

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-xl font-semibold text-fg md:text-2xl">{job.role}</h3>
                  {job.current && (
                    <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                      Current
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm font-medium text-accent">{job.company}</p>
                <p className="text-xs uppercase tracking-wider text-muted">
                  {job.start} — {job.end}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-muted">{job.summary}</p>

                <ul className="mt-4 space-y-2.5">
                  {job.highlights.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {job.tech.map((tech) => (
                    <li key={tech}>
                      <TechPill>{tech}</TechPill>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
