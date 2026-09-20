import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import Analytics from './components/Analytics'
import SmoothScroll from './components/SmoothScroll'
import ScrollProgress from './components/ScrollProgress'
import Grain from './components/Grain'
import ScrollManager from './components/ScrollManager'
import AstroChat from './components/AstroChat'
import { useI18n } from './i18n/context'

import Home from './pages/Home'
import BackgroundPage from './pages/BackgroundPage'
import ExpertisePage from './pages/ExpertisePage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetail from './pages/ProjectDetail'
import ResumePage from './pages/ResumePage'
import ContactPage from './pages/ContactPage'
import WritingPage from './pages/WritingPage'
import PostDetail from './pages/PostDetail'
import NotFound from './pages/NotFound'

export default function App() {
  const { t } = useI18n()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-medium focus:text-white"
      >
        {t('nav.skipToContent')}
      </a>

      <SmoothScroll />
      <ScrollManager />
      <Analytics />
      <ScrollProgress />
      <Grain />
      <Cursor />
      <Header />

      <main id="main">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/experience" element={<BackgroundPage tab="experience" />} />
          <Route path="/experience/education" element={<BackgroundPage tab="education" />} />
          <Route path="/skills" element={<ExpertisePage tab="skills" />} />
          <Route path="/skills/certifications" element={<ExpertisePage tab="certifications" />} />
          {/* Old standalone routes now live as tabs. */}
          <Route path="/education" element={<Navigate to="/experience/education" replace />} />
          <Route path="/certifications" element={<Navigate to="/skills/certifications" replace />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/writing" element={<WritingPage />} />
          <Route path="/writing/:slug" element={<PostDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <AstroChat />
    </>
  )
}
