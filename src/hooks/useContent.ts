import { useState, useEffect } from 'react';
import contentData from '../content.json';

export interface Content {
  hero: {
    greeting: string;
    name: string;
    title: string;
    subtitle: string;
    description: string;
  };
  about: {
    sectionHeader: string;
    title: string;
    description: string;
    highlights: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    location: string;
    status: string;
  };
  // Add other sections as needed (skills, projects, education, journey, goals, contact, footer)
}

/**
 * useContent hook loads the default content from content.json and merges any overrides stored in localStorage.
 * It returns the current content, a setter to update it (which also writes to localStorage),
 * and a helper to export the current content as a JSON string.
 */
export function useContent() {
  const storageKey = 'portfolioContent';
  const [content, setContent] = useState<Content>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          return JSON.parse(stored) as Content;
        } catch {
          // ignore parse errors and fall back to default
        }
      }
    }
    return contentData as unknown as Content;
  });

  // Persist to localStorage whenever content changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(content));
    }
  }, [content]);

  const exportContent = () => JSON.stringify(content, null, 2);

  return { content, setContent, exportContent };
}
