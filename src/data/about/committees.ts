// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.

import type { CommitteeMember } from "@/types";

export type CommitteeSlug =
  | "iqac"
  | "grievance-redressal"
  | "internal-committee-women-cell"
  | "sc-st-cell"
  | "nba-naac";

export interface Committee {
  slug: CommitteeSlug;
  name: string;
  description?: string;
  members: CommitteeMember[];
}

export const committees: Committee[] = [];
