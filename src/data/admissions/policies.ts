// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.

import type { PolicySection } from "../placements/policy";

export interface AdmissionPolicy {
  slug: "refund-policy" | "fee-reimbursement";
  title: string;
  sections: PolicySection[];
}

export const admissionPolicies: AdmissionPolicy[] = [];
