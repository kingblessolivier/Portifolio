export const languages = ['EN', 'KINY', 'FR']

const i18n = {
  EN: {
    nav: {
      home: 'Home',
      about: 'About',
      work: 'Experience',
      projects: 'Projects',
      systems: 'Systems',
      skills: 'Skills',
      awards: 'Awards',
      gallery: 'Gallery',
      contact: 'Contact',
    },
    hero: {
      visitors: 'Visitors',
      viewProjects: 'View Projects',
      contactMe: 'Contact Me',
      roleLines: ['Software Engineer', 'Intelligent Systems Builder'],
      signatureTag: 'Signature Profile',
      coreFocusLabel: 'Core Focus',
      coreFocusValue: 'Intelligent Systems',
      visionLabel: 'Vision',
      projectsLabel: 'Projects',
      systemsLabel: 'Systems Built',
      certificatesLabel: 'Certificates',
    },
    about: {
      sectionTag: 'Personal Story',
      signatureTag: 'Signature Philosophy',
      journeyTitle: 'Journey',
    },
    projects: {
      sectionTag: 'Case Studies',
      intro:
        'Every project below includes the problem, architecture, implementation role, key challenges, and practical impact.',
      viewCaseStudy: 'Open Case Study',
      close: 'Close',
      problem: 'Problem',
      solution: 'Solution',
      role: 'My Role',
      architecture: 'Architecture',
      challenges: 'Challenges',
      impact: 'Impact',
      github: 'GitHub',
    },
    systems: {
      title: 'System Design Thinking',
      subtitle: 'How I design scalable products from request to insight.',
      frontend: 'Frontend Layer',
      backend: 'Backend Layer',
      data: 'Data + Intelligence Layer',
      flowTitle: 'System Flow',
      stepLabel: 'Step',
      flow: ['Client Request', 'API Gateway', 'Service Layer', 'Data + Models', 'Insights Returned'],
    },
    work: {
      sectionTag: 'Professional Background',
      title: 'Work Experience',
      focus: 'How customer-facing banking experience shaped my product thinking.',
      educationTitle: 'Education',
      expectedGraduationLabel: 'Expected Graduation',
    },
    skills: {
      sectionTag: 'Capability Map',
      radarTitle: 'Skill Radar',
      searchPlaceholder: 'Search skill...',
      sortLabel: 'Sort',
      highToLow: 'High to Low',
      lowToHigh: 'Low to High',
      noMatch: 'No skills match your search.',
    },
    awards: {
      sectionTag: 'Honors and Certificates',
    },
    gallery: {
      sectionTag: 'Moments',
      all: 'All',
      categories: {
        Hackathons: 'Hackathons',
        Projects: 'Projects',
        Events: 'Events',
      },
    },
    contact: {
      directTitle: 'Direct Contact',
      profilesLabel: 'Profiles',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your@email.com',
      messagePlaceholder: 'Tell me about your project',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully. Thanks for reaching out.',
      errors: {
        name: 'Name is required.',
        email: 'Valid email is required.',
        message: 'Message should be at least 12 characters.',
      },
    },
    footer: {
      crafted: 'Crafted in Kigali',
    },
  },
  KINY: {
    nav: {
      home: 'Ahabanza',
      about: 'Ibyanjye',
      work: 'Uburambe',
      projects: 'Imishinga',
      systems: 'Sisitemu',
      skills: 'Ubumenyi',
      awards: 'Ibihembo',
      gallery: 'Amafoto',
      contact: 'Twandikire',
    },
    hero: {
      visitors: 'Abasuye',
      viewProjects: 'Reba Imishinga',
      contactMe: 'Vugana Nanjye',
      roleLines: ['Injeniyeri wa Software', 'Umwubatsi wa Sisitemu zifite Ubwenge'],
      signatureTag: 'Umwirondoro Wihariye',
      coreFocusLabel: 'Icyerekezo Nyamukuru',
      coreFocusValue: 'Sisitemu zifite Ubwenge',
      visionLabel: 'Iyerekwa',
      projectsLabel: 'Imishinga',
      systemsLabel: 'Sisitemu Zubatswe',
      certificatesLabel: 'Impamyabushobozi',
    },
    about: {
      sectionTag: 'Inkuru Yanjye',
      signatureTag: 'Uko Nkora',
      journeyTitle: 'Urugendo',
    },
    projects: {
      sectionTag: 'Inyigo z Imishinga',
      intro:
        'Buri mushinga uri hano werekana ikibazo, uko wubatswe, uruhare rwanjye, imbogamizi, n ingaruka zawo.',
      viewCaseStudy: 'Reba Inyigo',
      close: 'Funga',
      problem: 'Ikibazo',
      solution: 'Igisubizo',
      role: 'Uruhare Rwanjye',
      architecture: 'Uko Sisitemu Yubatse',
      challenges: 'Imbogamizi',
      impact: 'Ingaruka',
      github: 'GitHub',
    },
    systems: {
      title: 'Uko Ntekereza Sisitemu',
      subtitle: 'Uko ntegurira ibicuruzwa kwaguka kuva ku busabe kugeza ku bisubizo.',
      frontend: 'Igice cya Frontend',
      backend: 'Igice cya Backend',
      data: 'Amakuru n Ubwenge bw Imashini',
      flowTitle: 'Uruhererekane rwa Sisitemu',
      stepLabel: 'Intambwe',
      flow: ['Ubusabe bw Umukoresha', 'API Gateway', 'Service Layer', 'Data na Models', 'Igisubizo gisubira ku Mukoresha'],
    },
    work: {
      sectionTag: 'Amateka y Umwuga',
      title: 'Uburambe mu Kazi',
      focus: 'Uko uburambe mu mabanki no muri serivisi bwampaye product thinking ishingiye ku mukoresha.',
      educationTitle: 'Amashuri',
      expectedGraduationLabel: 'Igihe Nzasoza',
    },
    skills: {
      sectionTag: 'Ikarita y Ubumenyi',
      radarTitle: 'Radar y Ubumenyi',
      searchPlaceholder: 'Shakisha ubumenyi...',
      sortLabel: 'Tondeka',
      highToLow: 'Kuva hejuru ujya hasi',
      lowToHigh: 'Kuva hasi ujya hejuru',
      noMatch: 'Nta bumenyi buhuye n ibyo washakishije.',
    },
    awards: {
      sectionTag: 'Ibihembo n Impamyabushobozi',
    },
    gallery: {
      sectionTag: 'Ibihe by Ingenzi',
      all: 'Byose',
      categories: {
        Hackathons: 'Hackathons',
        Projects: 'Imishinga',
        Events: 'Ibirori',
      },
    },
    contact: {
      directTitle: 'Aho Wanyandikira',
      profilesLabel: 'Imiyoboro',
      name: 'Amazina',
      email: 'Imeri',
      message: 'Ubutumwa',
      namePlaceholder: 'Amazina yawe',
      emailPlaceholder: 'imeri@urugero.com',
      messagePlaceholder: 'Mbwira umushinga wawe',
      send: 'Ohereza Ubutumwa',
      sending: 'Biroherezwa...',
      success: 'Ubutumwa bwoherejwe neza. Murakoze kutwandikira.',
      errors: {
        name: 'Amazina arasabwa.',
        email: 'Imeri yemewe irakenewe.',
        message: 'Ubutumwa bugomba kuba nibura inyuguti 12.',
      },
    },
    footer: {
      crafted: 'Byakorewe i Kigali',
    },
  },
  FR: {
    nav: {
      home: 'Accueil',
      about: 'A propos',
      work: 'Experience',
      projects: 'Projets',
      systems: 'Systemes',
      skills: 'Competences',
      awards: 'Recompenses',
      gallery: 'Galerie',
      contact: 'Contact',
    },
    hero: {
      visitors: 'Visiteurs',
      viewProjects: 'Voir les Projets',
      contactMe: 'Me Contacter',
      roleLines: ['Ingenieur Logiciel', 'Concepteur de Systemes Intelligents'],
      signatureTag: 'Profil Signature',
      coreFocusLabel: 'Focus Principal',
      coreFocusValue: 'Systemes Intelligents',
      visionLabel: 'Vision',
      projectsLabel: 'Projets',
      systemsLabel: 'Systemes Construits',
      certificatesLabel: 'Certificats',
    },
    about: {
      sectionTag: 'Mon Parcours',
      signatureTag: 'Philosophie',
      journeyTitle: 'Parcours',
    },
    projects: {
      sectionTag: 'Etudes de Cas',
      intro:
        'Chaque projet ci-dessous presente le probleme, l architecture, mon role, les defis et l impact concret.',
      viewCaseStudy: 'Voir le Cas',
      close: 'Fermer',
      problem: 'Probleme',
      solution: 'Solution',
      role: 'Mon Role',
      architecture: 'Architecture',
      challenges: 'Defis',
      impact: 'Impact',
      github: 'GitHub',
    },
    systems: {
      title: 'Vision System Design',
      subtitle: 'Ma methode pour concevoir des produits evolutifs du besoin a l insight.',
      frontend: 'Couche Frontend',
      backend: 'Couche Backend',
      data: 'Couche Data et IA',
      flowTitle: 'Flux Systeme',
      stepLabel: 'Etape',
      flow: ['Requete Client', 'API Gateway', 'Service Layer', 'Data et Modeles', 'Insights Retournes'],
    },
    work: {
      sectionTag: 'Parcours Professionnel',
      title: 'Experience Professionnelle',
      focus: 'Comment mon experience bancaire orientee client a renforce ma vision produit.',
      educationTitle: 'Formation',
      expectedGraduationLabel: 'Diplome Prevu',
    },
    skills: {
      sectionTag: 'Carte de Competences',
      radarTitle: 'Radar de Competences',
      searchPlaceholder: 'Rechercher une competence...',
      sortLabel: 'Tri',
      highToLow: 'Du plus eleve au plus faible',
      lowToHigh: 'Du plus faible au plus eleve',
      noMatch: 'Aucune competence ne correspond a votre recherche.',
    },
    awards: {
      sectionTag: 'Honneurs et Certifications',
    },
    gallery: {
      sectionTag: 'Moments',
      all: 'Tout',
      categories: {
        Hackathons: 'Hackathons',
        Projects: 'Projets',
        Events: 'Evenements',
      },
    },
    contact: {
      directTitle: 'Contact Direct',
      profilesLabel: 'Profils',
      name: 'Nom',
      email: 'Email',
      message: 'Message',
      namePlaceholder: 'Votre nom',
      emailPlaceholder: 'votre@email.com',
      messagePlaceholder: 'Parlez-moi de votre projet',
      send: 'Envoyer',
      sending: 'Envoi...',
      success: 'Message envoye avec succes. Merci pour votre contact.',
      errors: {
        name: 'Le nom est requis.',
        email: 'Un email valide est requis.',
        message: 'Le message doit avoir au moins 12 caracteres.',
      },
    },
    footer: {
      crafted: 'Concu a Kigali',
    },
  },
}

export const portfolioData = {
  personal: {
    name: 'NSENGIMANA Olivier',
    title: 'Software Engineer | Intelligent Systems Builder',
    headline: 'I engineer intelligent, scalable software systems that solve real-world problems.',
    location: 'Kigali, Rwanda',
    email: 'nsengimanaolivier100@gmail.com',
    phone: '+250786856578',
    whatsapp: '+250786856578',
    story: {
      EN: 'I started with curiosity, moved through consistent practice, and became an engineer focused on intelligent systems that create measurable everyday value. Before full-time software focus, I also gained frontline service experience through the Equity Leaders Program.',
      KINY: 'Natangiriye ku matsiko, nkomeza kwitoza buri munsi, maze mpinduka injeniyeri wibanda ku kubaka sisitemu zifite ubwenge zifasha abantu buri munsi. Mbere yo kwibanda cyane kuri software, nabanje no kugira ubunararibonye mu gutanga serivisi z imbere ku bakiliya binyuze muri Equity Leaders Program.',
      FR: 'J ai commence par la curiosite, puis par la discipline, pour devenir un ingenieur qui construit des systemes intelligents utiles au quotidien. Avant de me concentrer pleinement sur le logiciel, j ai aussi acquis une experience terrain en service client via le programme Equity Leaders.',
    },
    philosophy: {
      EN: 'Build products that are technically reliable, emotionally clear, and operationally scalable.',
      KINY: 'Kubaka ibicuruzwa byizewe mu ikoranabuhanga, bisobanutse ku mukoresha, kandi bishobora kwaguka.',
      FR: 'Construire des produits fiables techniquement, clairs pour l utilisateur et evolutifs dans l operation.',
    },
    journey: {
      EN: [
        'Began with web basics and small utility scripts.',
        'Built full-stack academic and civic systems.',
        'Moved into AI-assisted decision systems for practical workflows.',
      ],
      KINY: [
        'Natangiye niga web basics n ama scripts mato.',
        'Nubatse sisitemu za full-stack zo mu masomo no mu mibereho y abaturage.',
        'Ninjiye mu kubaka sisitemu zifashwa na AI ku kazi ka buri munsi.',
      ],
      FR: [
        'Debut avec les bases du web et des scripts utilitaires.',
        'Construction de systemes full-stack académiques et citoyens.',
        'Evolution vers des systemes d aide a la decision bases sur l IA.',
      ],
    },
  },
  stats: {
    projects: 21,
    certificates: 6,
    hackathons: 2,
    systemsBuilt: 10,
  },
  workExperience: [
    {
      company: 'Equity Bank Rwanda',
      role: {
        EN: 'Bank Teller Intern',
        KINY: 'Intern wa Teller muri Banki',
        FR: 'Stagiaire Guichetier Bancaire',
      },
      duration: {
        EN: '7 months internship',
        KINY: 'Internship y amezi 7',
        FR: 'Stage de 7 mois',
      },
      details: {
        EN: 'Handled transactions, cash balancing, and frontline customer operations with high accuracy during internship.',
        KINY: 'Nakiriye transactions, mbara amafaranga neza, kandi ntanga serivisi ku bakiliya ku rwego rwo hejuru mu gihe cya internship.',
        FR: 'Gestion des transactions, equilibrage de caisse et operations client avec grande precision pendant le stage.',
      },
    },
    {
      company: 'Equity Leaders Program',
      role: {
        EN: 'Customer Service Intern',
        KINY: 'Intern muri Customer Service',
        FR: 'Stagiaire en Service Client',
      },
      duration: {
        EN: '3 months internship',
        KINY: 'Internship y amezi 3',
        FR: 'Stage de 3 mois',
      },
      details: {
        EN: 'Supported customer issue resolution, service communication, and branch experience quality.',
        KINY: 'Nafashije gukemura ibibazo by abakiliya, gutanga amakuru ya serivisi, no kuzamura quality ya branch experience.',
        FR: 'Appui a la resolution des demandes client, communication de service et qualite de l experience agence.',
      },
    },
  ],
  education: [
    {
      institution: {
        EN: 'University of Rwanda',
        KINY: 'Kaminuza y u Rwanda',
        FR: 'Universite du Rwanda',
      },
      degree: {
        EN: 'Bachelor Degree in Information Technology',
        KINY: 'Impamyabumenyi y Icyiciro cya Mbere muri Information Technology',
        FR: 'Licence en Information Technology',
      },
      expectedGraduation: '2027',
      details: {
        EN: 'Currently pursuing core studies in software engineering, systems design, and applied computing.',
        KINY: 'Ndi gukomeza amasomo y ibanze muri software engineering, systems design, na applied computing.',
        FR: 'Actuellement en formation sur l ingenierie logicielle, la conception de systemes et l informatique appliquee.',
      },
    },
  ],
  skills: {
    frontend: [
      { name: 'React', level: 90 },
      { name: 'Next.js', level: 84 },
      { name: 'TypeScript', level: 82 },
      { name: 'Tailwind CSS', level: 88 },
    ],
    backend: [
      { name: 'Python', level: 92 },
      { name: 'Django', level: 90 },
      { name: 'REST APIs', level: 88 },
    ],
    databases: [
      { name: 'PostgreSQL', level: 86 },
      { name: 'MySQL', level: 80 },
      { name: 'MongoDB', level: 78 },
    ],
    ai_ml: [
      { name: 'Recommendation Systems', level: 82 },
      { name: 'Profile Screening Systems', level: 86 },
      { name: 'Model Evaluation', level: 75 },
    ],
    devops: [
      { name: 'Git/GitHub', level: 90 },
      { name: 'Vercel/Render', level: 84 },
      { name: 'AWS Fundamentals', level: 70 },
    ],
    other: [
      { name: 'C#', level: 72 },
      { name: 'PowerShell', level: 74 },
      { name: 'Batchfile', level: 68 },
    ],
    professional: [
      { name: 'Customer Service', level: 88 },
      { name: 'Cash Handling Accuracy', level: 86 },
      { name: 'Communication', level: 87 },
      { name: 'Conflict Resolution', level: 82 },
      { name: 'Team Collaboration', level: 85 },
    ],
  },
  social: {
    github: 'https://github.com/kingblessolivier',
    linkedin: 'https://linkedin.com/in/placeholder',
    twitter: 'https://x.com/NSENGIMANAOLIV4',
    instagram: 'https://www.instagram.com/blessking_/',
  },
  professionalLinks: [
    { label: 'GitHub Profile', url: 'https://github.com/kingblessolivier' },
    { label: 'LinkedIn Profile', url: 'https://linkedin.com/in/placeholder' },
    { label: 'Resume (Placeholder)', url: '#' },
  ],
  achievements: [
    {
      title: 'HATANA Hackathon - University of Rwanda',
      description: 'Participated with team in HATANA hackathon organized by Mastercard and won a prize with MedLink.',
      issuer: 'Mastercard / University of Rwanda',
      year: '2025',
    },
    {
      title: 'I Star Hackathon Participant',
      description: 'Participated in I Star Hackathon and received certificate',
      issuer: 'I Star Hackathon',
      year: '2024',
    },
    {
      title: 'Cisco Cybersecurity Certificate',
      description: 'Introduction to Cybersecurity - Cisco',
      issuer: 'Cisco',
      year: '2024',
    },
    {
      title: 'FreeCodeCamp Responsive Web Design',
      description: 'Certified in responsive web design',
      issuer: 'freeCodeCamp',
      year: '2023',
    },
    {
      title: 'Digital Marketing Certificate',
      description: 'UniAthena certification in digital marketing',
      issuer: 'UniAthena',
      year: '2024',
    },
    {
      title: 'C# Fundamentals',
      description: 'freeCodeCamp certification in C# basics',
      issuer: 'freeCodeCamp',
      year: '2023',
    },
  ],
  projects: [
    {
      name: 'MedLink System',
      category: 'HealthTech',
      tech: ['React', 'Django', 'PostgreSQL', 'Maps API'],
      link: 'https://github.com/kingblessolivier/medlink-system',
      description: {
        EN: 'A platform that helps patients book doctor appointments and find nearby hospitals without waiting in long queues.',
        KINY: 'Urubuga rufasha abantu gufata rendez-vous kwa muganga no kubona ibitaro bibari hafi batarinze gutonda imirongo miremire.',
        FR: 'Une plateforme qui aide les patients a reserver des rendez-vous medicaux et trouver les hopitaux proches sans longues files d attente.',
      },
      caseStudy: {
        problem: {
          EN: 'Patients were spending too much time in hospital queues just to secure appointments or basic guidance.',
          KINY: 'Abarwayi batakarizaga igihe kinini mu mirongo y ibitaro bashaka appointment cyangwa amakuru y ibanze.',
          FR: 'Les patients perdaient beaucoup de temps dans les files d hopitaux pour obtenir un rendez-vous ou des informations de base.',
        },
        solution: {
          EN: 'Built MedLink to support appointment booking, hospital discovery by proximity, and faster navigation to care services.',
          KINY: 'Twubatse MedLink ifasha gufata appointment, kubona ibitaro byegereye umuntu, no kugera kuri serivisi z ubuvuzi byihuse.',
          FR: 'Creation de MedLink pour la reservation de rendez-vous, la recherche d hopitaux proches et un acces plus rapide aux soins.',
        },
        role: {
          EN: 'Contributed to product design, backend API flows, and end-to-end user journey optimization with my team.',
          KINY: 'Natanze uruhare muri product design, backend API flows, no kunoza urugendo rw umukoresha hamwe n itsinda ryanjye.',
          FR: 'Contribution au design produit, aux flux API backend et a l optimisation du parcours utilisateur avec mon equipe.',
        },
        architecture: ['Client App', 'Appointment API', 'Hospital Locator Service', 'PostgreSQL'],
        challenges: {
          EN: 'Ensuring reliable booking flow while keeping location-based results fast and accurate.',
          KINY: 'Kugira booking flow yizewe no gutanga ibisubizo by aho ibitaro biri vuba kandi neza.',
          FR: 'Assurer un flux de reservation fiable tout en gardant des resultats geolocalises rapides et precis.',
        },
        impact: {
          EN: 'The project won a prize and demonstrated a practical path to reducing wait-time pressure in healthcare access.',
          KINY: 'Uyu mushinga wegukanye igihembo kandi werekanye uburyo bufatika bwo kugabanya igihe cyo gutegereza muri serivisi z ubuvuzi.',
          FR: 'Le projet a remporte un prix et a demontre une voie concrete pour reduire l attente dans l acces aux soins.',
        },
      },
    },
    {
      name: 'Candidate Screening System',
      category: 'AI',
      tech: ['Python', 'Django', 'AI/ML'],
      link: 'https://github.com/kingblessolivier/candidate_screening_system',
      description: {
        EN: 'AI-powered system for HR recruitment automation and candidate evaluation.',
        KINY: 'Sisitemu ifashwa na AI yihutisha kwakira no gusuzuma abakandida.',
        FR: 'Systeme base sur IA pour automatiser le tri des candidats en recrutement.',
      },
      caseStudy: {
        problem: {
          EN: 'Manual CV review was slow and inconsistent for recruitment teams.',
          KINY: 'Gusoma CV intoki byafataga igihe kinini kandi bitangira ibisubizo bitandukana.',
          FR: 'La revue manuelle des CV etait lente et peu coherente.',
        },
        solution: {
          EN: 'Built a scoring pipeline that extracts profile signals and ranks candidates by fit.',
          KINY: 'Nubatse pipeline isuzuma amakuru yingenzi maze ikagena urutonde rw abakandida.',
          FR: 'Creation d un pipeline de scoring qui extrait les signaux et classe les profils.',
        },
        role: {
          EN: 'Designed backend logic, ranking API, and recruiter dashboard integration.',
          KINY: 'Nateguye logic ya backend, ranking API, no guhuza dashboard y abashaka abakozi.',
          FR: 'Conception de la logique backend, API de classement et integration dashboard.',
        },
        architecture: ['Django API', 'Scoring Service', 'PostgreSQL', 'Dashboard Client'],
        challenges: {
          EN: 'Balancing fairness, explainability, and ranking speed.',
          KINY: 'Guhuza ubutabera, gusobanurira neza ibisubizo, n umuvuduko.',
          FR: 'Equilibrer equite, explicabilite et rapidite du classement.',
        },
        impact: {
          EN: 'Improved recruiter workflow consistency and reduced repetitive screening effort.',
          KINY: 'Yongereye consistency mu kazi k abashaka abakozi kandi igabanya imirimo yisubiramo.',
          FR: 'Amelioration de la coherence du workflow et reduction du tri repetitif.',
        },
      },
    },
    {
      name: 'AI Profile Screening System',
      category: 'AI',
      tech: ['Python', 'Machine Learning'],
      link: 'https://github.com/kingblessolivier/Ai-Profile-Screening-System',
      description: {
        EN: 'Machine learning system for analyzing and ranking candidate profiles.',
        KINY: 'Sisitemu ya ML isesengura profile z abakandida ikazishyira ku rutonde.',
        FR: 'Systeme ML pour analyser et classer les profils candidats.',
      },
      caseStudy: {
        problem: {
          EN: 'Recruiters needed structured profile comparison rather than subjective sorting.',
          KINY: 'Abashaka abakozi bakeneye uburyo bushingiye ku bipimo aho guhitamo ku marangamutima.',
          FR: 'Besoin d une comparaison structuree des profils au lieu d un tri subjectif.',
        },
        solution: {
          EN: 'Implemented feature extraction and weighted ranking based on role requirements.',
          KINY: 'Nashyizeho extraction y ibimenyetso no ranking ishingiye ku bisabwa n akazi.',
          FR: 'Mise en place d extraction de features et de classement pondere par role.',
        },
        role: {
          EN: 'Owned data preparation, model experimentation, and API output format.',
          KINY: 'Nari nshinzwe gutegura data, kugerageza model, no gutunganya output ya API.',
          FR: 'Responsable preparation des donnees, experimentation modele et format API.',
        },
        architecture: ['Data Preprocessor', 'ML Ranker', 'Inference API', 'Result Renderer'],
        challenges: {
          EN: 'Handling incomplete resumes and ensuring stable ranking behavior.',
          KINY: 'Gucunga CV zituzuye no gutanga ranking ihamye.',
          FR: 'Gestion de CV incomplets et stabilite du classement.',
        },
        impact: {
          EN: 'Provided clearer candidate prioritization for interview decisions.',
          KINY: 'Yatanze uburyo busobanutse bwo gushyira imbere abakandida mu guhamagara interviews.',
          FR: 'A fourni une priorisation plus claire pour les decisions d entretien.',
        },
      },
    },
    {
      name: 'CineRec',
      category: 'AI',
      tech: ['Python', 'Django', 'ML'],
      link: 'https://github.com/kingblessolivier/CineRec',
      description: {
        EN: 'Movie recommendation system using machine learning with dashboards.',
        KINY: 'Sisitemu itanga inama za filime hifashishijwe machine learning na dashboards.',
        FR: 'Systeme de recommandation de films avec machine learning et tableaux de bord.',
      },
      caseStudy: {
        problem: {
          EN: 'Users struggled to discover relevant movies quickly.',
          KINY: 'Abakoresha bagiraga ikibazo cyo kubona filime zijyanye n ibyo bakunda vuba.',
          FR: 'Les utilisateurs trouvaient difficile de decouvrir rapidement les films pertinents.',
        },
        solution: {
          EN: 'Built a recommendation engine with preference signals and trend-aware suggestions.',
          KINY: 'Nubatse recommendation engine ikoresha preferences n ibigezweho.',
          FR: 'Moteur de recommandation base sur preferences et tendances.',
        },
        role: {
          EN: 'Developed recommendation logic, API, and performance dashboard.',
          KINY: 'Nakoze logic ya recommendation, API, na dashboard y imikorere.',
          FR: 'Developpement logique recommandation, API et dashboard de performance.',
        },
        architecture: ['User Signal Collector', 'Recommendation Engine', 'Django API', 'Analytics Dashboard'],
        challenges: {
          EN: 'Cold-start recommendations and balancing relevance with diversity.',
          KINY: 'Cold-start no guhuza relevance n diversity.',
          FR: 'Probleme de cold start et equilibre pertinence/diversite.',
        },
        impact: {
          EN: 'Improved navigation confidence and reduced random browsing behavior.',
          KINY: 'Yafashije abakoresha gufata ibyemezo vuba no kugabanya gutembera nta ntego.',
          FR: 'Amelioration de la confiance de navigation et reduction du parcours aleatoire.',
        },
      },
    },
    {
      name: 'Property Management System',
      category: 'Web',
      tech: ['Django', 'PostgreSQL'],
      link: 'https://github.com/kingblessolivier/Property_management',
      description: {
        EN: 'System for managing tenants, rent, and property records.',
        KINY: 'Sisitemu yo gucunga abakodesha, ubwishyu, n amakuru y inzu.',
        FR: 'Systeme de gestion des locataires, loyers et biens immobiliers.',
      },
      caseStudy: {
        problem: {
          EN: 'Landlords tracked payments and tenant records manually.',
          KINY: 'Abafite inzu bakoreshaga uburyo bw intoki mu gukurikirana ubwishyu n amakuru y abakodesha.',
          FR: 'Les proprietaires suivaient paiements et dossiers locataires manuellement.',
        },
        solution: {
          EN: 'Created a centralized dashboard for rents, tenant profiles, and property history.',
          KINY: 'Nashyizeho dashboard imwe ihuza ubwishyu, profile z abakodesha, n amateka y inzu.',
          FR: 'Tableau centralise pour loyers, profils locataires et historique immobilier.',
        },
        role: {
          EN: 'Led backend models, auth rules, and payment tracking workflows.',
          KINY: 'Nari nshinzwe models za backend, amategeko ya authentication, na workflows zo gukurikirana ubwishyu.',
          FR: 'Conduite des modeles backend, regles d authentification et suivi des paiements.',
        },
        architecture: ['Tenant UI', 'Django Services', 'PostgreSQL', 'Notification Jobs'],
        challenges: {
          EN: 'Maintaining data consistency across tenant and billing updates.',
          KINY: 'Kubungabunga consistency y amakuru hagati y abakodesha n ubwishyu.',
          FR: 'Maintenir la coherence des donnees entre locataires et facturation.',
        },
        impact: {
          EN: 'Improved clarity of rent status and reduced missed follow-ups.',
          KINY: 'Yorohereje kumenya status y ubwishyu no kugabanya follow-ups zibura.',
          FR: 'Amelioration de la visibilite des loyers et reduction des suivis manques.',
        },
      },
    },
    {
      name: 'Citizen Engagement System',
      category: 'Web',
      tech: ['Django', 'REST API'],
      link: 'https://github.com/kingblessolivier/citizen_engagement_system',
      description: {
        EN: 'Platform connecting citizens with public services and feedback systems.',
        KINY: 'Urubuga ruhuza abaturage na serivisi za leta n uburyo bwo gutanga ibitekerezo.',
        FR: 'Plateforme reliant citoyens, services publics et systeme de feedback.',
      },
      caseStudy: {
        problem: {
          EN: 'Citizen feedback channels were fragmented and hard to track.',
          KINY: 'Inzira zo gutanga ibitekerezo zari zitandukanye kandi bigoye gukurikirana.',
          FR: 'Les canaux de feedback citoyen etaient fragmentes et difficiles a suivre.',
        },
        solution: {
          EN: 'Built a unified ticket and response workflow between citizens and service teams.',
          KINY: 'Nubatse workflow imwe ya tickets n ibisubizo hagati y abaturage n amakipe ya serivisi.',
          FR: 'Workflow unique de tickets et reponses entre citoyens et services.',
        },
        role: {
          EN: 'Designed APIs, case lifecycle rules, and role-based access controls.',
          KINY: 'Nateguye APIs, amategeko y ubuzima bwa case, na role-based access.',
          FR: 'Conception APIs, cycle de vie des cas et controle d acces par role.',
        },
        architecture: ['Citizen Portal', 'Case API', 'Workflow Engine', 'Admin Resolution Panel'],
        challenges: {
          EN: 'Designing transparent status updates for different user groups.',
          KINY: 'Gutegura updates za status zisobanutse ku byiciro bitandukanye by abakoresha.',
          FR: 'Concevoir des mises a jour de statut transparentes pour differents profils.',
        },
        impact: {
          EN: 'Enabled clearer communication between citizens and service operators.',
          KINY: 'Yafashije itumanaho risobanutse hagati y abaturage n abatanga serivisi.',
          FR: 'A permis une communication plus claire entre citoyens et operateurs publics.',
        },
      },
    },
    {
      name: 'ClassHub',
      category: 'Web',
      tech: ['Django', 'MySQL'],
      link: 'https://github.com/kingblessolivier/ClassHub',
      description: {
        EN: 'Student assignment submission and academic management system.',
        KINY: 'Sisitemu yohereza assignments no gucunga ibikorwa by amashuri.',
        FR: 'Systeme de soumission des devoirs et gestion academique.',
      },
      caseStudy: {
        problem: {
          EN: 'Assignment workflows were inconsistent across classes.',
          KINY: 'Uburyo bwo kohereza assignments bwari butandukanye mu masomo atandukanye.',
          FR: 'Les workflows de devoirs etaient incoherents entre classes.',
        },
        solution: {
          EN: 'Developed a unified submission, grading, and feedback workflow.',
          KINY: 'Nubatse uburyo bumwe bwo kohereza, gutanga amanota, no gutanga feedback.',
          FR: 'Workflow unifie de soumission, notation et feedback.',
        },
        role: {
          EN: 'Implemented data model, instructor tools, and student assignment flow.',
          KINY: 'Nashyize mu bikorwa data model, ibikoresho by abarimu, n uburyo bw abanyeshuri.',
          FR: 'Implementation du modele de donnees, outils enseignants et parcours etudiant.',
        },
        architecture: ['Student Interface', 'Assignment Service', 'MySQL Storage', 'Instructor Dashboard'],
        challenges: {
          EN: 'Handling deadlines, versioning, and feedback history cleanly.',
          KINY: 'Gucunga deadlines, versions, n amateka ya feedback neza.',
          FR: 'Gerer echeances, versions et historique de feedback proprement.',
        },
        impact: {
          EN: 'Improved assignment visibility for both students and instructors.',
          KINY: 'Yongereye kugaragara kw ibikorwa ku banyeshuri n abarimu.',
          FR: 'Amelioration de la visibilite des devoirs pour etudiants et enseignants.',
        },
      },
    },
  ],
  gallery: [
    {
      title: 'I Star Hackathon Certificate Moment',
      image: '/Olivier_istar_hackton_cerificate.jpeg',
      category: 'Hackathons',
    },
    {
      title: 'Coding Session with Team',
      image: '/coding_session.jpeg',
      category: 'Projects',
    },
    {
      title: 'Portfolio Profile Event Shot',
      image: '/olivier_image.jpeg',
      category: 'Events',
    },
  ],
  systemDesign: {
    frontend: ['React UI', 'Routing', 'State + Form UX', 'Client-side validation'],
    backend: ['Django REST APIs', 'Auth & RBAC', 'Business logic services', 'Async workers'],
    data: ['PostgreSQL/MySQL', 'Feature extraction', 'Model inference', 'Monitoring insights'],
  },
  vision: {
    statement: 'My vision is to build intelligent and scalable systems that transform industries in Africa and beyond.',
  },
}

export const uiContent = i18n

export const personalInfo = portfolioData.personal

export const labels = Object.fromEntries(
  languages.map((lang) => [
    lang,
    {
      ...i18n[lang].nav,
      visitors: i18n[lang].hero.visitors,
      viewProjects: i18n[lang].hero.viewProjects,
      contactMe: i18n[lang].hero.contactMe,
      signatureTag: i18n[lang].hero.signatureTag,
      coreFocusLabel: i18n[lang].hero.coreFocusLabel,
      coreFocusValue: i18n[lang].hero.coreFocusValue,
      visionLabel: i18n[lang].hero.visionLabel,
      projectsLabel: i18n[lang].hero.projectsLabel,
      systemsLabel: i18n[lang].hero.systemsLabel,
      certificatesLabel: i18n[lang].hero.certificatesLabel,
      heroHeadline: portfolioData.personal.headline,
      roleLines: i18n[lang].hero.roleLines,
    },
  ]),
)

export const aboutContent = {
  EN: portfolioData.personal.story.EN,
  KINY: portfolioData.personal.story.KINY,
  FR: portfolioData.personal.story.FR,
}

export const projects = portfolioData.projects

export const skills = {
  Frontend: portfolioData.skills.frontend,
  Backend: portfolioData.skills.backend,
  Database: portfolioData.skills.databases,
  'AI/ML': portfolioData.skills.ai_ml,
  DevOps: portfolioData.skills.devops,
  Other: portfolioData.skills.other,
  Professional: portfolioData.skills.professional,
}

export const awards = portfolioData.achievements

export const galleryImages = portfolioData.gallery

export const contactInfo = {
  email: portfolioData.personal.email,
  phone: portfolioData.personal.phone,
  whatsapp: portfolioData.personal.whatsapp,
}

export const socialLinks = portfolioData.social
