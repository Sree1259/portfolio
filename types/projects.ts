export interface ProjectLink {
  github?: string;
  demo?: string;
}

export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  technicalSummary: string;
  technologies: string[];
  links: ProjectLink;
  thumbnail?: string;
  featured: boolean;
  roles?: string[];
  detail: {
    description: string;
    architecture: string;
    keyDecisions: string;
    challengesSolved: string;
    outcomeImpact: string;
  };
}

export interface ProjectsData {
  enabled: boolean;
  projects: ProjectEntry[];
}
