import { useI18n } from '../i18n/context'
import Section from '../components/Section'
import Tabs from '../components/Tabs'
import SkillsContent from './SkillsContent'
import CertificationsContent from './CertificationsContent'

export default function ExpertiseSection() {
  const { t } = useI18n()

  return (
    <Section
      id="skills"
      alt
      eyebrow={t('skills.eyebrow')}
      title={t('skills.title')}
      description={t('skills.description')}
    >
      <Tabs
        ariaLabel={t('skills.eyebrow')}
        tabs={[
          { id: 'skills', label: t('nav.skills'), content: <SkillsContent /> },
          { id: 'certifications', label: t('nav.certifications'), content: <CertificationsContent /> },
        ]}
      />
    </Section>
  )
}
