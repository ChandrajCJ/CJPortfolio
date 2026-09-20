import { useEffect } from 'react'
import { profile } from '../data/profile'
import { useI18n } from '../i18n/context'
import { LOCALES } from '../i18n/config'

function upsert(selector, attrs) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement(attrs.tag ?? 'meta')
    document.head.appendChild(el)
  }
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'tag' || v == null) continue
    el.setAttribute(k, v)
  }
  return el
}

/** Per-route title, description, canonical, hreflang and social-card tags. */
export default function Seo({ title, description, path = '/', image, type = 'website' }) {
  const { t, locale } = useI18n()

  const role = t('meta.role')
  const fullTitle = title ? `${title} — ${profile.name}` : `${profile.name} — ${role}`
  const desc = description ?? t('meta.tagline')
  const url = `${profile.siteUrl}${path}`
  const img = image ?? `${profile.siteUrl}/og-image.png`

  useEffect(() => {
    document.title = fullTitle

    upsert('meta[name="description"]', { name: 'description', content: desc })
    upsert('link[rel="canonical"]', { tag: 'link', rel: 'canonical', href: url })

    upsert('meta[property="og:title"]', { property: 'og:title', content: fullTitle })
    upsert('meta[property="og:description"]', { property: 'og:description', content: desc })
    upsert('meta[property="og:url"]', { property: 'og:url', content: url })
    upsert('meta[property="og:type"]', { property: 'og:type', content: type })
    upsert('meta[property="og:image"]', { property: 'og:image', content: img })
    upsert('meta[property="og:locale"]', { property: 'og:locale', content: locale })
    upsert('meta[property="og:site_name"]', { property: 'og:site_name', content: profile.name })

    upsert('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    upsert('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle })
    upsert('meta[name="twitter:description"]', { name: 'twitter:description', content: desc })
    upsert('meta[name="twitter:image"]', { name: 'twitter:image', content: img })

    // One canonical URL serves every language (the locale is a client-side
    // preference), so hreflang points each variant at the same path.
    for (const code of Object.keys(LOCALES)) {
      upsert(`link[rel="alternate"][hreflang="${code}"]`, {
        tag: 'link',
        rel: 'alternate',
        hreflang: code,
        href: url,
      })
    }
  }, [fullTitle, desc, url, img, type, locale])

  return null
}
