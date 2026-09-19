import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiDownload, FiMenu, FiX } from 'react-icons/fi'
import { motion, useReducedMotion } from 'framer-motion'
import logo from '../assets/cjlogo.png'
import { profile } from '../data/profile'
import { posts } from '../data/posts'
import useActiveSection from '../hooks/useActiveSection'
import ThemeToggle from './ThemeToggle'

const BASE_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname, hash } = useLocation()
  const reduced = useReducedMotion()
  const onHome = pathname === '/'

  const links = useMemo(
    () => (posts.length ? [...BASE_LINKS.slice(0, 3), { id: 'writing', label: 'Writing' }, BASE_LINKS[3]] : BASE_LINKS),
    [],
  )

  const ids = useMemo(() => links.map((l) => l.id), [links])
  const active = useActiveSection(ids, { enabled: onHome })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route or hash changes.
  useEffect(() => setOpen(false), [pathname, hash])

  // Trap nothing, but at least let Escape dismiss the menu.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const hrefFor = (id) => (onHome ? `#${id}` : `/#${id}`)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-line bg-bg/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-5 md:px-8">
        <Link to="/" className="flex items-center gap-2.5" aria-label={`${profile.name} — home`}>
          <img src={logo} alt="" width="32" height="32" className="h-8 w-8 rounded-md" />
          <span className="text-sm font-semibold tracking-tight text-fg">{profile.shortName}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => {
              const isActive = onHome && active === link.id
              return (
                <li key={link.id}>
                  <a
                    href={hrefFor(link.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId={reduced ? undefined : 'nav-underline'}
                        className="gradient-bg absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full"
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={profile.cv}
            download
            className="hidden items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-fg transition-colors hover:bg-elevated md:inline-flex"
          >
            <FiDownload aria-hidden="true" />
            CV
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-fg md:hidden"
          >
            {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-bg md:hidden">
          <ul className="mx-auto max-w-content px-5 py-3">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={hrefFor(link.id)}
                  className="block rounded-md px-2 py-3 text-base font-medium text-muted transition-colors hover:bg-surface hover:text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.cv}
                download
                className="mt-2 flex items-center gap-2 rounded-md px-2 py-3 text-base font-medium text-accent"
              >
                <FiDownload aria-hidden="true" />
                Download CV
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
