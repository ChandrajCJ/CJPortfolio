/**
 * Static stand-in shown while the 3D chunk loads, and permanently when WebGL is
 * unavailable. Lives in its own module so importing it never pulls in three.js.
 */
export default function Hero3DFallback() {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-square w-full overflow-hidden rounded-full"
      style={{
        background:
          'radial-gradient(circle at 35% 30%, rgba(49,97,228,0.55), transparent 55%), radial-gradient(circle at 70% 70%, rgba(173,7,239,0.5), transparent 55%)',
        filter: 'blur(6px)',
      }}
    />
  )
}
