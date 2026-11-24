/**
 * All portfolio copy lives here so it can be edited without touching components.
 * Anything in [brackets] is a placeholder still waiting on real info.
 */

export const profile = {
  name: "Czerina Piedad",
  firstName: "Czerina",
  lastName: "Piedad",
  role: "Full stack web developer",
  location: "Bulacan, Philippines",
  timeZone: "Asia/Manila",
  email: "czerina.piedad1030@gmail.com",
  github: { label: "/Zeri30", href: "https://github.com/Zeri30" },
  linkedin: { label: "/in/czerina-piedad", href: "https://www.linkedin.com/in/czerina-piedad-981140372/" },
  facebook: { label: "/czerina.l.piedad", href: "https://www.facebook.com/czerina.l.piedad" },
  phone: { label: "0936 901 1264", href: "tel:+639369011264" },
  resumeHref: "/Piedad_Czerina_CV.pdf",
  status: "Open to full-time roles",
  intro:
    "I'm Czerina, a full stack developer working in React, Next.js, Laravel and PostgreSQL. I spec features first, keep components small, and write the tests that catch regressions.",
};

/** Cycled by the typing line in the hero. */
export const recentlyBuilt = [
  "a pet adoption platform",
  "a chapter's official website",
  "live-stats scoreboards",
  "a 38-test E2E suite",
];

export type Project = {
  slug: string;
  index: string;
  title: string;
  summary: string;
  preview: "pawfolio" | "icpep" | "livestats";
};

export const projects: Project[] = [
  { slug: "pawfolio", index: "01", title: "Pawfolio", summary: "Pet adoption platform · Next.js + Laravel · Live in production", preview: "pawfolio" },
  { slug: "icpep", index: "02", title: "ICPEP.SE Website", summary: "Official chapter site · Next.js + Laravel · Live, team-maintained", preview: "icpep" },
  { slug: "livestats", index: "03", title: "Live-stats scoring", summary: "From my internship · Dayou Sports Inc", preview: "livestats" },
];

export const pawfolio = {
  label: "Pawfolio · 2026",
  title: "Adoption, flipped: the pets do the applying.",
  body: "A two-sided adoption platform framed like a job hunt: pets build a résumé and apply to homes, and humans hire their future pet.",
  highlights: [
    "Lifestyle quiz with match scores that explain why",
    "Adoption requests and Meet & Greet booking",
    "Next.js frontend on a Laravel 12 API with Sanctum auth, Redis and S3",
  ],
  meta: ["Full stack developer", "Team of 4, top contributor", "Vercel + Render"],
  displayUrl: "pawfolio-service.vercel.app",
  tabTitle: "Pawfolio",
  liveHref: "https://pawfolio-service.vercel.app/",
};

export const icpep = {
  label: "ICPEP.SE BulSU Meneses · 2026",
  title: "The chapter's home on the web, built and still running.",
  body: "The official site of the ICPEP.SE BulSU Meneses Campus chapter. I built it full stack, and the programming team I lead keeps it running.",
  highlights: [
    "Three.js 3D hero with GSAP and Lenis scroll animations",
    "Board, teams and an events archive in one place",
    "Membership applications with QR codes, plus PDF and spreadsheet exports",
  ],
  meta: ["Full stack developer", "Team of 3, repo owner", "Next.js 16 + Laravel 12", "Vercel + Render"],
  displayUrl: "icpep-mc.vercel.app",
  tabTitle: "ICPEP – BulSU Meneses Campus",
  liveHref: "https://icpep-mc.vercel.app/",
};

export const liveStats = {
  label: "Dayou Sports Inc · Internship · 2026",
  title: "Courtside scoring, in real time.",
  body: "Live-stats scoring for basketball and volleyball at Dayou Sports. My piece of the UI: the game clock and period controller scorers use courtside.",
  highlights: [
    "Game clock that starts at a tap and reads at a glance",
    "Period controller for closing out each period",
    "Specced in OpenSpec first, then passed design and code review",
  ],
  meta: ["Full stack developer intern", "May – Jun 2026"],
  note: "Private client codebase, so the visual is an illustration, not a screenshot.",
};

export type Stat = { from: number; to: number; prefix?: string; label: string };

export const stats: Stat[] = [
  { from: 0, to: 2, label: "full stack apps live in production: Pawfolio and the ICPEP.SE site" },
  { from: 700, to: 15, label: "lines, down from 700, after splitting a profile form into tested parts" },
  { from: 0, to: 3, prefix: "+", label: "components fixed and unit-tested after tracing one calendar bug" },
  { from: 0, to: 38, label: "end-to-end tests guarding auth, booking and payment" },
];

export type Experience = {
  period: string;
  kind?: string;
  role: string;
  org: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    period: "May – Jun 2026",
    kind: "Internship",
    role: "Full Stack Web Developer",
    org: "Dayou Sports Inc",
    points: [
      "Built live-stats scoring for basketball and volleyball, specced in OpenSpec and passed through design and code review",
      "Traced a booking-calendar bug, fixed it, and covered the fix in three more components with unit tests",
      "Wrote a 38-test Playwright suite, split two 700-line files into small tested components, and sped up booking with targeted React Query caching",
    ],
  },
  {
    period: "2025 – Present",
    kind: "Leadership",
    role: "Programming Team Head",
    org: "ICPEP.SE – Meneses Campus",
    points: [
      "Lead the team that maintains the chapter website and runs its programming events and workshops",
      "Coach developers for regional competitions and taught a Git & GitHub workshop",
      "Previously Programming Team Assistant (2023–2025); competed twice in the Region 3 Programming Sprint",
    ],
  },
];

export const education = {
  degree: "BS Computer Engineering, Bulacan State University",
  note: "Dean's Lister, 2024–2025",
};

export type StackLayer = { layer: string; role: string; items: string[] };

/** Request path, top to bottom. */
export const stackLayers: StackLayer[] = [
  { layer: "Frontend", role: "What people see and click", items: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS"] },
  { layer: "Backend", role: "Where the logic and APIs live", items: ["Laravel", "PHP", "Java", "Supabase"] },
  { layer: "Data", role: "Where it's stored and cached", items: ["PostgreSQL", "MySQL", "React Query caching"] },
  { layer: "Deploy", role: "Where it goes live", items: ["Vercel", "Render"] },
];

/** Wraps every layer above. */
export const stackQuality: StackLayer = {
  layer: "Quality",
  role: "Wraps every layer",
  items: ["Playwright", "Vitest", "OpenSpec", "Git & GitHub"],
};
