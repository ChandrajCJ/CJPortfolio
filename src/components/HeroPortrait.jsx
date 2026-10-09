import { useState } from 'react'
import { profile } from '../data/profile'
import { useI18n } from '../i18n/context'

/**
 * Hero visual. Renders public/portrait.jpg when present, otherwise a framed
 * monogram, so the layout is identical either way and the photo is a drop-in.
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

  return (
    <figure className="mx-auto w-full max-w-sm md:max-w-md">
      <div data-astro="portrait" className="relative overflow-hidden rounded-xl border border-line bg-surface">
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

      </div>

    </figure>
  )
}
