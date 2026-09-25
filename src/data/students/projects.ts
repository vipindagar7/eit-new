// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.

import type { ImageAsset } from "@/types";

export interface StudentProject {
  id: string;
  title: string;
  team: string[];
  departmentSlug?: string;
  year?: number;
  summary?: string;
  images?: ImageAsset[];
  url?: string;
}

export const studentProjects: StudentProject[] = [];
