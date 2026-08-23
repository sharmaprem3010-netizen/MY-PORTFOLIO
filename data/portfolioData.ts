import { PersonalInfo, Project, SkillItem, EducationItem, JourneyStep, GoalItem, PortfolioData, ContactMessage } from '../types';
import contentJson from '../src/content.json';

export const defaultPortfolioData = contentJson as unknown as PortfolioData;

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
