/**
 * Grouped by domain rather than self-rated percentages: unverifiable "PHP 80%"
 * bars read as arbitrary to recruiters and are distrusted by peers.
 */
export const skillGroups = [
  { id: 'languages', label: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'C', 'C++', 'SQL'] },
  {
    id: 'frontend',
    label: 'Frontend',
    items: ['ReactJS', 'Next.js', 'Module Federation', 'Webpack', 'Tailwind CSS', 'Framer Motion', 'Storybook'],
  },
  { id: 'backend', label: 'Backend', items: ['Node.js', 'NestJS', 'Express.js', 'gRPC', 'REST APIs'] },
  {
    id: 'auth',
    label: 'Auth & Security',
    items: ['OAuth 2.0', 'SSO', 'SAML', 'OIDC', 'SCIM', 'RBAC', 'OPA', 'MFA / TOTP'],
  },
  { id: 'data', label: 'Databases', items: ['SQL', 'MongoDB', 'Redis', 'Firebase', 'Supabase'] },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    items: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Jenkins', 'GoCD', 'ArgoCD', 'CI/CD'],
  },
  {
    id: 'ai',
    label: 'AI / ML Engineering',
    items: ['RAG', 'LangChain', 'Prompt Engineering', 'AI Agents', 'LLM Workflow Automation', 'Vector Embeddings'],
  },
  { id: 'testing', label: 'Testing & Tools', items: ['Selenium', 'Playwright', 'Git'] },
]

export default skillGroups
