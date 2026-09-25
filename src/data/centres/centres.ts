// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.

import type { ImageAsset, VideoAsset } from "@/types";

export interface Centre {
  id: string;
  name: string;
  summary?: string;
  description?: string;
  /** Where the "Explore" link goes. */
  href?: string;
  /** Pastel accent (hex) from the EIT palette. */
  accent?: string;
  image?: ImageAsset;
  video?: VideoAsset;
}

export const centres: Centre[] = [];
