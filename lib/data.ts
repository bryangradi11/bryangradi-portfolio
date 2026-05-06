export const personalData = {
  name: "Bryan Gradi",
  fullName: "Bryan Rafael Carvalho Gradi",
  role: "Founder & Full-Stack Engineer",
  tagline:
    "Building AI-powered software, automation and digital products for businesses.",
  taglinePt:
    "Construindo software, automações e produtos digitais com IA pra empresas.",
  location: "Londrina, Brazil",
  age: 22,

  social: {
    email: "bryangradi@gmail.com",
    linkedin: "https://www.linkedin.com/in/bryan-gradi/",
    github: "https://github.com/bryangradi11",
    gradios: "https://gradios.co",
  },

  company: {
    name: "Gradios",
    role: "Founder",
    description:
      "B2B tech startup specializing in custom software, automation and AI agents for businesses in Londrina, Brazil.",
    url: "https://gradios.co",
    since: "Dec 2025",
  },

  stack: {
    languages: ["Python", "TypeScript", "JavaScript", "Java", "SQL"],
    frontend: ["Next.js", "React", "Tailwind CSS"],
    backend: ["Node.js", "PostgreSQL", "Supabase", "REST APIs"],
    ai: ["Claude", "OpenAI", "Gemini", "n8n", "Make"],
    devops: ["Git", "GitHub", "Vercel", "Linux"],
  },

  about: {
    paragraphs: [
      "I'm a 22-year-old full-stack developer and founder based in Londrina, Brazil. I build software, automation, and AI agents for businesses through my company Gradios.",
      "My journey started in corporate IT support — Atos, AlfaCopy, iPlace — where I learned how technology actually solves real business problems. I made the transition to development through hands-on practice, side projects, and a Software Engineering internship at Londrina Iluminação.",
      "Today, I'm currently studying Software Engineering (UniFil) and Systems Analysis (PUCPR), while leading Gradios full-time. I'm focused on building products that combine modern web development with practical AI applications.",
    ],
  },

  experiences: [
    {
      company: "Gradios",
      role: "Founder & Full-Stack Engineer",
      period: "Dec 2025 – Present",
      location: "Londrina, Brazil",
      description:
        "Founded a B2B tech startup specialized in custom software, automation, dashboards, and AI agents for businesses.",
      tag: "STARTUP",
      current: true,
    },
    {
      company: "Londrina Iluminação",
      role: "Software Engineering Intern",
      period: "Sep 2025 – Mar 2026",
      location: "Londrina, Brazil",
      description:
        "Internship working on internal software development, full-stack development, and process automation.",
    },
    {
      company: "iPlace · Apple Premium Reseller (Grupo Herval)",
      role: "Apple Certified Technical Analyst",
      period: "Sep 2024 – Nov 2025",
      location: "Londrina, Brazil",
      description:
        "Specialized technical support for Apple products, hardware diagnostics, SAP operations.",
    },
    {
      company: "Alfacopy",
      role: "IT Specialist",
      period: "May 2024 – Oct 2024",
      location: "Londrina, Brazil",
      description:
        "IT support, hardware/software maintenance, training material development.",
    },
    {
      company: "Atos",
      role: "Service Desk Analyst",
      period: "Sep 2023 – Aug 2024",
      location: "Londrina, Brazil",
      description:
        "Corporate IT support: networks, SAP, Active Directory, performance diagnostics.",
    },
  ],

  projects: [
    {
      name: "Gradios",
      description:
        "B2B tech startup. Custom software, automation, AI agents for businesses in Brazil.",
      tags: ["Startup", "B2B", "AI", "Automation"],
      url: "https://gradios.co",
      featured: true,
      status: "live" as const,
    },
    {
      name: "CV Analyzer",
      description:
        "AI-powered resume analyzer. Brutal, honest feedback in 30 seconds. Built with Next.js + Gemini.",
      tags: ["Next.js", "TypeScript", "Gemini", "AI"],
      url: "https://github.com/bryangradi11/cv-analyzer",
      featured: true,
      status: "in-progress" as const,
    },
    {
      name: "Personal Portfolio",
      description:
        "This very website. Single-page portfolio with custom animations, easter eggs, and dark editorial design.",
      tags: ["Next.js", "TypeScript", "Framer Motion", "Tailwind"],
      url: "https://github.com/bryangradi11/bryangradi-portfolio",
      featured: false,
      status: "live" as const,
    },
  ],
};

export type PersonalData = typeof personalData;
export type Experience = PersonalData["experiences"][number];
export type Project = PersonalData["projects"][number];
