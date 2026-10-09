import { useEffect } from 'react'
import { track } from '../lib/track'

// Umami website ids are public by design (they ship in the page), so the live
// site's id is the default. The env vars override it, e.g. for a self-hosted Umami.
const WEBSITE_ID = import.meta.env.VITE_UMAMI_WEBSITE_ID || '153fb724-a0e1-4646-a117-2329d8bee77b'
const SRC = import.meta.env.VITE_UMAMI_SRC || 'https://cloud.umami.is/script.js'
// Comma-separated hostnames to count, so local builds and deploy previews stay out of the stats.
const DOMAINS = import.meta.env.VITE_UMAMI_DOMAINS || 'developedbycj.netlify.app'

/**
 * Privacy-friendly, cookie-free analytics via Umami. Never loaded in
 * development, and only counted on the hostnames in DOMAINS.
 *
 * Page views (including client-side route changes) are tracked by the script.
 * Clicks on elements with `data-umami-event` are tracked automatically; other
 * events go through lib/track.js. A `?ref=` tag on the link a visitor arrived
 * by (e.g. ?ref=acme on a job application) is recorded as a "ref" event.
 */
export default function Analytics() {
  useEffect(() => {
    if (!WEBSITE_ID || import.meta.env.DEV) return
    if (document.querySelector('script[data-website-id]')) return

    const script = document.createElement('script')
    script.defer = true
    script.src = SRC
    script.dataset.websiteId = WEBSITE_ID
    if (DOMAINS) script.dataset.domains = DOMAINS
    script.onload = () => {
      const ref = new URLSearchParams(window.location.search).get('ref')
      if (ref) track('ref', { ref: ref.slice(0, 50) })
    }
    document.head.appendChild(script)
  }, [])

  return null
}
