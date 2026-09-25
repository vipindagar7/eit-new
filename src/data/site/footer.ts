import type { NavLink } from "@/types";
import { getRoute } from "./routes";

const link = (href: string, label?: string): NavLink => {
  const route = getRoute(href);
  if (!route) {
    throw new Error(`footer: "${href}" is not in the route registry (data/site/routes.ts)`);
  }
  return { href, label: label ?? route.title };
};

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: "Academics",
    links: [
      link("/programs"),
      link("/departments"),
      link("/centres"),
      link("/research"),
      link("/academics/calendar"),
      link("/academics/circulars"),
    ],
  },
  {
    title: "Admissions",
    links: [
      link("/admissions", "Admissions overview"),
      link("/admissions/procedure"),
      link("/admissions/fees-structure"),
      link("/admissions/scholarship"),
      link("/admissions/ipu-cet"),
      link("/admissions/brochure"),
    ],
  },
  {
    title: "Placements",
    links: [
      link("/placements", "Placements overview"),
      link("/placements/recruiters"),
      link("/placements/process"),
      link("/placements/brochure"),
      link("/placements/skill-development"),
    ],
  },
  {
    title: "Institute",
    links: [
      link("/about"),
      link("/about/why-eit"),
      link("/about/governing-body"),
      link("/about/approvals"),
      link("/about/iqac"),
      link("/about/mandatory-disclosure"),
      link("/careers"),
    ],
  },
  {
    title: "Student life",
    links: [
      link("/campus-life"),
      link("/clubs"),
      link("/events"),
      link("/student-work"),
      link("/podcasts"),
      link("/celebrities"),
      link("/alumni"),
    ],
  },
];

/** Compliance links shown in the bottom bar. */
export const legalLinks: NavLink[] = [
  link("/about/mandatory-disclosure"),
  link("/admissions/refund-policy"),
  link("/campus-life/anti-ragging"),
  link("/about/grievance-redressal"),
  link("/contact"),
];

export const getCopyright = (year: number) =>
  `© ${year} Echelon Institute of Technology, Faridabad. All rights reserved.`;
