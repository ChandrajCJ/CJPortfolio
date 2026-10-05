import contributions from '../../data/contributions.json'

/**
 * Flat heatmap shown while the 3D chunk loads, and permanently where WebGL is
 * unavailable or the visitor has asked for reduced motion. Same data, no canvas.
 */
export default function SkylineFallback() {
  return (
    <div
      className="grid w-full gap-[3px] overflow-hidden"
      style={{ gridTemplateRows: 'repeat(7, 1fr)', gridAutoFlow: 'column', gridAutoColumns: '1fr' }}
      aria-hidden="true"
    >
      {contributions.days.map((day) => (
        <span
          key={day.date}
          className="aspect-square rounded-[2px]"
          style={{
            backgroundColor:
              day.level === 0 ? 'rgb(var(--elevated))' : `rgb(var(--accent) / ${0.22 + day.level * 0.195})`,
          }}
        />
      ))}
    </div>
  )
}
