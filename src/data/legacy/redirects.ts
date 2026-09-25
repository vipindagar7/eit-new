/**
 * Redirects from every URL on the old PHP website to its new route.
 * Consumed by next.config.ts, so imports here must stay RELATIVE (no "@/" alias).
 *
 * Coverage of the old sitemap (130 URLs) is checked by scripts/verify-routes.mjs.
 */
import { departments } from "../departments/departments";
import { documents } from "../site/documents";

export interface LegacyRedirect {
  source: string;
  destination: string;
}

/** Pages that are not tied to a department. */
const pageRedirects: LegacyRedirect[] = [
  { source: "/index.php", destination: "/" },

  // About & governance
  { source: "/about-us.php", destination: "/about" },
  { source: "/chairman-message.php", destination: "/about/chairman-message" },
  { source: "/director-message.php", destination: "/about/director-message" },
  { source: "/gov-members.php", destination: "/about/governing-body" },
  { source: "/aicte-approvals.php", destination: "/about/approvals" },
  { source: "/iqac-department.php", destination: "/about/iqac" },
  { source: "/policy-nba-naac.php", destination: "/about/nba-naac-policy" },
  { source: "/mandatory-disclosure.php", destination: "/about/mandatory-disclosure" },
  { source: "/grievance-redressal-committee.php", destination: "/about/grievance-redressal" },
  { source: "/internal-committee-and-women-cell.php", destination: "/about/internal-committee-women-cell" },
  { source: "/sc-st-cell.php", destination: "/about/sc-st-cell" },

  // Academics & programs
  { source: "/courses.php", destination: "/programs" },
  { source: "/academic-calendar.php", destination: "/academics/calendar" },
  { source: "/circulars.php", destination: "/academics/circulars" },

  // Admissions
  { source: "/admission-procedure.php", destination: "/admissions/procedure" },
  { source: "/document-checklist.php", destination: "/admissions/document-checklist" },
  { source: "/fees-structure.php", destination: "/admissions/fees-structure" },
  { source: "/fee-reimbursement.php", destination: "/admissions/fee-reimbursement" },
  { source: "/scholarship.php", destination: "/admissions/scholarship" },
  { source: "/refund-policy.php", destination: "/admissions/refund-policy" },
  { source: "/ipu-cet.php", destination: "/admissions/ipu-cet" },
  { source: "/admission-brochure.php", destination: "/admissions/brochure" },

  // Placements & training
  { source: "/placement.php", destination: "/placements" },
  { source: "/placement-brochure.php", destination: "/placements/brochure" },
  { source: "/messagehodandtp.php", destination: "/placements/message-hod-tp" },
  { source: "/policyofplacement.php", destination: "/placements/policy" },
  { source: "/placement-process.php", destination: "/placements/process" },
  { source: "/students-speak.php", destination: "/placements/students-speak" },
  { source: "/highest-performers.php", destination: "/placements/highest-performers" },
  { source: "/placement-gallery.php", destination: "/placements/gallery" },
  { source: "/recruiters-list.php", destination: "/placements/recruiters" },
  { source: "/recruiters-speak.php", destination: "/placements/recruiters-speak" },
  { source: "/placement-mous.php", destination: "/placements/mous" },
  { source: "/industrial-visits.php", destination: "/placements/industrial-visits" },
  { source: "/industry-expert-lectures.php", destination: "/placements/expert-lectures" },
  { source: "/hr-conclave.php", destination: "/placements/hr-conclave" },
  { source: "/jobfair.php", destination: "/placements/job-fair" },
  { source: "/skill-development.php", destination: "/placements/skill-development" },

  // Research & innovation
  { source: "/r-and-d-committee.php", destination: "/research/r-and-d-committee" },
  { source: "/journal-papers.php", destination: "/research/journal-papers" },
  { source: "/conference-papers.php", destination: "/research/conference-papers" },
  { source: "/book-bookchapters.php", destination: "/research/books" },
  { source: "/patent.php", destination: "/research/patents" },
  { source: "/mous.php", destination: "/research/mous" },
  { source: "/fdp.php", destination: "/research/fdp" },
  { source: "/iic-about.php", destination: "/research/iic" },
  { source: "/edc-about.php", destination: "/research/edc" },
  { source: "/ipr-about.php", destination: "/research/ipr" },

  // Campus & student life
  { source: "/eit-library.php", destination: "/campus-life/library" },
  { source: "/anti-ragging-form.php", destination: "/campus-life/anti-ragging" },
  { source: "/events.php", destination: "/events" },
  { source: "/upcoming-events.php", destination: "/events/upcoming" },
  { source: "/student-club.php", destination: "/clubs" },
  { source: "/professional-society.php", destination: "/clubs/professional-societies" },

  // Utility
  { source: "/career.php", destination: "/careers" },
  { source: "/contact-us.php", destination: "/contact" },
];

/** Department landing pages, sub-pages and journal-paper pages, derived from data. */
const departmentRedirects: LegacyRedirect[] = departments.flatMap((d) => [
  { source: d.legacyPath, destination: `/departments/${d.slug}` },
  ...d.sections.map((s) => ({ source: s.legacyPath, destination: `/departments/${d.slug}/${s.slug}` })),
  ...(d.journalPapersLegacyPath
    ? [{ source: d.journalPapersLegacyPath, destination: `/research/journal-papers/${d.slug}` }]
    : []),
]);

/** Old /pdf/... URLs. Only redirected once the file really exists in /public/documents. */
const documentRedirects: LegacyRedirect[] = documents
  .filter((d) => d.available)
  .map((d) => ({ source: d.legacyPath, destination: d.file }));

export const legacyRedirects: LegacyRedirect[] = [
  ...pageRedirects,
  ...departmentRedirects,
  ...documentRedirects,
];
