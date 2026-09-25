// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.

export interface DisclosureItem {
  id: string;
  title: string;
  /** id from data/site/documents.ts. */
  documentId?: string;
  href?: string;
}

export const mandatoryDisclosure: DisclosureItem[] = [];
