import { Project, ProcessStep, EducationItem, CertificationItem } from '../types';

export const art = {
  desk: '/images/desk.jpeg',
  deskFallback:
    'https://static.prod-images.emergentagent.com/jobs/339fe535-93a8-4ac0-8da7-d5a94714170f/images/0269806d6a82fbb08bb17e94d48c9b212ab4b5e4b1853c93529462c9d74b0383.jpeg',
  lab: '/images/lab.jpeg',
  labFallback:
    'https://static.prod-images.emergentagent.com/jobs/339fe535-93a8-4ac0-8da7-d5a94714170f/images/d92bcba8124eef8e1c12107539eb99d3dc15ec085e92b997c09779ec28e88931.jpeg',
  ending: '/images/ending.jpeg',
  endingFallback:
    'https://static.prod-images.emergentagent.com/jobs/339fe535-93a8-4ac0-8da7-d5a94714170f/images/3a0c029a6ec43f87f0ac8a147fea0288e7b13e3eb33981d1e6d4e26b54276e1c.jpeg',
};

export const personalInfo = {
  name: 'Prem Sharma',
  role: 'AI & Full-Stack Developer | BCA Student',
  email: 'sharmaprem3010@gmail.com',
  phone: '+91 74397 02927',
  location: 'Kolkata, West Bengal, India',
  linkedin: 'https://www.linkedin.com/in/premsharmatech',
  github: 'https://github.com/sharmaprem3010-netizen',
  portfolio: 'https://sharmaprem3010-netizen.github.io/MY-PORTFOLIO',
  resumeUrl: '/Prem-Sharma-Resume-ATS.pdf',
  summary:
    'Second-year BCA (Computer Science) student with hands-on experience building and deploying full-stack web applications and AI-integrated tools using Python, HTML5, CSS, and JavaScript. Delivered 3+ production-deployed projects spanning conversational AI, e-commerce, and responsive web design. Strong foundation in Data Structures and Algorithms and Git/GitHub workflows. Seeking an AI Engineering or Full-Stack Developer role to apply technical and problem-solving skills in real-world software systems.',
};

export const projects: Project[] = [
  {
    number: '01',
    name: 'Fitmadix',
    type: 'AI DOCTOR ASSISTANT / HEALTHCARE',
    status: 'PRODUCTION',
    statement: 'CONVERSATIONAL SYMPTOM ANALYSIS POWERED BY GEMINI API.',
    image: art.desk,
    fallbackImage: art.deskFallback,
    tags: ['Next.js', 'Tailwind CSS', 'Gemini API', 'AI', 'Vercel'],
    liveUrl: 'https://fitmadix-app.vercel.app',
    githubUrl: 'https://github.com/sharmaprem3010-netizen',
    overview:
      'An intelligent conversational healthcare assistant built using the Gemini API and prompt engineering to deliver symptom analysis, tested to handle 50+ concurrent user queries with sub-second page loads and secure authentication.',
    highlights: [
      'Built an AI-powered healthcare assistant using the Gemini API and prompt engineering to deliver conversational symptom analysis, tested to handle 50+ concurrent user queries.',
      'Developed a responsive front-end with Next.js and Tailwind CSS, achieving a 95+ Lighthouse performance score and sub-second page load times.',
      'Implemented secure user authentication with encrypted consultation history storage for all registered profiles.',
      'Managed CI/CD deployment pipelines via Vercel, cutting deployment time by 20% versus manual builds.',
    ],
  },
  {
    number: '02',
    name: 'The Baking Nest',
    type: 'E-COMMERCE & ARTISANAL ORDERING',
    status: 'LIVE',
    statement: 'HANDCRAFTED HOMEMADE CAKES, BAKED FRESH TO ORDER.',
    image: art.lab,
    fallbackImage: art.labFallback,
    tags: ['React', 'Vite', 'Tailwind CSS', 'Netlify', 'WhatsApp API'],
    liveUrl: 'https://fascinating-hotteok-1eea98.netlify.app',
    githubUrl: 'https://github.com/sharmaprem3010-netizen',
    overview:
      'An artisanal homemade cake catalog and bakery ordering web app featuring handcrafted goods, seasonal selections, transparent pricing, and instant WhatsApp ordering with pickup coordination.',
    highlights: [
      'Engineered a responsive, mobile-first cake catalog with real ingredient breakdowns, flavor profiles, and allergen notes.',
      'Integrated zero-friction WhatsApp order dispatch pre-populating item selection, pickup schedule, and custom messages.',
      'Optimized lightweight asset delivery and buttery micro-interactions for sub-second page transitions.',
      'Automated deployment on Netlify with continuous Git push triggers and high uptime.',
    ],
  },
  {
    number: '03',
    name: 'E-Shopping Website',
    type: 'E-COMMERCE FRONTEND',
    status: 'PRODUCTION',
    statement: 'DYNAMIC 50+ PRODUCT CATALOG WITH SUB-SECOND RENDERING.',
    image: art.ending,
    fallbackImage: art.endingFallback,
    tags: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages', 'CI/CD'],
    liveUrl: 'https://sharmaprem3010-netizen.github.io/E-shopping-website',
    githubUrl: 'https://github.com/sharmaprem3010-netizen/E-shopping-website',
    overview:
      'Engineered a responsive e-commerce frontend supporting a dynamic catalog of 50+ products with sub-second rendering, optimized DOM manipulation, and automated GitHub Actions CI/CD.',
    highlights: [
      'Engineered a responsive e-commerce frontend supporting a dynamic catalog of 50+ products with sub-second rendering.',
      'Optimized asset loading and DOM manipulation, improving mobile performance metrics by 25% with full cross-browser compatibility.',
      'Automated deployment with GitHub Actions CI/CD, reducing manual build time by 40%.',
      'Maintained version control across 30+ commits, including secure repository secrets management.',
    ],
  },
  {
    number: '04',
    name: 'MY-PORTFOLIO',
    type: 'EDITORIAL WEB PORTFOLIO',
    status: 'ACTIVE',
    statement: 'ACCESSIBLE, HIGH-PERFORMANCE CENTRALIZED SHOWCASE.',
    image: art.desk,
    fallbackImage: art.deskFallback,
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'GitHub Pages'],
    liveUrl: 'https://sharmaprem3010-netizen.github.io/MY-PORTFOLIO',
    githubUrl: 'https://github.com/sharmaprem3010-netizen/MY-PORTFOLIO',
    overview:
      'A fully mobile-responsive portfolio site with an editorial anime/manga aesthetic, featuring interactive Recruiter Mode, direct ATS resume integration, and scoring 95+ on Core Web Vitals.',
    highlights: [
      'Built a fully mobile-responsive portfolio site with HTML5/React, CSS3, and JavaScript/TypeScript, scoring 95+ on Core Web Vitals.',
      'Designed a centralized layout showcasing 3+ technical projects with accessibility-optimized UI components.',
      'Integrated dual-mode viewing (Story Mode & Recruiter View) plus direct ATS Resume PDF access.',
      'Managed version control with Git and configured a zero-downtime CI/CD pipeline via GitHub Pages.',
    ],
  },
];

export const skills = [
  'PYTHON',
  'C++',
  'C',
  'JAVASCRIPT',
  'TYPESCRIPT',
  'HTML5',
  'CSS3',
  'REACT',
  'NEXT.JS',
  'GIT / GITHUB',
  'DSA',
  'ADVANCED EXCEL',
];

export const skillDescriptions: Record<string, string> = {
  'PYTHON':
    'Full-stack scripting, data manipulation, algorithm implementation, and interfacing with modern AI/LLM APIs.',
  'C++':
    'Object-oriented programming, STL algorithms & data structures, memory management, and competitive problem solving.',
  'C':
    'Foundational systems programming, pointer arithmetic, dynamic memory allocation, and algorithmic fundamentals.',
  'JAVASCRIPT':
    'Modern ES6+, asynchronous JavaScript (async/await), DOM manipulation, and building dynamic single-page web apps.',
  'TYPESCRIPT':
    'Strict type safety, interface contracts, scalable component architecture, and refactoring confidence.',
  'HTML5':
    'Semantic document structure, accessibility standards (WCAG), responsive layouts, and SEO best practices.',
  'CSS3':
    'Modern CSS architecture, Flexbox, CSS Grid, custom properties, responsive design, and smooth keyframe animations.',
  'REACT':
    'Declarative component state, React hooks, virtual DOM optimization, and component-driven web applications.',
  'NEXT.JS':
    'Server-side rendering, App Router architecture, API route handlers, and production-grade deployment on Vercel.',
  'GIT / GITHUB':
    'Atomic commits, branch management, collaborative pull requests, GitHub Actions CI/CD automation, and version control.',
  'DSA':
    'Core Computer Science data structures (arrays, linked lists, trees, graphs) and algorithms (searching, sorting, DP).',
  'ADVANCED EXCEL':
    'Certified data modeling, complex formulas (VLOOKUP, INDEX/MATCH), pivot tables, data cleaning, and reporting.',
};

export const exploring = [
  'GEMINI API',
  'CONVERSATIONAL AI',
  'PROMPT ENGINEERING',
  'LLMs',
  'FULL-STACK ARCHITECTURE',
  'CI/CD PIPELINES',
];

export const exploringDescriptions: Record<string, string> = {
  'GEMINI API':
    'Integrating Google Gemini multi-modal models for real-time symptom analysis and conversational AI features.',
  'CONVERSATIONAL AI':
    'Designing context-aware dialogue state managers, fallbacks, and user-centric conversational agents.',
  'PROMPT ENGINEERING':
    'Few-shot prompting, structured output enforcement (JSON schemas), system instructions, and chain-of-thought evaluation.',
  'LLMs':
    'Studying token economics, latency reduction, parameter-efficient fine-tuning, and retrieval-augmented systems.',
  'FULL-STACK ARCHITECTURE':
    'Connecting high-speed client frontends with resilient APIs, encrypted data persistence, and cloud hosting.',
  'CI/CD PIPELINES':
    'Automating build, test, and zero-downtime deployment pipelines with GitHub Actions, Vercel, and Netlify.',
};

export const education: EducationItem[] = [
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    field: 'Computer Science',
    institution: 'Swami Vivekananda University',
    period: '2025 – 2029',
    grade: 'CGPA: 8.5 / 10',
  },
  {
    degree: 'Higher Secondary (Class XII)',
    field: 'Biology Science',
    institution: 'Gustia Kshetranath High School',
    period: '2024 – 2025',
    grade: 'Score: 82.2%',
  },
];

export const certifications: CertificationItem[] = [
  {
    name: 'Advanced Excel',
    issuer: 'Ardent Pvt. Ltd.',
    year: '2025',
  },
];

export const languages = [
  { language: 'English', proficiency: 'Fluent' },
  { language: 'Hindi', proficiency: 'Fluent' },
  { language: 'Bengali', proficiency: 'Fluent' },
];

export const rules = [
  'BUILD SOMETHING REAL.',
  "DON'T STOP LEARNING.",
  'MAKE IT USEFUL.',
  'BREAK THINGS.',
  'FIX THEM BETTER.',
  'STAY CURIOUS.',
  "CREATE, DON'T JUST CONSUME.",
  'THE NEXT VERSION IS ALWAYS BETTER.',
];

export const processSteps: ProcessStep[] = [
  { number: '01', title: 'THINK', copy: 'Find the real problem beneath the first request.' },
  { number: '02', title: 'DESIGN', copy: 'Give the idea a shape people want to enter.' },
  { number: '03', title: 'BUILD', copy: 'Make a small version that can teach you something.' },
  { number: '04', title: 'BREAK', copy: 'Look for the edge. Invite the bug in.' },
  { number: '05', title: 'FIX', copy: 'Turn friction into a clearer decision.' },
  { number: '06', title: 'DEPLOY', copy: 'Put it in the hands of someone else.' },
  { number: '07', title: 'LEARN', copy: 'Listen to what the work says back.' },
  { number: '08', title: 'REPEAT', copy: 'Keep the loop alive.' },
];

