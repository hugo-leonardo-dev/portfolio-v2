export type ProjectStatus = "DEPLOYED" | "OPEN_SOURCE" | "ARCHIVED";

export type Project = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  liveUrl?: string;
  repoUrl?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    id: "PRJ_001",
    name: "Game Nexus",
    description:
      "A collaborative web platform for managing shared video game backlogs. Features a Kanban-style board for organizing games by status and real-time price updates for each game.",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    status: "DEPLOYED",
    liveUrl: "https://gamenexus-blush.vercel.app",
    image: "/projects/game-nexus.png",
  },
  {
    id: "PRJ_002",
    name: "Motion Design Portfolio",
    description:
      "Portfolio focused on motion design and 3D projects. Features a public gallery to showcase work, plus a private admin dashboard with authentication for content management.",
    tags: ["React", "Next.js", "Supabase", "Tailwind CSS"],
    status: "DEPLOYED",
    liveUrl: "https://tony-mendes.vercel.app/",
    image: "/projects/motion-design.png",
  },
  {
    id: "PRJ_003",
    name: "WhatsWeb",
    description:
      "A dynamic web chat built with React. Features real-time updates, modular components for a clean structure, user authentication for security, and support for basic message formatting.",
    tags: ["React"],
    status: "DEPLOYED",
    liveUrl: "https://whatsweb-hugoleonardo.vercel.app",
    image: "/projects/whatsweb.png",
  },
  {
    id: "PRJ_004",
    name: "PetzFinder",
    description: "Pet tracking system with QR Code generation; evolved into a university extension project (2023-2024).",
    tags: ["Node.js", "React.js", "AWS Lambda", "QR Code"],
    status: "ARCHIVED",
  },
  {
    id: "PRJ_005",
    name: "PedeFácil",
    description: "Conversational chatbot that automates menus and PIX payments, speeding up checkout by 3x (2023).",
    tags: ["N8N", "Z-Pro", "Node.js", "WhatsApp API"],
    status: "ARCHIVED",
  },
  {
    id: "PRJ_006",
    name: "Portfolio v1",
    description:
      "My previous developer portfolio: a dynamic and visually appealing full-stack developer site with smooth navigation and organized displays of projects and skills.",
    tags: ["React", "Tailwind CSS"],
    status: "OPEN_SOURCE",
    repoUrl: "https://github.com/hugo-leonardo-dev/portoflio",
    image: "/projects/portfolio-v1.png",
  },
];