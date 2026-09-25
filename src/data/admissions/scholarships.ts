// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.

export interface Scholarship {
  id: string;
  name: string;
  provider?: string;
  eligibility?: string;
  description?: string;
  href?: string;
}

export const scholarships: Scholarship[] = [];
