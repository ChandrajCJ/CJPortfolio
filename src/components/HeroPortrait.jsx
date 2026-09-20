import { useState } from 'react'
import { profile } from '../data/profile'
import { origin } from '../data/topology'
import { useI18n } from '../i18n/context'

/**
 * Hero visual. Renders public/portrait.jpg when present, otherwise a framed
 * monogram, so the layout is identical either way and the photo is a drop-in.
 *
 * The coordinate caption is the same origin the topology globe arcs from.
 */
export default function HeroPortrait() {
  const [failed, setFailed] = useState(false)
  const { t } = useI18n()

  const initials = profile.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const lat = `${Math.abs(origin.lat).toFixed(2)}°${origin.lat >= 0 ? 'N' : 'S'}`
  const lon = `${Math.abs(origin.lon).toFixed(2)}°${origin.lon >= 0 ? 'E' : 'W'}`

  return (
    <figure className="mx-auto w-full max-w-sm md:max-w-md">
      <div className="relative overflow-hidden rounded-xl border border-line bg-surface">
        {failed ? (
          <div className="grid aspect-[4/5] w-full place-items-center">
            <span className="font-mono text-6xl font-bold text-accent">{initials}</span>
          </div>
        ) : (
          <picture>
            <source srcSet="/headshot.webp" type="image/webp" />
            <img
              src="/headshot.jpg"
              alt={`${profile.name}, ${t('meta.role')}`}
              width="880"
              height="1004"
              // Above the fold, so no lazy loading.
              loading="eager"
              decoding="async"
              onError={() => setFailed(true)}
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </picture>
        )}

        {/* Corner ticks - a small technical framing device. */}
        <span aria-hidden="true" className="absolute left-3 top-3 h-3 w-3 border-l border-t border-fg/25" />
        <span aria-hidden="true" className="absolute right-3 top-3 h-3 w-3 border-r border-t border-fg/25" />
        <span aria-hidden="true" className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-fg/25" />
        <span aria-hidden="true" className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-fg/25" />
      </div>

      <figcaption className="mt-3 flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        <span>{t(`education.locations.${profile.locationKey}`)}</span>
        <span dir="ltr">{`${lat} ${lon}`}</span>
      </figcaption>
    </figure>
  )
}
