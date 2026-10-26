import type { HeroData } from '@/types/hero';

export const heroData: HeroData = {
  enabled: true,
  name: 'Sreelekha Vuppala',
  roles: [
    'Full Stack AI Engineer',
    'LLM Systems Builder',
    'RAG Pipeline Architect',
    'Fine-Tuning Specialist',
  ],
  // BRANDING: Lead with impact — keep this updated to reflect your current focus. "I build AI systems that work in production, not just in notebooks." differentiates from generic AI enthusiast profiles.
  tagline:
    'I build production-grade AI systems with systems-level reliability — specializing in high-precision RAG pipelines, fine-tuned LLMs, and enterprise agents.',
  ctaButtons: {
    viewWork: { label: 'View My Work', href: '#projects' },
    resume: { label: 'Download Resume', filename: 'Sreelekha_resume.pdf' },
  },
  socialLinks: {
    github: 'https://www.github.com/Sree1259',
    linkedin: 'https://www.linkedin.com/in/sreelekha-vuppala',
  },
  avatarImage: {
    src: '/avatar.jpg',
    alt: 'Sreelekha Vuppala — Full Stack AI Engineer',
  },
  resumeVersionDate: 'January 2026',
};
