import type { SkillsData } from "@/types/skills";

export const skillsData: SkillsData = {
  enabled: true,
  categories: [
    {
      category: "AI & LLM Systems",
      icon: "🤖",
      accentColor: "#06b6d4",
      roles: ["ai"],
      skills: [
        { name: "OpenAI" },
        { name: "Anthropic Claude" },
        { name: "Google Gemini" },
        { name: "LangChain" },
        { name: "LangGraph" },
        { name: "FAISS" },
        { name: "Pinecone" },
        { name: "Vertex AI Search" },
        { name: "RAG" },
        { name: "Fine-Tuning/LoRA" },
      ],
    },
    {
      category: "Frontend",
      icon: "🎨",
      accentColor: "#7c3aed",
      roles: ["software"],
      skills: [
        { name: "React" },
        { name: "Next.js" },
        { name: "TypeScript" },
      ],
    },
    {
      category: "Backend & APIs",
      icon: "⚙️",
      accentColor: "#10b981",
      roles: ["software", "ai"],
      skills: [
        { name: "Node.js" },
        { name: "Express" },
        { name: "REST APIs" },
      ],
    },
    {
      category: "Data & Databases",
      icon: "🗄️",
      accentColor: "#f59e0b",
      roles: ["data", "software"],
      skills: [
        { name: "PostgreSQL" },
        { name: "MySQL" },
        { name: "Snowflake" },
        { name: "SQL" },
      ],
    },
    {
      category: "Cloud & DevOps",
      icon: "☁️",
      accentColor: "#ef4444",
      roles: ["data", "software", "ai"],
      skills: [
        { name: "AWS S3" },
        { name: "AWS Glue" },
        { name: "AWS Athena" },
        { name: "Docker" },
        { name: "CI/CD" },
        { name: "Git" },
      ],
    },
    {
      category: "Languages",
      icon: "💻",
      accentColor: "#8b5cf6",
      roles: ["software", "data", "ai"],
      skills: [
        { name: "Python", roles: ["ai", "data"] },
        { name: "TypeScript", roles: ["software"] },
        { name: "SQL", roles: ["data"] },
      ],
    },
  ],
};
