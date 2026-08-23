import { PersonalInfo, Project, SkillItem, EducationItem, JourneyStep, GoalItem, PortfolioData, ContactMessage } from '../types';

export const initialPersonalInfo: PersonalInfo = {
  name: "Prem Sharma",
  title: "BCA Student | Aspiring Software Developer | Web Developer",
  tagline: "Building strong foundations in computer science, web development, and problem solving.",
  bio: "I am a 1st Semester BCA student at Swami Vivekananda University, deeply passionate about software engineering, web development, and algorithms. I focus on learning core programming fundamentals, building functional web applications, and constantly sharpening my problem-solving abilities through hands-on code.",
  aboutDetailed: [
    "I am currently pursuing my Bachelor of Computer Applications (BCA) at Swami Vivekananda University. My journey in technology is driven by a deep curiosity for how software systems work under the hood.",
    "I am building solid foundations in C, C++, Python, JavaScript, and Data Structures & Algorithms (DSA). I believe in learning by doing, which is why I turn concepts into real projects.",
    "As an aspiring software developer, I am actively building web applications, mastering modern developer tools like Git & GitHub, and preparing myself for future engineering roles."
  ],
  education: "Swami Vivekananda University",
  degree: "Bachelor of Computer Applications (BCA)",
  semester: "1st Semester Student",
  location: "India",
  email: "sharmaprem3010@gmail.com",
  github: "https://github.com/sharmaprem3010-netizen",
  linkedin: "https://linkedin.com/in/prem-sharma-bca",
  resumePath: "/resume.pdf",
  heroHighlights: [
    "C / C++ & Python",
    "Web Dev (HTML/CSS/JS)",
    "Data Structures & Algorithms"
  ],
  heroButtons: [
    "View My Projects",
    "Contact Me",
    "Resume"
  ],
  aboutBullets: [
    "Focused on writing clean, readable, and structured code.",
    "Self-motivated student eager to solve real-world technical problems.",
    "Continuously improving technical knowledge through hands-on development."
  ],
  aboutHighlights: [
    {
      icon: "GraduationCap",
      title: "BCA Undergraduate",
      description: "1st Semester student at Swami Vivekananda University, building theoretical & practical CS foundations."
    },
    {
      icon: "Code2",
      title: "Active Developer",
      description: "Writing code in C, C++, Python, and JavaScript while developing interactive web applications."
    },
    {
      icon: "Brain",
      title: "Problem Solver",
      description: "Focusing on Data Structures & Algorithms (DSA) to write clean, time-efficient code."
    },
    {
      icon: "Rocket",
      title: "Practical Builder",
      description: "Turning classroom concepts into live software projects like FitMadix and personal portfolio tools."
    }
  ]
};

export const initialSkillsData: SkillItem[] = [
  // Programming
  { id: '1', name: 'C Language', level: 'Intermediate', iconName: 'Code2', category: 'Programming', description: 'Core syntax, pointers, memory management, functions' },
  { id: '2', name: 'C++', level: 'Intermediate', iconName: 'Terminal', category: 'Programming', description: 'OOP concepts, STL basics, problem solving' },
  { id: '3', name: 'Python', level: 'Intermediate', iconName: 'FileCode2', category: 'Programming', description: 'Basic scripting, data structures, logic building' },
  { id: '4', name: 'JavaScript', level: 'Intermediate', iconName: 'Braces', category: 'Programming', description: 'ES6+ syntax, DOM manipulation, async concepts' },

  // Web Development
  { id: '5', name: 'HTML5', level: 'Intermediate', iconName: 'Layout', category: 'Web Development', description: 'Semantic structure, accessibility, web standards' },
  { id: '6', name: 'CSS3', level: 'Intermediate', iconName: 'Palette', category: 'Web Development', description: 'Flexbox, Grid, keyframe animations, custom styling' },
  { id: '7', name: 'Responsive Web Design', level: 'Intermediate', iconName: 'Smartphone', category: 'Web Development', description: 'Mobile-first layouts, media queries, fluid design' },
  { id: '8', name: 'Frontend Development', level: 'Intermediate', iconName: 'Globe', category: 'Web Development', description: 'Interactive web apps, UI/UX implementation' },

  // Computer Science
  { id: '9', name: 'Data Structures & Algorithms', level: 'Learning', iconName: 'Binary', category: 'Computer Science', description: 'Arrays, Linked Lists, Stacks, Queues, Sorting & Searching' },
  { id: '10', name: 'Object-Oriented Programming', level: 'Intermediate', iconName: 'Boxes', category: 'Computer Science', description: 'Classes, Inheritance, Encapsulation, Polymorphism' },
  { id: '11', name: 'Database Fundamentals', level: 'Learning', iconName: 'Database', category: 'Computer Science', description: 'Relational DB concepts, basic SQL queries, tables' },
  { id: '12', name: 'Digital Electronics', level: 'Learning', iconName: 'Cpu', category: 'Computer Science', description: 'Logic gates, Boolean algebra, binary systems' },
  { id: '13', name: 'Problem Solving', level: 'Intermediate', iconName: 'Lightbulb', category: 'Computer Science', description: 'Algorithmic thinking, debugging, code optimization' },

  // Tools & Technologies
  { id: '14', name: 'Git', level: 'Intermediate', iconName: 'GitBranch', category: 'Tools', description: 'Version control, commit history, branching' },
  { id: '15', name: 'GitHub', level: 'Intermediate', iconName: 'Github', category: 'Tools', description: 'Repository hosting, project sharing, open source' },
  { id: '16', name: 'VS Code', level: 'Intermediate', iconName: 'Laptop', category: 'Tools', description: 'Extensions, debugging, productivity setups' },
  { id: '17', name: 'Microsoft Office', level: 'Intermediate', iconName: 'FileText', category: 'Tools', description: 'Word, PowerPoint documentation' },
  { id: '18', name: 'Basic Excel', level: 'Intermediate', iconName: 'Table', category: 'Tools', description: 'Data organization, formulas, spreadsheets' },
];

export const initialProjectsData: Project[] = [
  {
    id: 'fitmadix',
    name: 'FitMadix',
    description: 'A fitness-related web application designed to provide users with a modern, interactive workout and health tracking experience.',
    longDescription: 'FitMadix is a web application created to simplify health and workout management. It features a responsive UI, interactive elements for tracking routines, and a clean user experience crafted with modern frontend web technologies.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Web APIs'],
    liveUrl: 'https://fitmadix-app.vercel.app/',
    githubUrl: 'https://github.com/sharmaprem3010-netizen/FitMadix',
    isFeatured: true,
    category: 'Web App'
  },
  {
    id: 'my-portfolio',
    name: 'My Portfolio',
    description: 'A personal portfolio website showcasing skills, projects, learning journey, and computer science development work.',
    longDescription: 'A custom portfolio website built to highlight my personal development journey, featuring smooth scroll navigation, responsive project cards, clean typography, and a showcase of my technical foundation.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    liveUrl: 'https://sharmaprem3010-netizen.github.io/MY-PORTFOLIO/',
    githubUrl: 'https://github.com/sharmaprem3010-netizen/MY-PORTFOLIO',
    isFeatured: true,
    category: 'Frontend'
  }
];

export const initialEducationData: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Swami Vivekananda University',
    period: '2026 - Present',
    status: '1st Semester Student',
    description: 'Pursuing a comprehensive undergraduate degree in computer applications covering core computer science principles, software development, mathematics, and database management.',
    highlights: [
      'Focusing on C, C++, and Data Structures & Algorithms',
      'Studying Digital Electronics & Computer Architecture',
      'Building practical web projects alongside academic coursework',
      'Active member of computer science study groups'
    ]
  }
];

export const initialJourneyData: JourneyStep[] = [
  {
    id: 'j-1',
    phase: 'Phase 1',
    title: 'Programming Fundamentals & Logic',
    period: 'Early Journey',
    status: 'Completed',
    description: 'Started my journey with C language, understanding logic building, flowcharts, variables, control structures, and memory concepts.',
    skillsAcquired: ['C Language', 'Logic Building', 'Control Statements', 'Pointers'],
    icon: 'Code2'
  },
  {
    id: 'j-2',
    phase: 'Phase 2',
    title: 'Object-Oriented Programming with C++',
    period: 'Ongoing',
    status: 'Completed',
    description: 'Transitioned to C++ to master Object-Oriented Programming principles including classes, encapsulation, inheritance, and STL basics.',
    skillsAcquired: ['C++', 'OOP Principles', 'Classes & Objects', 'STL Vectors'],
    icon: 'Terminal'
  },
  {
    id: 'j-3',
    phase: 'Phase 3',
    title: 'Web Development Foundations',
    period: 'Completed',
    status: 'Completed',
    description: 'Learned HTML5, CSS3, and JavaScript to build interactive frontend websites. Developed responsive design skills and completed real projects like FitMadix.',
    skillsAcquired: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI', 'Git/GitHub'],
    icon: 'Layout'
  },
  {
    id: 'j-4',
    phase: 'Phase 4',
    title: 'Data Structures & Algorithms (DSA)',
    period: 'Current Focus',
    status: 'In Progress',
    description: 'Actively solving problem sets on DSA topics including Arrays, Linked Lists, Stacks, Queues, Sorting algorithms, and Time Complexity.',
    skillsAcquired: ['Arrays & Strings', 'Searching/Sorting', 'Stack & Queue', 'Time Complexity'],
    icon: 'Binary'
  },
  {
    id: 'j-5',
    phase: 'Phase 5',
    title: 'Python & CS Fundamentals',
    period: 'Current Focus',
    status: 'In Progress',
    description: 'Exploring Python programming for rapid scripting alongside core academic courses in Database Fundamentals and Digital Electronics.',
    skillsAcquired: ['Python', 'SQL Basics', 'DBMS', 'Digital Electronics'],
    icon: 'FileCode2'
  },
  {
    id: 'j-6',
    phase: 'Phase 6',
    title: 'Full-Stack Engineering & Beyond',
    period: 'Upcoming Goal',
    status: 'Upcoming',
    description: 'Plan to master modern full-stack frameworks (React, Node.js, databases) and contribute actively to open-source software projects.',
    skillsAcquired: ['Full Stack Web', 'REST APIs', 'Database Design', 'Open Source'],
    icon: 'Globe'
  }
];

export const initialGoalsData: GoalItem[] = [
  {
    id: 'g-1',
    title: 'Becoming a Skilled Software Developer',
    description: 'Building solid engineering fundamentals in programming languages, clean code standards, and practical problem solving.',
    icon: 'Target',
    category: 'Career'
  },
  {
    id: 'g-2',
    title: 'Mastering Data Structures & Algorithms',
    description: 'Deepening problem-solving skills to write efficient, time-optimized, and space-optimized code across complex problem sets.',
    icon: 'Cpu',
    category: 'Skill'
  },
  {
    id: 'g-3',
    title: 'Becoming a Strong Full-Stack Developer',
    description: 'Expanding web capabilities from frontend UI to backend services, databases, and secure API design.',
    icon: 'Layers',
    category: 'Skill'
  },
  {
    id: 'g-4',
    title: 'Building Real-World Applications',
    description: 'Transforming ideas into functional tools that solve genuine user problems with sleek UX and responsive performance.',
    icon: 'Sparkles',
    category: 'Project'
  },
  {
    id: 'g-5',
    title: 'Contributing to Open-Source Projects',
    description: 'Collaborating with global developer communities on GitHub to gain real software development workflows and code reviews.',
    icon: 'GitPullRequest',
    category: 'Project'
  },
  {
    id: 'g-6',
    title: 'Securing Software Internships',
    description: 'Applying technical knowledge to professional environments through tech internships, team projects, and industry mentorship.',
    icon: 'Briefcase',
    category: 'Career'
  }
];

export const initialMessagesData: ContactMessage[] = [
  {
    id: 'msg-welcome',
    name: 'Prem Sharma System',
    email: 'admin@portfolio.local',
    subject: 'Welcome to your No-Code Portfolio Manager!',
    message: 'Hello Prem! Any messages sent through your portfolio contact form will appear here in real-time. You can edit every section of your portfolio, add projects, modify skills, and export backups without writing code.',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    read: false
  }
];

export const defaultPortfolioData: PortfolioData = {
  personalInfo: initialPersonalInfo,
  skills: initialSkillsData,
  projects: initialProjectsData,
  education: initialEducationData,
  journey: initialJourneyData,
  goals: initialGoalsData,
  messages: initialMessagesData
};

// Backwards compatibility aliases
export const personalInfo = initialPersonalInfo;
export const skillsData = initialSkillsData;
export const projectsData = initialProjectsData;
export const educationData = initialEducationData;
export const journeyData = initialJourneyData;
export const goalsData = initialGoalsData;
