/**
 * PDF registry — every PDF that was linked from the old website.
 *
 * Files are NOT copied yet. To publish one:
 *   1. Download it from the old site and save it at `file` (under /public/documents/...).
 *   2. Flip `available` to true.
 * Once available, the old `/pdf/...` URL is redirected automatically
 * (see data/legacy/redirects.ts).
 */
import type { SiteDocument } from "../../types";

const doc = (
  id: string,
  title: string,
  category: SiteDocument["category"],
  legacyPath: string,
  fileName: string,
): SiteDocument => ({
  id,
  title,
  category,
  legacyPath,
  file: `/documents/${category}/${fileName}`,
  available: false,
});

export const documents: SiteDocument[] = [
  // Brochures
  doc("admission-brochure-ug-2025-26", "Admission Brochure, UG 2025-26", "brochures", "/pdf/Admission-Brochure-ug-2025-26.pdf", "admission-brochure-ug-2025-26.pdf"),
  doc("admission-brochure-pg-2025-26", "Admission Brochure, PG 2025-26", "brochures", "/pdf/Admission-Brochure-pg-2025-26.pdf", "admission-brochure-pg-2025-26.pdf"),

  // Magazine
  doc("eit-magazine-2025-26", "EIT Magazine 2025-26", "magazines", "/pdf/Eit-Magazine-2025-26.pdf", "eit-magazine-2025-26.pdf"),

  // Policies
  doc("service-rule-book", "Service Rule Book", "policies", "/pdf/Service-Rule-Book.pdf", "service-rule-book.pdf"),

  // Notices
  doc("special-chance-for-exam", "Special Chance for Exam", "notices", "/pdf/Special-Chancefor-Exam.pdf", "special-chance-for-exam.pdf"),
  doc("commencement-even-sem-2025-26", "Commencement of Even Semester 2025-26 Classes", "notices", "/pdf/Commencememt-of-Even-Sem-2025-26-Classes.pdf", "commencement-of-even-sem-2025-26-classes.pdf"),
  doc("fee-notice", "Fee Notice", "notices", "/pdf/Fee-for-Notice.pdf", "fee-notice.pdf"),

  // Approvals, affiliations and accreditation
  doc("approval-letter-2025-26", "Approval Letter 2025-26", "approvals", "/pdf/approval/approval-letter-2025-26.pdf", "approval-letter-2025-26.pdf"),
  doc("approval-letter-2024-25", "Approval Letter 2024-25", "approvals", "/pdf/approval/approval-letter-2024-25.pdf", "approval-letter-2024-25.pdf"),
  doc("approval-letter-2023-24", "Approval Letter 2023-24", "approvals", "/pdf/approval/approval-letter-2023-24.pdf", "approval-letter-2023-24.pdf"),
  doc("approval-letter-2022-23", "Approval Letter 2022-23", "approvals", "/pdf/approval/approval-letter-2022-23.pdf", "approval-letter-2022-23.pdf"),
  doc("approval-letter-2020-21", "Approval Letter 2020-21", "approvals", "/pdf/approval/approval-letter-2020-21.pdf", "approval-letter-2020-21.pdf"),
  doc("approval-letter-2019-20", "Approval Letter 2019-20", "approvals", "/pdf/approval/approval-letter-2019-20.pdf", "approval-letter-2019-20.pdf"),
  doc("approval-letter-2018-19", "Approval Letter 2018-19", "approvals", "/pdf/approval/approval-letter-2018-19.pdf", "approval-letter-2018-19.pdf"),
  doc("affiliation-letter-2024", "Affiliation Letter 2024", "approvals", "/pdf/approval/EIT%20Affiliation%20Letter%202024.pdf", "affiliation-letter-2024.pdf"),
  doc("affiliation-letter-2023", "Affiliation Letter 2023", "approvals", "/pdf/approval/EIT%20Affiliation%20Letter%202023.pdf", "affiliation-letter-2023.pdf"),
  doc("affiliation-letter-2022", "Affiliation Letter 2022", "approvals", "/pdf/approval/EIT%20Affiliation%20Letter%202022.pdf", "affiliation-letter-2022.pdf"),
  doc("affiliation-letter-2021-22", "Affiliation Letter 2021-22", "approvals", "/pdf/approval/Affliation%20letter%202021-22.pdf", "affiliation-letter-2021-22.pdf"),
  doc("affiliation-letter-2018", "Affiliation Letter 2018", "approvals", "/pdf/approval/Affiliation%20Letter%202018.pdf", "affiliation-letter-2018.pdf"),
  doc("nba-letter", "NBA Letter", "approvals", "/pdf/approval/NBA-Letter.pdf", "nba-letter.pdf"),

  // Academic calendars
  doc("academic-calendar-odd-sem-2025-26", "Academic Calendar, Odd Semester 2025-26", "calendars", "/pdf/academic-calendar/Academic%20Calendar%20Odd%20Sem%202025-26.pdf", "academic-calendar-odd-sem-2025-26.pdf"),
  doc("academic-calendar-even-sem-jcbust-2025", "Academic Calendar, Even Semester (JCBUST) 2025", "calendars", "/pdf/academic-calendar/Academic%20Calendar%20even%20sem%20JCBUST%202025%20Version-2.pdf", "academic-calendar-even-sem-jcbust-2025.pdf"),
];
