import SectionHeading from './SectionHeading'

/**
 * One band of the scrolling home page. `id` is the scroll anchor.
 *
 * `fullHeight` sizes the band to the viewport minus the 4rem nav, and lays its
 * children out as a column so one of them can flex to fill whatever is left
 * after the heading.
 *
 * `screen` makes the band at least one full viewport tall with its content
 * centred vertically; taller content still grows the band. 100dvh rather than
 * 100vh, which jumps when mobile Safari's address bar collapses.
 */
export default function Section({ id, eyebrow, title, description, alt = false, fullHeight = false, screen = false, children }) {
  const size = fullHeight
    ? 'flex min-h-[calc(100svh-4rem)] flex-col py-10 md:py-12'
    : screen
      ? 'flex min-h-[100dvh] flex-col justify-center pb-10 pt-20'
      : 'py-20 md:py-28'

  return (
    <section id={id} className={`border-t border-line px-5 md:px-8 ${alt ? 'bg-surface/30' : ''} ${size}`}>
      <div className={`mx-auto w-full max-w-content ${fullHeight ? 'flex min-h-0 flex-1 flex-col' : ''}`}>
        {title && <SectionHeading eyebrow={eyebrow} title={title} description={description} />}
        {children}
      </div>
    </section>
  )
}
