/**
 * Tiled SVG noise for depth on flat surfaces.
 *
 * Deliberately no mix-blend-mode: a full-screen blend layer forces the whole
 * viewport to recomposite whenever anything above it moves (the cursor) or
 * below it repaints (the WebGL canvas). At this opacity the blended and plain
 * versions are visually indistinguishable, so the cost buys nothing.
 */
export default function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.03]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  )
}
