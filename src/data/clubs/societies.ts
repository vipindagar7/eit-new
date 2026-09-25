// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.

import type { ImageAsset } from "@/types";

export interface ProfessionalSociety {
  id: string;
  name: string;
  summary?: string;
  logo?: ImageAsset;
}

export const professionalSocieties: ProfessionalSociety[] = [];
