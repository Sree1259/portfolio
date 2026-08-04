import type { AboutData } from '@/types/about';

export const aboutData: AboutData = {
  enabled: true,
  // BRANDING: Lead with impact in the opening paragraph — answer "what do I do and why does it matter?" immediately.
  // Each paragraph should answer a different question: (a) what, (b) how I got here, (c) how I work, (d) who I am beyond the job.
  bio: [
    'I am a Full Stack AI Engineer specializing in building production-grade LLM systems — from retrieval-augmented generation pipelines and document intelligence platforms to parameter-efficient fine-tuning workflows. My focus is on the gap between "works in a notebook" and "works in production": reliability, grounding, and measurable outcomes.',
    'My path into applied AI started in data analytics. After two years as a Data Analyst at Accenture, I joined Citius Tech as a Data Analytics Engineer building cloud data pipelines on AWS and Snowflake. That foundation in data infrastructure gave me an instinct for correctness and scale that I now bring to every AI system I build. I completed my MS in Information Technology at Arizona State University, where I also researched AI security and explainable AI for cybersecurity.',
    'I approach production AI engineering the way a systems engineer would: define the failure modes first, then design around them. For RAG systems that means obsessing over retrieval precision and chunk quality. For fine-tuned models that means rigorous evaluation before deployment. Every project I ship has a clear success metric and a plan for what happens when things go wrong.',
    'Outside of engineering, I care deeply about making AI systems that are transparent and trustworthy — not just powerful. I am based in the US and open to roles where I can go deep on applied LLM infrastructure and agentic systems.',
  ],
  image: {
    src: '/avatar.jpg',
    alt: 'Sreelekha Vuppala',
  },
  stats: [
    { label: 'Years of Experience', value: 3, suffix: '+' },
    { label: 'AI & Data Projects Shipped', value: 5, suffix: '+' },
    { label: 'Data Pipelines Managed', value: 10, suffix: '+' },
  ],
  // BRANDING: Keep this updated — it signals momentum and gives returning visitors a reason to come back.
  currentlyWorkingOn:
    'Optimizing evaluation metrics and inference latency for the Contract Intelligence Agent.',
};
