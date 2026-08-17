export type SkillLevel = 'Beginner' | 'Intermediate' | 'Learning';

export type SkillCategory = 'Programming' | 'Web Development' | 'Computer Science' | 'Tools';

export interface SkillItem {
  id: string;
  name: string;
  level: SkillLevel;
  iconName: string; // Lucide icon name or category
  category: SkillCategory;
  description?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  isFeatured?: boolean;
  category?: 'Web App' | 'Frontend' | 'Utility';
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  status: string;
  description: string;
  highlights: string[];
}

export interface JourneyStep {
  id: string;
  phase: string;
  title: string;
  period: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  description: string;
  skillsAcquired: string[];
  icon: string;
}

export interface GoalItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'Skill' | 'Career' | 'Academic' | 'Project';
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  aboutDetailed: string[];
  education: string;
  degree: string;
  semester: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  resumePath: string;
  phone?: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: SkillItem[];
  projects: Project[];
  education: EducationItem[];
  journey: JourneyStep[];
  goals: GoalItem[];
  messages: ContactMessage[];
}
