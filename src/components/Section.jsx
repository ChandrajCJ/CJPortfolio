import SectionHeading from './SectionHeading'

/** One band of the scrolling home page. `id` is the scroll anchor. */
export default function Section({ id, eyebrow, title, description, alt = false, children }) {
  return (
    <section
      id={id}
      className={`border-t border-line px-5 py-20 md:px-8 md:py-28 ${alt ? 'bg-surface/30' : ''}`}
    >
      <div className="mx-auto max-w-content">
        {title && <SectionHeading eyebrow={eyebrow} title={title} description={description} />}
        {children}
      </div>
    </section>
  )
}
