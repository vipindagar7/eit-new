// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.

export interface Announcement {
  id: string;
  title: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  href?: string;
  important?: boolean;
}

/** Newest first. The first entry feeds the announcement bar in the site layout. */
export const announcements: Announcement[] = [];
