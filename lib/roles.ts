import { heroData } from '@/data/hero';
import { projectsData } from '@/data/projects';
import { skillsData } from '@/data/skills';
import { experienceData } from '@/data/experience';
import type { HeroData } from '@/types/hero';
import type { ProjectsData, ProjectEntry } from '@/types/projects';
import type { SkillsData, SkillCategory } from '@/types/skills';
import type { ExperienceData, ExperienceEntry } from '@/types/experience';

export type RoleType = 'software' | 'ai' | 'data';

// Role-specific keywords for sorting experience achievements
const ROLE_KEYWORDS: Record<RoleType, string[]> = {
  ai: ['ai', 'llm', 'rag', 'langchain', 'prompt', 'gemini', 'embedding', 'hallucination', 'fine-tuning', 'lora', 'gemma', 'model', 'agent', 'guardrails', 'evaluation'],
  data: ['data', 'pipeline', 'etl', 'elt', 'lakehouse', 'warehouse', 'snowflake', 'databricks', 'pyspark', 'reconciliation', 'claims', 'sql', 'reporting', 'power bi', 'analytics', 'adls', 'delta lake', 'scd', 'cdc', 'replicate', 'snowpipe'],
  software: ['web', 'app', 'react', 'typescript', 'node.js', 'prisma', 'docker', 'rest api', 'frontend', 'backend', 'developer', 'git', 'systems', 'full-stack']
};

/**
 * Returns the active role from the query parameter, defaulting to undefined.
 */
export function getActiveRole(roleParam?: string | string[] | null): RoleType | undefined {
  if (!roleParam) return undefined;
  const role = Array.isArray(roleParam) ? roleParam[0] : roleParam;
  const normalized = role.toLowerCase();
  if (normalized === 'software' || normalized === 'ai' || normalized === 'data') {
    return normalized as RoleType;
  }
  return undefined;
}

/**
 * Dynamically updates Hero tagline and roles based on the active role.
 */
export function getAdaptedHero(role?: RoleType): HeroData {
  if (!role) {
    return {
      ...heroData,
      roles: ['AI & Data Engineer', 'Full Stack AI Specialist', 'Data Infrastructure Architect', 'Systems Builder'],
      tagline: 'I build production-grade AI systems and scalable data platforms — from high-precision RAG pipelines to enterprise ETL/ELT data infrastructures.'
    };
  }

  if (role === 'software') {
    return {
      ...heroData,
      roles: ['Full Stack Software Engineer', 'Systems Builder', 'TypeScript/Node.js Developer', 'Cloud Infrastructure Engineer'],
      tagline: 'I build high-performance full-stack web applications and robust software systems, translating complex requirements into production-ready code.'
    };
  }

  if (role === 'data') {
    return {
      ...heroData,
      roles: ['Data Analytics Engineer', 'Data Infrastructure Architect', 'ETL/ELT Specialist', 'Analytics & Warehouse Engineer'],
      tagline: 'I design and implement scalable ETL/ELT pipelines, Medallion Lakehouses, and analytics platforms to transform raw data into enterprise intelligence.'
    };
  }

  // AI role (default hero values match AI focus)
  return {
    ...heroData,
    roles: ['Full Stack AI Engineer', 'LLM Systems Builder', 'RAG Pipeline Architect', 'Fine-Tuning Specialist'],
    tagline: 'I build production-grade AI systems with systems-level reliability — specializing in high-precision RAG pipelines, fine-tuned LLMs, and enterprise agents.'
  };
}

/**
 * Reorders projects so that projects tagged with the active role appear first.
 */
export function getAdaptedProjects(role?: RoleType): ProjectsData {
  if (!role) return projectsData;

  const sortedProjects = [...projectsData.projects].sort((a, b) => {
    const aMatches = a.roles?.includes(role) ? 1 : 0;
    const bMatches = b.roles?.includes(role) ? 1 : 0;
    return bMatches - aMatches; // Prioritize matches
  });

  return {
    ...projectsData,
    projects: sortedProjects
  };
}

/**
 * Reorders skill categories and skills within categories based on the active role.
 */
export function getAdaptedSkills(role?: RoleType): SkillsData {
  if (!role) return skillsData;

  const sortedCategories = [...skillsData.categories].sort((a, b) => {
    const aMatches = a.roles?.includes(role) ? 1 : 0;
    const bMatches = b.roles?.includes(role) ? 1 : 0;
    return bMatches - aMatches;
  }).map(category => {
    // Also prioritize individual skills within this category
    const sortedSkills = [...category.skills].sort((a, b) => {
      const aMatches = a.roles?.includes(role) ? 1 : 0;
      const bMatches = b.roles?.includes(role) ? 1 : 0;
      return bMatches - aMatches;
    });
    return {
      ...category,
      skills: sortedSkills
    };
  });

  return {
    ...skillsData,
    categories: sortedCategories
  };
}

/**
 * Reorders achievements within each experience entry based on matching keywords for the active role.
 */
export function getAdaptedExperience(role?: RoleType): ExperienceData {
  if (!role) return experienceData;

  const adaptedEntries = experienceData.entries.map(entry => {
    const keywords = ROLE_KEYWORDS[role];
    
    // Sort achievements based on how many keywords match the selected role
    const sortedAchievements = [...entry.achievements].sort((a, b) => {
      const aLower = a.toLowerCase();
      const bLower = b.toLowerCase();
      
      const aCount = keywords.reduce((acc, kw) => acc + (aLower.includes(kw) ? 1 : 0), 0);
      const bCount = keywords.reduce((acc, kw) => acc + (bLower.includes(kw) ? 1 : 0), 0);
      
      return bCount - aCount; // Descending order of matches
    });

    return {
      ...entry,
      achievements: sortedAchievements
    };
  });

  return {
    ...experienceData,
    entries: adaptedEntries
  };
}
