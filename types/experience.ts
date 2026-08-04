export type ExperienceType = 'work' | 'education';

export interface ExperienceEntry {
  type: ExperienceType;
  company: string;
  role: string;
  dateRange: string;
  achievements: string[];
  technologies: string[];
  accentColor?: string;
  roles?: string[];
}

export interface ExperienceData {
  enabled: boolean;
  entries: ExperienceEntry[];
}
