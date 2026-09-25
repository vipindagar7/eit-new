// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.

import type { ImageAsset } from "@/types";

export interface Facility {
  id: string;
  name: string;
  description?: string;
  image?: ImageAsset;
}

export const facilities: Facility[] = [];
