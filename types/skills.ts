export interface Skill {
  name: string;
  iconUrl?: string;
  roles?: string[];
}

export interface SkillCategory {
  category: string;
  icon: string;
  accentColor: string;
  skills: Skill[];
  roles?: string[];
}

export interface SkillsData {
  enabled: boolean;
  categories: SkillCategory[];
}
