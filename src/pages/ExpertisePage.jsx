import { useI18n } from '../i18n/context'
import Seo from '../components/Seo'
import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import TabNav from '../components/TabNav'
import SkillsContent from '../sections/SkillsContent'
import CertificationsContent from '../sections/CertificationsContent'

/** Skills and Certifications share a route group; `tab` comes from the route. */
export default function ExpertisePage({ tab = 'skills' }) {
  const { t } = useI18n()
  const isCerts = tab === 'certifications'

  const tabs = [
    { to: '/skills', label: t('nav.skills') },
    { to: '/skills/certifications', label: t('nav.certifications') },
  ]

  return (
    <>
      <Seo
        title={isCerts ? t('nav.certifications') : t('nav.skills')}
        description={isCerts ? t('certifications.description') : t('skills.description')}
        path={isCerts ? '/skills/certifications' : '/skills'}
      />
      <Page>
        <PageHeader
          eyebrow={isCerts ? t('certifications.eyebrow') : t('skills.eyebrow')}
          title={isCerts ? t('certifications.title') : t('skills.title')}
          description={isCerts ? t('certifications.description') : t('skills.description')}
        />
        <TabNav tabs={tabs} />
        {isCerts ? <CertificationsContent /> : <SkillsContent />}
      </Page>
    </>
  )
}
