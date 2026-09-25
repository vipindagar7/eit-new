/**
 * Navigation data.
 *
 *  - mainNav : the desktop bar (Home, About, Academics, Centres, Placements, Campus Life, Events).
 *              Items with `sections` open a hover dropdown.
 *  - menuNav : the full site menu shown in the drawer (mobile navbar, and the desktop menu icon).
 *              Every group of pages is reachable from it.
 *
 * Labels come from the route registry unless overridden, and a link to a route that
 * does not exist fails the build immediately.
 */
import type { NavItem, NavLink, NavSection } from "@/types";
import { departments } from "@/data/departments/departments";
import { getRoute } from "./routes";

const link = (href: string, label?: string): NavLink => {
  const route = getRoute(href);
  if (!route) {
    throw new Error(`navigation: "${href}" is not in the route registry (data/site/routes.ts)`);
  }
  return { href, label: label ?? route.title };
};

/* ---------- Shared sections ---------- */

const aboutSections: NavSection[] = [
  {
    title: "Leadership",
    links: [link("/about/chairman-message"), link("/about/director-message"), link("/about/governing-body")],
  },
  {
    title: "Why EIT",
    links: [link("/about/why-eit")],
  },
  {
    title: "Recognition",
    links: [
      link("/about/approvals"),
      link("/about/iqac"),
      link("/about/nba-naac-policy"),
      link("/about/mandatory-disclosure"),
    ],
  },
  {
    title: "Committees",
    links: [
      link("/about/grievance-redressal"),
      link("/about/internal-committee-women-cell"),
      link("/about/sc-st-cell"),
    ],
  },
];

const programsSection: NavSection = {
  title: "Programs",
  links: [
    link("/programs", "All programs"),
    link("/programs/btech"),
    link("/programs/mtech"),
    link("/programs/bca"),
    link("/programs/mca"),
    link("/programs/bba"),
    link("/programs/mba"),
  ],
};

const departmentsSection: NavSection = {
  title: "Departments",
  links: departments.map((d) => link(`/departments/${d.slug}`, d.name)),
};

const academicResources: NavSection = {
  title: "Resources",
  links: [
    link("/departments", "All departments"),
    link("/academics/calendar"),
    link("/academics/circulars"),
    link("/campus-life/library"),
  ],
};

const researchSections: NavSection[] = [
  {
    title: "Innovation",
    links: [
      link("/research/r-and-d-committee"),
      link("/research/iic"),
      link("/research/edc"),
      link("/research/ipr"),
    ],
  },
  {
    title: "Publications",
    links: [
      link("/research/journal-papers"),
      link("/research/conference-papers"),
      link("/research/books"),
      link("/research/patents"),
    ],
  },
  { title: "Collaboration", links: [link("/research/mous"), link("/research/fdp")] },
];

/** Compact research column used inside the Academics dropdown. */
const researchInAcademics: NavSection = {
  title: "Research",
  links: [
    link("/research", "Research overview"),
    link("/research/journal-papers"),
    link("/research/patents"),
    link("/research/iic"),
  ],
};

const admissionsSections: NavSection[] = [
  {
    title: "How to apply",
    links: [
      link("/admissions/procedure"),
      link("/admissions/document-checklist"),
      link("/admissions/ipu-cet"),
      link("/admissions/brochure"),
    ],
  },
  {
    title: "Fees and support",
    links: [
      link("/admissions/fees-structure"),
      link("/admissions/scholarship"),
      link("/admissions/fee-reimbursement"),
      link("/admissions/refund-policy"),
    ],
  },
];

const placementsSections: NavSection[] = [
  {
    title: "Placement cell",
    links: [
      link("/placements/brochure"),
      link("/placements/process"),
      link("/placements/policy"),
      link("/placements/message-hod-tp", "HoD and T&P message"),
    ],
  },
  {
    title: "Recruiters and students",
    links: [
      link("/placements/recruiters"),
      link("/placements/recruiters-speak"),
      link("/placements/students-speak"),
      link("/placements/highest-performers"),
      link("/placements/mous"),
    ],
  },
  {
    title: "Training and exposure",
    links: [
      link("/placements/skill-development"),
      link("/placements/industrial-visits"),
      link("/placements/expert-lectures"),
      link("/placements/hr-conclave"),
      link("/placements/job-fair"),
      link("/placements/gallery"),
    ],
  },
];

const campusSections: NavSection[] = [
  {
    title: "Student life",
    links: [
      link("/student-work"),
      link("/podcasts"),
      link("/celebrities"),
      link("/campus-life/library"),
      link("/campus-life/anti-ragging"),
    ],
  },
  {
    title: "Alumni",
    links: [link("/alumni")],
  },
];

const eventsSections: NavSection[] = [
  {
    title: "Events",
    links: [link("/events/upcoming")],
  },
  {
    title: "Clubs and societies",
    links: [link("/clubs"), link("/clubs/professional-societies")],
  },
];

/* ---------- Desktop bar ---------- */

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about", sections: aboutSections },
  {
    label: "Academics",
    href: "/academics",
    sections: [programsSection, departmentsSection, researchInAcademics, academicResources],
  },
  { label: "Centres", href: "/centres" },
  { label: "Placements", href: "/placements", sections: placementsSections },
  { label: "Campus Life", href: "/campus-life", sections: campusSections },
  { label: "Events", href: "/events", sections: eventsSections },
];

/* ---------- Full menu (drawer) ---------- */

export const menuNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about", sections: aboutSections },
  {
    label: "Academics",
    href: "/academics",
    sections: [programsSection, departmentsSection, academicResources],
  },
  { label: "Centres", href: "/centres" },
  { label: "Admissions", href: "/admissions", sections: admissionsSections },
  { label: "Placements", href: "/placements", sections: placementsSections },
  { label: "Research", href: "/research", sections: researchSections },
  { label: "Campus Life", href: "/campus-life", sections: campusSections },
  { label: "Events", href: "/events", sections: eventsSections },
  { label: "Contact", href: "/contact" },
];

/** The call-to-action shown in the navbar and at the end of the drawer. */
export const headerCta: NavLink = link("/admissions", "Apply Now");

/** Compliance shortcuts listed at the bottom of the drawer. */
export const utilityNav: NavLink[] = [
  link("/academics/circulars"),
  link("/careers"),
  link("/about/mandatory-disclosure"),
  link("/campus-life/anti-ragging"),
];

/** Shown in the search dialog before the visitor types anything. */
export const searchSuggestions: NavLink[] = [
  link("/programs"),
  link("/admissions"),
  link("/placements"),
  link("/academics/calendar"),
  link("/academics/circulars"),
  link("/alumni"),
  link("/contact"),
];
