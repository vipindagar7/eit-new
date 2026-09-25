// Programs section on the homepage. Program details live in data/programs/programs.ts.

import type { CallToAction } from "@/types";

export interface ProgramsSectionContent {
  eyebrow: string;
  /** One entry per line. The last line is shown in the muted supporting colour. */
  title: string[];
  description: string;
  /** Short line at the top right, beside the previous / next buttons. */
  intro: string;
  /** Time each program stays in front, in milliseconds. */
  intervalMs: number;
  action: CallToAction;
}

export const programsSection: ProgramsSectionContent = {
  eyebrow: "Our programs",
  title: ["Programs", "for a Brighter", "Tomorrow"],
  description:
    "Explore our programs in engineering, computer applications and management, designed to help you build in-demand skills and shape a successful future.",
  intro: "From engineering to management, our diverse range of programs empowers you to learn, grow and make an impact.",
  intervalMs: 6000,
  action: { label: "Explore All Programs", href: "/programs" },
};

/** Program slugs from data/programs/programs.ts, in display order. */
export const featuredProgramSlugs: string[] = ["btech", "mtech", "bca", "mca", "bba", "mba"];
