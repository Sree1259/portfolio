import type { ResearchData } from '@/types/research';

export const researchData: ResearchData = {
  enabled: true,
  // BRANDING: List papers you've implemented, blog posts written, or talks given — signals intellectual engagement beyond job duties.
  interests: [
    "Applied LLM Systems",
    "Retrieval-Augmented Generation (RAG) Architecture",
    "Parameter-Efficient Fine-Tuning (LoRA/PEFT)",
    "Document Intelligence & Information Extraction",
    "Agentic AI Workflows",
    "LLM Evaluation & Hallucination Mitigation",
  ],
  publications: [], // Renders "Coming Soon" placeholder
  currentlyReading: [
    "Attention Is All You Need (Vaswani et al.)",
    "LoRA: Low-Rank Adaptation of Large Language Models",
    "RAGAS: Automated Evaluation of Retrieval Augmented Generation",
  ],
  githubUrl: "https://www.github.com/Sree1259",
};
