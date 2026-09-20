import { useRef, useState } from 'react'
import { FiLoader, FiSend } from 'react-icons/fi'
import emailjs from '@emailjs/browser'
import { profile } from '../data/profile'
import { useI18n } from '../i18n/context'
import Section from '../components/Section'
import SocialLinks from '../components/SocialLinks'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export default function ContactSection() {
  const { t } = useI18n()
  const formRef = useRef(null)
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const configured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)
  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }))

  function validate({ name, email, message }) {
    const found = {}
    if (!name.trim()) found.name = t('contact.errors.name')
    if (!email.trim()) found.email = t('contact.errors.emailRequired')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) found.email = t('contact.errors.emailInvalid')
    if (!message.trim()) found.message = t('contact.errors.messageRequired')
    else if (message.trim().length < 10) found.message = t('contact.errors.messageShort')
    return found
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (formRef.current?.elements?.company?.value) return

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      formRef.current?.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus()
      return
    }

    if (!configured) {
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY })
      setStatus('sent')
      setValues({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const fields = [
    { id: 'name', type: 'text', autoComplete: 'name' },
    { id: 'email', type: 'email', autoComplete: 'email' },
  ]

  return (
    <Section id="contact">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted font-mono">{t('contact.eyebrow')}</p>
          <h2 className="text-fg text-3xl font-bold md:text-4xl">{t('contact.title')}</h2>
          <p className="mb-8 mt-4 text-base leading-relaxed text-muted">{t('contact.description')}</p>
          <a
            href={`mailto:${profile.email}`}
            dir="ltr"
            className="text-lg font-medium text-fg underline decoration-line underline-offset-8 transition-colors hover:decoration-accent"
          >
            {profile.email}
          </a>
          <p className="mt-2 text-sm text-muted">{t(`education.locations.${profile.locationKey}`)}</p>
          <SocialLinks className="mt-8" size="lg" />
        </div>

          <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
            {fields.map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="mb-1.5 block text-sm font-medium text-fg">
                  {t(`contact.${field.id}`)}
                </label>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  placeholder={t(`contact.${field.id}Placeholder`)}
                  value={values[field.id]}
                  onChange={onChange}
                  aria-invalid={errors[field.id] ? 'true' : undefined}
                  aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
                  className={`w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-fg placeholder:text-muted/60 ${
                    errors[field.id] ? 'border-red-500' : 'border-line'
                  }`}
                />
                {errors[field.id] && (
                  <p id={`${field.id}-error`} className="mt-1.5 text-xs text-red-400">
                    {errors[field.id]}
                  </p>
                )}
              </div>
            ))}

            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-fg">
                {t('contact.message')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder={t('contact.messagePlaceholder')}
                value={values.message}
                onChange={onChange}
                aria-invalid={errors.message ? 'true' : undefined}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`thin-scroll w-full resize-y rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-fg placeholder:text-muted/60 ${
                  errors.message ? 'border-red-500' : 'border-line'
                }`}
              />
              {errors.message && (
                <p id="message-error" className="mt-1.5 text-xs text-red-400">
                  {errors.message}
                </p>
              )}
            </div>

            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="company">{t('contact.honeypot')}</label>
              <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-accent inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'sending' ? (
                <>
                  <FiLoader aria-hidden="true" className="motion-safe:animate-spin" /> {t('contact.sending')}
                </>
              ) : (
                <>
                  {t('contact.send')} <FiSend aria-hidden="true" className="rtl:-scale-x-100" />
                </>
              )}
            </button>

            <p aria-live="polite" className="min-h-[1.25rem] text-sm">
              {status === 'sent' && <span className="text-emerald-400">{t('contact.sent')}</span>}
              {status === 'error' && (
                <span className="text-red-400">
                  {String(configured ? t('contact.errorGeneric') : t('contact.errorUnconfigured')).replace(
                    '{email}',
                    profile.email,
                  )}
                </span>
              )}
            </p>
          </form>
      </div>
    </Section>
  )
}
