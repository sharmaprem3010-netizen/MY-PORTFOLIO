import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PortfolioData,
  PersonalInfo,
  Project,
  SkillItem,
  EducationItem,
  JourneyStep,
  GoalItem,
  ContactMessage
} from '../types';
import { defaultPortfolioData } from '../data/portfolioData';

const STORAGE_KEY = 'prem_sharma_portfolio_cms_v1';
const EDIT_MODE_KEY = 'prem_sharma_edit_mode_active';

export type AdminTab = 'profile' | 'projects' | 'skills' | 'education' | 'journey' | 'goals' | 'inbox' | 'backup';

interface NotificationState {
  type: 'success' | 'info' | 'error';
  message: string;
}

interface PortfolioContextType {
  data: PortfolioData;
  personalInfo: PersonalInfo;
  skills: SkillItem[];
  projects: Project[];
  education: EducationItem[];
  journey: JourneyStep[];
  goals: GoalItem[];
  messages: ContactMessage[];
  unreadCount: number;
  isEditMode: boolean;
  isAdminModalOpen: boolean;
  adminActiveTab: AdminTab;
  notification: NotificationState | null;
  
  // UI Controls
  setIsEditMode: (val: boolean) => void;
  toggleEditMode: () => void;
  openAdmin: (tab?: AdminTab) => void;
  closeAdmin: () => void;
  setAdminActiveTab: (tab: AdminTab) => void;
  showNotification: (message: string, type?: 'success' | 'info' | 'error') => void;

  // Data Mutations
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  
  // Projects
  addProject: (project: Project) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  // Skills
  addSkill: (skill: SkillItem) => void;
  updateSkill: (id: string, updated: Partial<SkillItem>) => void;
  deleteSkill: (id: string) => void;
  
  // Education
  addEducation: (edu: EducationItem) => void;
  updateEducation: (id: string, updated: Partial<EducationItem>) => void;
  deleteEducation: (id: string) => void;
  
  // Journey
  addJourneyStep: (step: JourneyStep) => void;
  updateJourneyStep: (id: string, updated: Partial<JourneyStep>) => void;
  deleteJourneyStep: (id: string) => void;
  
  // Goals
  addGoal: (goal: GoalItem) => void;
  updateGoal: (id: string, updated: Partial<GoalItem>) => void;
  deleteGoal: (id: string) => void;
  
  // Inbox Messages
  addMessage: (msg: { name: string; email: string; subject: string; message: string }) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  
  // Persistence & Backup
  exportDataJSON: () => void;
  importDataJSON: (jsonString: string) => boolean;
  resetToDefaults: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load stored data or fall back to default
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // ensure all keys exist
        return {
          personalInfo: { ...defaultPortfolioData.personalInfo, ...parsed.personalInfo },
          skills: parsed.skills || defaultPortfolioData.skills,
          projects: parsed.projects || defaultPortfolioData.projects,
          education: parsed.education || defaultPortfolioData.education,
          journey: parsed.journey || defaultPortfolioData.journey,
          goals: parsed.goals || defaultPortfolioData.goals,
          messages: parsed.messages || defaultPortfolioData.messages,
        };
      }
    } catch (e) {
      console.warn('Failed to load portfolio from localStorage, using defaults', e);
    }
    return defaultPortfolioData;
  });

  const [isEditMode, setIsEditModeState] = useState<boolean>(() => {
    try {
      return localStorage.getItem(EDIT_MODE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminActiveTab, setAdminActiveTab] = useState<AdminTab>('profile');
  const [notification, setNotification] = useState<NotificationState | null>(null);

  // Sync data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [data]);

  const setIsEditMode = (val: boolean) => {
    setIsEditModeState(val);
    try {
      localStorage.setItem(EDIT_MODE_KEY, val ? 'true' : 'false');
    } catch {}
    if (val) {
      showNotification('Edit Mode Enabled! Click any Edit badge on screen or open Admin CMS.', 'info');
    } else {
      showNotification('Edit Mode Disabled (Public View).', 'info');
    }
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 4000);
  };

  const openAdmin = (tab: AdminTab = 'profile') => {
    setAdminActiveTab(tab);
    setIsAdminModalOpen(true);
  };

  const closeAdmin = () => {
    setIsAdminModalOpen(false);
  };

  // Mutations
  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
    showNotification('Profile information updated successfully!');
  };

  // Projects
  const addProject = (project: Project) => {
    setData((prev) => ({
      ...prev,
      projects: [project, ...prev.projects]
    }));
    showNotification(`Project "${project.name}" added!`);
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updated } : p))
    }));
    showNotification('Project updated successfully!');
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id)
    }));
    showNotification('Project removed.', 'info');
  };

  // Skills
  const addSkill = (skill: SkillItem) => {
    setData((prev) => ({
      ...prev,
      skills: [...prev.skills, skill]
    }));
    showNotification(`Skill "${skill.name}" added!`);
  };

  const updateSkill = (id: string, updated: Partial<SkillItem>) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, ...updated } : s))
    }));
    showNotification('Skill updated successfully!');
  };

  const deleteSkill = (id: string) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id)
    }));
    showNotification('Skill removed.', 'info');
  };

  // Education
  const addEducation = (edu: EducationItem) => {
    setData((prev) => ({
      ...prev,
      education: [...prev.education, edu]
    }));
    showNotification('Education entry added!');
  };

  const updateEducation = (id: string, updated: Partial<EducationItem>) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, ...updated } : e))
    }));
    showNotification('Education details updated!');
  };

  const deleteEducation = (id: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id)
    }));
    showNotification('Education entry removed.', 'info');
  };

  // Journey
  const addJourneyStep = (step: JourneyStep) => {
    setData((prev) => ({
      ...prev,
      journey: [...prev.journey, step]
    }));
    showNotification('Roadmap step added!');
  };

  const updateJourneyStep = (id: string, updated: Partial<JourneyStep>) => {
    setData((prev) => ({
      ...prev,
      journey: prev.journey.map((j) => (j.id === id ? { ...j, ...updated } : j))
    }));
    showNotification('Roadmap step updated!');
  };

  const deleteJourneyStep = (id: string) => {
    setData((prev) => ({
      ...prev,
      journey: prev.journey.filter((j) => j.id !== id)
    }));
    showNotification('Roadmap step removed.', 'info');
  };

  // Goals
  const addGoal = (goal: GoalItem) => {
    setData((prev) => ({
      ...prev,
      goals: [...prev.goals, goal]
    }));
    showNotification(`Goal "${goal.title}" added!`);
  };

  const updateGoal = (id: string, updated: Partial<GoalItem>) => {
    setData((prev) => ({
      ...prev,
      goals: prev.goals.map((g) => (g.id === id ? { ...g, ...updated } : g))
    }));
    showNotification('Goal updated!');
  };

  const deleteGoal = (id: string) => {
    setData((prev) => ({
      ...prev,
      goals: prev.goals.filter((g) => g.id !== id)
    }));
    showNotification('Goal removed.', 'info');
  };

  // Messages Inbox
  const addMessage = (msg: { name: string; email: string; subject: string; message: string }) => {
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: msg.name,
      email: msg.email,
      subject: msg.subject || 'Portfolio Inquiry',
      message: msg.message,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      read: false
    };

    setData((prev) => ({
      ...prev,
      messages: [newMsg, ...prev.messages]
    }));
  };

  const markMessageRead = (id: string) => {
    setData((prev) => ({
      ...prev,
      messages: prev.messages.map((m) => (m.id === id ? { ...m, read: true } : m))
    }));
  };

  const deleteMessage = (id: string) => {
    setData((prev) => ({
      ...prev,
      messages: prev.messages.filter((m) => m.id !== id)
    }));
    showNotification('Message deleted.', 'info');
  };

  // Backup & Restore
  const exportDataJSON = () => {
    try {
      const dataStr = JSON.stringify(data, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Prem_Sharma_Portfolio_Backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showNotification('Portfolio backup JSON downloaded successfully!');
    } catch (e) {
      showNotification('Failed to export backup JSON.', 'error');
    }
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.personalInfo || !Array.isArray(parsed.skills) || !Array.isArray(parsed.projects)) {
        showNotification('Invalid backup file structure.', 'error');
        return false;
      }
      setData(parsed);
      showNotification('Portfolio data restored successfully!');
      return true;
    } catch (e) {
      showNotification('Invalid JSON file format.', 'error');
      return false;
    }
  };

  const resetToDefaults = () => {
    setData(defaultPortfolioData);
    showNotification('Portfolio reset to original default data.');
  };

  const unreadCount = data.messages.filter((m) => !m.read).length;

  return (
    <PortfolioContext.Provider
      value={{
        data,
        personalInfo: data.personalInfo,
        skills: data.skills,
        projects: data.projects,
        education: data.education,
        journey: data.journey,
        goals: data.goals,
        messages: data.messages,
        unreadCount,
        isEditMode,
        isAdminModalOpen,
        adminActiveTab,
        notification,
        setIsEditMode,
        toggleEditMode,
        openAdmin,
        closeAdmin,
        setAdminActiveTab,
        showNotification,
        updatePersonalInfo,
        addProject,
        updateProject,
        deleteProject,
        addSkill,
        updateSkill,
        deleteSkill,
        addEducation,
        updateEducation,
        deleteEducation,
        addJourneyStep,
        updateJourneyStep,
        deleteJourneyStep,
        addGoal,
        updateGoal,
        deleteGoal,
        addMessage,
        markMessageRead,
        deleteMessage,
        exportDataJSON,
        importDataJSON,
        resetToDefaults
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
