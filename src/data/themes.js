/**
 * Theme registry. `id` doubles as the class on <html> (except `grey`, which is
 * the :root default and needs no class) and as the locale key `themes.<id>`.
 *
 * `scheme` drives the CSS color-scheme property, which controls native form
 * controls and scrollbars. `bar` is the browser theme-color meta value.
 */
export const THEMES = [
  { id: 'grey', scheme: 'dark', bar: '#0B0B0B' },
  { id: 'dark', scheme: 'dark', bar: '#0A0B0D' },
  { id: 'ocean', scheme: 'dark', bar: '#090D12' },
  { id: 'terminal', scheme: 'dark', bar: '#080A08' },
  { id: 'light', scheme: 'light', bar: '#FFFFFF' },
  { id: 'paper', scheme: 'light', bar: '#FAF9F6' },
]

export const THEME_IDS = THEMES.map((t) => t.id)
export const DEFAULT_THEME = 'grey'
export const getTheme = (id) => THEMES.find((t) => t.id === id) ?? THEMES[0]

export default THEMES
