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
import ProjectDetail from './pages/ProjectDetail'
import ResumePage from './pages/ResumePage'
import PostDetail from './pages/PostDetail'
import NotFound from './pages/NotFound'

export default function App() {
  const { t } = useI18n()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-medium focus:text-onAccent"
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
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/writing/:slug" element={<PostDetail />} />

          {/* The section routes are now anchors on the scrolling home page. */}
          <Route path="/experience" element={<Navigate to="/home#experience" replace />} />
          <Route path="/experience/education" element={<Navigate to="/home#experience" replace />} />
          <Route path="/education" element={<Navigate to="/home#experience" replace />} />
          <Route path="/skills" element={<Navigate to="/home#skills" replace />} />
          <Route path="/skills/certifications" element={<Navigate to="/home#skills" replace />} />
          <Route path="/certifications" element={<Navigate to="/home#skills" replace />} />
          <Route path="/projects" element={<Navigate to="/home#projects" replace />} />
          <Route path="/contact" element={<Navigate to="/home#contact" replace />} />
          <Route path="/about" element={<Navigate to="/home#about" replace />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <AstroChat />
    </>
  )
}
