import AnimatedHeading from './AnimatedHeading'

/** Consistent top-of-page block for every routed section. */
export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <header className="mb-12 max-w-3xl">
      {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted">{eyebrow}</p>}
      <AnimatedHeading as="h1" text={title} className="gradient-text text-3xl font-bold md:text-5xl" />
      {description && <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{description}</p>}
      {children}
    </header>
  )
}
