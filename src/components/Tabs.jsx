import { useId, useRef, useState } from 'react'

/**
 * Accessible tablist with roving tabindex and arrow-key navigation.
 * Used for in-page tab groups on the scrolling home page.
 */
export default function Tabs({ tabs, ariaLabel }) {
  const [active, setActive] = useState(tabs[0]?.id)
  const baseId = useId()
  const refs = useRef({})

  const move = (dir) => {
    const i = tabs.findIndex((t) => t.id === active)
    const next = tabs[(i + dir + tabs.length) % tabs.length]
    setActive(next.id)
    refs.current[next.id]?.focus()
  }

  const current = tabs.find((t) => t.id === active) ?? tabs[0]

  return (
    <>
      <div role="tablist" aria-label={ariaLabel} className="mb-10 flex flex-wrap gap-2 border-b border-line">
        {tabs.map((tab) => {
          const selected = tab.id === active
          return (
            <button
              key={tab.id}
              ref={(el) => {
                refs.current[tab.id] = el
              }}
              role="tab"
              type="button"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') { e.preventDefault(); move(1) }
                if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1) }
              }}
              className={`-mb-px border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                selected ? 'border-accent text-fg' : 'border-transparent text-muted hover:text-fg'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-${current.id}`}
        aria-labelledby={`${baseId}-tab-${current.id}`}
        tabIndex={0}
        className="focus-visible:outline-none"
      >
        {current.content}
      </div>
    </>
  )
}
