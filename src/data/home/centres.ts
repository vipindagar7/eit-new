// Centres of Excellence section. The centres themselves live in data/centres/centres.ts.

import type { CallToAction } from "@/types";

export interface SlideshowSection {
  eyebrow: string;
  /** One entry per line. */
  title: string[];
  description: string;
  /** Time each slide stays on screen, in milliseconds. */
  intervalMs: number;
  action?: CallToAction;
}

export const centresSection: SlideshowSection = {
  eyebrow: "Centres of Excellence",
  title: ["Centres of", "Excellence"],
  description: "Dedicated spaces where students and faculty learn by building, testing and innovating.",
  intervalMs: 6500,
  action: { label: "Explore All Centres", href: "/centres" },
};

/** Ids from data/centres/centres.ts, in display order. Empty = show all. */
export const featuredCentreIds: string[] = [];
