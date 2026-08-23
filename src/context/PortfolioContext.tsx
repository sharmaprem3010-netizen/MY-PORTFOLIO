import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PortfolioData } from '../../types';
import contentJson from '../content.json';

const defaultPortfolioData = contentJson as unknown as PortfolioData;

interface PortfolioContextType {
  data: PortfolioData;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  updateData: (path: string, value: any) => void;
  resetData: () => void;
  exportData: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Helper to set nested object properties by string path (e.g., 'personalInfo.name')
const setNestedProperty = (obj: any, path: string, value: any): any => {
  const keys = path.split('.');
  const lastKey = keys.pop();
  
  if (!lastKey) return obj;

  const newObj = { ...obj };
  let current = newObj;

  for (const key of keys) {
    if (Array.isArray(current[key])) {
      current[key] = [...current[key]];
    } else {
      current[key] = { ...current[key] };
    }
    current = current[key];
  }

  current[lastKey] = value;
  return newObj;
};

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const storageKey = 'portfolioDataConfig';
  
  const [data, setData] = useState<PortfolioData>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          return JSON.parse(stored) as PortfolioData;
        } catch (e) {
          console.error("Failed to parse portfolio data from local storage");
        }
      }
    }
    return defaultPortfolioData;
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(data));
    }
  }, [data]);

  const updateData = (path: string, value: any) => {
    setData((prevData) => setNestedProperty(prevData, path, value));
  };

  const resetData = () => {
    setData(defaultPortfolioData);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(storageKey);
    }
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PortfolioContext.Provider value={{ data, isEditing, setIsEditing, updateData, resetData, exportData }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
