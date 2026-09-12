export interface Project {
  number: string;
  name: string;
  type: string;
  status: string;
  statement: string;
  image: string;
  fallbackImage?: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  overview?: string;
  highlights?: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  grade: string;
  field?: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  copy: string;
}

export interface CursorState {
  x: number;
  y: number;
  label: string;
}

