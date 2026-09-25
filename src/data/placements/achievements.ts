// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.

import type { ImageAsset } from "@/types";

export interface PlacementAchievement {
  id: string;
  title: string;
  description?: string;
  academicYear?: string;
}

export const placementAchievements: PlacementAchievement[] = [];

/** Old "highest performers" page. */
export interface HighestPerformer {
  id: string;
  name: string;
  company: string;
  batch?: string;
  department?: string;
  photo?: ImageAsset;
}

export const highestPerformers: HighestPerformer[] = [];
