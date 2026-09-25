// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.

import type { ImageAsset } from "@/types";

export interface PodcastSpeaker {
  id: string;
  name: string;
  designation?: string;
  organisation?: string;
  photo?: ImageAsset;
}

export const speakers: PodcastSpeaker[] = [];
