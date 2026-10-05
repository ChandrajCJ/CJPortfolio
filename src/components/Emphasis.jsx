import { Fragment } from 'react'

/**
 * Renders locale copy in which `**phrase**` marks the figures worth noticing.
 *
 * The marks live in each translation rather than being detected here, because
 * the same figure is phrased differently per language ("500+", "über 500",
 * "أكثر من 500", "500件以上") and only a translator knows where it starts and
 * ends. Text is never parsed as HTML.
 */
export default function Emphasis({ children, className = 'font-semibold text-fg' }) {
  return String(children ?? '')
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} className={className}>
          {part}
        </strong>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    )
}
