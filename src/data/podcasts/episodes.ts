// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.

import type { ImageAsset } from "@/types";

export interface PodcastEpisode {
  id: string;
  title: string;
  /** Ids from data/podcasts/speakers.ts. */
  speakerIds: string[];
  date?: string;
  duration?: string;
  summary?: string;
  cover?: ImageAsset;
  embedUrl?: string;
}

export const episodes: PodcastEpisode[] = [];
