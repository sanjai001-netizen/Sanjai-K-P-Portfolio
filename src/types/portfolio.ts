/** A year/month pair. Months are 1-indexed (1 = January). */
export interface YearMonth {
  year: number;
  month: number;
}

export interface Metric {
  id: string;
  /** Display value exactly as documented, e.g. "20–25%". */
  value: string;
  /** What the value measures, e.g. "faster page loads". */
  label: string;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  start: YearMonth;
  /** `null` means the role is ongoing. */
  end: YearMonth | null;
  location?: string;
  workplace?: string;
  summary?: string;
  responsibilities: string[];
  metrics: Metric[];
  technologies: string[];
  /** Label for the technologies list, e.g. "Technical focus". */
  technologiesLabel?: string;
  /** Earlier, unrelated career entries are shown with less emphasis. */
  emphasis: "primary" | "secondary";
}

export interface ExternalLink {
  href: string;
  label: string;
}

export type ProjectPlate =
  | { kind: "modules"; items: string[] }
  | { kind: "flow"; steps: string[]; caption: string }
  | { kind: "pages"; count: number; caption: string }
  | { kind: "figures"; items: Metric[] }
  | { kind: "layers"; layers: string[] };

export interface Project {
  id: string;
  number: string;
  title: string;
  /** Optional shorter title used for tight layouts. */
  shortTitle?: string;
  fullName?: string;
  type: string;
  description: string;
  /** What the platform does, as opposed to what Sanjai built on it. */
  scope?: { label: string; items: string[] };
  /** Documented personal contribution. */
  contribution?: { label: string; items: string[] };
  features: { label: string; items: string[] };
  stack: { label: string; items: string[] };
  outcomes: Metric[];
  notes: string[];
  highlight?: string;
  link?: ExternalLink;
  tone: "default" | "crimson" | "inverse";
  size: "feature" | "standard";
  plate: ProjectPlate;
}

export interface SkillCategory {
  id: string;
  code: string;
  label: string;
  items: string[];
}

export interface EducationEntry {
  id: string;
  credential: string;
  institution: string;
  location: string;
  completed: YearMonth;
}

export interface Certification {
  id: string;
  title: string;
  provider: string;
}

export interface ContactLink {
  id: string;
  label: string;
  value: string;
  href?: string;
}

export interface HeroMeta {
  id: string;
  label: string;
  value: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: `#${string}`;
}

export interface Profile {
  name: string;
  nameLines: [string, string];
  role: string;
  stackLine: string[];
  statement: string;
  location: string;
  coordinates: string;
  email: string;
  phone: string;
  /** Only shown when explicitly confirmed. */
  availableForOpportunities: boolean;
}
