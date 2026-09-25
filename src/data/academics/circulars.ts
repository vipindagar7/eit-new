// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.

export interface Circular {
  id: string;
  title: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  documentId?: string;
  href?: string;
}

export const circulars: Circular[] = [];
