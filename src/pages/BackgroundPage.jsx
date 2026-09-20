import { useI18n } from '../i18n/context'
import Seo from '../components/Seo'
import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import TabNav from '../components/TabNav'
import ExperienceContent from '../sections/ExperienceContent'
import EducationContent from '../sections/EducationContent'

/** Experience and Education share a route group; `tab` comes from the route. */
export default function BackgroundPage({ tab = 'experience' }) {
  const { t } = useI18n()
  const isEducation = tab === 'education'

  const tabs = [
    { to: '/experience', label: t('nav.experience') },
    { to: '/experience/education', label: t('nav.education') },
  ]

  return (
    <>
      <Seo
        title={isEducation ? t('nav.education') : t('nav.experience')}
        description={isEducation ? undefined : t('experience.description')}
        path={isEducation ? '/experience/education' : '/experience'}
      />
      <Page>
        <PageHeader
          eyebrow={isEducation ? t('education.eyebrow') : t('experience.eyebrow')}
          title={isEducation ? t('education.title') : t('experience.title')}
          description={isEducation ? undefined : t('experience.description')}
        />
        <TabNav tabs={tabs} />
        {isEducation ? <EducationContent /> : <ExperienceContent />}
      </Page>
    </>
  )
}
