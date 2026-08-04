import type { ExperienceData } from "@/types/experience";

export const experienceData: ExperienceData = {
  enabled: true,
  entries: [
    {
      type: "work",
      company: "Agentic AI School",
      role: "Full Stack AI Engineer Intern",
      dateRange: "Jan 2026 – Present",
      accentColor: "#06b6d4",
      roles: ["ai", "software"],
      achievements: [
        "Developed an AI-powered content generation platform that automated assessment creation, reducing exam preparation times from 60–90 minutes to under 5 minutes",
        "Engineered dynamic assessment generation and automated interview simulators, delivering personalized, real-time AI feedback and downloadable PDF performance reports",
        "Translated complex educational requirements into production-ready web applications using LangChain, React, TypeScript, Node.js, Prisma, Git, and Docker",
        // TODO: Quantify metric for reduction in hallucination rates if tested
        "Implemented AI governance frameworks by deploying RAG pipelines, output validators, prompt guardrails, and automated evaluation suites to mitigate hallucinations"
      ],
      technologies: [
        "LangChain",
        "React",
        "TypeScript",
        "Node.js",
        "Prisma",
        "Docker",
        "REST APIs",
        "Google Gemini",
        "RAG"
      ]
    },
    {
      type: "work",
      company: "Citius Tech",
      role: "Data Analytics Engineer",
      dateRange: "May 2025 – Jan 2026",
      accentColor: "#7c3aed",
      roles: ["data", "software"],
      achievements: [
        // TODO: Specify data size/scale (e.g., number of claims or size in GB/TB)
        "Built ETL/ELT data pipelines using Azure Data Factory, Databricks, and PySpark to integrate EHR, claims, and provider datasets for enterprise analytics",
        "Developed Medallion Lakehouse architectures (Bronze, Silver, Gold layers) using Azure Data Lake Storage (ADLS) and Delta Lake to enforce schema governance and data quality standards",
        // TODO: Verify exact query performance index or index optimization metrics
        "Designed dimensional models and Slowly Changing Dimension (SCD) schemas in data warehouses to capture historical healthcare analytics",
        // TODO: Quantify percentage reduction in latency/compute costs
        "Optimized PySpark transformations and complex SQL query execution plans, reducing pipeline latency and platform compute costs",
        "Implemented automated data validation, quality checking, and reconciliation jobs, which reduced reporting defects by 45%",
        "Built and deployed interactive Power BI dashboards, translating transactional data into actionable operational insights for healthcare stakeholders"
      ],
      technologies: [
        "Azure Data Factory",
        "Databricks",
        "PySpark",
        "SQL",
        "ADLS",
        "Delta Lake",
        "Power BI",
        "Python",
        "Snowflake"
      ]
    },
    {
      type: "work",
      company: "Accenture",
      role: "Adv App Engineering Associate",
      dateRange: "Aug 2022 – July 2023",
      accentColor: "#10b981",
      roles: ["data", "software"],
      achievements: [
        // TODO: Specify dataset size or snowflake warehouse size (e.g., Medium warehouse)
        "Engineered ETL/ELT pipelines using AWS and Snowflake to aggregate credit risk and financial datasets for enterprise compliance reporting",
        "Deployed real-time Change Data Capture (CDC) pipelines using Qlik Replicate and Snowpipe to feed live transactional records into the analytical layer",
        "Designed relational models, dimensional schemas, and clean SQL transformations optimized to power high-frequency risk reporting engines"
      ],
      technologies: [
        "AWS",
        "Snowflake",
        "SQL",
        "Qlik Replicate",
        "Snowpipe",
        "Python",
        "ETL",
        "Data Modeling"
      ]
    },
    {
      type: "education",
      company: "Arizona State University",
      role: "Master of Science — Information Technology",
      dateRange: "2023 – 2025",
      accentColor: "#f59e0b",
      roles: ["ai", "data", "software"],
      achievements: [
        "Conducted research on explainable AI (XAI) security metrics and adversarial defense strategies in cybersecurity models",
        "Completed systems-focused coursework in distributed systems architecture, cloud computing infrastructure, and full-stack software engineering"
      ],
      technologies: [
        "Python",
        "Machine Learning",
        "Cloud Computing",
        "Software Engineering"
      ]
    }
  ],
};
