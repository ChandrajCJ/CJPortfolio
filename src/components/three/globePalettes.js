/**
 * Colours arrive as a prop rather than from theme context: react-three-fiber
 * renders into its own reconciler root, so context from the page does not cross
 * the <Canvas> boundary.
 *
 * `land` is drawn at 0.85 opacity over `core`; each pair clears 3:1, the floor
 * for meaningful non-text graphics. At the original 0.55 the borders measured
 * 2.10:1 and effectively vanished in greyscale.
 */
export const GLOBE_PALETTES = {
  grey: {
    core: '#0B0B0B', // sphere body, hides far-side geometry
    land: '#6F6F6F', // borders and coastlines
    marker: '#EDEDED', // destination regions
    dot: '#FFFFFF', // marker cores and the travelling dot
    accent: '#D4D4D4', // origin marker and its connections
  },
  dark: {
    core: '#0E1018',
    land: '#6E7885',
    marker: '#E8EAED',
    dot: '#FFFFFF',
    accent: '#FF6B35',
  },
  ocean: {
    core: '#0B1018',
    land: '#61748A',
    marker: '#E2EAF2',
    dot: '#FFFFFF',
    accent: '#38BDF8',
  },
  terminal: {
    core: '#080A08',
    land: '#627562',
    marker: '#DEE8DE',
    dot: '#FFFFFF',
    accent: '#4ADE80',
  },
  light: {
    core: '#FFFFFF',
    land: '#5F6976',
    marker: '#1F2937',
    dot: '#111827',
    accent: '#C2410C',
  },
  paper: {
    core: '#FFFFFF',
    land: '#6B665C',
    marker: '#1A1917',
    dot: '#1A1917',
    accent: '#3D3A35',
  },
}

export default GLOBE_PALETTES
