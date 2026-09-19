import { useRef, useState } from 'react'
import { FiLoader, FiSend } from 'react-icons/fi'
import emailjs from '@emailjs/browser'
import { profile } from '../data/profile'
import SectionHeading from '../components/SectionHeading'
import SocialLinks from '../components/SocialLinks'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const FIELDS = [
  { id: 'name', label: 'Name', type: 'text', autoComplete: 'name', placeholder: 'Ada Lovelace' },
  { id: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'ada@example.com' },
]

function validate({ name, email, message }) {
  const errors = {}
  if (!name.trim()) errors.name = 'Please tell me your name.'
  if (!email.trim()) errors.email = 'I need an email to reply to.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'That email address looks off.'
  if (!message.trim()) errors.message = 'Please add a message.'
  else if (message.trim().length < 10) errors.message = 'A little more detail would help.'
  return errors
}

export default function Contact() {
  const formRef = useRef(null)
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const configured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)
  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }))

  async function onSubmit(e) {
    e.preventDefault()

    // Honeypot: real users never fill a hidden field.
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

  return (
    <section id="contact" className="border-t border-line px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-content gap-12 md:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's connect"
            description="Open to interesting problems, collaborations, and new opportunities. I usually reply within a day or two."
          />
          <a
            href={`mailto:${profile.email}`}
            className="text-lg font-medium text-fg underline decoration-line underline-offset-8 transition-colors hover:decoration-accent"
          >
            {profile.email}
          </a>
          <p className="mt-2 text-sm text-muted">{profile.location}</p>
          <SocialLinks className="mt-8" size="lg" />
        </div>

        <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
          {FIELDS.map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="mb-1.5 block text-sm font-medium text-fg">
                {field.label}
              </label>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
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
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="What are you working on?"
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

          {/* Honeypot - hidden from humans and assistive tech alike. */}
          <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="company">Company (leave blank)</label>
            <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="gradient-bg inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'sending' ? (
              <>
                <FiLoader aria-hidden="true" className="motion-safe:animate-spin" /> Sending…
              </>
            ) : (
              <>
                Send message <FiSend aria-hidden="true" />
              </>
            )}
          </button>

          <p aria-live="polite" className="min-h-[1.25rem] text-sm">
            {status === 'sent' && <span className="text-emerald-400">Thanks — your message is on its way.</span>}
            {status === 'error' &&
              (configured ? (
                <span className="text-red-400">
                  That didn&apos;t send. Please email me directly at{' '}
                  <a href={`mailto:${profile.email}`} className="underline">
                    {profile.email}
                  </a>
                  .
                </span>
              ) : (
                <span className="text-red-400">
                  The contact form isn&apos;t configured yet. Please email me at{' '}
                  <a href={`mailto:${profile.email}`} className="underline">
                    {profile.email}
                  </a>
                  .
                </span>
              ))}
          </p>
        </form>
      </div>
    </section>
  )
}
