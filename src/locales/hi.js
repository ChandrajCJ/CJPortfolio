export default {
  meta: {
    role: 'सॉफ़्टवेयर इंजीनियर',
    tagline:
      'मैं सुरक्षित, स्केलेबल वेब प्लेटफ़ॉर्म बनाता हूँ — authentication इंफ्रास्ट्रक्चर, micro-frontend परफ़ॉर्मेंस, और AI-सहायित डेवलपर टूलिंग।',
    summary:
      'एंटरप्राइज़ SaaS और multi-cloud वातावरण में सुरक्षित, स्केलेबल वेब प्लेटफ़ॉर्म बनाने के अनुभव वाला सॉफ़्टवेयर इंजीनियर। authentication इंफ्रास्ट्रक्चर (SSO, MFA, OAuth, RBAC), micro-frontend परफ़ॉर्मेंस ऑप्टिमाइज़ेशन, और कई hyperscalers तथा वैश्विक क्षेत्रों में ग्राहकों को सेवा देने वाली मुख्य प्लेटफ़ॉर्म सुविधाएँ देने का सिद्ध रिकॉर्ड। डिलीवरी तेज़ करने और कोड गुणवत्ता सुधारने के लिए AI-सहायित टूल्स के उपयोग में दक्ष।',
  },

  nav: {
    home: 'होम',
    experience: 'अनुभव',
    skills: 'कौशल',
    education: 'शिक्षा',
    certifications: 'प्रमाणपत्र',
    projects: 'प्रोजेक्ट्स',
    writing: 'लेख',
    resume: 'रिज़्यूमे',
    contact: 'संपर्क',
    menu: 'मेन्यू',
    openMenu: 'मेन्यू खोलें',
    closeMenu: 'मेन्यू बंद करें',
    primary: 'मुख्य',
    skipToContent: 'सामग्री पर जाएँ',
  },

  common: {
    downloadCV: 'CV डाउनलोड करें',
    getInTouch: 'संपर्क करें',
    viewLive: 'लाइव देखें',
    liveDemo: 'लाइव',
    sourceCode: 'सोर्स कोड',
    code: 'कोड',
    details: 'विवरण',
    readMore: 'और पढ़ें',
    backToHome: 'होम पर वापस',
    allProjects: 'सभी प्रोजेक्ट्स',
    allWriting: 'सभी लेख',
    current: 'वर्तमान',
    language: 'भाषा',
    changeLanguage: 'भाषा बदलें',
    switchToLight: 'लाइट थीम पर जाएँ',
    switchToDark: 'डार्क थीम पर जाएँ',
    minRead: 'मिनट पढ़ाई',
    builtWith: 'React और Tailwind से बनाया गया',
    opensInNewTab: 'नए टैब में खुलता है',
    more: 'और',
  },

  home: {
    badge: '{company} में {role}',
    greeting: 'नमस्ते, मैं {name} हूँ',
    scrollCta: 'और जानने के लिए स्क्रॉल करें',
    aboutTitle: 'मैं कौन हूँ',
    aboutEyebrow: 'परिचय',
    currently: 'वर्तमान में',
    education: 'शिक्षा',
    basedIn: 'स्थित',
    languages: 'भाषाएँ',
    degreeShort: 'B.Tech, कंप्यूटर साइंस',
    exploreMore: 'और देखें',
  },

  roles: [
    'एक सॉफ़्टवेयर इंजीनियर',
    'एक Full-Stack डेवलपर',
    'एक Auth & Security इंजीनियर',
    'एक AI प्रयोगकर्ता',
  ],

  stats: {
    heading: 'आँकड़ों में प्रभाव',
    environments: { label: 'Production वातावरण', detail: '3 hyperscalers · 3 क्षेत्र' },
    uptime: { label: 'अपटाइम', detail: 'केंद्रीकृत login सेवा' },
    latency: { label: 'तेज़ frontend', detail: 'micro-frontend latency आधी हुई' },
    vulns: { label: 'बंद की गई कमज़ोरियाँ', detail: 'स्वचालित Snyk समाधान' },
  },

  experience: {
    eyebrow: 'अनुभव',
    title: 'मैंने कहाँ काम किया',
    description:
      'एक एंटरप्राइज़ SaaS प्लेटफ़ॉर्म के लिए authentication इंफ्रास्ट्रक्चर, access control, और AI-सहायित डेवलपर टूलिंग।',
    present: 'वर्तमान',
    'contentstack-ase': {
      role: 'एसोसिएट सॉफ़्टवेयर इंजीनियर',
      summary:
        'multi-cloud, multi-region SaaS प्लेटफ़ॉर्म पर authentication और access-control इंफ्रास्ट्रक्चर का स्वामित्व, और इंजीनियरिंग संगठन द्वारा रोज़ इस्तेमाल होने वाले AI टूल्स का निर्माण।',
      highlights: [
        '7 production वातावरणों (3 hyperscalers — AWS, GCP, Azure; 3 क्षेत्र — NA, EU, AU), 3 staging और 22 development वातावरणों में उपयोगकर्ताओं को प्रमाणित करने वाली केंद्रीकृत login सेवा की वास्तुकला बनाई और लागू की — SSO, MFA/OTP, backup codes और पासवर्ड रिकवरी के साथ 100% अपटाइम बनाए रखा।',
        'monolith और 4 microservices में एंड-टू-एंड सूक्ष्म Role-Based Access Control (RBAC) डिज़ाइन किया और लागू किया, जिससे access-control की सूक्ष्मता बेहतर हुई और उद्योग सुरक्षा मानकों के अनुरूप बनी।',
        'प्रत्येक क्षेत्र के लिए login अनुभव में द्विदिश (Bi-Di) बहुभाषी समर्थन बनाया, साथ ही एक CMS-configurable login पेज जिससे मार्केटिंग टीम सामग्री गतिशील रूप से प्रबंधित कर सके।',
        'ग्राहक-सामना करने वाले API के लिए OAuth 2.0 लागू किया, जिससे मानक-अनुरूप, token-आधारित प्राधिकरण प्रवाह के माध्यम से सुरक्षित तृतीय-पक्ष एकीकरण संभव हुए।',
        'Snyk कमज़ोरियों का पता लगाने और उन्हें ठीक करने के लिए Claude routines से स्वचालन बनाया — स्वचालित रूप से pull requests बनाकर और Slack पर पोस्ट करके खुली कमज़ोरियाँ 500+ से घटाकर शून्य कीं।',
        'AI-संचालित code-review स्वचालन विकसित किया जो pull requests को संबंधित Jira टिकट के स्वीकृति मानदंडों के विरुद्ध सत्यापित करता है, जिससे समीक्षा की गुणवत्ता और निरंतरता बेहतर हुई।',
        'एक AI agent लागू किया जो Slack में ग्राहक समस्याओं का उत्तर देता है, उत्पाद दस्तावेज़ीकरण, पूर्व चैट इतिहास, डेटा लॉग और codebase से संदर्भ लेकर।',
        'authentication और प्लेटफ़ॉर्म वर्कफ़्लो पर केंद्रित पुन: प्रयोज्य AI skills बनाईं और बनाए रखीं, जिससे onboarding की कठिनाई और तैयारी का समय कम हुआ।',
        'monolith और 10+ microservices में नई संगठन-व्यापी ब्रांडिंग अपनाई, जिससे हर ग्राहक-सामना सतह पर एकसमान अनुभव सुनिश्चित हुआ।',
        'SSO, SCIM, Teams, उपयोगकर्ता प्रबंधन और सुरक्षा सहित मुख्य प्लेटफ़ॉर्म सुविधाओं में योगदान दिया।',
      ],
    },
    'contentstack-intern': {
      role: 'एसोसिएट सॉफ़्टवेयर इंजीनियरिंग इंटर्न',
      summary:
        'बहु-कारक प्रमाणीकरण, क्रॉस-प्रोडक्ट SSO, और मापने योग्य micro-frontend परफ़ॉर्मेंस सुधार दिए।',
      highlights: [
        'सभी प्रमुख authenticator ऐप्स के साथ संगत TOTP-आधारित Multi-Factor Authentication लागू किया, SMS-आधारित 2FA फ़ॉलबैक और backup codes के साथ, उद्योग सुरक्षा मानकों का पालन करते हुए।',
        'नए अधिग्रहित उत्पाद (Lytics) को Contentstack के साथ SSO-आधारित authentication बनाकर एकीकृत किया, जिससे एक ही क्रेडेंशियल सेट से निर्बाध cross-SaaS अनुभव मिला।',
        'micro-frontend परफ़ॉर्मेंस (React 18 + Module Federation) को अनुकूलित किया, frontend एप्लिकेशन latency 2 गुना घटाई, और वास्तुकला निर्णयों के मार्गदर्शन हेतु तुलनात्मक बेंचमार्क डेटा दस्तावेज़ित किया।',
        '10+ micro-frontends में OPA नीति-आधारित नेविगेशन और app switcher लागू किया, बार-बार रिलीज़ में एकसमान व्यवहार के लिए एंड-टू-एंड टेस्ट स्वचालन के साथ।',
        'सब्सक्राइबर्स को अपडेट रखने और उत्पाद SEO सुधारने के लिए संगठन हेतु RSS feed बनाई।',
      ],
    },
  },

  globe: {
    eyebrow: 'वैश्विक पैमाना',
    title: 'प्लेटफ़ॉर्म कहाँ चलता है',
    description:
      'केंद्रीकृत login सेवा तीन hyperscalers और तीन क्षेत्रों में उपयोगकर्ताओं को प्रमाणित करती है — 7 production, 3 staging और 22 development वातावरणों के साथ।',
    regions: 'क्षेत्र',
    hyperscalers: 'Hyperscalers',
    production: 'Production',
    staging: 'Staging',
    development: 'Development',
    hint: 'घुमाने के लिए खींचें',
  },

  skills: {
    eyebrow: 'कौशल',
    title: 'मैं किनके साथ काम करता हूँ',
    description: 'स्व-निर्धारित प्रतिशत के बजाय क्षेत्र के अनुसार समूहित।',
    groups: {
      languages: 'भाषाएँ',
      frontend: 'Frontend',
      backend: 'Backend',
      auth: 'Auth & Security',
      data: 'डेटाबेस',
      cloud: 'Cloud & DevOps',
      ai: 'AI / ML इंजीनियरिंग',
      testing: 'टेस्टिंग & टूल्स',
    },
  },

  education: {
    eyebrow: 'शिक्षा',
    title: 'मैंने कहाँ पढ़ाई की',
    btech: { title: 'B.Tech, कंप्यूटर साइंस और इंजीनियरिंग', detail: 'CGPA: 8.5 / 10' },
    'high-school': { title: 'उच्चतर माध्यमिक' },
    schooling: { title: 'विद्यालय शिक्षा' },
    locations: { puducherry: 'पुदुचेरी, भारत' },
  },

  certifications: {
    eyebrow: 'प्रमाणपत्र',
    title: 'प्रमाणपत्र',
    description: 'पूर्ण किए गए पाठ्यक्रम और क्रेडेंशियल।',
    verify: 'सत्यापित करें',
  },

  projects: {
    eyebrow: 'प्रोजेक्ट्स',
    title: 'मैंने क्या बनाया',
    description: 'production काम और साइड प्रोजेक्ट्स का मिश्रण। पूरा विवरण देखने के लिए कोई भी कार्ड खोलें।',
    filterAll: 'सभी',
    filterHeading: 'तकनीक के अनुसार प्रोजेक्ट्स फ़िल्टर करें',
    shown: '{count} प्रोजेक्ट्स दिखाए गए',
    none: 'अभी तक कोई प्रोजेक्ट {tech} का उपयोग नहीं करता।',
    highlights: 'मुख्य बिंदु',
    builtWith: 'इनसे बनाया गया',
    moreProjects: 'और प्रोजेक्ट्स',
    'chat-app': {
      title: 'रीयल-टाइम चैट ऐप',
      blurb: 'वॉइस नोट्स, रिएक्शन और रीड रिसिप्ट के साथ serverless 1:1 रीयल-टाइम मैसेजिंग।',
      description:
        'वॉइस नोट्स, रिएक्शन, रिप्लाई, रीड रिसिप्ट और टाइपिंग/प्रेज़ेंस संकेतकों वाला serverless 1:1 रीयल-टाइम मैसेजिंग ऐप। Firestore लाइव सिंक चलाता है, Firebase Auth बहु-उपयोगकर्ता साइन-अप और लॉगिन संभालता है, और Cloud Storage वॉइस संदेश रखता है।',
      highlights: [
        'Firestore listeners के ज़रिए लाइव मैसेज सिंक और प्रेज़ेंस — कोई backend सर्वर चलाने की ज़रूरत नहीं।',
        'ब्राउज़र में रिकॉर्ड और Firebase Cloud Storage में संग्रहित वॉइस नोट्स।',
        'रीड रिसिप्ट, टाइपिंग संकेतक, थ्रेडेड रिप्लाई और emoji रिएक्शन।',
      ],
    },
    eventhub: {
      title: 'EventHub',
      blurb: 'कॉलेजों और विश्वविद्यालयों के लिए इवेंट पंजीकरण और नामांकन प्लेटफ़ॉर्म।',
      description:
        'छात्रों और संस्थानों के लिए इवेंट पंजीकरण, नामांकन और विज्ञापन को सक्षम करने वाला वेब प्लेटफ़ॉर्म, Firebase के ज़रिए रीयल-टाइम डेटा के साथ।',
      highlights: [
        'इवेंट खोजने वाले छात्रों और उन्हें प्रकाशित करने वाले संस्थानों के लिए अलग-अलग फ़्लो।',
        'Firebase द्वारा समर्थित रीयल-टाइम पंजीकरण और नामांकन स्थिति।',
      ],
    },
    ecommerce: {
      title: 'eCommerce ऐप',
      blurb: 'Node.js API द्वारा समर्थित, प्रोडक्ट ब्राउज़िंग और कार्ट वाला स्टोरफ़्रंट।',
      description: 'Node.js backend द्वारा संचालित, प्रोडक्ट ब्राउज़िंग और कार्ट प्रबंधन को कवर करने वाला स्टोरफ़्रंट इंटरफ़ेस।',
      highlights: [],
    },
    connect: {
      title: 'Connect',
      blurb: 'vanilla JavaScript से बनाया गया रेस्पॉन्सिव बहु-खंड वेब इंटरफ़ेस।',
      description: 'बिना किसी framework के, सादे HTML, CSS और JavaScript से बनाया गया रेस्पॉन्सिव बहु-खंड वेब इंटरफ़ेस।',
      highlights: [],
    },
    studentportal: {
      title: 'स्टूडेंट पोर्टल',
      blurb: 'छात्र-केंद्रित शैक्षणिक पोर्टल के लिए front-end।',
      description: 'छात्र-केंद्रित शैक्षणिक पोर्टल लेआउट का front-end कार्यान्वयन।',
      highlights: [],
    },
    todo: {
      title: 'Todo',
      blurb: 'ब्राउज़र LocalStorage में स्थिति सहेजने वाला टास्क मैनेजर।',
      description: 'आइटम बनाने, पूरा करने और हटाने वाला टास्क मैनेजर, जो स्थिति ब्राउज़र LocalStorage में सहेजता है।',
      highlights: [],
    },
    olx: {
      title: 'OLX Clone',
      blurb: 'क्लासिफ़ाइड मार्केटप्लेस लिस्टिंग इंटरफ़ेस।',
      description: 'OLX पर आधारित क्लासिफ़ाइड मार्केटप्लेस लिस्टिंग इंटरफ़ेस, लेआउट और स्टाइलिंग अभ्यास के रूप में बनाया गया।',
      highlights: [],
    },
    restmenu: {
      title: 'रेस्तराँ मेन्यू',
      blurb: 'एक रेस्तराँ के लिए श्रेणीबद्ध डिजिटल मेन्यू।',
      description: 'लेआउट, टाइपोग्राफ़ी और रेस्पॉन्सिव व्यवहार को कवर करने वाला श्रेणीबद्ध डिजिटल रेस्तराँ मेन्यू।',
      highlights: [],
    },
    travels: {
      title: 'ट्रैवल लैंडिंग पेज',
      blurb: 'एक ट्रैवल ब्रांड के लिए मार्केटिंग लैंडिंग पेज।',
      description: 'hero संरचना और रेस्पॉन्सिव सेक्शन पर केंद्रित, एक ट्रैवल ब्रांड के लिए मार्केटिंग लैंडिंग पेज।',
      highlights: [],
    },
  },

  resume: {
    eyebrow: 'रिज़्यूमे',
    title: 'रिज़्यूमे',
    print: 'प्रिंट करें',
    downloadPdf: 'PDF डाउनलोड करें',
    summary: 'व्यावसायिक सारांश',
    skills: 'तकनीकी कौशल',
    experience: 'व्यावसायिक अनुभव',
    education: 'शिक्षा',
    projects: 'प्रोजेक्ट्स',
    certifications: 'प्रमाणपत्र',
    languages: 'भाषाएँ',
  },

  contact: {
    eyebrow: 'संपर्क',
    title: 'आइए जुड़ें',
    description:
      'दिलचस्प समस्याओं, सहयोग और नए अवसरों के लिए खुला हूँ। आमतौर पर एक-दो दिन में उत्तर देता हूँ।',
    name: 'नाम',
    namePlaceholder: 'Ada Lovelace',
    email: 'ईमेल',
    emailPlaceholder: 'ada@example.com',
    message: 'संदेश',
    messagePlaceholder: 'आप किस पर काम कर रहे हैं?',
    send: 'संदेश भेजें',
    sending: 'भेजा जा रहा है…',
    sent: 'धन्यवाद — आपका संदेश भेजा जा रहा है।',
    errorGeneric: 'वह भेजा नहीं जा सका। कृपया सीधे {email} पर ईमेल करें।',
    errorUnconfigured: 'संपर्क फ़ॉर्म अभी कॉन्फ़िगर नहीं है। कृपया {email} पर ईमेल करें।',
    errors: {
      name: 'कृपया अपना नाम बताएँ।',
      emailRequired: 'उत्तर देने के लिए मुझे एक ईमेल चाहिए।',
      emailInvalid: 'वह ईमेल पता सही नहीं लग रहा।',
      messageRequired: 'कृपया एक संदेश जोड़ें।',
      messageShort: 'थोड़ा और विवरण मददगार होगा।',
    },
    honeypot: 'कंपनी (खाली छोड़ें)',
  },

  writing: {
    eyebrow: 'लेख',
    title: 'नोट्स और लेख',
    description: 'सीखी हुई बातें जो लिखने लायक थीं।',
    readExternally: 'बाहर पढ़ें',
  },

  chat: {
    name: 'Astro',
    subtitle: 'Chandraj का AI सहायक',
    open: 'Astro से बात करें',
    close: 'चैट बंद करें',
    greeting:
      'नमस्ते! मैं Astro हूँ — Chandraj के अनुभव, कौशल और प्रोजेक्ट्स के बारे में सवालों के जवाब दे सकता हूँ। आप क्या जानना चाहेंगे?',
    placeholder: 'मेरे अनुभव के बारे में पूछें…',
    send: 'भेजें',
    thinking: 'Astro टाइप कर रहा है…',
    error: 'अभी सर्वर तक नहीं पहुँच सका। कृपया कुछ देर बाद फिर कोशिश करें।',
    unconfigured: 'इस डिप्लॉयमेंट पर Astro अभी कॉन्फ़िगर नहीं है। आप Chandraj से सीधे {email} पर संपर्क कर सकते हैं।',
    disclaimer: 'AI द्वारा निर्मित। गलत हो सकता है।',
    clear: 'बातचीत साफ़ करें',
    suggestions: [
      'Chandraj Contentstack में क्या करते हैं?',
      'उनके auth और security काम के बारे में बताएँ',
      'वे AI से क्या बना रहे हैं?',
      'वे सबसे ज़्यादा कौन-सी तकनीक इस्तेमाल करते हैं?',
    ],
  },

  notFound: {
    title: 'वह पेज मौजूद नहीं है',
    description: 'लिंक पुराना हो सकता है, या पेज हटाया जा चुका है।',
    seeProjects: 'प्रोजेक्ट्स देखें',
  },

  errorBoundary: {
    title: 'इस पेज पर कुछ गड़बड़ हो गई।',
    description: 'यह मेरी गलती है, आपकी नहीं। रीलोड करने से आमतौर पर ठीक हो जाता है।',
  },
}
