import { NavLink } from 'react-router-dom'

/**
 * Route-backed tabs: each panel keeps its own URL, so tabs are shareable,
 * indexable and survive a refresh. `end` keeps the parent tab from matching
 * its children.
 */
export default function TabNav({ tabs }) {
  return (
    <div role="tablist" aria-orientation="horizontal" className="mb-10 flex flex-wrap gap-2 border-b border-line">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end
          role="tab"
          className={({ isActive }) =>
            `-mb-px border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
              isActive ? 'border-accent text-fg' : 'border-transparent text-muted hover:text-fg'
            }`
          }
        >
          {({ isActive }) => <span aria-current={isActive ? 'page' : undefined}>{tab.label}</span>}
        </NavLink>
      ))}
    </div>
  )
}
