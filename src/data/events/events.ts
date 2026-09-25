// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.

import type { ImageAsset } from "@/types";

export interface EitEvent {
  id: string;
  title: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  endDate?: string;
  venue?: string;
  summary?: string;
  status: "upcoming" | "past";
  image?: ImageAsset;
  departmentSlug?: string;
}

export const events: EitEvent[] = [];
