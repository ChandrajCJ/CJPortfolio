import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * React Router preserves scroll across navigations. Reset to the top on a new
 * path, but honour `/home#section` links arriving from a detail route.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      // Wait for the target section to mount before scrolling to it.
      const raf = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' })
      })
      return () => cancelAnimationFrame(raf)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
