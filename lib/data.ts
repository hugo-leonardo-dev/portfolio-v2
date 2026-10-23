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
  "> I'm a full-stack developer who likes building things",
  "> and figuring out how they work.",
  ">",
  "> I work with React, TypeScript, Node.js, and .NET,",
  "> moving between frontend, backend, and whatever else",
  "> the project needs.",
  ">",
  "> I enjoy solving problems, learning new tools,",
  "> and turning ideas into software people can actually use.",
  ">",
  "> Open to freelance work and good projects.",
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
  practices: [
    "Jest",
    "Microservices",
    "Distributed systems",
    "OOP",
    "MVC",
    "Clean code",
  ],
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

export const mentoring =
  "Computer Science Tutor at UNP (Data Structures, Algorithms, OOP, Software Engineering).";

export const experiences = [
  {
    id: "LOG_003",
    company: "CORELAB BR",
    location: "Remote",
    role: "Software Engineer",
    period: "09/2025 - 03/2026",
    bullets: [
      "Developed payment and checkout APIs with AdonisJS and PostgreSQL, working on the backend logic behind financial transactions and checkout flows.",
      "Built React dashboards for the financial SaaS, connecting frontend components to backend services and making application data easier to access and manage.",
      "Worked on background workers to handle tasks outside the main request flow, helping keep application operations organized and responsive.",
      "Set up CI/CD pipelines with GitHub Actions and Docker to automate build and deployment steps and make releases easier to manage.",
    ],
  },
  {
    id: "LOG_002",
    company: "COMIGO Rastreamento",
    location: "Brazil",
    role: "Software Engineer",
    period: "09/2024 - 09/2025",
    bullets: [
      "Developed the insurance module, working across the feature from its backend logic to its integration with the rest of the platform. Added AI-based validation and AWS S3 for file storage.",
      "Built real-time vehicle telemetry dashboards with React, Zustand, Chart.js, and the Flespi API, turning incoming tracking data into information users could follow through the interface.",
      "Implemented WebSocket notifications with Node.js so the application could deliver updates in real time without relying on users to refresh the page.",
      "Integrated ChatGPT with n8n to automate customer support conversations, handling parts of the support workflow that would otherwise require manual work.",
      "Worked across frontend and backend features, connecting APIs, external services, and user-facing interfaces as new functionality was added to the platform.",
    ],
  },
  {
    id: "LOG_001",
    company: "ELITE Consultores",
    location: "Brazil",
    role: "Backend Developer",
    period: "07/2022 - 10/2022",
    bullets: [
      "Worked on an existing ASP.NET MVC application backed by MySQL, refactoring parts of the system to improve performance and reduce processing time by 65%.",
      "Improved data handling and validation in the application, helping reduce data-entry errors by 90% and making everyday operations more reliable.",
      "Developed REST APIs with C# and .NET to support communication between application components and expose backend functionality to other parts of the system.",
      "Implemented JWT-based authentication to protect API endpoints and manage authenticated requests.",
      "Used Hangfire to schedule and run background jobs, moving time-consuming tasks away from the main request flow.",
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
  about:
    "Full-Stack Software Engineer. Building resilient systems at the edge of the net.",
  skills:
    "JS, TS, C#, Node.js, SQL | React, Next.js, AngularJS, AdonisJS, ASP.NET | Postgres, MySQL, Redis, Mongo, AWS, Docker",
  projects: "PetzFinder, PedeF\u00e1cil",
  experience: "CORELAB BR, COMIGO Rastreamento, ELITE Consultores",
  contact: "hugoleonardopflorencio@gmail.com",
  whoami: "visitor@guest:~$ you are a guest on HUGO_LEONARDO's terminal",
  sudo: "ACCESS DENIED. NICE TRY, NETRUNNER.",
};

export const japaneseTexture =
  "\u30B7\u30B9\u30C6\u30E0\u30AA\u30F3\u30E9\u30A4\u30F3 // \u30C7\u30FC\u30BF\u30B9\u30C8\u30EA\u30FC\u30E0 // \u30CD\u30C3\u30C8\u30E9\u30F3\u30CA\u30FC";
