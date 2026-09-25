// About section shown right under the hero. Edit copy here — never inside components.
// Do not add statistics or claims that have not been verified by the institute.

import type { CallToAction } from "@/types";

export interface AboutContent {
  eyebrow: string;
  /** Headline. Use "\n" to break it into lines. */
  title: string;
  description: string;
  primaryAction?: CallToAction;
  secondaryAction?: CallToAction;
  /** Words shown on the floating card over the image (one per line). */
  card: string[];
  /** Small caption under the image. */
  caption: string;
  /** How many slanted parts the hero image splits into (3 or 4 works best). */
  panelCount: number;
}

export const aboutContent: AboutContent = {
  eyebrow: "About EIT",
  title: "Learning that grows\nbeyond classrooms.",
  description:
    "Echelon Institute of Technology, Faridabad brings engineering, computer applications and management together, so ideas, skills and talent grow side by side.",
  primaryAction: { label: "Discover EIT", href: "/about" },
  secondaryAction: { label: "Director's Message", href: "/about/director-message" },
  card: ["Learn", "Create", "Innovate", "Grow"],
  caption: "A campus with a purpose",
  panelCount: 4,
};
