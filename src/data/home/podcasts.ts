// Podcasts & Talks section. Episodes and speakers live in data/podcasts/*.

import type { SlideshowSection } from "./centres";

export const podcastsSection: SlideshowSection = {
  eyebrow: "Podcasts & Talks",
  title: ["Conversations", "worth hearing"],
  description: "Talks and podcast episodes with alumni, industry experts and faculty.",
  intervalMs: 7000,
  action: { label: "All Episodes", href: "/podcasts" },
};

/** Ids from data/podcasts/episodes.ts, in display order. Empty = show all. */
export const featuredEpisodeIds: string[] = [];
