import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

const BLUE = '#3161e4'
const PURPLE = '#ad07ef'

/** Morphing core with a wireframe shell orbiting it. */
function Core() {
  const inner = useRef(null)
  const shell = useRef(null)

  useFrame((state, delta) => {
    if (inner.current) inner.current.rotation.y += delta * 0.18
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.1
      shell.current.rotation.x += delta * 0.04
    }
    // Ease the core toward the pointer for a parallax feel.
    const { pointer } = state
    if (inner.current) {
      inner.current.rotation.z = THREE.MathUtils.lerp(inner.current.rotation.z, pointer.x * 0.25, 0.04)
      inner.current.position.y = THREE.MathUtils.lerp(inner.current.position.y, pointer.y * 0.18, 0.04)
    }
  })

  return (
    <group>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.35, 24]} />
        <MeshDistortMaterial
          color={BLUE}
          emissive={PURPLE}
          emissiveIntensity={0.28}
          roughness={0.18}
          metalness={0.85}
          distort={0.38}
          speed={1.4}
        />
      </mesh>

      <mesh ref={shell} scale={1.72}>
        <icosahedronGeometry args={[1.35, 2]} />
        <meshBasicMaterial color={PURPLE} wireframe transparent opacity={0.16} />
      </mesh>
    </group>
  )
}

/** Particle shell around the core. */
function Particles({ count = 420 }) {
  const ref = useRef(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 2.6 + Math.random() * 1.9
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.045
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.12
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#9bb4ff"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

export default function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 3]} intensity={1.6} color="#ffffff" />
      <pointLight position={[-4, -2, -3]} intensity={26} color={PURPLE} distance={14} />
      <pointLight position={[4, 2, 2]} intensity={20} color={BLUE} distance={14} />

      <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.7}>
        <Core />
      </Float>

      <Particles />
    </>
  )
}
