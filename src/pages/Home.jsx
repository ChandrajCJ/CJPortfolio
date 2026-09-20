import Seo from '../components/Seo'
import Hero from '../sections/Hero'
import Stats from '../sections/Stats'
import AboutSection from '../sections/AboutSection'
import ExperienceSection from '../sections/ExperienceSection'
import ExpertiseSection from '../sections/ExpertiseSection'
import ProjectsSection from '../sections/ProjectsSection'
import ContactSection from '../sections/ContactSection'

/** The whole portfolio as one scrolling page; detail views stay routed. */
export default function Home() {
  return (
    <>
      <Seo path="/home" />
      <Hero />
      <Stats />
      <AboutSection />
      <ExperienceSection />
      <ExpertiseSection />
      <ProjectsSection />
      <ContactSection />
    </>
  )
}
