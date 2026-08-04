export interface HeroData {
  enabled: boolean;
  name: string;
  roles: string[];
  tagline: string;
  ctaButtons: {
    viewWork: { label: string; href: string };
    resume: { label: string; filename: string };
  };
  socialLinks: {
    github: string;
    linkedin: string;
  };
  avatarImage: {
    src: string;
    alt: string;
  };
  resumeVersionDate: string;
}
