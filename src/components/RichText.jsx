import { Fragment } from 'react'

/**
 * Minimal Markdown renderer for assistant replies.
 *
 * Deliberately not a Markdown library and deliberately not innerHTML: the input
 * is model output, so it is parsed into React elements and never injected as
 * HTML. React escapes text nodes, which removes the XSS surface entirely.
 *
 * Supports the subset models actually emit in short answers: bold, italic,
 * inline code, links, bullet lists, numbered lists and paragraphs.
 */

const INLINE = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*\n]+\*|\[[^\]]+\]\([^)\s]+\))/g

/** Only http(s) and mailto survive; anything else renders as plain text. */
const safeHref = (url) => (/^(https?:|mailto:)/i.test(url) ? url : null)

function renderInline(text, keyPrefix) {
  const parts = text.split(INLINE).filter(Boolean)

  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`

    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={key} className="rounded bg-elevated px-1 py-0.5 font-mono text-[0.85em]">
          {part.slice(1, -1)}
        </code>
      )
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={key} className="font-semibold text-fg">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={key}>{part.slice(1, -1)}</em>
    }

    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/)
    if (link) {
      const href = safeHref(link[2])
      if (!href) return <Fragment key={key}>{link[1]}</Fragment>
      return (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="underline underline-offset-2 hover:text-accent"
        >
          {link[1]}
        </a>
      )
    }

    return <Fragment key={key}>{part}</Fragment>
  })
}

/** Group lines into paragraphs and lists. */
function parseBlocks(markdown) {
  const blocks = []
  let paragraph = []
  let list = null

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: 'p', lines: [...paragraph] })
      paragraph = []
    }
  }
  const flushList = () => {
    if (list) {
      blocks.push(list)
      list = null
    }
  }

  for (const raw of String(markdown).split('\n')) {
    const line = raw.trimEnd()

    if (!line.trim()) {
      flushParagraph()
      flushList()
      continue
    }

    const bullet = line.match(/^\s*[-*•]\s+(.*)$/)
    const numbered = line.match(/^\s*\d+[.)]\s+(.*)$/)

    if (bullet || numbered) {
      flushParagraph()
      const type = bullet ? 'ul' : 'ol'
      if (!list || list.type !== type) {
        flushList()
        list = { type, items: [] }
      }
      list.items.push((bullet ?? numbered)[1])
      continue
    }

    flushList()
    // Strip heading markers - a heading inside a chat bubble is noise.
    paragraph.push(line.replace(/^#{1,6}\s+/, ''))
  }

  flushParagraph()
  flushList()
  return blocks
}

export default function RichText({ children, className = '' }) {
  const blocks = parseBlocks(children)

  return (
    <div className={`space-y-2 ${className}`}>
      {blocks.map((block, i) => {
        if (block.type === 'p') {
          return (
            <p key={i} className="leading-relaxed">
              {block.lines.map((line, j) => (
                <Fragment key={j}>
                  {j > 0 && <br />}
                  {renderInline(line, `${i}-${j}`)}
                </Fragment>
              ))}
            </p>
          )
        }

        const List = block.type === 'ol' ? 'ol' : 'ul'
        return (
          <List
            key={i}
            className={`space-y-1 ps-5 leading-relaxed ${
              block.type === 'ol' ? 'list-decimal' : 'list-disc'
            } marker:text-muted`}
          >
            {block.items.map((item, j) => (
              <li key={j}>{renderInline(item, `${i}-${j}`)}</li>
            ))}
          </List>
        )
      })}
    </div>
  )
}
