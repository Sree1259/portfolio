import type { ProjectsData } from '@/types/projects';

export const projectsData: ProjectsData = {
  enabled: true,
  projects: [
    {
      id: "contract-intelligence-agent",
      title: "Contract Intelligence Agent",
      description: "Enterprise AI platform designed to automate contract clause extraction and risk analysis using fine-tuned LLMs with RBAC.",
      // TODO: Replace with specific metrics (e.g., 'reducing review times by 60%') once verified
      technicalSummary: "LoRA fine-tuned Qwen2.5 for clause-level risk scoring and automated redline generation, integrated with a secure RBAC gateway.",
      technologies: ["Python", "LangChain", "LoRA", "Qwen2.5", "RAG", "RBAC", "Node.js", "React", "TypeScript", "Runpod"],
      links: {
        github: "https://github.com/Sree1259/Contract_Intelligent_Agent",
      },
      thumbnail: "/projects/contract-agent.png",
      featured: true,
      roles: ["ai", "software"],
      detail: {
        description: "An AI platform designed to automate clause extraction and risk assessment from complex enterprise agreements, replacing manual reviews. Features a secure access layer (RBAC) and a model serving layer hosted on Runpod.",
        architecture: "Three-layer architecture: Access Layer (auth, RBAC), Observation Layer (contract parsing, clause extraction, metadata tagging), and Model Layer (fine-tuned Qwen2.5 via LoRA on Runpod). RAG pipeline connects clause retrieval with LLM generation.",
        // TODO: Verify exact parameter reduction percentage (e.g., over 80%)
        keyDecisions: "Selected parameter-efficient LoRA adapters instead of full-parameter fine-tuning, reducing active training parameters while retaining baseline language capabilities. Deployed Qwen2.5 for long-context document understanding.",
        challengesSolved: "Mitigated hallucinations by constraining generation prompts with retrieval-grounded contexts. Implemented sanitization logic for PII and audit logs, and optimized text extraction to maintain exact clause boundary offsets.",
        // TODO: Add exact percentages for accuracy, recall, and time saved once benchmarks are run
        outcomeImpact: "Automated clause extraction and risk scoring, designed to shorten legal review cycles. Established a multi-metric evaluation framework to benchmark clause extraction precision, risk classification recall, and redline relevance.",
      },
    },
    {
      id: "rag-document-intelligence",
      title: "RAG-Based Document Intelligence System",
      description: "High-precision RAG pipeline for intelligent document interrogation, optimizing retrieval accuracy and semantic query coverage.",
      technicalSummary: "FAISS local vector index for sub-100ms similarity retrieval. Google Gemini embeddings. LangChain query orchestration with context-grounding constraints.",
      technologies: ["Python", "LangChain", "FAISS", "Google Gemini", "RAG", "Embeddings", "PDF Processing"],
      links: {
        github: "https://github.com/Sree1259",
      },
      thumbnail: "/projects/rag-system.png",
      featured: true,
      roles: ["ai", "data"],
      detail: {
        description: "A production-ready Retrieval-Augmented Generation (RAG) system for querying unstructured PDF documents, focusing on response grounding to mitigate hallucinations.",
        architecture: "Document ingestion pipeline: load → clean → chunk → embed. FAISS vector index for sub-100ms similarity retrieval. LangChain orchestration layer connecting retrieval pipeline to LLM response generation. Google Gemini embedding models for semantic text representation.",
        keyDecisions: "Selected FAISS for self-hosted local vector storage to ensure sub-100ms searches without network overhead. Tuned chunk sizes and chunk overlaps to preserve context continuity. Enforced prompt grounding rules to prevent out-of-context reasoning.",
        challengesSolved: "Eliminated answer fabrications by structuring prompts with strict source-attribution instructions. Optimized token-split boundaries to prevent fragmentation of tables and multi-line paragraphs during chunking.",
        // TODO: Replace with metrics like Ragas faithfulness/relevance scores (e.g., reaches 92% precision and reduces hallucination rate by 45% based on Ragas evaluation)
        outcomeImpact: "Built a reusable, modular document question-answering pipeline with structured evaluation templates for testing response grounding and similarity search retrieval.",
      },
    },
    {
      id: "gemma-email-rewriter",
      title: "Fine-Tuned Gemma 3 Email Rewriting System",
      description: "Lightweight style-transfer system using PEFT to rewrite casual emails into professional alternatives on consumer-grade hardware.",
      technicalSummary: "LoRA adapters fine-tuned on Gemma 3 270M using Hugging Face TRL. Outputs a highly portable ~15MB adapter for real-time edge rewriting.",
      technologies: ["Python", "LoRA", "PEFT", "Gemma 3", "Hugging Face TRL", "SFTTrainer", "Fine-Tuning"],
      links: {
        github: "https://github.com/Sree1259",
      },
      thumbnail: "/projects/gemma-email.png",
      featured: false,
      roles: ["ai", "software"],
      detail: {
        description: "A parameter-efficient fine-tuning (PEFT) pipeline using LoRA on google/gemma-3-270m-it, enabling professional tone transformations while preserving the original semantic intent.",
        architecture: "Base model: google/gemma-3-270m-it. Fine-tuning: LoRA adapters on selective transformer attention layers via Hugging Face TRL SFTTrainer. Inference: lightweight adapter loaded on top of frozen base model for real-time rewriting.",
        keyDecisions: "Chose LoRA over full-parameter training, reducing GPU memory requirements during training by over 85%. Curated a clean dataset mapping casual drafts to formal edits to keep the adapters focused on style transfer.",
        challengesSolved: "Prevented model drift and information loss during style rewriting. Maintained a tiny deployment footprint (~15MB adapter weight file) compatible with CPU and local edge devices.",
        outcomeImpact: "Produced a highly portable ~15MB adapter enabling low-latency style-transfer on local edge hardware. Demonstrates a scalable, cost-effective pipeline for specialized domain fine-tuning.",
      },
    },
  ],
};
