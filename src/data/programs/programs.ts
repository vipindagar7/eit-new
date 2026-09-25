// Program catalogue. Add duration, eligibility, specialisations etc. only once verified by the institute.

import type { ImageAsset } from "@/types";

export type ProgramSlug = "btech" | "mtech" | "bca" | "mca" | "bba" | "mba";

/** Which lucide icon a program uses (mapped in components/home/program-icons.ts). */
export type ProgramIconKey = "cpu" | "graduation-cap" | "code" | "laptop" | "chart" | "users";

export interface ProgramDetail {
  slug: ProgramSlug;
  /** Short name, e.g. "B.Tech". */
  name: string;
  fullName: string;
  level: "undergraduate" | "postgraduate";
  /** Small label under the name, e.g. "Engineering". */
  category: string;
  /** Short line on the program card. */
  tagline?: string;
  icon: ProgramIconKey;
  /** Pastel accent for this program (used on the card when no photograph exists yet). */
  accent: string;
  /** TODO: supply the photograph (see public/images/programs/README.md). */
  image?: ImageAsset;
  /** Department slug from data/departments/departments.ts. */
  departmentSlug?: string;
  duration?: string;
  summary?: string;
  eligibility?: string[];
  specialisations?: string[];
  careerPaths?: string[];
}

/** A program plus whether its photograph exists on disk, resolved on the server (see lib/assets.ts). */
export interface ResolvedProgram extends ProgramDetail {
  imageReady: boolean;
}

export const programLevelLabel: Record<ProgramDetail["level"], string> = {
  undergraduate: "Undergraduate",
  postgraduate: "Postgraduate",
};

export const programs: ProgramDetail[] = [
  {
    slug: "btech",
    name: "B.Tech",
    fullName: "Bachelor of Technology",
    level: "undergraduate",
    category: "Engineering",
    tagline: "Engineering a Smarter Future",
    icon: "cpu",
    accent: "#CFE7EC",
    image: { src: "/images/programs/btech-program.webp", alt: "B.Tech students working on a laptop" },
  },
  {
    slug: "mtech",
    name: "M.Tech",
    fullName: "Master of Technology",
    level: "postgraduate",
    category: "Postgraduate",
    tagline: "Deepen Your Expertise",
    icon: "graduation-cap",
    accent: "#D3E9DC",
    image: { src: "/images/programs/mtech-program.webp", alt: "M.Tech students in a laboratory" },
  },
  {
    slug: "bca",
    name: "BCA",
    fullName: "Bachelor of Computer Applications",
    level: "undergraduate",
    category: "Computer Applications",
    tagline: "Build. Code. Create.",
    icon: "code",
    accent: "#F5ED8F",
    image: { src: "/images/programs/bca-program.webp", alt: "The EIT academic building in the afternoon sun" },
  },
  {
    slug: "mca",
    name: "MCA",
    fullName: "Master of Computer Applications",
    level: "postgraduate",
    category: "Postgraduate",
    tagline: "Design. Develop. Deliver.",
    icon: "laptop",
    accent: "#F3C4AA",
    image: { src: "/images/programs/mca-program.webp", alt: "MCA students coding in a computer lab" },
  },
  {
    slug: "bba",
    name: "BBA",
    fullName: "Bachelor of Business Administration",
    level: "undergraduate",
    category: "Business Administration",
    tagline: "Leaders for a Changing World",
    icon: "chart",
    accent: "#E79BB2",
    image: { src: "/images/programs/bba-program.webp", alt: "A BBA student studying" },
  },
  {
    slug: "mba",
    name: "MBA",
    fullName: "Master of Business Administration",
    level: "postgraduate",
    category: "Management",
    tagline: "Think. Lead. Transform.",
    icon: "users",
    accent: "#C8A5C9",
    image: { src: "/images/programs/mba-program.webp", alt: "MBA students in a discussion" },
  },
];
