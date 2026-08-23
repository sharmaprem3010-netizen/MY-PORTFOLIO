import { PersonalInfo, Project, SkillItem, EducationItem, JourneyStep, GoalItem, PortfolioData, ContactMessage } from '../types';
import contentJson from '../src/content.json';

const content = contentJson as Partial<PortfolioData> & {
  hero?: {
    name?: string;
    title?: string;
    description?: string;
    subtitle?: string;
  };
  about?: {
    location?: string;
    status?: string;
    description?: string;
  };
};

// The content file stores hero/about copy separately from the legacy data shape.
// Normalize it once so every component can safely consume personalInfo.
export const defaultPortfolioData: PortfolioData = {
  personalInfo: content.personalInfo ?? {
    name: content.hero?.name ?? 'Prem Sharma',
    title: content.hero?.title ?? 'Aspiring Software Developer',
    tagline: content.hero?.subtitle ?? 'Web Developer',
    bio: content.hero?.description ?? '',
    aboutDetailed: content.about?.description ? [content.about.description] : [],
    education: 'Swami Vivekananda University',
    degree: 'BCA',
    semester: '1st Semester',
    location: content.about?.location ?? '',
    email: '',
    github: '',
    linkedin: '',
    resumePath: '',
  },
  skills: content.skills ?? [],
  projects: content.projects ?? [],
  education: content.education ?? [],
  journey: content.journey ?? [],
  goals: content.goals ?? [],
  messages: content.messages ?? [],
};

export const initialPersonalInfo: PersonalInfo = defaultPortfolioData.personalInfo;
export const initialSkillsData: SkillItem[] = defaultPortfolioData.skills;
export const initialProjectsData: Project[] = defaultPortfolioData.projects;
export const initialEducationData: EducationItem[] = defaultPortfolioData.education;
export const initialJourneyData: JourneyStep[] = defaultPortfolioData.journey;
export const initialGoalsData: GoalItem[] = defaultPortfolioData.goals;
export const initialMessagesData: ContactMessage[] = defaultPortfolioData.messages;

// Backwards compatibility aliases
export const personalInfo = initialPersonalInfo;
export const skillsData = initialSkillsData;
export const projectsData = initialProjectsData;
export const educationData = initialEducationData;
export const journeyData = initialJourneyData;
export const goalsData = initialGoalsData;
