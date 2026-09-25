// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.

export type PublicationKind = "journal" | "conference" | "book" | "book-chapter";

export interface Publication {
  id: string;
  kind: PublicationKind;
  title: string;
  authors: string[];
  venue?: string;
  year?: number;
  /** Department slug from data/departments/departments.ts. */
  departmentSlug?: string;
  url?: string;
}

export const journalPapers: Publication[] = [];
export const conferencePapers: Publication[] = [];
export const booksAndChapters: Publication[] = [];
