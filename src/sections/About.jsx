import { useState } from 'react'
import { FiAward, FiBookOpen, FiExternalLink, FiGlobe, FiMapPin } from 'react-icons/fi'
import { profile } from '../data/profile'
import { skillGroups } from '../data/skills'
import { education } from '../data/education'
import { certifications } from '../data/certifications'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import TechPill from '../components/TechPill'
import TiltCard from '../components/TiltCard'
import Marquee from '../components/Marquee'

const TABS = [
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
]

const MARQUEE_ITEMS = skillGroups.flatMap((g) => g.items).filter((v, i, a) => a.indexOf(v) === i)

function Skills() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {skillGroups.map((group, i) => (
        <Reveal key={group.id} delay={i * 0.04}>
          <TiltCard max={5} className="card h-full p-5">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">{group.label}</h4>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li key={item}>
                  <TechPill>{item}</TechPill>
                </li>
              ))}
            </ul>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  )
}

function Education() {
  return (
    <ol className="relative space-y-6 border-l border-line pl-6">
      {education.map((item, i) => (
        <Reveal as="li" key={item.id} delay={i * 0.06} className="relative">
          <span
            aria-hidden="true"
            className="gradient-bg absolute -left-[31px] grid h-5 w-5 place-items-center rounded-full text-[10px] text-white"
          >
            <FiBookOpen />
          </span>
          <p className="text-xs font-medium uppercase tracking-wider text-muted">{item.date}</p>
          <h4 className="mt-1 font-semibold text-fg">{item.title}</h4>
          <p className="text-sm text-muted">{item.institute}</p>
          <p className="text-sm text-muted">{item.location}</p>
          {item.detail && <p className="mt-1 text-sm font-medium text-accent">{item.detail}</p>}
        </Reveal>
      ))}
    </ol>
  )
}

function Certifications() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {certifications.map((cert, i) => (
        <Reveal as="li" key={cert.title} delay={i * 0.03} className="card flex gap-3 p-4">
          <FiAward aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-fg">{cert.title}</p>
            <p className="mt-0.5 text-xs text-muted">{[cert.issuer, cert.year].filter(Boolean).join(' · ')}</p>
            {cert.url && (
              <a
                href={cert.url}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-accent"
              >
                Verify <FiExternalLink aria-hidden="true" />
              </a>
            )}
          </div>
        </Reveal>
      ))}
    </ul>
  )
}

export default function About() {
  const [tab, setTab] = useState('skills')
  const degree = education[0]

  return (
    <section id="about" className="border-t border-line px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-content">
        <SectionHeading eyebrow="About" title="Who I am" />

        {/* Bento: at-a-glance before the tabbed deep dive. */}
        <div className="mb-14 grid gap-4 md:grid-cols-3">
          <Reveal className="md:col-span-2">
            <TiltCard max={4} className="card h-full p-6 md:p-8">
              <p className="text-base leading-relaxed text-muted md:text-lg">{profile.summary}</p>
            </TiltCard>
          </Reveal>

          <div className="grid gap-4">
            <Reveal delay={0.06}>
              <TiltCard max={6} className="card p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Currently</p>
                <p className="mt-2 text-lg font-semibold text-fg">{profile.role}</p>
                <p className="gradient-text text-sm font-semibold">{profile.company}</p>
              </TiltCard>
            </Reveal>

            <Reveal delay={0.12}>
              <TiltCard max={6} className="card p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Education</p>
                <p className="mt-2 text-sm font-semibold text-fg">B.Tech, Computer Science</p>
                <p className="text-sm text-muted">{degree.detail}</p>
              </TiltCard>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <TiltCard max={6} className="card flex h-full items-center gap-3 p-6">
              <FiMapPin aria-hidden="true" className="shrink-0 text-accent" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Based in</p>
                <p className="mt-1 text-sm font-semibold text-fg">{profile.location}</p>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.2} className="md:col-span-2">
            <TiltCard max={4} className="card flex h-full items-center gap-3 p-6">
              <FiGlobe aria-hidden="true" className="shrink-0 text-accent" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Languages</p>
                <p className="mt-1 text-sm font-semibold text-fg">{profile.languages.join(' · ')}</p>
              </div>
            </TiltCard>
          </Reveal>
        </div>

        <div className="mb-14">
          <Marquee items={MARQUEE_ITEMS} />
        </div>

        <div role="tablist" aria-label="About sections" className="flex flex-wrap gap-2 border-b border-line">
          {TABS.map((t) => {
            const selected = tab === t.id
            return (
              <button
                key={t.id}
                role="tab"
                id={`tab-${t.id}`}
                type="button"
                aria-selected={selected}
                aria-controls={`panel-${t.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setTab(t.id)}
                onKeyDown={(e) => {
                  const i = TABS.findIndex((x) => x.id === tab)
                  if (e.key === 'ArrowRight') setTab(TABS[(i + 1) % TABS.length].id)
                  if (e.key === 'ArrowLeft') setTab(TABS[(i - 1 + TABS.length) % TABS.length].id)
                }}
                className={`-mb-px border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                  selected ? 'border-accent text-fg' : 'border-transparent text-muted hover:text-fg'
                }`}
              >
                {t.label}
              </button>
            )
          })}
        </div>

        <div
          role="tabpanel"
          id={`panel-${tab}`}
          aria-labelledby={`tab-${tab}`}
          tabIndex={0}
          className="mt-8 focus-visible:outline-none"
        >
          {tab === 'skills' && <Skills />}
          {tab === 'education' && <Education />}
          {tab === 'certifications' && <Certifications />}
        </div>
      </div>
    </section>
  )
}
