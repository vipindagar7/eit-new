// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.

export interface AcademicCalendarEntry {
  id: string;
  title: string;
  term: string;
  /** id from data/site/documents.ts. */
  documentId?: string;
}

export const academicCalendars: AcademicCalendarEntry[] = [];
