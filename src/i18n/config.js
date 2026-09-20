/**
 * Supported locales. `dir` drives the document's `dir` attribute, which is what
 * makes the Arabic build a real Bi-Di test rather than a translation demo.
 */
export const LOCALES = {
  en: { code: 'en', label: 'English', native: 'English', dir: 'ltr', flag: '🇬🇧' },
  ta: { code: 'ta', label: 'Tamil', native: 'தமிழ்', dir: 'ltr', flag: '🇮🇳' },
  hi: { code: 'hi', label: 'Hindi', native: 'हिन्दी', dir: 'ltr', flag: '🇮🇳' },
  ar: { code: 'ar', label: 'Arabic', native: 'العربية', dir: 'rtl', flag: '🇸🇦' },
  de: { code: 'de', label: 'German', native: 'Deutsch', dir: 'ltr', flag: '🇩🇪' },
  ja: { code: 'ja', label: 'Japanese', native: '日本語', dir: 'ltr', flag: '🇯🇵' },
}

export const LOCALE_CODES = Object.keys(LOCALES)
export const DEFAULT_LOCALE = 'en'
export const STORAGE_KEY = 'cj-locale'

/** Best-effort match of the browser's preferred languages to a supported locale. */
export function detectLocale() {
  if (typeof navigator === 'undefined') return DEFAULT_LOCALE
  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = String(tag).toLowerCase().split('-')[0]
    if (LOCALE_CODES.includes(base)) return base
  }
  return DEFAULT_LOCALE
}
