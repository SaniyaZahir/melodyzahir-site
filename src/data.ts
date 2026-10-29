export type Channel = { name: string; level: number; note: string };
export type Bus = { name: string; channels: Channel[] };

// level 0–100 = how often I reach for it
// ordered by what shows up most in job postings: core languages first, learning last
export const STACK: Bus[] = [
  {
    name: "core",
    channels: [
      { name: "Python", level: 100, note: "scripts, data, quick prototypes" },
      { name: "Java", level: 100, note: "OOP, Maven builds, the whole deal" },
      { name: "TypeScript", level: 88, note: "typed JS so bugs show up early" },
      { name: "React", level: 92, note: "component UIs, hooks, React Query for server state" },
    ],
  },
  {
    name: "backend",
    channels: [
      { name: "Node.js", level: 84, note: "servers, APIs, scripts" },
      { name: "SQL", level: 78, note: "queries and schema design" },
    ],
  },
  {
    name: "cloud",
    channels: [
      { name: "AWS", level: 70, note: "S3, Lambda, SQS" },
      { name: "Docker", level: 64, note: "containers for consistent environments" },
      { name: "Firebase", level: 78, note: "auth, storage, hosted data" },
    ],
  },
  {
    name: "frontend",
    channels: [
      { name: "Next.js", level: 82, note: "routing, SSR, full pages" },
      { name: "React Native", level: 74, note: "cross-platform mobile apps" },
      { name: "Swift", level: 86, note: "native iOS apps with SwiftUI" },
    ],
  },
  {
    name: "tools",
    channels: [
      { name: "Git", level: 90, note: "version control and collaboration" },
      { name: "Figma", level: 88, note: "wireframes, prototypes, UI design" },
      { name: "Blender", level: 58, note: "3D modelling, pairs with Three.js" },
    ],
  },
  {
    name: "learning",
    channels: [
      { name: "C", level: 34, note: "memory, pointers, how computers actually work" },
      { name: "C++", level: 30, note: "performance and systems" },
      { name: "Rust", level: 26, note: "safe systems programming" },
      { name: "Tauri", level: 24, note: "small desktop apps with web UIs" },
      { name: "DSP", level: 28, note: "signal processing, where code meets music" },
    ],
  },
];

// full list, grouped the way it is on my résumé. "learning: true" renders as a dashed chip.
export type Skill = { name: string; learning?: boolean };
export const SKILLS: { group: string; items: Skill[] }[] = [
  {
    group: "Languages",
    items: [
      { name: "Python" }, { name: "Java" }, { name: "JavaScript / TypeScript" }, { name: "SQL" },
      { name: "Swift" }, { name: "HTML5 / CSS3" }, { name: "C", learning: true }, { name: "C++", learning: true },
      { name: "Rust", learning: true },
    ],
  },
  {
    group: "Frameworks & Libraries",
    items: [
      { name: "React" }, { name: "Node.js" }, { name: "Next.js" }, { name: "React Native" },
      { name: "React Query" }, { name: "SwiftUI" }, { name: "Tailwind CSS" }, { name: "Vite" },
      { name: "Three.js" }, { name: "Tauri", learning: true },
    ],
  },
  {
    group: "Cloud & Infrastructure",
    items: [
      { name: "AWS (S3, Lambda, SQS)" }, { name: "Docker" }, { name: "Google Cloud Platform" },
      { name: "Firebase" }, { name: "Supabase" },
    ],
  },
  {
    group: "Tools",
    items: [
      { name: "Git" }, { name: "MongoDB" }, { name: "Figma" }, { name: "Blender" }, { name: "Notion" },
      { name: "Cursor" }, { name: "Claude Code" }, { name: "DSP", learning: true },
    ],
  },
];

export const tier = (v: number) =>
  v >= 100 ? "maxed out" : v >= 80 ? "daily driver" : v >= 50 ? "comfortable" : "learning";

export type Project = { name: string; when: string; blurb: string; stack: string[]; link?: { href: string; label: string } };

export const PROJECTS: Project[] = [
  {
    name: "SignalLooper",
    when: "2026 · gdg",
    blurb: "Desktop app with a Rust core and a React + TypeScript interface, packaged with Tauri. Built with the GDG team across frontend and backend.",
    stack: ["Tauri", "Rust", "React", "TypeScript"],
    link: { href: "https://github.com/DSC-McMaster-U/signal-looper", label: "source on github" },
  },
  {
    name: "this website",
    when: "2026",
    blurb: "React components typed end to end, styled with Tailwind on a CSS-variable theme. The oscilloscope is a canvas render loop that maps your cursor to pitch (C4 → C6) and plays the note with the Web Audio API. The stack below is a mixing console rendered from a typed data file.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Canvas", "Web Audio"],
    link: { href: "https://github.com/SaniyaZahir/melodyzahir-site", label: "source on github" },
  },
  {
    name: "EasyConvrt",
    when: "2023 · hack the north",
    blurb: "My first iOS app: a currency converter built at Hack the North 2023. Full-stack development with a team of 4. It reeled me into tech and started my passion for building.",
    stack: ["Swift", "SwiftUI", "Xcode"],
    link: { href: "https://github.com/markantao/easyconvrt", label: "source on github" },
  },
];

export const WINS = [
  { place: "1st", title: "iGEM × Shad @ Mac", sub: "design case competition", year: "2026" },
  { place: "★", title: "Most Innovative Solution", sub: "iGEMULATE", year: "2026" },
  { place: "1st", title: "Evolve Hackathon", sub: "University of Toronto", year: "2024" },
];

export const LIKES = ["drawing", "hiking", "badminton", "djing", "dancing", "writing", "making music"];

export const LINKS = [
  { label: "GitHub", handle: "SaniyaZahir", href: "https://github.com/SaniyaZahir" },
  { label: "LinkedIn", handle: "melody-z", href: "https://www.linkedin.com/in/melody-z-75b710245" },
  { label: "Instagram", handle: "@melody.zhrr", href: "https://www.instagram.com/melody.zhrr/" },
  { label: "X", handle: "@melodyzheir", href: "https://x.com/melodyzheir" },
];

export const EMAIL = "zahirs6@mcmaster.ca";
