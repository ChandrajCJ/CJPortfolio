import { useEffect, useRef, useState } from 'react'
import { FiMessageCircle, FiRefreshCw, FiSend, FiX } from 'react-icons/fi'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/profile'
import { useI18n } from '../i18n/context'

const ENDPOINT = '/api/astro'
const MAX_CHARS = 1000

/** Floating assistant grounded in Chandraj's CV. The model call happens in a
 *  Netlify function so the API key is never exposed to the browser. */
export default function AstroChat() {
  const { t, dir } = useI18n()
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [status, setStatus] = useState('idle') // idle | sending | error | unconfigured

  const listRef = useRef(null)
  const inputRef = useRef(null)
  const panelRef = useRef(null)

  const suggestions = t('chat.suggestions')
  const suggestionList = Array.isArray(suggestions) ? suggestions : []

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    inputRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: reduced ? 'auto' : 'smooth' })
  }, [messages, status, reduced])

  async function send(text) {
    const trimmed = text.trim().slice(0, MAX_CHARS)
    if (!trimmed || status === 'sending') return

    const next = [...messages, { role: 'user', content: trimmed }]
    setMessages(next)
    setInput('')
    setStatus('sending')

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })

      if (res.status === 503) {
        setStatus('unconfigured')
        return
      }
      if (!res.ok) {
        setStatus('error')
        return
      }

      const data = await res.json()
      if (!data?.reply) {
        setStatus('error')
        return
      }

      setMessages((m) => [...m, { role: 'assistant', content: data.reply }])
      setStatus('idle')
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setMessages([])
    setStatus('idle')
    setInput('')
    inputRef.current?.focus()
  }

  const panelMotion = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 16, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 16, scale: 0.96 },
        transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="astro-panel"
        aria-label={open ? t('chat.close') : t('chat.open')}
        className="gradient-bg fixed bottom-5 end-5 z-[70] grid h-14 w-14 place-items-center rounded-full text-white shadow-xl shadow-gradTo/25 transition-transform hover:scale-105"
      >
        {open ? <FiX aria-hidden="true" size={22} /> : <FiMessageCircle aria-hidden="true" size={22} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            {...panelMotion}
            ref={panelRef}
            id="astro-panel"
            role="dialog"
            aria-modal="false"
            aria-label={`${t('chat.name')} — ${t('chat.subtitle')}`}
            dir={dir}
            className="fixed bottom-24 end-5 z-[70] flex max-h-[min(34rem,calc(100vh-8rem))] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-line bg-bg shadow-2xl"
          >
            <header className="flex items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="gradient-bg grid h-8 w-8 place-items-center rounded-full text-sm font-bold text-white">
                  A
                </span>
                <div>
                  <p className="text-sm font-semibold text-fg">{t('chat.name')}</p>
                  <p className="text-xs text-muted">{t('chat.subtitle')}</p>
                </div>
              </div>
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  aria-label={t('chat.clear')}
                  title={t('chat.clear')}
                  className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-elevated hover:text-fg"
                >
                  <FiRefreshCw aria-hidden="true" size={15} />
                </button>
              )}
            </header>

            <div ref={listRef} className="thin-scroll flex-1 space-y-3 overflow-y-auto px-4 py-4">
              <div className="flex gap-2">
                <p className="max-w-[85%] rounded-2xl rounded-ss-sm bg-surface px-3.5 py-2.5 text-sm leading-relaxed text-fg">
                  {t('chat.greeting')}
                </p>
              </div>

              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <p
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'gradient-bg rounded-ee-sm text-white'
                        : 'rounded-ss-sm bg-surface text-fg'
                    }`}
                  >
                    {m.content}
                  </p>
                </div>
              ))}

              {messages.length === 0 && suggestionList.length > 0 && (
                <ul className="flex flex-col gap-2 pt-1">
                  {suggestionList.map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => send(s)}
                        className="w-full rounded-xl border border-line bg-elevated px-3 py-2 text-start text-xs text-muted transition-colors hover:border-accent/50 hover:text-fg"
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <p aria-live="polite" className="text-xs text-muted">
                {status === 'sending' && <span className="italic">{t('chat.thinking')}</span>}
                {status === 'error' && <span className="text-red-400">{t('chat.error')}</span>}
                {status === 'unconfigured' && (
                  <span className="text-red-400">
                    {String(t('chat.unconfigured')).replace('{email}', profile.email)}
                  </span>
                )}
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="border-t border-line bg-surface p-3"
            >
              <div className="flex items-end gap-2">
                <label htmlFor="astro-input" className="sr-only">
                  {t('chat.placeholder')}
                </label>
                <textarea
                  id="astro-input"
                  ref={inputRef}
                  rows={1}
                  value={input}
                  maxLength={MAX_CHARS}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      send(input)
                    }
                  }}
                  placeholder={t('chat.placeholder')}
                  className="thin-scroll max-h-24 flex-1 resize-none rounded-xl border border-line bg-bg px-3 py-2 text-sm text-fg placeholder:text-muted/60"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || status === 'sending'}
                  aria-label={t('chat.send')}
                  className="gradient-bg grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white transition-opacity disabled:opacity-40"
                >
                  <FiSend aria-hidden="true" size={16} className="rtl:-scale-x-100" />
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-muted">{t('chat.disclaimer')}</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
