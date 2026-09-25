// Placements & Achievements section. Stories, statistics and recruiters live in data/placements/*.

import type { SlideshowSection } from "./centres";

export const placementsSection: SlideshowSection & { secondaryAction: { label: string; href: string } } = {
  eyebrow: "Placements & Achievements",
  title: ["Where careers", "begin"],
  description: "Meet students who turned campus learning into careers, and the recruiters who welcome them.",
  intervalMs: 6000,
  action: { label: "Placement Overview", href: "/placements" },
  secondaryAction: { label: "Placement Brochure", href: "/placements/brochure" },
};

/** Ids from data/placements/*, in display order. Empty = show all. */
export const featuredStatisticIds: string[] = [];
export const featuredRecruiterIds: string[] = [];
