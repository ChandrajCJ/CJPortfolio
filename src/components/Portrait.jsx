import { useState } from 'react'
import { profile } from '../data/profile'

/**
 * Renders /portrait.jpg from the public folder if it exists, otherwise a
 * gradient monogram. Drop a file at public/portrait.jpg to enable it - no code
 * change required.
 */
export default function Portrait({ className = '' }) {
  const [failed, setFailed] = useState(false)

  const initials = profile.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  if (failed) {
    return (
      <div
        className={`gradient-bg grid aspect-square w-full place-items-center rounded-xl text-4xl font-bold text-white ${className}`}
        aria-hidden="true"
      >
        {initials}
      </div>
    )
  }

  return (
    <img
      src="/portrait.jpg"
      alt={profile.name}
      width="480"
      height="480"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`aspect-square w-full rounded-xl object-cover ${className}`}
    />
  )
}
