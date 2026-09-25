// "Why EIT" section. Every point links to a page that already exists on the site,
// and none of them states a number or an achievement that has not been verified.

import type { CallToAction } from "@/types";

export interface WhyEitPoint {
  id: string;
  title: string;
  body: string;
  href: string;
  /** Pastel accent (hex) from the EIT palette. */
  accent: string;
}

export const whyEitSection = {
  eyebrow: "Why EIT",
  title: ["Reasons to", "choose EIT"],
  description: "What you can rely on when you study here, and where to read more about each of them.",
  action: { label: "About EIT", href: "/about" } as CallToAction,
};

export const whyEitPoints: WhyEitPoint[] = [
  {
    id: "recognised",
    title: "Recognised and approved",
    body: "AICTE approved and affiliated to GGSIPU, with approval letters and quality policies published openly.",
    href: "/about/approvals",
    accent: "#CFE7EC",
  },
  {
    id: "departments",
    title: "Seven departments",
    body: "Engineering, computer applications, management and applied sciences, each with its own faculty and labs.",
    href: "/departments",
    accent: "#D3E9DC",
  },
  {
    id: "placements",
    title: "A placement cell that works with you",
    body: "Training, recruiter engagement, job fairs and HR conclaves that prepare students for their first job.",
    href: "/placements",
    accent: "#F3C4AA",
  },
  {
    id: "industry",
    title: "Learning from industry",
    body: "Industrial visits and expert lectures that connect the syllabus to how work is really done.",
    href: "/placements/industrial-visits",
    accent: "#F5ED8F",
  },
  {
    id: "innovation",
    title: "Room to innovate",
    body: "An innovation council, an entrepreneurship cell and IPR support for student and faculty ideas.",
    href: "/research",
    accent: "#C8A5C9",
  },
  {
    id: "campus",
    title: "A campus that does more",
    body: "Clubs, professional societies, events and podcasts that build skills beyond the syllabus.",
    href: "/campus-life",
    accent: "#E79BB2",
  },
];
