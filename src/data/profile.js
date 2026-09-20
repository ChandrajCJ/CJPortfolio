/**
 * Structural / non-translatable profile data. Role, tagline and summary live in
 * src/locales/* so they translate with the rest of the site.
 */
export const profile = {
  name: 'Chandraj N',
  shortName: 'Chandraj',
  company: 'Contentstack',
  email: 'chandraj1710@gmail.com',
  whatsapp: 'https://wa.me/7824983530',
  cv: '/Chandraj_N_Resume.pdf',
  siteUrl: 'https://developedbycj.netlify.app',
  locationKey: 'puducherry',

  socials: [
    { label: 'GitHub', href: 'https://github.com/ChandrajCJ', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/chandraj-n-1a5937258/', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:chandraj1710@gmail.com', icon: 'email' },
    { label: 'WhatsApp', href: 'https://wa.me/7824983530', icon: 'whatsapp' },
    { label: 'Instagram', href: 'https://www.instagram.com/chandraj.cj/', icon: 'instagram' },
  ],

  /** Spoken languages, as locale codes resolved through i18n. */
  spoken: ['English', 'Tamil', 'Hindi'],

  /** Ids resolve to `hobbies.<id>` in the locale files. */
  hobbies: ['swimming', 'running', 'cycling', 'cinema'],
}

export default profile
