// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.

import type { CommitteeMember } from "@/types";

/** IIC, EDC and IPR cell pages. */
export interface ResearchCell {
  slug: "iic" | "edc" | "ipr";
  name: string;
  about?: string;
  members: CommitteeMember[];
}

export const researchCells: ResearchCell[] = [];
