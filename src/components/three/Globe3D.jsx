import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import GlobeScene from './GlobeScene'
import { GLOBE_PALETTES } from './globePalettes'
import { useTheme } from '../../context/themeContext'
import GlobeFallback from './GlobeFallback'

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')))
  } catch {
    return false
  }
}

export default function Globe3D() {
  const { theme } = useTheme()
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

  if (!ok) return <GlobeFallback />

  return (
    <div ref={wrapRef} className="aspect-square w-full">
      <Canvas
        camera={{ position: [0, 0.6, 4.6], fov: 45 }}
        dpr={[1, 1.75]}
        frameloop={active ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <GlobeScene palette={GLOBE_PALETTES[theme] ?? GLOBE_PALETTES.dark} />
        </Suspense>
      </Canvas>
    </div>
  )
}
