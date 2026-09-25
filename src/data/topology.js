/**
 * Deployment topology behind the centralized login service, rendered by the 3D
 * globe.
 *
 * `regions` are the three broad regions the CV cites and drive the pills and
 * the "Regions" figure. `endpoints` are the seven production environments the
 * globe actually draws an arc to, so the arc count matches
 * environmentCounts.production rather than being decorative.
 */

/** Where Chandraj works from - the origin for every connection arc. */
export const origin = {
  id: 'origin',
  label: 'Puducherry',
  country: 'India',
  lat: 11.94,
  lon: 79.83,
}

export const regions = [
  // `label` matches the region codes used in the CV; the display names live in
  // the locale files under globe.names.
  { id: 'na', label: 'NA' },
  { id: 'eu', label: 'EU' },
  { id: 'au', label: 'AU' },
]

/**
 * Seven production environments. Real hyperscaler regions, chosen for maximum
 * separation within each continent so the markers stay individually legible on
 * a small globe - the closest pair is Dublin-Madrid at 1,448km, where an
 * Dublin/London/Frankfurt grouping put three markers within 640km.
 */
export const endpoints = [
  // North America - closest pair 3,309km
  { id: 'us-west', region: 'na', city: 'Oregon', lat: 45.8, lon: -119.7 },
  { id: 'ca-central', region: 'na', city: 'Montreal', lat: 45.5, lon: -73.6 },
  { id: 'mx-central', region: 'na', city: 'Queretaro', lat: 20.6, lon: -100.4 },

  // Europe - closest pair 1,448km
  { id: 'eu-west', region: 'eu', city: 'Dublin', lat: 53.3, lon: -6.3 },
  { id: 'eu-north', region: 'eu', city: 'Stockholm', lat: 59.3, lon: 18.1 },
  { id: 'eu-south', region: 'eu', city: 'Madrid', lat: 40.4, lon: -3.7 },

  // Australia
  { id: 'ap-southeast', region: 'au', city: 'Sydney', lat: -33.9, lon: 151.2 },
]

export const hyperscalers = ['AWS', 'GCP', 'Azure']

export const environmentCounts = { production: endpoints.length, staging: 3, development: 22 }

export default regions
