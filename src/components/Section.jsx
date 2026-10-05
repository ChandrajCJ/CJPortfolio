import SectionHeading from './SectionHeading'

/**
 * One band of the scrolling home page. `id` is the scroll anchor.
 *
 * `fullHeight` sizes the band to the viewport minus the fixed 4rem header, and
 * lays its children out as a column so one of them can flex to fill whatever is
 * left after the heading.
 */
export default function Section({ id, eyebrow, title, description, alt = false, fullHeight = false, children }) {
  return (
    <section
      id={id}
      className={`border-t border-line px-5 md:px-8 ${alt ? 'bg-surface/30' : ''} ${
        fullHeight ? 'flex min-h-[calc(100svh-4rem)] flex-col py-10 md:py-12' : 'py-20 md:py-28'
      }`}
    >
      <div className={`mx-auto w-full max-w-content ${fullHeight ? 'flex min-h-0 flex-1 flex-col' : ''}`}>
        {title && <SectionHeading eyebrow={eyebrow} title={title} description={description} />}
        {children}
      </div>
    </section>
  )
}
