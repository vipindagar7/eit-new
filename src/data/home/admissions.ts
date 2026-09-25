// Admissions call-to-action band at the end of the homepage.
// Every link goes to a page that already exists. No dates or fees are stated here.

import type { CallToAction } from "@/types";

export const admissionsCta = {
  eyebrow: "Admissions",
  title: ["Begin your", "journey at EIT"],
  description: "Explore the programs, understand the process and apply for the coming session.",
  primaryAction: { label: "Apply Now", href: "/admissions" } as CallToAction,
  secondaryAction: { label: "Download Brochure", href: "/admissions/brochure" } as CallToAction,
  /** Quick answers, shown as a row of links. */
  links: [
    { label: "Admission procedure", href: "/admissions/procedure" },
    { label: "Fee structure", href: "/admissions/fees-structure" },
    { label: "Scholarships", href: "/admissions/scholarship" },
    { label: "IPU CET", href: "/admissions/ipu-cet" },
    { label: "Document checklist", href: "/admissions/document-checklist" },
  ] as CallToAction[],
  contactAction: { label: "Talk to the admissions team", href: "/contact" } as CallToAction,
};
