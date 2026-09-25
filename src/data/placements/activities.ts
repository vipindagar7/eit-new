// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.

import type { ImageAsset } from "@/types";

export type PlacementActivityKind =
  | "industrial-visit"
  | "expert-lecture"
  | "hr-conclave"
  | "job-fair"
  | "skill-development";

export interface PlacementActivity {
  id: string;
  kind: PlacementActivityKind;
  title: string;
  date?: string;
  description?: string;
  images?: ImageAsset[];
}

export const placementActivities: PlacementActivity[] = [];
