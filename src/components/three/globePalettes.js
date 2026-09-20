/**
 * Colours arrive as a prop rather than from theme context: react-three-fiber
 * renders into its own reconciler root, so context from the page does not cross
 * the <Canvas> boundary.
 */
export const GLOBE_PALETTES = {
  dark: {
    core: '#0E1018', // sphere body, hides far-side geometry
    land: '#6E7885', // borders and coastlines
    marker: '#E8EAED', // destination regions
    dot: '#FFFFFF', // marker cores and the travelling dot
    accent: '#FF6B35', // origin marker and its connections
  },
  grey: {
    core: '#0B0B0B',
    land: '#6F6F6F',
    marker: '#EDEDED',
    dot: '#FFFFFF',
    accent: '#D4D4D4',
  },
  light: {
    core: '#FFFFFF',
    land: '#5F6976',
    marker: '#1F2937',
    dot: '#111827',
    accent: '#C2410C',
  },
}
