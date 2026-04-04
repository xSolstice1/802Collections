/**
 * Resume Builder Types
 * 
 * Type definitions for the resume builder application.
 */

/** Contact Information */
export interface ContactInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
}

/** Experience Entry */
export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights: string[];
}

/** Education Entry */
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
  highlights: string[];
}

/** Certification Entry */
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate: string;
  credentialId: string;
  credentialUrl: string;
}

/** Award Entry */
export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

/** Skill Category */
export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

/** Complete Resume Data */
export interface ResumeData {
  contact: ContactInfo;
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  awards: Award[];
  skills: SkillCategory[];
}

/** Resume Template Types */
export type TemplateId = 'modern' | 'classic' | 'minimal' | 'professional';

/** Template Definition */
export interface Template {
  id: TemplateId;
  name: string;
  description: string;
  preview: string;
}

/** Export Format */
export type ExportFormat = 'pdf' | 'docx';

/** Generate unique ID */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

/** Default/Empty Resume Data */
export const createEmptyResume = (): ResumeData => ({
  contact: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
  },
  experience: [],
  education: [],
  certifications: [],
  awards: [],
  skills: [],
});

/** Available Templates */
export const AVAILABLE_TEMPLATES: Template[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean design with a sidebar for skills and contact info',
    preview: 'modern',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional chronological format, ATS optimized',
    preview: 'classic',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant, focuses on content',
    preview: 'minimal',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Balanced layout with subtle accent colors',
    preview: 'professional',
  },
];