// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.

export interface Approval {
  id: string;
  authority: string;
  title: string;
  academicYear?: string;
  /** id from data/site/documents.ts. */
  documentId?: string;
}

export const approvals: Approval[] = [];
