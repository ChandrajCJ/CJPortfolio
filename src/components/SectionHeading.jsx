import AnimatedHeading from './AnimatedHeading'

export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <header className="mb-10 max-w-2xl">
      {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted">{eyebrow}</p>}
      <AnimatedHeading as="h2" text={title} className="gradient-text text-3xl font-bold md:text-4xl" />
      {description && <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>}
    </header>
  )
}
