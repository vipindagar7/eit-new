// Clubs & Activities section. Clubs live in data/clubs/clubs.ts.

import type { CallToAction } from "@/types";

export const clubsSection = {
  eyebrow: "Clubs & Activities",
  title: ["Find your", "people"],
  description: "Clubs and professional societies where students lead, create and compete.",
  /** Seconds for one full pass of the scrolling rows. Higher = slower. */
  marqueeSeconds: 45,
  action: { label: "Explore Clubs", href: "/clubs" } as CallToAction,
  secondaryAction: { label: "Professional Societies", href: "/clubs/professional-societies" } as CallToAction,
};

/** Ids from data/clubs/clubs.ts, in display order. Empty = show all. */
export const featuredClubIds: string[] = [];
