import type {
  Certification,
  ContactLink,
  EducationEntry,
  ExperienceEntry,
  HeroMeta,
  NavItem,
  Profile,
  Project,
  SkillCategory,
  YearMonth,
} from "@/types/portfolio";

/*
 * Single source of content for the site.
 * Every claim here comes from the supplied brief. Anything that could not be
 * confirmed (availability status, social profiles, production domain) is
 * deliberately left out — see README.md › Content integrity.
 */

export const profile: Profile = {
  name: "Sanjai KP",
  nameLines: ["Sanjai", "KP"],
  role: "Full Stack Developer",
  stackLine: ["Python", "Django", "React", "JavaScript"],
  statement:
    "Building scalable web applications, REST APIs and digital products.",
  location: "Nilambur, Kerala",
  coordinates: "11.28° N / 76.23° E",
  email: "kpsanjai@gmail.com",
  phone: "+91 7592868006",
  availableForOpportunities: false,
};

export const navItems: NavItem[] = [
  { id: "about", label: "About", href: "#about" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "work", label: "Projects", href: "#work" },
  { id: "stack", label: "Stack", href: "#stack" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const heroMeta: HeroMeta[] = [
  { id: "location", label: "Location", value: "Nilambur, Kerala" },
  { id: "experience", label: "Experience", value: "2+ Years" },
  { id: "focus", label: "Focus", value: "Full Stack Development" },
  {
    id: "exploring",
    label: "Currently exploring",
    value: "Data Analysis / Machine Learning",
  },
];

export const experience: ExperienceEntry[] = [
  {
    id: "beegains",
    role: "Frontend Developer",
    organization: "Beegains Technology Solutions LLP",
    start: { year: 2026, month: 8 },
    end: null,
    location: "Malappuram",
    workplace: "On-site",
    responsibilities: [
      "Building production-grade, responsive frontend interfaces.",
      "Working on the Beegains Client Review & Performance Management Platform.",
      "Review-template management screens.",
      "Project satisfaction tracking.",
      "Analytics dashboard screens.",
      "REST API integration.",
    ],
    metrics: [],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "REST APIs",
      "Git",
      "GitHub",
      "VS Code",
    ],
    emphasis: "primary",
  },
  {
    id: "freelance",
    role: "Full Stack Developer",
    organization: "Freelance",
    start: { year: 2024, month: 3 },
    end: null,
    location: "Nilambur",
    responsibilities: [
      "End-to-end web development for clients.",
      "Django backend development, REST APIs and database models.",
      "UI and performance optimization.",
      "Deployment and monitoring.",
      "Direct client collaboration.",
    ],
    metrics: [
      { id: "fl-load", value: "20–25%", label: "Faster page loads" },
      {
        id: "fl-issues",
        value: "20–35%",
        label: "Reduction in production issues",
      },
    ],
    technologies: [],
    emphasis: "primary",
  },
  {
    id: "wantad",
    role: "Web Developer",
    organization: "Wantad Marketing",
    start: { year: 2025, month: 1 },
    end: { year: 2025, month: 9 },
    responsibilities: [],
    metrics: [
      { id: "wa-speed", value: "40%", label: "Page-speed improvement" },
      {
        id: "wa-defects",
        value: "30%",
        label: "Reduction in recurring defects",
      },
    ],
    technologies: [],
    emphasis: "primary",
  },
  {
    id: "luminar",
    role: "Full Stack Developer Intern",
    organization: "Luminar Technolab",
    start: { year: 2024, month: 9 },
    end: { year: 2025, month: 4 },
    responsibilities: [],
    metrics: [],
    technologies: [
      "Python",
      "Django",
      "React",
      "Authentication",
      "CRUD",
      "REST APIs",
      "SQLite",
      "MySQL",
    ],
    technologiesLabel: "Technical focus",
    emphasis: "primary",
  },
  {
    id: "besafe",
    role: "Insurance Agent",
    organization: "Besafe",
    start: { year: 2023, month: 1 },
    end: { year: 2024, month: 8 },
    responsibilities: [],
    metrics: [],
    technologies: [],
    emphasis: "secondary",
  },
];

export const projects: Project[] = [
  {
    id: "beegains-platform",
    number: "01",
    title: "Beegains Client Review & Performance Management Platform",
    shortTitle: "Client Review & Performance Platform",
    type: "Full Stack Platform",
    description:
      "A full-stack platform for client feedback, employee performance evaluation and testimonial management.",
    scope: {
      label: "Platform scope",
      items: [
        "Configurable review templates",
        "Client feedback collection",
        "Employee performance evaluation",
        "Project satisfaction tracking",
        "Analytics",
        "Client sentiment trends",
        "Testimonial publishing workflow",
      ],
    },
    contribution: {
      label: "My contribution — Frontend",
      items: [
        "Production-grade responsive interfaces",
        "Review-template management",
        "Project satisfaction tracking",
        "Analytics dashboard screens",
        "REST API integration",
      ],
    },
    features: { label: "Features", items: [] },
    stack: {
      label: "My frontend toolkit",
      items: ["HTML", "CSS", "JavaScript", "React", "REST APIs"],
    },
    outcomes: [],
    notes: [
      "Built as part of the Beegains team. The platform is full stack; my documented role is the frontend.",
    ],
    tone: "inverse",
    size: "feature",
    plate: {
      kind: "modules",
      items: [
        "Templates",
        "Feedback",
        "Evaluation",
        "Satisfaction",
        "Analytics",
        "Sentiment",
        "Testimonials",
      ],
    },
  },
  {
    id: "kryon",
    number: "02",
    title: "Kryon",
    type: "E-commerce Jewellery Store",
    description:
      "A custom HTML/CSS storefront integrated with the Shopify Storefront API, with Razorpay for payments.",
    features: { label: "Features", items: [] },
    stack: {
      label: "Stack",
      items: [
        "Shopify Storefront API",
        "Razorpay",
        "HTML",
        "CSS",
        "JavaScript",
        "Netlify",
        "GoDaddy",
      ],
    },
    outcomes: [],
    notes: [
      "Before launch, the build went through a security review that included checks for API-token exposure.",
    ],
    highlight: "48-hour production delivery",
    link: { href: "https://thekryon.in", label: "thekryon.in" },
    tone: "default",
    size: "standard",
    plate: {
      kind: "flow",
      steps: ["Storefront", "Storefront API", "Razorpay"],
      caption: "48H",
    },
  },
  {
    id: "coe-kisti",
    number: "03",
    title: "CoE-KISTI",
    fullName:
      "Centre of Excellence, Kerala Institute of Science, Technology and Innovation",
    type: "Institutional Website",
    description:
      "A 10-page institutional website for a Kerala government-affiliated research centre.",
    features: { label: "Features", items: [] },
    stack: {
      label: "Project stack",
      items: ["Vite", "React", "Django", "Wagtail CMS"],
    },
    outcomes: [],
    notes: [],
    tone: "crimson",
    size: "standard",
    plate: { kind: "pages", count: 10, caption: "10 pages" },
  },
  {
    id: "luminar-ecommerce",
    number: "04",
    title: "Full Stack E-commerce Web Application",
    shortTitle: "Full Stack E-commerce App",
    type: "Training Project — Luminar Technolab",
    description:
      "A full-stack e-commerce application built during the Luminar Technolab programme, with a Django backend and a React frontend.",
    features: {
      label: "Features",
      items: [
        "Django backend",
        "React frontend",
        "Authentication",
        "Session management",
        "Protected dashboard",
        "Database-driven modules",
        "Optimized API calls",
      ],
    },
    stack: { label: "Stack", items: ["Python", "Django", "React"] },
    outcomes: [],
    notes: [],
    tone: "default",
    size: "standard",
    plate: {
      kind: "flow",
      steps: ["Auth", "Session", "Dashboard"],
      caption: "CRUD",
    },
  },
  {
    id: "besafe-insurance",
    number: "05",
    title: "Besafe Insurance",
    type: "Business Website",
    description:
      "A business website for Besafe Insurance, optimized for loading speed, accessibility and bundle size.",
    features: { label: "Features", items: [] },
    stack: { label: "Stack", items: [] },
    outcomes: [
      { id: "bs-fcp", value: "20%", label: "Faster First Contentful Paint" },
      { id: "bs-a11y", value: "25%", label: "Accessibility improvement" },
      { id: "bs-bundle", value: "30%", label: "Smaller bundle" },
      {
        id: "bs-lh",
        value: "25%",
        label: "Lighthouse performance improvement",
      },
    ],
    notes: [
      "All figures are relative improvements, not absolute scores.",
    ],
    link: { href: "https://besafeinsurance.in", label: "besafeinsurance.in" },
    tone: "default",
    size: "standard",
    plate: {
      kind: "figures",
      items: [
        { id: "p-fcp", value: "FCP", label: "20% faster" },
        { id: "p-a11y", value: "A11Y", label: "25% improved" },
        { id: "p-bundle", value: "JS", label: "30% smaller" },
        { id: "p-lh", value: "PERF", label: "25% improved" },
      ],
    },
  },
  {
    id: "imagined-by-kp",
    number: "06",
    title: "Imagined by KP",
    type: "Agency Portfolio Website",
    description:
      "An agency portfolio built around a scroll-driven homepage animation.",
    features: {
      label: "Interaction work",
      items: [
        "Scroll-based homepage animation",
        "Fixed-position layering",
        "Z-index composition",
        "Logo reveal sequence",
        "IntersectionObserver-driven scroll phases",
      ],
    },
    stack: { label: "Stack", items: [] },
    outcomes: [],
    notes: [],
    link: { href: "https://imaginedbykp.com", label: "imaginedbykp.com" },
    tone: "default",
    size: "standard",
    plate: { kind: "layers", layers: ["Logo", "Phase 02", "Phase 01"] },
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    code: "LANG",
    label: "Languages",
    items: ["Python", "JavaScript", "C", "C++"],
  },
  {
    id: "frameworks",
    code: "FRWK",
    label: "Frameworks",
    items: ["Django", "React", "Vite", "Wagtail CMS"],
  },
  {
    id: "frontend",
    code: "FRNT",
    label: "Frontend",
    items: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "backend",
    code: "BACK",
    label: "Backend / Integrations",
    items: ["Django", "REST APIs", "Shopify Storefront API", "Razorpay"],
  },
  {
    id: "databases",
    code: "DATA",
    label: "Databases",
    items: ["SQLite", "MySQL"],
  },
  {
    id: "tools",
    code: "TOOL",
    label: "Tools",
    items: ["Git", "GitHub", "VS Code", "Cloudflare Pages", "ReportLab"],
  },
];

export const learning = {
  statement: ["Data", "Models", "Intelligence"],
  fundamentals: ["NumPy", "Pandas", "scikit-learn"],
  path: ["Python Data Analysis", "Machine Learning"],
  direction: "ML / AI Full-Stack Engineering",
} as const;

export const education: EducationEntry[] = [
  {
    id: "bsc",
    credential: "B.Sc. Physics",
    institution: "Sree Vivekananda Padanakendra Arts & Science College",
    location: "Malappuram, Kerala",
    completed: { year: 2022, month: 3 },
  },
  {
    id: "luminar",
    credential: "Full Stack Development Program",
    institution: "Luminar Technolab",
    location: "Kochi, Kerala",
    completed: { year: 2025, month: 4 },
  },
];

export const certifications: Certification[] = [
  {
    id: "cert-fullstack",
    title: "Full Stack Development",
    provider: "Luminar Technolab",
  },
  {
    id: "cert-frontend",
    title: "Front End Development",
    provider: "W3Schools / Great Learning",
  },
];

export const contactLinks: ContactLink[] = [
  {
    id: "phone",
    label: "Phone",
    value: profile.phone,
    href: "tel:+917592868006",
  },
  {
    id: "email",
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  { id: "location", label: "Based in", value: profile.location },
];

/* ---------- formatting helpers (pure, server-safe) ---------- */

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export function formatMonth(date: YearMonth, style: "long" | "short" = "long") {
  const name = MONTHS[date.month - 1];
  return `${style === "short" ? name.slice(0, 3) : name} ${date.year}`;
}

export function toIsoMonth(date: YearMonth) {
  return `${date.year}-${String(date.month).padStart(2, "0")}`;
}
