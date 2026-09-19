import { useEffect } from 'react'

const DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN

/**
 * Privacy-friendly, cookie-free analytics — and entirely opt-in: with
 * VITE_PLAUSIBLE_DOMAIN unset, no third-party script is ever loaded.
 */
export default function Analytics() {
  useEffect(() => {
    if (!DOMAIN || import.meta.env.DEV) return
    if (document.querySelector('script[data-domain]')) return

    const script = document.createElement('script')
    script.defer = true
    script.dataset.domain = DOMAIN
    script.src = 'https://plausible.io/js/script.js'
    document.head.appendChild(script)
  }, [])

  return null
}
