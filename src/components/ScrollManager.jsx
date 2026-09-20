import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** React Router preserves scroll across navigations; reset to the top instead. */
export default function ScrollManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
