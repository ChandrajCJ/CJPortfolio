import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import SkylineScene from './SkylineScene'
import SkylineFallback from './SkylineFallback'
import { SKYLINE_PALETTES } from './skylinePalettes'
import { useTheme } from '../../context/themeContext'

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')))
  } catch {
    return false
  }
}

export default function Skyline3D() {
  const { theme } = useTheme()
  const reduced = useReducedMotion()
  const wrapRef = useRef(null)
  const [ok] = useState(supportsWebGL)
  const [active, setActive] = useState(true)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.05 })
    io.observe(el)
    const onVisibility = () => setActive(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  // Reduced motion gets the flat heatmap: an orbitable 3D object is motion.
  if (!ok || reduced) return <SkylineFallback />

  return (
    <div ref={wrapRef} className="h-full min-h-0 w-full">
      <Canvas
        camera={{ position: [0, 8.2, 12.1], fov: 34 }}
        dpr={[1, 1.75]}
        frameloop={active ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SkylineScene palette={SKYLINE_PALETTES[theme] ?? SKYLINE_PALETTES.dark} />
        </Suspense>
      </Canvas>
    </div>
  )
}
