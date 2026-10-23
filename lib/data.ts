// Single source of truth for all portfolio content. Edit here.
export const site = {
  name: "Hugo Leonardo",
  handle: "HUGO_LEONARDO",
  role: "Full-Stack Software Engineer",
  tagline: "Building resilient systems at the edge of the net.",
  email: "hugoleonardopflorencio@gmail.com",
  linkedin: "https://www.linkedin.com/in/hugo-leonardo-dev",
  github: "https://github.com/hugo-leonardo-dev",
  location: "Brazil // Remote",
};

export const nav = [
  { href: "/", label: "./", name: "Home" },
  { href: "/about", label: ">About", name: "Manifesto" },
  { href: "/experience", label: ">Experience", name: "Logs" },
  { href: "/projects", label: ">Projects", name: "Archive" },
  { href: "/contact", label: ">Connection", name: "Contact" },
];

export const bootLines = [
  "INITIALIZING NEURAL LINK... OK",
  "LOADING KERNEL MODULES... OK",
  "MOUNTING FILE SYSTEM... OK",
  "LOADING PORTFOLIO.EXE... OK",
  "VERIFYING IDENTITY... OK",
  "ACCESS GRANTED",
];

export const manifesto = [
  "> I am a full-stack software engineer who treats code like circuitry:",
  "> clean interfaces, resilient backends, and systems that survive the noise.",
  ">",
  "> I build payment rails, telemetry dashboards, and automation that ships.",
  "> From ASP.NET to AdonisJS, from React to real-time WebSockets,",
  "> I move across the stack without losing the signal.",
  ">",
  "> Currently open to new contracts and collaborations.",
];

export const systemSpecs = {
  languages: ["JavaScript", "TypeScript", "C#", "Node.js", "SQL"],
  frameworks: [
    "React",
    "Next.js",
    "AngularJS",
    "ASP.NET Core/MVC",
    "AdonisJS",
    "Express",
    "Zustand",
    "Tailwind",
  ],
  dataCloud: [
    "PostgreSQL",
    "MySQL",
    "Redis",
    "MongoDB",
    "AWS (S3, Lambda)",
    "Docker",
    "CI/CD",
    "WebSockets",
    "GraphQL",
    "N8N",
  ],
  practices: ["Jest", "Microservices", "Distributed systems", "OOP", "MVC", "Clean code"],
};

export const languages = [
  { name: "Portuguese", level: "Native" },
  { name: "English", level: "Professional" },
];

export const education = {
  degree: "B.Sc. Computer Science",
  school: "Universidade Potiguar (UNP)",
  period: "2019 - 2024",
  gpa: "9.1 / 10",
  award: "Academic Excellence Award",
};

export const mentoring = "Computer Science Tutor at UNP (Data Structures, Algorithms, OOP, Software Engineering).";

export const experiences = [
  {
    id: "LOG_003",
    company: "CORELAB BR",
    location: "Remote",
    role: "Software Engineer",
    period: "09/2025 - 03/2026",
    bullets: [
      "Built payment/checkout APIs with resilient microservice communication (AdonisJS, PostgreSQL).",
      "Delivered React dashboards and background workers for a financial SaaS.",
      "Set up CI/CD pipelines with GitHub Actions and Docker.",
    ],
  },
  {
    id: "LOG_002",
    company: "COMIGO Rastreamento",
    location: "Brazil",
    role: "Software Engineer",
    period: "09/2024 - 09/2025",
    bullets: [
      "Led the insurance module end-to-end with AI validation and AWS S3.",
      "Built real-time telemetry dashboards (React, Zustand, Chart.js, Flespi API).",
      "Implemented WebSocket notifications with Node.js.",
      "Deployed ChatGPT + N8N chatbots reducing support load.",
    ],
  },
  {
    id: "LOG_001",
    company: "ELITE Consultores",
    location: "Brazil",
    role: "Backend Development Engineer",
    period: "07/2022 - 10/2022",
    bullets: [
      "Refactored core system (ASP.NET MVC, MySQL) cutting processing time by 65%.",
      "Eliminated 90% of data-entry errors.",
      "Built REST APIs with C#/.NET, JWT authentication, and Hangfire background jobs.",
    ],
  },
];

export const projects = [
  {
    title: "PetzFinder",
    status: "ARCHIVED // EXTENSION",
    stack: ["Node.js", "React.js", "AWS Lambda", "QR Code"],
    description:
      "Pet tracking platform using QR codes. Grew from a side project into a university extension project (2023-2024).",
    github: "https://github.com/hugo-leonardo-dev",
    live: "",
  },
  {
    title: "PedeF\u00e1cil",
    status: "SHIPPED // PROD",
    stack: ["N8N", "Z-Pro", "Node.js", "WhatsApp API"],
    description:
      "WhatsApp chatbot for menus and PIX payments. Reduced checkout time by 3x (2023).",
    github: "https://github.com/hugo-leonardo-dev",
    live: "",
  },
];

export const commands = {
  help: "Available commands: help, about, skills, projects, experience, contact, clear, whoami, sudo",
  about: "Full-Stack Software Engineer. Building resilient systems at the edge of the net.",
  skills: "JS, TS, C#, Node.js, SQL | React, Next.js, AngularJS, AdonisJS, ASP.NET | Postgres, MySQL, Redis, Mongo, AWS, Docker",
  projects: "PetzFinder, PedeF\u00e1cil",
  experience: "CORELAB BR, COMIGO Rastreamento, ELITE Consultores",
  contact: "hugoleonardopflorencio@gmail.com",
  whoami: "visitor@guest:~$ you are a guest on HUGO_LEONARDO's terminal",
  sudo: "ACCESS DENIED. NICE TRY, NETRUNNER.",
};

export const japaneseTexture = "\u30B7\u30B9\u30C6\u30E0\u30AA\u30F3\u30E9\u30A4\u30F3 // \u30C7\u30FC\u30BF\u30B9\u30C8\u30EA\u30FC\u30E0 // \u30CD\u30C3\u30C8\u30E9\u30F3\u30CA\u30FC";