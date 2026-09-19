import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene3D from './Scene3D'
import Hero3DFallback from './Hero3DFallback'

/** Cheap WebGL capability probe - some low-power devices report no context. */
function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')))
  } catch {
    return false
  }
}

export default function Hero3D() {
  const wrapRef = useRef(null)
  const [ok] = useState(supportsWebGL)
  // Pause the render loop when scrolled away or the tab is hidden.
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

  if (!ok) return <Hero3DFallback />

  return (
    <div ref={wrapRef} className="aspect-square w-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        dpr={[1, 1.75]}
        frameloop={active ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </Canvas>
    </div>
  )
}
