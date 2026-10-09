import Seo from '../components/Seo'
import Hero from '../sections/Hero'
import AboutSection from '../sections/AboutSection'
import ExperienceSection from '../sections/ExperienceSection'
import ExpertiseSection from '../sections/ExpertiseSection'
import ProjectsSection from '../sections/ProjectsSection'
import ContributionsSection from '../sections/ContributionsSection'
import ContactSection from '../sections/ContactSection'
import AstroTrail from '../components/AstroTrail'

/** The whole portfolio as one scrolling page; detail views stay routed. */
export default function Home() {
  return (
    <>
      <Seo path="/home" />
      <Hero />
      <AboutSection />
      <ExperienceSection />
      <ExpertiseSection />
      <ProjectsSection />
      <ContributionsSection />
      <ContactSection />
      <AstroTrail />
    </>
  )
}
