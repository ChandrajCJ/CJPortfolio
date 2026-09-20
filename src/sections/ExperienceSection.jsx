import { useI18n } from '../i18n/context'
import Section from '../components/Section'
import Tabs from '../components/Tabs'
import ExperienceContent from './ExperienceContent'
import EducationContent from './EducationContent'

export default function ExperienceSection() {
  const { t } = useI18n()

  return (
    <Section
      id="experience"
      eyebrow={t('experience.eyebrow')}
      title={t('experience.title')}
      description={t('experience.description')}
    >
      <Tabs
        ariaLabel={t('experience.eyebrow')}
        tabs={[
          { id: 'experience', label: t('nav.experience'), content: <ExperienceContent /> },
          { id: 'education', label: t('nav.education'), content: <EducationContent /> },
        ]}
      />
    </Section>
  )
}
