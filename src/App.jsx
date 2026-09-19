import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import SmoothScroll from './components/SmoothScroll'
import ScrollProgress from './components/ScrollProgress'
import Grain from './components/Grain'
import Analytics from './components/Analytics'
import ScrollManager from './components/ScrollManager'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import PostDetail from './pages/PostDetail'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <SmoothScroll />
      <ScrollManager />
      <ScrollProgress />
      <Grain />
      <Analytics />
      <Cursor />
      <Header />

      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/writing/:slug" element={<PostDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}
