/** Static stand-in while the 3D chunk loads, or when WebGL is unavailable. */
export default function GlobeFallback() {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-square w-full overflow-hidden rounded-full border border-line"
      style={{
        background:
          'radial-gradient(circle at 38% 32%, rgba(49,97,228,0.45), transparent 58%), radial-gradient(circle at 68% 72%, rgba(173,7,239,0.4), transparent 58%)',
      }}
    />
  )
}
