// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.

export interface FeeLine {
  label: string;
  amount?: string;
}

export interface FeeStructure {
  id: string;
  programSlug: string;
  academicYear: string;
  lines: FeeLine[];
}

export const feeStructures: FeeStructure[] = [];
