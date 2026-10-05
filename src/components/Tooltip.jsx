/**
 * Visible label for an icon-only control, shown on hover and on keyboard focus.
 *
 * Replaces the native `title` attribute, which only appears after a delay, never
 * on keyboard focus and never on touch - so icon buttons read as unlabelled.
 * Focus uses :focus-visible, so a mouse click doesn't leave the tip stuck open.
 *
 * Purely visual: the wrapped control keeps its own aria-label, so the tip is
 * hidden from assistive tech rather than announced twice.
 */
export default function Tooltip({ label, side = 'top', hidden = false, children }) {
  return (
    <span className="group/tip relative inline-flex">
      {children}
      {!hidden && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-elevated px-2 py-1 text-xs font-medium text-fg opacity-0 shadow-lg transition-opacity duration-150 group-hover/tip:opacity-100 group-has-[:focus-visible]/tip:opacity-100 ${
            side === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2'
          }`}
        >
          {label}
        </span>
      )}
    </span>
  )
}
