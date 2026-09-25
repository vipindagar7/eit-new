// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.

import type { ImageAsset } from "@/types";

export interface SuccessStory {
  id: string;
  studentName: string;
  batch?: string;
  company: string;
  role?: string;
  story?: string;
  photo?: ImageAsset;
}

export const successStories: SuccessStory[] = [];
