// Student Work section. Projects live in data/students/projects.ts.

import type { SlideshowSection } from "./centres";

export const studentWorkSection: SlideshowSection = {
  eyebrow: "Student Work",
  title: ["Ideas students", "have built"],
  description: "Projects from classrooms, labs and clubs, made by the people who study here.",
  intervalMs: 5500,
  action: { label: "See All Student Work", href: "/student-work" },
};

/** Ids from data/students/projects.ts, in display order. Empty = show all. */
export const featuredProjectIds: string[] = [];
