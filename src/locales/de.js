export default {
  meta: {
    role: 'Softwareentwickler',
    tagline:
      'Ich baue sichere, skalierbare Webplattformen — Authentifizierungsinfrastruktur, Micro-Frontend-Performance und KI-gestütztes Developer-Tooling.',
    summary:
      'Softwareentwickler mit Erfahrung im Aufbau sicherer, skalierbarer Webplattformen in Enterprise-SaaS- und Multi-Cloud-Umgebungen. Nachweisliche Erfolge bei Authentifizierungsinfrastruktur (SSO, MFA, OAuth, RBAC), Micro-Frontend-Performanceoptimierung und Kernfunktionen der Plattform für Kunden über mehrere Hyperscaler und Regionen hinweg. Versiert im Einsatz KI-gestützter Entwicklungswerkzeuge, um Auslieferung zu beschleunigen und Codequalität zu verbessern.',
  },

  nav: {
    home: 'Start',
    experience: 'Erfahrung',
    skills: 'Fähigkeiten',
    education: 'Ausbildung',
    certifications: 'Zertifikate',
    projects: 'Projekte',
    writing: 'Artikel',
    resume: 'Lebenslauf',
    contact: 'Kontakt',
    menu: 'Menü',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    primary: 'Hauptnavigation',
    skipToContent: 'Zum Inhalt springen',
  },

  common: {
    downloadCV: 'Lebenslauf herunterladen',
    getInTouch: 'Kontakt aufnehmen',
    viewLive: 'Live ansehen',
    liveDemo: 'Live',
    sourceCode: 'Quellcode',
    code: 'Code',
    details: 'Details',
    readMore: 'Weiterlesen',
    backToHome: 'Zurück zur Startseite',
    allProjects: 'Alle Projekte',
    allWriting: 'Alle Artikel',
    current: 'Aktuell',
    language: 'Sprache',
    changeLanguage: 'Sprache ändern',
    theme: 'Design',
    changeTheme: 'Design ändern',
    minRead: 'Min. Lesezeit',
    builtWith: 'Gebaut mit React & Tailwind',
    opensInNewTab: 'wird in neuem Tab geöffnet',
    more: 'Mehr',
  },

  themes: {
    dark: 'Dunkel',
    light: 'Hell',
    grey: 'Graustufen',
  },

  home: {
    greeting: 'Hallo, ich bin {name}',
    scrollCta: 'Scrollen zum Entdecken',
    aboutTitle: 'Wer ich bin',
    aboutEyebrow: 'Über mich',
    currently: 'Aktuell',
    education: 'Ausbildung',
    basedIn: 'Standort',
    languages: 'Sprachen',
    degreeShort: 'B.Tech, Informatik',
    hobbies: 'Hobbys',
    exploreMore: 'Mehr entdecken',
  },

  roles: [
    'Softwareentwickler',
    'Full-Stack-Entwickler',
    'Auth- & Security-Engineer',
    'KI-Tüftler',
  ],

  hobbies: {
    swimming: 'Schwimmen',
    running: 'Laufen',
    cycling: 'Radfahren',
    cinema: 'Kino',
  },

  stats: {
    heading: 'Wirkung in Zahlen',
    environments: { label: 'Produktionsumgebungen', detail: '3 Hyperscaler · 3 Regionen' },
    uptime: { label: 'Verfügbarkeit', detail: 'Zentraler Login-Dienst' },
    latency: { label: 'Schnelleres Frontend', detail: 'Micro-Frontend-Latenz halbiert' },
    vulns: { label: 'Geschlossene Schwachstellen', detail: 'Automatisierte Snyk-Behebung' },
  },

  experience: {
    eyebrow: 'Erfahrung',
    title: 'Wo ich gearbeitet habe',
    description:
      'Authentifizierungsinfrastruktur, Zugriffssteuerung und KI-gestütztes Developer-Tooling für eine Enterprise-SaaS-Plattform.',
    present: 'Heute',
    'contentstack-ase': {
      role: 'Associate Software Engineer',
      summary:
        'Verantworte Authentifizierungs- und Zugriffssteuerungsinfrastruktur einer Multi-Cloud- und Multi-Region-SaaS-Plattform und baue KI-Werkzeuge, die die gesamte Engineering-Organisation täglich nutzt.',
      highlights: [
        'Zentralen Login-Dienst konzipiert und umgesetzt, der Nutzer über 7 Produktionsumgebungen (3 Hyperscaler — AWS, GCP, Azure; 3 Regionen — NA, EU, AU), 3 Staging- und 22 Entwicklungsumgebungen authentifiziert, bei 100 % Verfügbarkeit mit SSO, MFA/OTP, Backup-Codes und Passwortwiederherstellung.',
        'Feingranulare rollenbasierte Zugriffssteuerung (RBAC) durchgängig über den Monolithen und 4 Microservices entworfen und ausgeliefert, wodurch die Granularität der Zugriffssteuerung verbessert und an Sicherheitsstandards der Branche angeglichen wurde.',
        'Bidirektionale (Bi-Di) Mehrsprachigkeit pro Region in den Login-Ablauf eingebaut, dazu eine über das CMS konfigurierbare Login-Seite, mit der das Marketing Inhalte dynamisch pflegen kann.',
        'OAuth 2.0 für kundenseitige APIs implementiert und damit sichere Drittanbieter-Integrationen über einen standardkonformen, tokenbasierten Autorisierungsfluss mit Scopes ermöglicht.',
        'Automatisierungen mit Claude Routines gebaut, die Snyk-Schwachstellen erkennen und beheben und offene Befunde von über 500 auf null reduziert haben, indem automatisch Pull Requests erstellt und zur Prüfung in Slack gepostet wurden.',
        'KI-gestützte Code-Review-Automatisierungen entwickelt, die Pull Requests gegen die Akzeptanzkriterien des verknüpften Jira-Tickets prüfen und so Qualität und Konsistenz der Reviews verbessern.',
        'Einen KI-Agenten umgesetzt, der Kundenanliegen in Slack beantwortet und dabei Kontext aus Produktdokumentation, früherem Chatverlauf, Datenlogs und der Codebasis heranzieht.',
        'Wiederverwendbare KI-Skills für Engineering-Teams erstellt und gepflegt, mit Fokus auf Authentifizierung und Plattform-Workflows, was Einarbeitungsaufwand und Anlaufzeit reduziert hat.',
        'Neues unternehmensweites Branding über den Monolithen und mehr als 10 Microservices eingeführt, für ein einheitliches Erlebnis auf jeder kundenseitigen Oberfläche.',
        'An zentralen Plattformfunktionen mitgewirkt, darunter SSO, SCIM, Teams, Benutzerverwaltung und Sicherheit.',
      ],
    },
    'contentstack-intern': {
      role: 'Associate Software Engineering Intern',
      summary:
        'Multi-Faktor-Authentifizierung, produktübergreifendes SSO und messbare Micro-Frontend-Performancegewinne geliefert.',
      highlights: [
        'TOTP-basierte Multi-Faktor-Authentifizierung implementiert, kompatibel mit allen gängigen Authenticator-Apps, mit SMS-2FA als Rückfalloption und Backup-Codes, nach Sicherheitsstandards der Branche.',
        'Ein neu übernommenes Produkt (Lytics) integriert, indem SSO-basierte Authentifizierung zwischen Contentstack und Lytics gebaut wurde — ein nahtloses produktübergreifendes Erlebnis mit nur einem Satz Zugangsdaten.',
        'Micro-Frontend-Performance (React 18 + Module Federation) optimiert, die Latenz der Frontend-Anwendung um das Zweifache reduziert und vergleichende Benchmark-Daten zur Orientierung für Architekturentscheidungen dokumentiert.',
        'OPA-richtlinienbasierte Navigation und App-Switcher über mehr als 10 Micro-Frontends umgesetzt, abgesichert durch End-to-End-Testautomatisierung für konsistentes Verhalten über häufige Releases hinweg.',
        'Einen RSS-Feed für die Organisation gebaut, um Abonnenten auf dem Laufenden zu halten und die Produkt-SEO zu verbessern.',
      ],
    },
  },

  globe: {
    eyebrow: 'Globale Reichweite',
    title: 'Wo die Plattform läuft',
    description:
      'Der zentrale Login-Dienst authentifiziert Nutzer über drei Hyperscaler und drei Regionen hinweg, mit 7 Produktions-, 3 Staging- und 22 Entwicklungsumgebungen.',
    regions: 'Regionen',
    hyperscalers: 'Hyperscaler',
    production: 'Produktion',
    staging: 'Staging',
    development: 'Entwicklung',
    hint: 'Zum Drehen ziehen',
  },

  skills: {
    eyebrow: 'Fähigkeiten',
    title: 'Womit ich arbeite',
    description: 'Nach Bereich gruppiert statt nach selbst vergebenen Prozentwerten.',
    groups: {
      languages: 'Sprachen',
      frontend: 'Frontend',
      backend: 'Backend',
      auth: 'Auth & Security',
      data: 'Datenbanken',
      cloud: 'Cloud & DevOps',
      ai: 'KI / ML Engineering',
      testing: 'Testing & Tools',
    },
  },

  education: {
    eyebrow: 'Ausbildung',
    title: 'Wo ich studiert habe',
    btech: { title: 'B.Tech, Informatik und Ingenieurwesen', detail: 'Notendurchschnitt: 8,5 / 10' },
    'high-school': { title: 'Sekundarstufe II' },
    schooling: { title: 'Schulbildung' },
    locations: { puducherry: 'Puducherry, Indien' },
  },

  certifications: {
    eyebrow: 'Zertifikate',
    title: 'Zertifikate',
    description: 'Abgeschlossene Kurse und Qualifikationen.',
    verify: 'Überprüfen',
  },

  projects: {
    eyebrow: 'Projekte',
    title: 'Was ich gebaut habe',
    description: 'Eine Mischung aus Produktionsarbeit und Nebenprojekten. Öffne eine Karte für den vollständigen Bericht.',
    filterAll: 'Alle',
    filterHeading: 'Projekte nach Technologie filtern',
    shown: '{count} Projekte angezeigt',
    none: 'Noch nutzt kein Projekt {tech}.',
    highlights: 'Highlights',
    builtWith: 'Gebaut mit',
    moreProjects: 'Weitere Projekte',
    'chat-app': {
      title: 'Echtzeit-Chat-App',
      blurb: 'Serverloses 1:1-Echtzeit-Messaging mit Sprachnachrichten, Reaktionen und Lesebestätigungen.',
      description:
        'Eine serverlose 1:1-Echtzeit-Messaging-App mit Sprachnachrichten, Reaktionen, Antworten, Lesebestätigungen sowie Tipp- und Anwesenheitsanzeigen. Firestore übernimmt die Live-Synchronisation, Firebase Auth die Registrierung und Anmeldung mehrerer Nutzer, und Cloud Storage speichert die Sprachnachrichten.',
      highlights: [
        'Live-Synchronisation von Nachrichten und Anwesenheit über Firestore-Listener, ganz ohne eigenen Backend-Server.',
        'Im Browser aufgenommene und in Firebase Cloud Storage gespeicherte Sprachnachrichten.',
        'Lesebestätigungen, Tippanzeigen, Antwort-Threads und Emoji-Reaktionen.',
      ],
    },
    eventhub: {
      title: 'EventHub',
      blurb: 'Plattform für Veranstaltungsanmeldung und -einschreibung für Hochschulen und Universitäten.',
      description:
        'Eine Webplattform für Hochschulen und Universitäten, die Veranstaltungsanmeldung, -einschreibung und -bewerbung für Studierende und Institutionen ermöglicht, mit Echtzeitdaten über Firebase.',
      highlights: [
        'Getrennte Abläufe für Studierende, die Veranstaltungen entdecken, und Institutionen, die sie veröffentlichen.',
        'Echtzeit-Status für Anmeldung und Einschreibung, gestützt auf Firebase.',
      ],
    },
    ecommerce: {
      title: 'E-Commerce-App',
      blurb: 'Storefront mit Produktsuche und Warenkorb, gestützt auf eine Node.js-API.',
      description: 'Eine Storefront-Oberfläche für Produktsuche und Warenkorbverwaltung, bereitgestellt über ein Node.js-Backend.',
      highlights: [],
    },
    connect: {
      title: 'Connect',
      blurb: 'Responsive mehrteilige Weboberfläche, gebaut mit reinem JavaScript.',
      description: 'Eine responsive, mehrteilige Weboberfläche ohne Framework, umgesetzt mit reinem HTML, CSS und JavaScript.',
      highlights: [],
    },
    studentportal: {
      title: 'Studierendenportal',
      blurb: 'Frontend für ein Studierendenportal im akademischen Umfeld.',
      description: 'Eine Frontend-Umsetzung des Layouts für ein Studierendenportal im akademischen Umfeld.',
      highlights: [],
    },
    todo: {
      title: 'Todo',
      blurb: 'Aufgabenverwaltung, die den Zustand im LocalStorage des Browsers speichert.',
      description: 'Eine Aufgabenverwaltung zum Anlegen, Abschließen und Entfernen von Einträgen, die den Zustand im LocalStorage des Browsers speichert.',
      highlights: [],
    },
    olx: {
      title: 'OLX-Klon',
      blurb: 'Oberfläche für Kleinanzeigen-Marktplatzeinträge.',
      description: 'Eine an OLX angelehnte Oberfläche für Kleinanzeigeneinträge, entstanden als Layout- und Styling-Übung.',
      highlights: [],
    },
    restmenu: {
      title: 'Restaurantkarte',
      blurb: 'Kategorisierte digitale Speisekarte für ein Restaurant.',
      description: 'Eine kategorisierte digitale Speisekarte mit Fokus auf Layout, Typografie und responsives Verhalten.',
      highlights: [],
    },
    travels: {
      title: 'Reise-Landingpage',
      blurb: 'Marketing-Landingpage für eine Reisemarke.',
      description: 'Eine Marketing-Landingpage für eine Reisemarke, mit Fokus auf Hero-Komposition und responsive Abschnitte.',
      highlights: [],
    },
  },

  resume: {
    eyebrow: 'Lebenslauf',
    title: 'Lebenslauf',
    print: 'Drucken',
    downloadPdf: 'PDF herunterladen',
    summary: 'Berufliches Profil',
    skills: 'Technische Fähigkeiten',
    experience: 'Berufserfahrung',
    education: 'Ausbildung',
    projects: 'Projekte',
    certifications: 'Zertifikate',
    languages: 'Sprachen',
  },

  contact: {
    eyebrow: 'Kontakt',
    title: 'Lass uns sprechen',
    description:
      'Offen für spannende Probleme, Zusammenarbeit und neue Gelegenheiten. Ich antworte meist innerhalb von ein bis zwei Tagen.',
    name: 'Name',
    namePlaceholder: 'Ada Lovelace',
    email: 'E-Mail',
    emailPlaceholder: 'ada@example.com',
    message: 'Nachricht',
    messagePlaceholder: 'Woran arbeitest du gerade?',
    send: 'Nachricht senden',
    sending: 'Wird gesendet…',
    sent: 'Danke — deine Nachricht ist unterwegs.',
    errorGeneric: 'Das hat nicht geklappt. Schreib mir bitte direkt an {email}.',
    errorUnconfigured: 'Das Kontaktformular ist noch nicht eingerichtet. Schreib mir bitte an {email}.',
    errors: {
      name: 'Bitte nenne mir deinen Namen.',
      emailRequired: 'Ich brauche eine E-Mail-Adresse für die Antwort.',
      emailInvalid: 'Diese E-Mail-Adresse sieht nicht richtig aus.',
      messageRequired: 'Bitte füge eine Nachricht hinzu.',
      messageShort: 'Ein bisschen mehr Detail wäre hilfreich.',
    },
    honeypot: 'Firma (bitte leer lassen)',
  },

  writing: {
    eyebrow: 'Artikel',
    title: 'Notizen & Beiträge',
    description: 'Dinge, die ich gelernt habe und die es wert sind, aufgeschrieben zu werden.',
    readExternally: 'Extern lesen',
  },

  chat: {
    name: 'Astro',
    subtitle: 'Chandrajs KI-Assistent',
    open: 'Mit Astro chatten',
    close: 'Chat schließen',
    greeting:
      'Hallo! Ich bin Astro — ich beantworte Fragen zu Chandrajs Erfahrung, Fähigkeiten und Projekten. Was möchtest du wissen?',
    placeholder: 'Frag nach meiner Erfahrung…',
    send: 'Senden',
    thinking: 'Astro schreibt…',
    error: 'Der Server war gerade nicht erreichbar. Bitte versuche es gleich noch einmal.',
    unconfigured: 'Astro ist in dieser Umgebung noch nicht eingerichtet. Du erreichst Chandraj direkt unter {email}.',
    disclaimer: 'KI-generiert. Kann Fehler enthalten.',
    clear: 'Unterhaltung löschen',
    suggestions: [
      'Was macht Chandraj bei Contentstack?',
      'Erzähl mir von seiner Arbeit an Auth und Security',
      'Was baut er mit KI?',
      'Welche Technologien nutzt er am meisten?',
    ],
  },

  notFound: {
    title: 'Diese Seite gibt es nicht',
    description: 'Der Link ist womöglich veraltet oder die Seite wurde verschoben.',
    seeProjects: 'Projekte ansehen',
  },

  errorBoundary: {
    title: 'Auf dieser Seite ist etwas schiefgelaufen.',
    description: 'Das liegt an mir, nicht an dir. Ein Neuladen hilft meistens.',
  },
}
