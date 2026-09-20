/**
 * Primary navigation. `key` resolves to `nav.<key>` in the locale files.
 * Experience/Education and Skills/Certifications are tab groups, so each pair
 * contributes a single top-level entry.
 */
export const NAV_ITEMS = [
  { to: '/home', key: 'home' },
  { to: '/experience', key: 'experience' },
  { to: '/skills', key: 'skills' },
  { to: '/projects', key: 'projects' },
  { to: '/contact', key: 'contact' },
]

export default NAV_ITEMS
