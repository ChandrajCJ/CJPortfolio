import { useEffect, useMemo, useState } from 'react'
import { DEFAULT_THEME, THEME_IDS, getTheme } from '../data/themes'
import { ThemeContext } from './themeContext'

const STORAGE_KEY = 'cj-theme'

/** Stored choice if valid, otherwise the default. */
function readInitialTheme() {
  if (typeof window === 'undefined') return DEFAULT_THEME
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && THEME_IDS.includes(stored)) return stored
  } catch {
    // localStorage can throw in private mode - fall back to the default.
  }
  return DEFAULT_THEME
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    // Greyscale is :root, so it carries no class.
    root.classList.remove(...THEME_IDS.filter((id) => id !== DEFAULT_THEME))
    if (theme !== DEFAULT_THEME) root.classList.add(theme)

    const { scheme, bar } = getTheme(theme)
    root.style.colorScheme = scheme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bar)

    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Ignore - the theme still applies for this session.
    }
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      setTheme: (next) => THEME_IDS.includes(next) && setThemeState(next),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
