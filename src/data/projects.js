/**
 * Structure only - titles, blurbs, descriptions and highlights live in
 * src/locales/*. `needsReview` marks copy inferred from the title and stack
 * rather than a source of truth.
 */
export const projects = [
  {
    slug: 'tagalong',
    year: 2026,
    featured: true,
    flagship: true, // spans the whole projects row
    image: 'tagalong',
    tech: ['TypeScript', 'React Native', 'Fastify', 'PostgreSQL', 'Redis', 'WebSockets', 'BullMQ', 'Ollama', 'Docker'],
    demo: 'https://tagalong-u4wh.onrender.com/',
    repo: 'https://github.com/ChandrajCJ/tagalong',
    needsReview: false,
  },
  { slug: 'chat-app', year: 2025, featured: true, image: null, tech: ['ReactJS', 'TypeScript', 'Vite', 'Tailwind CSS', 'Firebase'], demo: 'https://cjchatapp.netlify.app/', repo: null, needsReview: false },
  { slug: 'eventhub', year: 2024, featured: true, image: 'eventhub', tech: ['ReactJS', 'Tailwind CSS', 'Node.js', 'Firebase'], demo: 'https://eventhubproject.netlify.app/', repo: null, needsReview: false },
  { slug: 'ecommerce', year: 2024, featured: false, image: 'ecommerce', tech: ['ReactJS', 'CSS', 'Node.js'], demo: null, repo: null, needsReview: true },
  { slug: 'connect', year: 2023, featured: false, image: 'connect', tech: ['HTML', 'CSS', 'JavaScript'], demo: null, repo: null, needsReview: true },
  { slug: 'studentportal', year: 2023, featured: false, image: 'studentportal', tech: ['HTML', 'CSS'], demo: null, repo: null, needsReview: true },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug) ?? null

export default projects
