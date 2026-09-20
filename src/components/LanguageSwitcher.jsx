import { useEffect, useRef, useState } from 'react'
import { FiCheck, FiGlobe } from 'react-icons/fi'
import { LOCALES, LOCALE_CODES } from '../i18n/config'
import { useI18n } from '../i18n/context'

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t('common.changeLanguage')}
        title={t('common.changeLanguage')}
        className="flex h-10 items-center gap-1.5 rounded-full border border-line bg-surface px-3 text-fg transition-colors hover:bg-elevated"
      >
        <FiGlobe aria-hidden="true" />
        <span className="text-xs font-semibold uppercase">{locale}</span>
      </button>

      {open && (
        <ul
          role="menu"
          aria-label={t('common.language')}
          className="absolute end-0 z-50 mt-2 min-w-[11rem] overflow-hidden rounded-xl border border-line bg-elevated py-1 shadow-xl"
        >
          {LOCALE_CODES.map((code) => {
            const l = LOCALES[code]
            const selected = code === locale
            return (
              <li key={code} role="none">
                <button
                  role="menuitemradio"
                  aria-checked={selected}
                  type="button"
                  lang={code}
                  dir={l.dir}
                  onClick={() => {
                    setLocale(code)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-sm transition-colors hover:bg-surface ${
                    selected ? 'text-fg' : 'text-muted'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span aria-hidden="true">{l.flag}</span>
                    <span>{l.native}</span>
                  </span>
                  {selected && <FiCheck aria-hidden="true" className="text-accent" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
