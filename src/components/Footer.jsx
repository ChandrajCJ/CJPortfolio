import { Link } from 'react-router-dom'
import { profile } from '../data/profile'
import SocialLinks from './SocialLinks'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-content flex-col items-center gap-6 px-5 py-10 md:flex-row md:justify-between md:px-8">
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold text-fg">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">
            {profile.role} · {profile.location}
          </p>
        </div>

        <SocialLinks />

        <p className="text-xs text-muted">
          © {new Date().getFullYear()} · Built with{' '}
          <Link to="/" className="underline decoration-line underline-offset-4 hover:text-fg">
            React &amp; Tailwind
          </Link>
        </p>
      </div>
    </footer>
  )
}
