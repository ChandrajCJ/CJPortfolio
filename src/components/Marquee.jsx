/**
 * Infinite ticker. The track holds two identical copies and translates by -50%,
 * so the loop is seamless. Pauses on hover and under prefers-reduced-motion
 * (handled by the `motion-safe:` prefix plus the global media query).
 */
export default function Marquee({ items, speed = 38 }) {
  const doubled = [...items, ...items]

  return (
    <div
      className="group relative flex overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <ul
        aria-hidden="true"
        className="flex shrink-0 items-center gap-3 pr-3 motion-safe:animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <li
            key={`${item}-${i}`}
            className="whitespace-nowrap rounded-full border border-line bg-elevated px-4 py-2 text-sm font-medium text-muted"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
