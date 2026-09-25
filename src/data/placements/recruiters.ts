// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.

import type { ImageAsset } from "@/types";

export interface Recruiter {
  id: string;
  name: string;
  sector?: string;
  logo?: ImageAsset;
}

export const recruiters: Recruiter[] = [];
