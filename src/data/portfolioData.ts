import { Project, ProcessStep } from '../types';

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

export const projects: Project[] = [
  {
    number: '01',
    name: 'FitMadix',
    type: 'AI HEALTH COMPANION',
    status: 'ACTIVE',
    statement: 'DESIGNED TO MAKE HEALTH TECHNOLOGY FEEL HUMAN.',
    image: art.desk,
    fallbackImage: art.deskFallback,
    tags: ['React', 'AI', 'Product'],
    overview:
      'FitMadix bridges the gap between mechanical biometric tracking and thoughtful human coaching. Powered by contextual intelligence that adapts to daily habits without intrusive noise.',
  },
  {
    number: '02',
    name: 'Support Bot',
    type: 'CONVERSATIONAL PRODUCT',
    status: 'EXPLORING',
    statement: 'A SMALLER DISTANCE BETWEEN A QUESTION AND A USEFUL ANSWER.',
    image: art.lab,
    fallbackImage: art.labFallback,
    tags: ['Python', 'LLMs', 'Automation'],
    overview:
      'A grounded conversational agent designed to parse product documentation, resolve friction points in real time, and route ambiguous queries with transparent reasoning.',
  },
  {
    number: '03',
    name: 'Shopora',
    type: 'E-COMMERCE EXPERIENCE',
    status: 'CONCEPT',
    statement: 'SHOPPING, STRIPPED OF THE NOISE.',
    image: art.ending,
    fallbackImage: art.endingFallback,
    tags: ['TypeScript', 'UX', 'Web'],
    overview:
      'A minimalist e-commerce storefront experiment centered on high typographic hierarchy, lightning-fast cart interactions, and distraction-free checkout flows.',
  },
  {
    number: '04',
    name: 'The Baking Nest',
    type: 'BRAND + WEB EXPERIENCE',
    status: 'CONCEPT',
    statement: 'A WARM DIGITAL PLACE FOR THINGS MADE BY HAND.',
    image: art.desk,
    fallbackImage: art.deskFallback,
    tags: ['Design', 'Frontend', 'Story'],
    overview:
      'An artisanal bakery showcase capturing warmth and tactile craft through dynamic paper textures, organic layout pacing, and bespoke storytelling micro-interactions.',
  },
  {
    number: '05',
    name: 'Study House',
    type: 'LEARNING TOOLKIT',
    status: 'IN PROGRESS',
    statement: 'BUILDING BETTER HABITS ONE CLEAR SCREEN AT A TIME.',
    image: art.lab,
    fallbackImage: art.labFallback,
    tags: ['React', 'Systems', 'Learning'],
    overview:
      'A distraction-free study environment designed for students. Combines deep work intervals, active recall flashcards, and minimalist progress metrics.',
  },
];

export const skills = ['C', 'C++', 'PYTHON', 'JAVASCRIPT', 'HTML', 'CSS', 'REACT', 'GIT'];

export const skillDescriptions: Record<string, string> = {
  'C': 'Low-level foundations, memory management, pointer arithmetic, and algorithmic understanding.',
  'C++': 'Object-oriented structures, STL containers, competitive problem solving, and system efficiency.',
  'PYTHON': 'Scripting, data manipulation, automation scripts, and interfacing with machine learning models.',
  'JAVASCRIPT': 'Modern ES6+ patterns, asynchronous promises, DOM interfaces, and frontend interactivity.',
  'HTML': 'Semantic layouts, document hierarchy, accessibility standards, and clean structural markup.',
  'CSS': 'Responsive architecture, custom layout systems, typographic rhythm, and motion transitions.',
  'REACT': 'Component lifecycle, modern hooks, state synchronization, and reactive UI development.',
  'GIT': 'Version control discipline, atomic branching, commit hygiene, and collaborative workflows.',
};

export const exploring = ['AI', 'MACHINE LEARNING', 'LLMs', 'RAG', 'AUTOMATION', 'AI ENGINEERING'];

export const exploringDescriptions: Record<string, string> = {
  'AI': 'Exploring neural architectures, intelligent agents, and cognitive system design.',
  'MACHINE LEARNING': 'Studying supervised/unsupervised algorithms, evaluation metrics, and feature pipelines.',
  'LLMs': 'Prompt engineering, token economics, context window management, and structured tool use.',
  'RAG': 'Retrieval-Augmented Generation, vector embeddings, chunking strategies, and hybrid semantic search.',
  'AUTOMATION': 'Agentic workflows, autonomous background task execution, and workflow optimization.',
  'AI ENGINEERING': 'Bridging foundational models with high-reliability full-stack web software.',
};

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
