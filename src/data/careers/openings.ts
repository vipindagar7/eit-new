// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.

export interface JobOpening {
  id: string;
  title: string;
  departmentSlug?: string;
  employmentType?: string;
  postedOn?: string;
  description?: string;
  applyUrl?: string;
}

export const jobOpenings: JobOpening[] = [];
