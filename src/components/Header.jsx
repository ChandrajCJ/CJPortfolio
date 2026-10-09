import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { DownloadSimple, List, X } from '@phosphor-icons/react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import logo from '../assets/cjlogo.png'
import { profile } from '../data/profile'
import { NAV_ITEMS } from '../data/nav'
import { useI18n } from '../i18n/context'
import useActiveSection from '../hooks/useActiveSection'
import ThemeSwitcher from './ThemeSwitcher'
import LanguageSwitcher from './LanguageSwitcher'
import Tooltip from './Tooltip'

const EASE = [0.16, 1, 0.3, 1]
const TOP_ZONE = 120 // px of scroll within which the page counts as "at the top"

/**
 * Floating island nav.
 *
 * At the top of the page the island shows every section. Once you are reading,
 * it collapses to the section you are in plus a progress bar, so it tells you
 * where you are instead of repeating the menu; hover, keyboard focus or a click
 * opens it again. Phones get the same island with a full-screen sheet for the
 * links. Replaces a full-width logo / links / pills bar and a separate progress
 * line under it.
 */
export default function Header() {
  const { t } = useI18n()
  const { pathname } = useLocation()
  const reduced = useReducedMotion()

  const onHome = pathname === '/home' || pathname === '/'
  const ids = useMemo(() => NAV_ITEMS.map((i) => i.id), [])
  const active = useActiveSection(ids, { enabled: onHome })

  const [atTop, setAtTop] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [pinned, setPinned] = useState(false) // opened by click or keyboard
  const [sheet, setSheet] = useState(false) // phone menu
  const islandRef = useRef(null)
  const linksRef = useRef(null)
  const labelRef = useRef(null)
  const hoverTimer = useRef(null)
  const [widths, setWidths] = useState(null) // natural widths of the two states
  const measured = useRef(false) // the first width lands instantly, not as a spring from 0
  const focusFirstLink = useRef(false)
  const focusToggle = useRef(false)

  // Motion's scroll value rather than a window scroll listener: no work per
  // frame beyond flipping a boolean when the top-zone line is crossed.
  const { scrollY, scrollYProgress } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setAtTop(y < TOP_ZONE))
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 })

  const expanded = !onHome || atTop || hovered || pinned

  // Both states stay mounted, stacked; the slot's width springs between their
  // natural widths. Re-measured whenever either changes (language, font load,
  // section label).
  useLayoutEffect(() => {
    const measure = () =>
      setWidths({ links: linksRef.current?.scrollWidth ?? 0, label: labelRef.current?.scrollWidth ?? 0 })
    measure()
    const ro = new ResizeObserver(measure)
    if (linksRef.current) ro.observe(linksRef.current)
    if (labelRef.current) ro.observe(labelRef.current)
    return () => ro.disconnect()
  }, [])

  // Hover intent: a short delay to open and a longer one to close, so brushing
  // past the island doesn't make it flicker open and shut.
  const onEnter = () => {
    clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setHovered(true), 60)
  }
  const onLeave = () => {
    clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setHovered(false), 220)
  }
  useEffect(() => () => clearTimeout(hoverTimer.current), [])

  // Close an explicitly opened island when focus or a click leaves it.
  useEffect(() => {
    if (!pinned) return
    const onDown = (e) => !islandRef.current?.contains(e.target) && setPinned(false)
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      // The focused link is about to be hidden; hand focus back to the pill.
      if (islandRef.current?.contains(document.activeElement)) focusToggle.current = true
      setPinned(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [pinned])

  useEffect(() => {
    // Wait a frame: the target layer only turns visible as its animation starts.
    if (expanded && focusFirstLink.current) {
      focusFirstLink.current = false
      requestAnimationFrame(() => islandRef.current?.querySelector('nav a')?.focus())
    } else if (!expanded && focusToggle.current) {
      focusToggle.current = false
      requestAnimationFrame(() => islandRef.current?.querySelector('nav button')?.focus())
    }
  }, [expanded])

  // Phone sheet: Escape closes it, and the page behind it stops scrolling.
  useEffect(() => {
    if (!sheet) return
    const onKey = (e) => e.key === 'Escape' && setSheet(false)
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [sheet])

  // From a detail route, anchors need to travel back to the home page first.
  const hrefFor = (id) => (onHome ? `#${id}` : `/home#${id}`)
  const current = NAV_ITEMS.find((i) => i.id === active)
  const currentLabel = atTop || !current ? profile.shortName : t(`nav.${current.key}`)

  const spring = reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 38, mass: 0.9 }
  // The incoming layer fades in a beat after the width starts moving, the
  // outgoing one leaves at once; blur softens the overlap.
  const layer = (shown) =>
    shown
      ? { opacity: 1, filter: 'blur(0px)', visibility: 'visible', transition: { duration: reduced ? 0 : 0.22, delay: reduced ? 0 : 0.07 } }
      : { opacity: 0, filter: 'blur(4px)', transition: { duration: reduced ? 0 : 0.12 }, transitionEnd: { visibility: 'hidden' } }

  // While the phone sheet is open the header must sit above the chat launcher (z-[70]).
  return (
    <header className={`pointer-events-none fixed inset-x-0 top-3 flex justify-center px-3 ${sheet ? 'z-[80]' : 'z-50'}`}>
      <div
        ref={islandRef}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setPinned(false)}
        className="pointer-events-auto flex h-12 items-center gap-1 rounded-full border border-line bg-surface/85 p-1 shadow-[0_8px_30px_-12px_rgb(var(--bg)/0.9),inset_0_1px_0_rgb(var(--fg)/0.06)] backdrop-blur-md"
      >
        <div>
          <Link
            to="/home"
            onClick={() => window.scrollTo({ top: 0 })}
            aria-label={profile.name}
            className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-elevated"
          >
            <img src={logo} alt="" width="28" height="28" className="h-7 w-7 rounded-md" />
          </Link>
        </div>

        <nav aria-label={t('nav.primary')} className="flex items-center">
          {/* Wide screens: the links, or the current section while reading. */}
          <motion.div
            initial={false}
            animate={widths ? { width: expanded ? widths.links : widths.label } : undefined}
            transition={measured.current ? spring : { duration: 0 }}
            onAnimationComplete={() => {
              measured.current = true
            }}
            className="relative hidden h-10 overflow-hidden md:block"
          >
            <motion.ul
              ref={linksRef}
              initial={false}
              animate={layer(expanded)}
              className="absolute start-0 top-0 flex h-10 items-center whitespace-nowrap"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = onHome && !atTop && active === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={hrefFor(item.id)}
                      onClick={() => setPinned(false)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative block rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                        isActive ? 'text-fg' : 'text-muted hover:text-fg'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId={reduced ? undefined : 'island-active'}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="absolute inset-0 -z-10 rounded-full bg-elevated"
                        />
                      )}
                      {t(`nav.${item.key}`)}
                    </a>
                  </li>
                )
              })}
            </motion.ul>

            <motion.button
              ref={labelRef}
              initial={false}
              animate={layer(!expanded)}
              type="button"
              onClick={(e) => {
                // A keyboard press (detail 0) carries focus into the links it reveals.
                if (e.detail === 0) focusFirstLink.current = true
                setPinned(true)
              }}
              aria-expanded={expanded}
              aria-label={`${t('nav.openMenu')} (${currentLabel})`}
              className="absolute start-0 top-0 flex h-10 items-center gap-3 whitespace-nowrap rounded-full px-3.5 text-sm font-medium text-fg transition-colors hover:bg-elevated"
            >
              <CurrentLabel label={currentLabel} reduced={reduced} />
              <ProgressBar progress={progress} />
            </motion.button>
          </motion.div>

          {/* Phones: where you are, and the sheet for everything else. */}
          <button
            type="button"
            onClick={() => setSheet(true)}
            aria-expanded={sheet}
            aria-controls="nav-sheet"
            aria-label={`${t('nav.openMenu')} (${currentLabel})`}
            className="flex items-center gap-2.5 rounded-full px-3 py-2 text-sm font-medium text-fg md:hidden"
          >
            <CurrentLabel label={currentLabel} reduced={reduced} />
            <ProgressBar progress={progress} />
          </button>
        </nav>

        <div className="flex items-center gap-0.5">
          <span aria-hidden="true" className="mx-1 h-5 w-px bg-line" />
          <div className="hidden items-center gap-0.5 md:flex">
            <LanguageSwitcher bare />
            <ThemeSwitcher bare />
          </div>
          <Tooltip label={t('nav.resume')} side="bottom">
            <Link
              to="/resume"
              aria-label={t('nav.resume')}
              data-umami-event="resume-open"
              data-umami-event-from="nav"
              className="hidden h-10 w-10 place-items-center rounded-full text-fg transition-colors hover:bg-elevated md:grid"
            >
              <DownloadSimple aria-hidden="true" />
            </Link>
          </Tooltip>
          <button
            type="button"
            onClick={() => setSheet(true)}
            aria-expanded={sheet}
            aria-controls="nav-sheet"
            aria-label={t('nav.openMenu')}
            className="grid h-10 w-10 place-items-center rounded-full text-fg transition-colors hover:bg-elevated md:hidden"
          >
            <List aria-hidden="true" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {sheet && (
          <motion.nav
            id="nav-sheet"
            aria-label={t('nav.menu')}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            className="pointer-events-auto fixed inset-0 z-50 flex flex-col bg-bg/95 px-6 pb-10 pt-6 backdrop-blur-md md:hidden"
          >
            <div className="flex items-center justify-end gap-2">
              <LanguageSwitcher />
              <ThemeSwitcher />
              <button
                type="button"
                onClick={() => setSheet(false)}
                aria-label={t('nav.closeMenu')}
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-fg"
              >
                <X aria-hidden="true" />
              </button>
            </div>

            <ul className="mt-10 flex-1 space-y-2">
              {NAV_ITEMS.map((item, i) => {
                const isActive = onHome && !atTop && active === item.id
                return (
                  <motion.li
                    key={item.id}
                    initial={reduced ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: reduced ? 0 : 0.04 + i * 0.05, ease: EASE }}
                  >
                    <a
                      href={hrefFor(item.id)}
                      onClick={() => setSheet(false)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`block py-1 text-4xl font-semibold tracking-tight ${isActive ? 'text-fg' : 'text-muted'}`}
                    >
                      {t(`nav.${item.key}`)}
                    </a>
                  </motion.li>
                )
              })}
            </ul>

            <Link
              to="/resume"
              onClick={() => setSheet(false)}
              data-umami-event="resume-open"
              data-umami-event-from="nav-phone"
              className="btn-accent flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-base font-semibold"
            >
              <DownloadSimple aria-hidden="true" />
              {t('nav.resume')}
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

/** The current section's name; slides when the section changes. */
function CurrentLabel({ label, reduced }) {
  return (
    <span className="relative block overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={label}
          initial={reduced ? false : { y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { y: '-100%', opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.22, ease: EASE }}
          className="block whitespace-nowrap"
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/** How far down the page you are. */
function ProgressBar({ progress }) {
  return (
    <span aria-hidden="true" className="relative block h-0.5 w-10 overflow-hidden rounded-full bg-line">
      <motion.span style={{ scaleX: progress }} className="bg-accent absolute inset-0 origin-left rounded-full" />
    </span>
  )
}
