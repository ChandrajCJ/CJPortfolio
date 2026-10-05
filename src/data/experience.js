/**
 * Structure only - role titles, summaries, highlight copy and labels live in
 * src/locales/*, keyed by the ids used here.
 *
 * `groups` decides which theme each highlight sits under and in what order;
 * each item id has a `{ title, detail }` entry under the job's `highlights` in
 * every locale; figures stay inside that copy. `promotedFrom` marks the role
 * this one was a promotion from, which draws the marker between them. `globe`
 * puts the deployment globe in the role's side column - it maps the login
 * service this role built.
 */
export const experience = [
  {
    id: 'contentstack-ase',
    company: 'Contentstack',
    start: 'Aug 2025',
    end: null, // null renders the localized "Present"
    current: true,
    promotedFrom: 'contentstack-intern',
    globe: true,
    groups: [
      { id: 'identity', items: ['rbac', 'login', 'bidi', 'oauth'] },
      { id: 'ai', items: ['snyk', 'review', 'slackAgent', 'skills'] },
      { id: 'platform', items: ['branding', 'core'] },
    ],
    tech: ['React', 'Node.js', 'TypeScript', 'OAuth 2.0', 'SAML', 'OIDC', 'SCIM', 'RBAC', 'OPA', 'AWS', 'Azure', 'GCP'],
  },
  {
    id: 'contentstack-intern',
    company: 'Contentstack',
    start: 'Jan 2025',
    end: 'Jul 2025',
    current: false,
    groups: [
      { id: 'identity', items: ['mfa', 'lytics', 'opaNav'] },
      { id: 'platform', items: ['mfe', 'rss'] },
    ],
    tech: ['React 18', 'Module Federation', 'Webpack', 'Node.js', 'TOTP/MFA', 'SSO', 'OPA', 'Playwright'],
  },
]

/** Highlight ids for a job in display order, across all of its groups. */
export const highlightIds = (job) => job.groups.flatMap((group) => group.items)

export default experience
