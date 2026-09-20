/**
 * Structure only - titles, blurbs, descriptions and highlights live in
 * src/locales/*. `needsReview` marks copy inferred from the title and stack
 * rather than a source of truth.
 */
export const projects = [
  { slug: 'chat-app', year: 2025, featured: true, image: null, tech: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Firebase'], demo: 'https://cjchatapp.netlify.app/', repo: null, needsReview: false },
  { slug: 'eventhub', year: 2024, featured: true, image: 'eventhub', tech: ['ReactJS', 'Tailwind CSS', 'Node.js', 'Firebase'], demo: 'https://eventhubproject.netlify.app/', repo: null, needsReview: false },
  { slug: 'ecommerce', year: 2024, featured: false, image: 'ecommerce', tech: ['ReactJS', 'CSS', 'Node.js'], demo: null, repo: null, needsReview: true },
  { slug: 'connect', year: 2023, featured: false, image: 'connect', tech: ['HTML', 'CSS', 'JavaScript'], demo: null, repo: null, needsReview: true },
  { slug: 'studentportal', year: 2023, featured: false, image: 'studentportal', tech: ['HTML', 'CSS'], demo: null, repo: null, needsReview: true },
  { slug: 'todo', year: 2023, featured: false, image: 'todo', tech: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'], demo: null, repo: null, needsReview: true },
  { slug: 'olx', year: 2023, featured: false, image: 'olx', tech: ['HTML', 'CSS'], demo: null, repo: null, needsReview: true },
  { slug: 'restmenu', year: 2022, featured: false, image: 'restmenu', tech: ['HTML', 'CSS'], demo: null, repo: null, needsReview: true },
  { slug: 'travels', year: 2022, featured: false, image: 'travels', tech: ['HTML', 'CSS'], demo: null, repo: null, needsReview: true },
]

export const allTech = [...new Set(projects.flatMap((p) => p.tech))].sort((a, b) => a.localeCompare(b))
export const getProject = (slug) => projects.find((p) => p.slug === slug) ?? null

export default projects
