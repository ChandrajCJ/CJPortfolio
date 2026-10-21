/**
 * Grouped by domain rather than self-rated percentages: unverifiable "PHP 80%"
 * bars read as arbitrary to recruiters and are distrusted by peers.
 */
export const skillGroups = [
  { id: 'languages', label: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'C', 'C++', 'SQL'] },
  {
    id: 'frontend',
    label: 'Frontend & Mobile',
    items: [
      'ReactJS',
      'React Native (Expo)',
      'Next.js',
      'Redux Toolkit',
      'Module Federation',
      'Webpack',
      'Tailwind CSS',
      'shadcn/ui',
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: ['Node.js', 'NestJS', 'Fastify', 'Express.js', 'gRPC', 'REST APIs', 'WebSockets', 'BullMQ'],
  },
  {
    id: 'auth',
    label: 'Auth & Security',
    items: ['OAuth 2.0', 'SSO', 'SAML', 'OIDC', 'SCIM', 'RBAC', 'OPA', 'MFA / TOTP'],
  },
  { id: 'data', label: 'Databases', items: ['PostgreSQL', 'Drizzle ORM', 'MongoDB', 'Redis', 'Firebase', 'Supabase'] },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    items: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Jenkins', 'GoCD', 'ArgoCD', 'CI/CD'],
  },
  {
    id: 'ai',
    label: 'AI / ML Engineering',
    items: ['RAG', 'LangChain', 'Ollama', 'Prompt Engineering', 'AI Agents', 'LLM Automation', 'Vector Embeddings'],
  },
  {
    id: 'testing',
    label: 'Testing & Tools',
    items: ['Jest', 'Playwright', 'Selenium', 'Storybook', 'Automated Testing'],
  },
]

export default skillGroups
