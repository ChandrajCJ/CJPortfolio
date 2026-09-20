/**
 * Deployment topology behind the centralized login service, rendered by the 3D
 * globe. Coordinates are approximate regional centroids.
 */
/** Where Chandraj works from - the origin for every connection arc. */
export const origin = {
  id: 'origin',
  label: 'Puducherry',
  city: 'South India',
  lat: 11.94,
  lon: 79.83,
}

export const regions = [
  { id: 'na', label: 'NA', city: 'N. Virginia', lat: 38.9, lon: -77.0, clouds: ['AWS', 'GCP', 'Azure'] },
  { id: 'eu', label: 'EU', city: 'Frankfurt', lat: 50.1, lon: 8.7, clouds: ['AWS', 'GCP', 'Azure'] },
  { id: 'au', label: 'AU', city: 'Sydney', lat: -33.9, lon: 151.2, clouds: ['AWS', 'GCP', 'Azure'] },
]

export const hyperscalers = ['AWS', 'GCP', 'Azure']

export const environmentCounts = { production: 7, staging: 3, development: 22 }

export default regions
