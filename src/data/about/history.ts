// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.
//
// Institutional milestones for the About page's history timeline, 2007 to present.
// One entry per milestone, in any order — getHistory() in lib/content.ts sorts by year.

export interface HistoryMilestone {
  id: string;
  /** e.g. "2007". A range like "2007–08" is also fine. */
  year: string;
  title: string;
  description?: string;
}

export const history: HistoryMilestone[] = [];
