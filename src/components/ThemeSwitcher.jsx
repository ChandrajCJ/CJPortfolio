import { useEffect, useRef, useState } from 'react'
import { Check, Circle, Drop, Feather, Moon, Sun, TerminalWindow } from '@phosphor-icons/react'
import { useTheme } from '../context/themeContext'
import { useI18n } from '../i18n/context'
import { THEMES as THEME_LIST } from '../data/themes'
import Tooltip from './Tooltip'

const ICONS = {
  grey: Circle,
  dark: Moon,
  ocean: Drop,
  terminal: TerminalWindow,
  light: Sun,
  paper: Feather,
}

const THEMES = THEME_LIST.map((t) => ({ id: t.id, Icon: ICONS[t.id] ?? Circle }))

/** Menu rather than a two-way toggle, so all three themes are reachable. */
export default function ThemeSwitcher({ bare = false }) {
  const { theme, setTheme } = useTheme()
  const { t } = useI18n()
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

  const Current = (THEMES.find((x) => x.id === theme) ?? THEMES[0]).Icon

  return (
    <div ref={wrapRef} className="relative">
      <Tooltip label={`${t('common.theme')}: ${t(`themes.${theme}`)}`} side="bottom" hidden={open}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label={`${t('common.changeTheme')} (${t(`themes.${theme}`)})`}
          className={`grid h-10 w-10 place-items-center rounded-full text-fg transition-colors hover:bg-elevated ${bare ? '' : 'border border-line bg-surface'}`}
        >
          <Current aria-hidden="true" />
        </button>
      </Tooltip>

      {open && (
        <ul
          role="menu"
          aria-label={t('common.theme')}
          className="absolute end-0 z-50 mt-2 min-w-[10rem] overflow-hidden rounded-xl border border-line bg-elevated py-1 shadow-xl"
        >
          {THEMES.map(({ id, Icon }) => {
            const selected = id === theme
            return (
              <li key={id} role="none">
                <button
                  role="menuitemradio"
                  aria-checked={selected}
                  type="button"
                  onClick={() => {
                    setTheme(id)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-sm transition-colors hover:bg-surface ${
                    selected ? 'text-fg' : 'text-muted'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon aria-hidden="true" />
                    {t(`themes.${id}`)}
                  </span>
                  {selected && <Check aria-hidden="true" className="text-accent" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
