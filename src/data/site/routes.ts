/**
 * Route registry — the single source of truth for every public URL.
 *
 * Used by: Coming Soon titles, page metadata, breadcrumbs, sitemap.xml and the
 * verification script. When a real page ships, keep its entry here.
 *
 * Static routes are listed by hand. Department pages and per-department journal
 * paper pages are generated from data/departments/departments.ts.
 */
import type { RouteEntry, RouteGroup } from "@/types";
import { departments, journalPaperDepartments } from "@/data/departments/departments";

const r = (path: string, title: string, group: RouteGroup): RouteEntry => ({ path, title, group });

const staticRoutes: RouteEntry[] = [
  r("/", "Home", "home"),

  // About & governance
  r("/about", "About EIT", "about"),
  r("/about/chairman-message", "Chairman's Message", "about"),
  r("/about/director-message", "Director's Message", "about"),
  r("/about/governing-body", "Governing Body", "about"),
  r("/about/approvals", "Approvals and Affiliations", "about"),
  r("/about/iqac", "IQAC", "about"),
  r("/about/nba-naac-policy", "NBA and NAAC Policy", "about"),
  r("/about/mandatory-disclosure", "Mandatory Disclosure", "about"),
  r("/about/grievance-redressal", "Grievance Redressal Committee", "about"),
  r("/about/internal-committee-women-cell", "Internal Committee and Women Cell", "about"),
  r("/about/sc-st-cell", "SC/ST Cell", "about"),
  r("/about/why-eit", "Why EIT", "about"),

  // Academics
  r("/academics", "Academics", "academics"),
  r("/academics/calendar", "Academic Calendar", "academics"),
  r("/academics/circulars", "Circulars", "academics"),
  r("/centres", "Centres", "academics"),

  // Programs
  r("/programs", "Programs", "programs"),
  r("/programs/btech", "B.Tech", "programs"),
  r("/programs/mtech", "M.Tech", "programs"),
  r("/programs/bca", "BCA", "programs"),
  r("/programs/mca", "MCA", "programs"),
  r("/programs/bba", "BBA", "programs"),
  r("/programs/mba", "MBA", "programs"),

  // Departments hub (individual departments are generated below)
  r("/departments", "Departments", "departments"),

  // Admissions
  r("/admissions", "Admissions", "admissions"),
  r("/admissions/procedure", "Admission Procedure", "admissions"),
  r("/admissions/document-checklist", "Document Checklist", "admissions"),
  r("/admissions/fees-structure", "Fee Structure", "admissions"),
  r("/admissions/fee-reimbursement", "Fee Reimbursement", "admissions"),
  r("/admissions/scholarship", "Scholarships", "admissions"),
  r("/admissions/refund-policy", "Refund Policy", "admissions"),
  r("/admissions/ipu-cet", "IPU CET", "admissions"),
  r("/admissions/brochure", "Admission Brochure", "admissions"),

  // Placements & training
  r("/placements", "Placements", "placements"),
  r("/placements/brochure", "Placement Brochure", "placements"),
  r("/placements/message-hod-tp", "Message from HoD and Training & Placement", "placements"),
  r("/placements/policy", "Placement Policy", "placements"),
  r("/placements/process", "Placement Process", "placements"),
  r("/placements/students-speak", "Students Speak", "placements"),
  r("/placements/highest-performers", "Highest Performers", "placements"),
  r("/placements/gallery", "Placement Gallery", "placements"),
  r("/placements/recruiters", "Recruiters", "placements"),
  r("/placements/recruiters-speak", "Recruiters Speak", "placements"),
  r("/placements/mous", "Placement MOUs", "placements"),
  r("/placements/industrial-visits", "Industrial Visits", "placements"),
  r("/placements/expert-lectures", "Industry Expert Lectures", "placements"),
  r("/placements/hr-conclave", "HR Conclave", "placements"),
  r("/placements/job-fair", "Job Fair", "placements"),
  r("/placements/skill-development", "Skill Development", "placements"),

  // Research & innovation
  r("/research", "Research and Innovation", "research"),
  r("/research/r-and-d-committee", "R&D Committee", "research"),
  r("/research/journal-papers", "Journal Papers", "research"),
  r("/research/conference-papers", "Conference Papers", "research"),
  r("/research/books", "Books and Book Chapters", "research"),
  r("/research/patents", "Patents", "research"),
  r("/research/mous", "MOUs", "research"),
  r("/research/fdp", "Faculty Development Programs", "research"),
  r("/research/iic", "Institution's Innovation Council", "research"),
  r("/research/edc", "Entrepreneurship Development Cell", "research"),
  r("/research/ipr", "IPR Cell", "research"),

  // Campus & student life
  r("/campus-life", "Campus Life", "campus"),
  r("/campus-life/library", "Library", "campus"),
  r("/campus-life/anti-ragging", "Anti-Ragging", "campus"),
  r("/events", "Events", "campus"),
  r("/events/upcoming", "Upcoming Events", "campus"),
  r("/clubs", "Student Clubs", "campus"),
  r("/clubs/professional-societies", "Professional Societies", "campus"),
  r("/student-work", "Student Work", "campus"),
  r("/podcasts", "Podcasts", "campus"),
  r("/celebrities", "Celebrity Corner", "campus"),

  // Alumni
  r("/alumni", "Alumni Network", "alumni"),

  // Utility
  r("/careers", "Careers at EIT", "utility"),
  r("/contact", "Contact", "utility"),
];

const departmentRoutes: RouteEntry[] = departments.flatMap((d) => [
  r(`/departments/${d.slug}`, d.name, "departments"),
  ...d.sections.map((s) => r(`/departments/${d.slug}/${s.slug}`, `${d.shortName}: ${s.title}`, "departments")),
]);

const journalPaperRoutes: RouteEntry[] = journalPaperDepartments.map((d) =>
  r(`/research/journal-papers/${d.slug}`, `${d.shortName} Journal Papers`, "research"),
);

export const allRoutes: RouteEntry[] = [...staticRoutes, ...departmentRoutes, ...journalPaperRoutes];

const routeMap = new Map(allRoutes.map((route) => [route.path, route]));

export const getRoute = (path: string) => routeMap.get(path);

export const hasRoute = (path: string) => routeMap.has(path);

/** Every route in a group, in registry order, optionally excluding some paths (e.g. the group's own hub page). */
export const getRoutesInGroup = (group: RouteGroup, exclude: string[] = []) =>
  allRoutes.filter((route) => route.group === group && !exclude.includes(route.path));
