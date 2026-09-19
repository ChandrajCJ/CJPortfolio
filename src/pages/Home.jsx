import Seo from '../components/Seo'
import Hero from '../sections/Hero'
import Stats from '../sections/Stats'
import About from '../sections/About'
import Experience from '../sections/Experience'
import Projects from '../sections/Projects'
import Writing from '../sections/Writing'
import Testimonials from '../sections/Testimonials'
import Contact from '../sections/Contact'

export default function Home() {
  return (
    <>
      <Seo path="/" />
      <Hero />
      <Stats />
      <About />
      <Experience />
      <Projects />
      <Writing />
      <Testimonials />
      <Contact />
    </>
  )
}
