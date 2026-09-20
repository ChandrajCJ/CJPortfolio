/**
 * English is the source of truth and the fallback for every other locale.
 * Proper nouns that are not translated anywhere (tech names, certificate
 * titles, company names) live in src/data/ instead.
 */
export default {
  meta: {
    role: 'Software Engineer',
    tagline:
      'I build secure, scalable web platforms — authentication infrastructure, micro-frontend performance, and AI-assisted developer tooling.',
    summary:
      'Software engineer with experience building secure, scalable web platforms across enterprise SaaS and multi-cloud environments. Proven track record delivering authentication infrastructure (SSO, MFA, OAuth, RBAC), micro-frontend performance optimization, and core platform features serving customers across multiple hyperscalers and global regions. Skilled in leveraging AI-assisted development tools to accelerate delivery and improve code quality.',
  },

  nav: {
    home: 'Home',
    experience: 'Experience',
    skills: 'Skills',
    education: 'Education',
    certifications: 'Certifications',
    projects: 'Projects',
    writing: 'Writing',
    resume: 'Résumé',
    contact: 'Contact',
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    primary: 'Primary',
    skipToContent: 'Skip to content',
  },

  common: {
    downloadCV: 'Download CV',
    getInTouch: 'Get in touch',
    viewLive: 'View live',
    liveDemo: 'Live',
    sourceCode: 'Source code',
    code: 'Code',
    details: 'Details',
    readMore: 'Read more',
    backToHome: 'Back to home',
    allProjects: 'All projects',
    allWriting: 'All writing',
    language: 'Language',
    changeLanguage: 'Change language',
    theme: 'Theme',
    changeTheme: 'Change theme',
    minRead: 'min read',
    builtWith: 'Built with React & Tailwind',
    opensInNewTab: 'opens in a new tab',
    more: 'More',
  },

  themes: {
    dark: 'Dark',
    light: 'Light',
    grey: 'Greyscale',
    paper: 'Paper',
    terminal: 'Terminal',
    ocean: 'Ocean',
  },

  home: {
    greeting: "Hello, I'm {name}",
    scrollCta: 'Scroll to explore',
    aboutTitle: 'Who I am',
    aboutEyebrow: 'About',
    currently: 'Currently',
    education: 'Education',
    basedIn: 'Based in',
    languages: 'Languages',
    degreeShort: 'B.Tech, Computer Science',
    hobbies: 'Hobbies',
    exploreMore: 'Explore more',
  },

  roles: [
    'a Software Engineer',
    'a Full-Stack Developer',
    'an Auth & Security Engineer',
    'an AI Tinkerer',
  ],

  hobbies: {
    swimming: 'Swimming',
    running: 'Running',
    cycling: 'Cycling',
    cinema: 'Cinema',
  },

  stats: {
    heading: 'Impact by the numbers',
    environments: { label: 'Production environments', detail: '3 hyperscalers · 3 regions' },
    uptime: { label: 'Uptime', detail: 'Centralized login service' },
    latency: { label: 'Faster frontend', detail: 'Micro-frontend latency cut in half' },
    vulns: { label: 'Vulnerabilities closed', detail: 'Automated Snyk remediation' },
  },

  experience: {
    eyebrow: 'Experience',
    title: "Where I've worked",
    description:
      'Authentication infrastructure, access control, and AI-assisted developer tooling for an enterprise SaaS platform.',
    present: 'Present',
    'contentstack-ase': {
      role: 'Associate Software Engineer',
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
    },
    'contentstack-intern': {
      role: 'Associate Software Engineering Intern',
      summary:
        'Delivered multi-factor authentication, cross-product SSO, and measurable micro-frontend performance gains.',
      highlights: [
        'Implemented TOTP-based Multi-Factor Authentication compatible across all major authenticator apps, with SMS-based 2FA fallback and backup codes, following industry security standards.',
        'Integrated a newly acquired product (Lytics) by building SSO-based authentication between Contentstack and Lytics, delivering a seamless cross-SaaS experience with a single set of credentials.',
        'Optimized micro-frontend performance (React 18 + Module Federation), reducing frontend application latency by 2x, and documented comparative benchmark data to guide architecture decisions.',
        'Implemented OPA policy-based navigation and app switcher across 10+ micro-frontends, backed by end-to-end test automation for consistent behaviour across frequent releases.',
        'Built an RSS feed for the organization to keep subscribers updated and improve product SEO.',
      ],
    },
  },

  globe: {
    eyebrow: 'Global scale',
    title: 'Where the platform runs',
    description:
      'The centralized login service authenticates users across three hyperscalers and three regions, with 7 production, 3 staging and 22 development environments.',
    regions: 'Regions',
    hyperscalers: 'Hyperscalers',
    production: 'Production',
    staging: 'Staging',
    development: 'Development',
    hint: 'Drag to rotate',
  },

  skills: {
    eyebrow: 'Skills',
    title: 'What I work with',
    description: 'Grouped by domain rather than self-rated percentages.',
    groups: {
      languages: 'Languages',
      frontend: 'Frontend',
      backend: 'Backend',
      auth: 'Auth & Security',
      data: 'Databases',
      cloud: 'Cloud & DevOps',
      ai: 'AI / ML Engineering',
      testing: 'Testing & Tools',
    },
  },

  education: {
    eyebrow: 'Education',
    title: 'Where I studied',
    btech: { title: 'B.Tech, Computer Science and Engineering', detail: 'CGPA: 8.5 / 10' },
    'high-school': { title: 'Higher Secondary' },
    schooling: { title: 'Schooling' },
    locations: { puducherry: 'Puducherry, India' },
  },

  certifications: {
    eyebrow: 'Certifications',
    title: 'Certifications',
    description: 'Courses and credentials completed.',
    verify: 'Verify',
  },

  projects: {
    eyebrow: 'Projects',
    title: "Things I've built",
    description: 'A mix of production work and side projects. Open any card for the full write-up.',
    filterAll: 'All',
    filterHeading: 'Filter projects by technology',
    shown: '{count} projects shown',
    none: 'No projects use {tech} yet.',
    highlights: 'Highlights',
    builtWith: 'Built with',
    moreProjects: 'More projects',
    'chat-app': {
      title: 'Real-Time Chat App',
      blurb: 'Serverless 1:1 real-time messaging with voice notes, reactions, and read receipts.',
      description:
        'A serverless 1:1 real-time messaging app with voice notes, reactions, replies, read receipts, and typing/presence indicators. Firestore drives live sync, Firebase Auth handles multi-user sign-up and login, and Cloud Storage holds voice messages.',
      highlights: [
        'Live message sync and presence via Firestore listeners, with no backend server to operate.',
        'Voice notes recorded in-browser and stored in Firebase Cloud Storage.',
        'Read receipts, typing indicators, threaded replies, and emoji reactions.',
      ],
    },
    eventhub: {
      title: 'EventHub',
      blurb: 'Event registration and enrollment platform for colleges and universities.',
      description:
        'A web platform for colleges and universities enabling event registration, enrollment, and advertising for students and institutions, with real-time data via Firebase.',
      highlights: [
        'Separate flows for students discovering events and institutions publishing them.',
        'Real-time registration and enrollment state backed by Firebase.',
      ],
    },
    ecommerce: {
      title: 'eCommerce App',
      blurb: 'Storefront with product browsing and cart, backed by a Node.js API.',
      description: 'A storefront interface covering product browsing and cart management, served by a Node.js backend.',
      highlights: [],
    },
    connect: {
      title: 'Connect',
      blurb: 'Responsive multi-section web interface built with vanilla JavaScript.',
      description: 'A responsive multi-section web interface built without a framework, using plain HTML, CSS, and JavaScript.',
      highlights: [],
    },
    studentportal: {
      title: 'Student Portal',
      blurb: 'Front-end for a student-facing academic portal.',
      description: 'A front-end implementation of a student-facing academic portal layout.',
      highlights: [],
    },
    todo: {
      title: 'Todo',
      blurb: 'Task manager persisting state to browser LocalStorage.',
      description: 'A task manager that creates, completes, and removes items, persisting state to browser LocalStorage.',
      highlights: [],
    },
    olx: {
      title: 'OLX Clone',
      blurb: 'Classifieds marketplace listing interface.',
      description: 'A classifieds marketplace listing interface modelled on OLX, built as a layout and styling exercise.',
      highlights: [],
    },
    restmenu: {
      title: 'Restaurant Menu',
      blurb: 'Categorised digital menu for a restaurant.',
      description: 'A categorised digital restaurant menu covering layout, typography, and responsive behaviour.',
      highlights: [],
    },
    travels: {
      title: 'Travels Landing Page',
      blurb: 'Marketing landing page for a travel brand.',
      description: 'A marketing landing page for a travel brand, focused on hero composition and responsive sections.',
      highlights: [],
    },
  },

  resume: {
    eyebrow: 'Résumé',
    title: 'Résumé',
    print: 'Print',
    downloadPdf: 'Download PDF',
    summary: 'Professional summary',
    skills: 'Technical skills',
    experience: 'Professional experience',
    education: 'Education',
    projects: 'Projects',
    certifications: 'Certifications',
    languages: 'Languages',
  },

  contact: {
    eyebrow: 'Contact',
    title: "Let's connect",
    description:
      'Open to interesting problems, collaborations, and new opportunities. I usually reply within a day or two.',
    name: 'Name',
    namePlaceholder: 'Ada Lovelace',
    email: 'Email',
    emailPlaceholder: 'ada@example.com',
    message: 'Message',
    messagePlaceholder: 'What are you working on?',
    send: 'Send message',
    sending: 'Sending…',
    sent: 'Thanks — your message is on its way.',
    errorGeneric: "That didn't send. Please email me directly at {email}.",
    errorUnconfigured: "The contact form isn't configured yet. Please email me at {email}.",
    errors: {
      name: 'Please tell me your name.',
      emailRequired: 'I need an email to reply to.',
      emailInvalid: 'That email address looks off.',
      messageRequired: 'Please add a message.',
      messageShort: 'A little more detail would help.',
    },
    honeypot: 'Company (leave blank)',
  },

  writing: {
    eyebrow: 'Writing',
    title: 'Notes & write-ups',
    description: "Things I've learned worth writing down.",
    readExternally: 'Read externally',
  },

  chat: {
    name: 'Astro',
    subtitle: "Chandraj's AI assistant",
    open: 'Chat with Astro',
    close: 'Close chat',
    greeting:
      "Hi! I'm Astro — I can answer questions about Chandraj's experience, skills and projects. What would you like to know?",
    placeholder: 'Ask about my experience…',
    send: 'Send',
    thinking: 'Astro is typing…',
    error: "I couldn't reach the server just now. Please try again in a moment.",
    unconfigured:
      'Astro is not configured on this deployment yet. You can reach Chandraj directly at {email}.',
    disclaimer: 'AI-generated. May be inaccurate.',
    clear: 'Clear conversation',
    suggestions: [
      'What does Chandraj do at Contentstack?',
      'Tell me about his auth and security work',
      'What is he building with AI?',
      'What tech does he use most?',
    ],
  },

  notFound: {
    title: "That page doesn't exist",
    description: 'The link may be outdated, or the page may have moved.',
    seeProjects: 'See projects',
  },

  errorBoundary: {
    title: 'Something broke on this page.',
    description: 'That is on me, not you. Reloading usually fixes it.',
  },
}
