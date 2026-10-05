import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import contributions from '../../data/contributions.json'
import { SKYLINE_PALETTES } from './skylinePalettes'

const DAYS_PER_WEEK = 7
const PITCH = 1 // centre-to-centre spacing
const CELL = 0.82 // bar footprint, leaving a visible gap
const MIN_H = 0.12 // empty days still read as a tile, not a hole
const ROTATION = -Math.PI / 14 // slight turn so the grid reads as 3D, not flat-on
const MAX_BAR = MIN_H + 3.4 // tallest a bar can get, from heightFor()
const BASE_H = 0.12 // base plate thickness, hangs below y = 0
const MID_Y = (MAX_BAR - BASE_H) / 2 // vertical centre, so the orbit pivots on the model
const DEG = Math.PI / 180

/**
 * How far the visitor can orbit. Turned side-on, a 53x7 grid becomes a long
 * thin column and has to shrink to a sliver to stay framed, so the azimuth is
 * bounded to where it still reads as a skyline. The range is centred on the
 * face-on view (azimuth = ROTATION), not on the resting camera, so the model
 * turns as far each way before it starts to shrink.
 */
const ORBIT = {
  minAzimuth: ROTATION - 30 * DEG,
  maxAzimuth: ROTATION + 30 * DEG,
  minPolar: 45 * DEG,
  maxPolar: 70 * DEG,
}

const FILL = 0.9 // fraction of the canvas the model may span, leaving a margin
const _p = new THREE.Vector3()
const _bounds = { minX: 0, maxX: 0, minY: 0, maxY: 0 }

/**
 * Points whose hull is the model's outline at scale 1, already turned and
 * centred: the base plate's corners plus the top of each week's tallest bar.
 * Tighter than a bounding box, which would put the busiest day's height over
 * every week and frame a lot of empty air.
 */
function silhouette(days, busiest, weeks) {
  const halfW = (weeks * PITCH + 1.2) / 2
  const halfD = (DAYS_PER_WEEK * PITCH + 1.2) / 2
  const edgeZ = ((DAYS_PER_WEEK - 1) / 2) * PITCH + CELL / 2
  const points = []

  for (const x of [-halfW, halfW])
    for (const y of [-BASE_H, 0])
      for (const z of [-halfD, halfD]) points.push(new THREE.Vector3(x, y, z))

  for (let w = 0; w < weeks; w++) {
    const week = days.slice(w * DAYS_PER_WEEK, (w + 1) * DAYS_PER_WEEK)
    const top = Math.max(...week.map((day) => heightFor(day.count, busiest)))
    const cx = (w - (weeks - 1) / 2) * PITCH
    for (const x of [cx - CELL / 2, cx + CELL / 2])
      for (const z of [-edgeZ, edgeZ]) points.push(new THREE.Vector3(x, top, z))
  }

  const turn = new THREE.Matrix4().makeRotationY(ROTATION)
  return points.map((point) => point.setY(point.y - MID_Y).applyMatrix4(turn))
}

/** NDC extent of the points at this scale; false if any is behind the camera. */
function measure(camera, points, scale, out) {
  out.minX = out.minY = Infinity
  out.maxX = out.maxY = -Infinity
  for (const point of points) {
    _p.copy(point).multiplyScalar(scale).applyMatrix4(camera.matrixWorldInverse)
    if (_p.z > -camera.near) return false
    _p.applyMatrix4(camera.projectionMatrix)
    out.minX = Math.min(out.minX, _p.x)
    out.maxX = Math.max(out.maxX, _p.x)
    out.minY = Math.min(out.minY, _p.y)
    out.maxY = Math.max(out.maxY, _p.y)
  }
  return true
}

const fits = (camera, points, scale) =>
  measure(camera, points, scale, _bounds) &&
  _bounds.maxX - _bounds.minX <= 2 * FILL &&
  _bounds.maxY - _bounds.minY <= 2 * FILL

/**
 * Re-frames the model every frame so it never leaves the canvas.
 *
 * Projects the outline through the live camera and binary-searches the largest
 * scale whose on-screen extent fits. Perspective is not linear in scale, so a
 * closed-form estimate is not good enough: one that treated the turned grid as
 * axis-aligned came out 30% too large, which is why the skyline spilled past
 * the card before it was ever touched.
 *
 * The turn brings one end closer to the camera, so the projection is lopsided.
 * A lens shift (the projection matrix's off-axis terms) re-centres it; that is
 * a pure screen-space translation, so it cannot push anything back out.
 *
 * Solving per frame rather than once for the whole orbit keeps the model full
 * size at rest: one scale safe at every reachable angle would be far smaller on
 * a wide card. Turning it reads as the camera stepping back.
 */
function useFitToView(groupRef, weeks) {
  const points = useMemo(
    () => silhouette(contributions.days, contributions.busiestDay.count, weeks),
    [weeks],
  )

  useFrame(({ camera }) => {
    const group = groupRef.current
    if (!group) return

    const m = camera.projectionMatrix.elements
    m[8] = 0 // measure on-axis
    m[9] = 0
    camera.updateMatrixWorld()

    let lo = 0.01
    let hi = 2
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2
      if (fits(camera, points, mid)) lo = mid
      else hi = mid
    }

    group.scale.setScalar(lo)
    group.position.y = -MID_Y * lo

    measure(camera, points, lo, _bounds)
    m[8] = (_bounds.minX + _bounds.maxX) / 2
    m[9] = (_bounds.minY + _bounds.maxY) / 2
    camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert()
  })
}

/**
 * Square-root height scaling. A linear scale lets one 35-contribution day
 * tower over a field of 7s and flattens everything else; sqrt keeps the busy
 * days obviously taller while the typical week stays readable.
 */
function heightFor(count, busiest) {
  if (count <= 0) return MIN_H
  return MIN_H + Math.sqrt(count / busiest) * 3.4
}

/**
 * One InstancedMesh for all 366 bars — a single draw call rather than 366
 * meshes, which matters because this shares a page with the globe.
 */
function Bars({ palette }) {
  const ref = useRef(null)
  const { days, busiestDay } = contributions
  const weeks = Math.ceil(days.length / DAYS_PER_WEEK)

  const colors = useMemo(
    () => [palette.empty, ...palette.ramp].map((hex) => new THREE.Color(hex)),
    [palette],
  )

  useLayoutEffect(() => {
    const mesh = ref.current
    if (!mesh) return

    const dummy = new THREE.Object3D()
    days.forEach((day, i) => {
      const week = Math.floor(i / DAYS_PER_WEEK)
      const weekday = i % DAYS_PER_WEEK
      const h = heightFor(day.count, busiestDay.count)

      dummy.position.set(
        (week - (weeks - 1) / 2) * PITCH,
        h / 2,
        (weekday - (DAYS_PER_WEEK - 1) / 2) * PITCH,
      )
      dummy.scale.set(CELL, h, CELL)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
      mesh.setColorAt(i, colors[day.level] ?? colors[0])
    })

    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    mesh.computeBoundingBox()
    mesh.computeBoundingSphere()
  }, [days, busiestDay, weeks, colors])

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, days.length]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial roughness={0.55} metalness={0.08} />
    </instancedMesh>
  )
}

export default function SkylineScene({ palette = SKYLINE_PALETTES.dark, interactive = true }) {
  const groupRef = useRef(null)
  const weeks = Math.ceil(contributions.days.length / DAYS_PER_WEEK)
  useFitToView(groupRef, weeks)

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[18, 26, 14]} intensity={1.5} color={palette.light} />
      <directionalLight position={[-14, 10, -12]} intensity={0.5} color={palette.light} />

      <group ref={groupRef} rotation={[0, ROTATION, 0]}>
        <Bars palette={palette} />

        <mesh position={[0, -BASE_H / 2, 0]}>
          <boxGeometry args={[weeks * PITCH + 1.2, BASE_H, DAYS_PER_WEEK * PITCH + 1.2]} />
          <meshStandardMaterial color={palette.base} roughness={0.9} />
        </mesh>
      </group>

      {interactive && (
        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={false}
          rotateSpeed={0.4}
          minAzimuthAngle={ORBIT.minAzimuth}
          maxAzimuthAngle={ORBIT.maxAzimuth}
          minPolarAngle={ORBIT.minPolar}
          maxPolarAngle={ORBIT.maxPolar}
        />
      )}
    </>
  )
}
