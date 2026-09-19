/**
 * Blog posts. Intentionally empty - the Writing section and its nav entry only
 * render when this array has entries, so an empty blog never ships.
 *
 * Shape:
 * {
 *   slug: 'micro-frontend-latency',
 *   title: 'Halving micro-frontend latency with Module Federation',
 *   date: '2026-01-15',
 *   readingMinutes: 6,
 *   summary: 'One-paragraph hook shown on the card.',
 *   tags: ['React', 'Performance'],
 *   externalUrl: null,   // set this to link out to Medium/Dev.to instead
 *   body: ['First paragraph.', 'Second paragraph.'],
 * }
 */
export const posts = []

export const getPost = (slug) => posts.find((p) => p.slug === slug) ?? null

export default posts
