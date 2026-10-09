import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import Analytics from './components/Analytics'
import SmoothScroll from './components/SmoothScroll'
import Grain from './components/Grain'
import ScrollManager from './components/ScrollManager'
import AstroChat from './components/AstroChat'
import KeepQueryNavigate from './components/KeepQueryNavigate'
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
      <Grain />
      <Cursor />
      <Header />

      <main id="main">
        <Routes>
          <Route path="/" element={<KeepQueryNavigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/writing/:slug" element={<PostDetail />} />

          {/* The section routes are now anchors on the scrolling home page. */}
          <Route path="/experience" element={<KeepQueryNavigate to="/home#experience" />} />
          <Route path="/experience/education" element={<KeepQueryNavigate to="/home#experience" />} />
          <Route path="/education" element={<KeepQueryNavigate to="/home#experience" />} />
          <Route path="/skills" element={<KeepQueryNavigate to="/home#skills" />} />
          <Route path="/skills/certifications" element={<KeepQueryNavigate to="/home#skills" />} />
          <Route path="/certifications" element={<KeepQueryNavigate to="/home#skills" />} />
          <Route path="/projects" element={<KeepQueryNavigate to="/home#projects" />} />
          <Route path="/contact" element={<KeepQueryNavigate to="/home#contact" />} />
          <Route path="/about" element={<KeepQueryNavigate to="/home#about" />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <AstroChat />
    </>
  )
}
