import { useEffect, useState } from 'react'

/**
 * Tracks which in-page section is currently in view so the nav can mark it
 * `aria-current`. Replaces the original nav, which had no active state at all.
 */
export default function useActiveSection(ids, { enabled = true } = {}) {
  const [active, setActive] = useState(ids[0] ?? null)

  useEffect(() => {
    if (!enabled) return

    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, enabled])

  return active
}
