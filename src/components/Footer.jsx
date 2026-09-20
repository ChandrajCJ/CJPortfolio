import { Link } from 'react-router-dom'
import { profile } from '../data/profile'
import { useI18n } from '../i18n/context'
import { NAV_ITEMS } from '../data/nav'
import SocialLinks from './SocialLinks'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="border-t border-line bg-surface print:hidden">
      <div className="mx-auto max-w-content px-5 py-12 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold text-fg">{profile.name}</p>
            <p className="mt-1 text-sm text-muted">
              {t('meta.role')} · {t(`education.locations.${profile.locationKey}`)}
            </p>
            <SocialLinks className="mt-5" />
          </div>

          <nav aria-label={t('nav.primary')}>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-muted transition-colors hover:text-fg">
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-10 border-t border-line pt-6 text-xs text-muted">
          © {new Date().getFullYear()} {profile.name} · {t('common.builtWith')}
        </p>
      </div>
    </footer>
  )
}
