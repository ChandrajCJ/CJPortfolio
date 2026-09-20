import { useCallback, useEffect, useMemo, useState } from 'react'
import { DEFAULT_LOCALE, LOCALES, STORAGE_KEY, detectLocale } from './config'
import { I18nContext } from './context'
import en from '../locales/en'

// Non-default locales are code-split, so a visitor only downloads their own.
const loaders = import.meta.glob('../locales/*.js')

function readStored() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && LOCALES[stored]) return stored
  } catch {
    // Private mode - fall through to detection.
  }
  return detectLocale()
}

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(readStored)
  const [messages, setMessages] = useState(en)

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (locale === DEFAULT_LOCALE) {
        setMessages(en)
        return
      }
      const loader = loaders[`../locales/${locale}.js`]
      if (!loader) {
        setMessages(en)
        return
      }
      try {
        const mod = await loader()
        if (!cancelled) setMessages(mod.default ?? en)
      } catch {
        if (!cancelled) setMessages(en)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [locale])

  useEffect(() => {
    const { dir } = LOCALES[locale] ?? LOCALES[DEFAULT_LOCALE]
    document.documentElement.lang = locale
    document.documentElement.dir = dir
    try {
      localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      // Ignore - the choice still applies for this session.
    }
  }, [locale])

  const setLocale = useCallback((next) => {
    if (LOCALES[next]) setLocaleState(next)
  }, [])

  /**
   * Dot-path lookup with English fallback, so a missing translation degrades to
   * English instead of rendering a raw key.
   */
  const t = useCallback(
    (path, fallback) => {
      const walk = (obj) => path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj)
      const value = walk(messages)
      if (value !== undefined) return value
      const base = walk(en)
      if (base !== undefined) return base
      return fallback ?? path
    },
    [messages],
  )

  const value = useMemo(
    () => ({ locale, setLocale, t, dir: (LOCALES[locale] ?? LOCALES[DEFAULT_LOCALE]).dir, messages }),
    [locale, setLocale, t, messages],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
