/**
 * Colours for the contribution skyline, keyed by theme.
 *
 * These arrive as a prop rather than from theme context, because
 * react-three-fiber renders in its own reconciler root and page context does
 * not cross the <Canvas> boundary.
 *
 * `ramp` runs level 1..4. Level 0 (no contributions) uses `empty`.
 */
export const SKYLINE_PALETTES = {
  grey: { empty: '#1C1C1C', ramp: ['#4A4A4A', '#777777', '#A8A8A8', '#E4E4E4'], base: '#121212', light: '#FFFFFF' },
  dark: { empty: '#1B1E24', ramp: ['#7A3418', '#B24A1F', '#E35C28', '#FF8A5B'], base: '#101318', light: '#FFD9C7' },
  ocean: { empty: '#161D26', ramp: ['#1B4A66', '#2273A0', '#2E9BD0', '#6FC8F5'], base: '#0D131A', light: '#CFEBFB' },
  terminal: { empty: '#12180F', ramp: ['#1F5C32', '#2C8A47', '#3DBD60', '#7BEE9B'], base: '#0A0E09', light: '#D6F7DF' },
  light: { empty: '#E9E7E4', ramp: ['#F0A882', '#E07845', '#C2410C', '#8A2D08'], base: '#F7F6F4', light: '#FFFFFF' },
  paper: { empty: '#E6E2DA', ramp: ['#BDB6A8', '#948B79', '#6B6252', '#3D3A35'], base: '#F4F1EA', light: '#FFFFFF' },
}

export default SKYLINE_PALETTES
