import { useEffect, useMemo, useState } from 'react'
import { ThemeContext } from './themeContext'

const STORAGE_KEY = 'cj-theme'

/** Resolve the initial theme: stored choice first, then OS preference. */
function readInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'grey') return stored
  } catch {
    // localStorage can throw in private mode - fall through to the OS setting.
  }
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'grey')
    if (theme !== 'dark') root.classList.add(theme)
    // Greyscale is a dark scheme as far as form controls and scrollbars go.
    root.style.colorScheme = theme === 'light' ? 'light' : 'dark'
    const bar = theme === 'light' ? '#ffffff' : theme === 'grey' ? '#0B0B0B' : '#0A0B0D'
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bar)
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Ignore - the theme still applies for this session.
    }
  }, [theme])

  // Follow the OS only while the visitor has not made an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: light)')
    if (!mq) return
    const onChange = (e) => {
      try {
        if (window.localStorage.getItem(STORAGE_KEY)) return
      } catch {
        // If storage is unreadable, assume no explicit choice was stored.
      }
      setTheme(e.matches ? 'light' : 'dark')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const value = useMemo(() => ({ theme, setTheme }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
