export interface Publication {
  title: string;
  venue: string;
  date: string;
  abstract: string;
  url: string;
}

export interface ResearchData {
  enabled: boolean;
  interests: string[];
  publications: Publication[];
  currentlyReading: string[];
  githubUrl: string;
}
