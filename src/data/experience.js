/** Structure only - role titles, summaries and bullets live in src/locales/*. */
export const experience = [
  {
    id: 'contentstack-ase',
    company: 'Contentstack',
    start: 'Aug 2025',
    end: null, // null renders the localized "Present"
    current: true,
    tech: ['React', 'Node.js', 'TypeScript', 'OAuth 2.0', 'SAML', 'OIDC', 'SCIM', 'RBAC', 'OPA', 'AWS', 'Azure', 'GCP'],
  },
  {
    id: 'contentstack-intern',
    company: 'Contentstack',
    start: 'Jan 2025',
    end: 'Jul 2025',
    current: false,
    tech: ['React 18', 'Module Federation', 'Webpack', 'Node.js', 'TOTP/MFA', 'SSO', 'OPA', 'Playwright'],
  },
]

export default experience
