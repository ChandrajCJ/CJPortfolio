import { createContext, useContext } from 'react'

export const I18nContext = createContext(null)

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}

/** Convenience: `const t = useT()` for components that only need lookups. */
export function useT() {
  return useI18n().t
}
