/**
 * Departments and their sub-pages.
 *
 * Every department on the old site had a landing page plus a set of sub-pages
 * (`cse-faculty.php`, `ece-dqac.php`, …). They now live under:
 *   /departments/<department>
 *   /departments/<department>/<section>
 *
 * `legacyPath` keeps the old URL so it can be redirected (see data/legacy/redirects.ts).
 *
 * NOTE: names for DCA, HAS and DMS are expanded from their URL codes and should be
 * confirmed by the institute before they are shown publicly.
 */

export interface DepartmentSection {
  slug: string;
  title: string;
  legacyPath: string;
}

export interface Department {
  slug: string;
  name: string;
  shortName: string;
  legacyPath: string;
  sections: DepartmentSection[];
  /** Old `csjp.php`-style page listing the department's journal papers. */
  journalPapersLegacyPath?: string;
}

const sectionTitles = {
  "hod-message": "HoD's Message",
  vision: "Vision",
  peo: "Program Educational Objectives (PEO)",
  pos: "Program Outcomes (PO)",
  faculty: "Faculty",
  dqac: "DQAC",
  labs: "Laboratories",
  magazines: "Magazines",
  newsletter: "Newsletter",
  "teaching-learning-process": "Teaching-Learning Process",
  "innovation-in-teaching-learning": "Innovation in Teaching and Learning",
  "placement-data": "Placement Data",
} as const;

type SectionSlug = keyof typeof sectionTitles;

const section = (slug: SectionSlug, legacyFile: string): DepartmentSection => ({
  slug,
  title: sectionTitles[slug],
  legacyPath: `/${legacyFile}`,
});

export const departments: Department[] = [
  {
    slug: "computer-science-engineering",
    name: "Computer Science and Engineering",
    shortName: "CSE",
    legacyPath: "/computer-science-engineering.php",
    journalPapersLegacyPath: "/csjp.php",
    sections: [
      section("hod-message", "cse-hod-messege.php"), // sic: legacy URL is misspelled
      section("peo", "cse-peo.php"),
      section("faculty", "cse-faculty.php"),
      section("dqac", "cse-dqac.php"),
      section("labs", "cse-department-lab.php"),
      section("magazines", "cse-magazines.php"),
      section("newsletter", "cse-newsletter.php"),
      section("teaching-learning-process", "cse-teaching-learning-process.php"),
      section("innovation-in-teaching-learning", "cse-innovation-teaching-learning.php"),
      section("placement-data", "cse-placement-data.php"),
    ],
  },
  {
    slug: "dca",
    name: "Department of Computer Applications",
    shortName: "DCA",
    legacyPath: "/dca-department.php",
    journalPapersLegacyPath: "/dcajp.php",
    sections: [
      section("peo", "dca-peo.php"),
      section("faculty", "dca-faculty.php"),
      section("labs", "dca-department-lab.php"),
      section("newsletter", "dca-newsletter.php"),
    ],
  },
  {
    slug: "has",
    name: "Humanities and Applied Sciences",
    shortName: "HAS",
    legacyPath: "/has-department.php",
    sections: [
      section("pos", "has-pos.php"),
      section("faculty", "has-faculty.php"),
      section("dqac", "has-dqac.php"),
      section("labs", "has-department-lab.php"),
      section("newsletter", "has-newsletter.php"),
    ],
  },
  {
    slug: "dms",
    name: "Department of Management Studies",
    shortName: "DMS",
    legacyPath: "/dms-department.php",
    sections: [
      section("vision", "dms-vision.php"),
      section("peo", "dms-peo.php"),
      section("faculty", "dms-faculty.php"),
      section("dqac", "dms-dqac.php"),
      section("labs", "dms-department-lab.php"),
      section("newsletter", "dms-newsletter.php"),
    ],
  },
  {
    slug: "mechanical-engineering",
    name: "Mechanical Engineering",
    shortName: "ME",
    legacyPath: "/mechanical-engineering.php",
    journalPapersLegacyPath: "/mejp.php",
    sections: [
      section("peo", "me-peo.php"),
      section("faculty", "me-faculty.php"),
      section("labs", "me-department-lab.php"),
      section("newsletter", "me-newsletter.php"),
    ],
  },
  {
    slug: "electronics-communication-engineering",
    name: "Electronics and Communication Engineering",
    shortName: "ECE",
    legacyPath: "/electronics-communication-engineering.php",
    journalPapersLegacyPath: "/ecjp.php",
    sections: [
      section("peo", "ece-peo.php"),
      section("faculty", "ece-faculty.php"),
      section("dqac", "ece-dqac.php"),
      section("labs", "ece-department-lab.php"),
      section("newsletter", "ece-newsletter.php"),
    ],
  },
  {
    slug: "civil-engineering",
    name: "Civil Engineering",
    shortName: "CE",
    legacyPath: "/civil-engineering.php",
    journalPapersLegacyPath: "/cejp.php",
    sections: [
      section("peo", "ce-peo.php"),
      section("faculty", "ce-faculty.php"),
      section("labs", "ce-department-lab.php"),
      section("newsletter", "ce-newsletter.php"),
    ],
  },
];

export const getDepartment = (slug: string) => departments.find((d) => d.slug === slug);

export const journalPaperDepartments = departments.filter((d) => d.journalPapersLegacyPath);
