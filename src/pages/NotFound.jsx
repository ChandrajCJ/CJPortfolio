import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/context'
import Seo from '../components/Seo'

export default function NotFound() {
  const { t } = useI18n()

  return (
    <>
      <Seo title={t('notFound.title')} description={t('notFound.description')} path="/404" />

      <div className="mx-auto grid min-h-[70vh] max-w-content place-items-center px-5 py-24 text-center">
        <div>
          <p className="text-accent text-7xl font-bold">404</p>
          <h1 className="mt-4 text-2xl font-bold text-fg">{t('notFound.title')}</h1>
          <p className="mx-auto mt-3 max-w-sm text-muted">{t('notFound.description')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/home" className="btn-accent inline-flex h-11 items-center rounded-full px-6 font-medium">
              {t('common.backToHome')}
            </Link>
            <Link
              to="/projects"
              className="inline-flex h-11 items-center rounded-full border border-line bg-surface px-6 font-medium text-fg"
            >
              {t('notFound.seeProjects')}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
