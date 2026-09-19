export const experience = [
  {
    id: 'contentstack-ase',
    role: 'Associate Software Engineer',
    company: 'Contentstack',
    start: 'Aug 2025',
    end: 'Present',
    current: true,
    location: 'Remote',
    summary:
      'Own authentication and access-control infrastructure across a multi-cloud, multi-region SaaS platform, and build AI tooling that the wider engineering org uses day to day.',
    highlights: [
      'Architected and implemented a centralized login service authenticating users across 7 production environments (3 hyperscalers — AWS, GCP, Azure; 3 regions — NA, EU, AU), 3 staging, and 22 development environments, maintaining 100% uptime with SSO, MFA/OTP, backup codes, and password recovery.',
      'Designed and shipped end-to-end granular Role-Based Access Control (RBAC) across the monolith and 4 microservices, improving access-control granularity and aligning with industry security standards.',
      'Built bi-directional (Bi-Di) multi-language support into the login experience per region, plus a CMS-configurable login page letting marketing manage content dynamically.',
      'Implemented OAuth 2.0 for customer-facing APIs, enabling secure third-party integrations through a standards-compliant, token-based authorization flow with scoped access.',
      'Built automations using Claude routines to detect and remediate Snyk vulnerabilities, reducing open findings from 500+ to zero by automatically raising pull requests and posting them to Slack for review.',
      'Developed AI-powered code-review automations that validate pull requests against the acceptance criteria of the linked Jira ticket, improving review quality and consistency.',
      'Implemented an AI agent that responds to customer issues in Slack, drawing context from product documentation, prior chat history, data logs, and the codebase.',
      'Created and maintained reusable AI skills for engineering teams focused on authentication and platform workflows, reducing onboarding friction and ramp-up time.',
      'Adopted new organization-wide branding across the monolith and 10+ microservices for a cohesive experience on every customer-facing surface.',
      'Contributed to core platform features including SSO, SCIM, Teams, user management, and security.',
    ],
    tech: ['React', 'Node.js', 'TypeScript', 'OAuth 2.0', 'SAML', 'OIDC', 'SCIM', 'RBAC', 'OPA', 'AWS', 'Azure', 'GCP'],
  },
  {
    id: 'contentstack-intern',
    role: 'Associate Software Engineering Intern',
    company: 'Contentstack',
    start: 'Jan 2025',
    end: 'Jul 2025',
    current: false,
    location: 'Remote',
    summary:
      'Delivered multi-factor authentication, cross-product SSO, and measurable micro-frontend performance gains.',
    highlights: [
      'Implemented TOTP-based Multi-Factor Authentication compatible across all major authenticator apps, with SMS-based 2FA fallback and backup codes, following industry security standards.',
      'Integrated a newly acquired product (Lytics) by building SSO-based authentication between Contentstack and Lytics, delivering a seamless cross-SaaS experience with a single set of credentials.',
      'Optimized micro-frontend performance (React 18 + Module Federation), reducing frontend application latency by 2x, and documented comparative benchmark data to guide architecture decisions.',
      'Implemented OPA policy-based navigation and app switcher across 10+ micro-frontends, backed by end-to-end test automation for consistent behaviour across frequent releases.',
      'Built an RSS feed for the organization to keep subscribers updated and improve product SEO.',
    ],
    tech: ['React 18', 'Module Federation', 'Webpack', 'Node.js', 'TOTP/MFA', 'SSO', 'OPA', 'Playwright'],
  },
]

export default experience
