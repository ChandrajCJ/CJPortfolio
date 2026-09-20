import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'
import { profile } from '../data/profile'

const ICONS = {
  github: FaGithub,
  linkedin: FaLinkedin,
  email: FiMail,
  whatsapp: FaWhatsapp,
  instagram: FaInstagram,
}

/**
 * Official brand colours on hover.
 *
 * GitHub's mark is monochrome (#181717), which would be invisible on the dark
 * themes, so it resolves to the theme foreground - which is what GitHub itself
 * does in dark mode. Email has no brand, so it takes the site accent.
 */
const HOVER = {
  github: 'hover:text-fg',
  linkedin: 'hover:text-[#0A66C2]',
  email: 'hover:text-accent',
  whatsapp: 'hover:text-[#25D366]',
  instagram: 'hover:text-[#E4405F]',
}

export default function SocialLinks({ className = '', size = 'md' }) {
  const dim = size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'

  return (
    <ul className={`flex items-center gap-5 ${className}`}>
      {profile.socials.map(({ label, href, icon }) => {
        const Icon = ICONS[icon] ?? FiMail
        const external = !href.startsWith('mailto:')
        return (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              title={label}
              {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
              className={`block text-muted transition-colors ${HOVER[icon] ?? 'hover:text-fg'}`}
            >
              <Icon className={dim} aria-hidden="true" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
