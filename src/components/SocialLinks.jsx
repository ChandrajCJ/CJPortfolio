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

/** Colours live in index.css so they can vary per theme - see .hover-* there. */
const HOVER = {
  github: 'hover-github',
  linkedin: 'hover-linkedin',
  email: 'hover-email',
  whatsapp: 'hover-whatsapp',
  instagram: 'hover-instagram',
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
              className={`block text-muted transition-colors ${HOVER[icon] ?? 'hover-github'}`}
            >
              <Icon className={dim} aria-hidden="true" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
