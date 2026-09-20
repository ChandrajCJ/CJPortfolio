import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FiDownload, FiMenu, FiX } from 'react-icons/fi'
import logo from '../assets/cjlogo.png'
import { profile } from '../data/profile'
import { posts } from '../data/posts'
import { NAV_ITEMS } from '../data/nav'
import { useI18n } from '../i18n/context'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useI18n()

  const items = posts.length
    ? [...NAV_ITEMS.slice(0, 4), { to: '/writing', key: 'writing' }, NAV_ITEMS[4]]
    : NAV_ITEMS

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const linkClass = ({ isActive }) =>
    `relative rounded-md px-2.5 py-2 text-sm font-medium transition-colors ${
      isActive ? 'text-fg' : 'text-muted hover:text-fg'
    }`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-line bg-bg/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-5 md:px-8">
        <Link to="/home" className="flex shrink-0 items-center gap-2.5" aria-label={profile.name}>
          <img src={logo} alt="" width="32" height="32" className="h-8 w-8 rounded-md" />
          <span className="text-sm font-semibold tracking-tight text-fg">{profile.shortName}</span>
        </Link>

        <nav aria-label={t('nav.primary')} className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {items.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={linkClass}>
                  {({ isActive }) => (
                    <>
                      {t(`nav.${item.key}`)}
                      {isActive && (
                        <span aria-hidden="true" className="gradient-bg absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link
            to="/resume"
            className="hidden items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-fg transition-colors hover:bg-elevated md:inline-flex"
          >
            <FiDownload aria-hidden="true" />
            {t('nav.resume')}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-fg lg:hidden"
          >
            {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label={t('nav.menu')} className="border-t border-line bg-bg lg:hidden">
          <ul className="mx-auto max-w-content px-5 py-3">
            {[...items, { to: '/resume', key: 'resume' }].map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-md px-2 py-3 text-base font-medium transition-colors ${
                      isActive ? 'bg-surface text-fg' : 'text-muted hover:bg-surface hover:text-fg'
                    }`
                  }
                >
                  {t(`nav.${item.key}`)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
