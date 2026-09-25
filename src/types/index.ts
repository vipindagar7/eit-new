/**
 * Shared types used across data files, layout components and (later) sections.
 * Domain-specific content types live next to their data in `src/data/**`.
 */

/* ---------- Assets ---------- */

export interface ImageAsset {
  /** Path under /public, e.g. "/images/campus/eit-campus-day.webp" */
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/** An image plus whether its file exists on disk, resolved on the server (see lib/content.ts). */
export interface ResolvedImage {
  src: string;
  alt: string;
  ready: boolean;
}

export interface VideoAsset {
  /** Path under /public, e.g. "/videos/hero/eit-campus-tour.mp4" */
  src: string;
  poster?: string;
}

/* ---------- Routing ---------- */

export type RouteGroup =
  | "home"
  | "about"
  | "academics"
  | "programs"
  | "departments"
  | "admissions"
  | "placements"
  | "research"
  | "campus"
  | "alumni"
  | "utility";

export interface RouteEntry {
  /** Canonical path, always starting with "/" and without a trailing slash (except "/"). */
  path: string;
  title: string;
  group: RouteGroup;
}

/* ---------- Navigation ---------- */

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavSection {
  /** Optional heading rendered above the links inside a dropdown / mobile group. */
  title?: string;
  links: NavLink[];
}

/** A top-level navigation entry: a plain link, or a link with a dropdown / accordion of sections. */
export interface NavItem {
  label: string;
  /** Destination (for groups: the group's landing page). */
  href: string;
  sections?: NavSection[];
}

/* ---------- Documents (PDFs) ---------- */

export type DocumentCategory =
  | "brochures"
  | "reports"
  | "certificates"
  | "approvals"
  | "calendars"
  | "magazines"
  | "notices"
  | "policies";

export interface SiteDocument {
  id: string;
  title: string;
  category: DocumentCategory;
  /** Path on the old website, exactly as listed in its sitemap. */
  legacyPath: string;
  /** Final public URL, e.g. "/documents/approvals/aicte-approval-2025-26.pdf". */
  file: string;
  /** Flip to true once the PDF has actually been copied into /public/documents. */
  available: boolean;
}

/* ---------- Shared content shapes ---------- */

export interface GalleryImage {
  image: ImageAsset;
  caption?: string;
  year?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  /** Job title for recruiters, programme for students. */
  designation?: string;
  organisation?: string;
  batch?: string;
  quote: string;
  photo?: ImageAsset;
}

export interface LeadershipMessage {
  id: string;
  name: string;
  designation: string;
  /** One string per paragraph. */
  message: string[];
  photo?: ImageAsset;
}

export interface CommitteeMember {
  name: string;
  role: string;
  designation?: string;
  contact?: string;
}

/** Memorandum of Understanding, used by both placements and research. */
export interface Mou {
  id: string;
  organisation: string;
  signedOn?: string;
  purpose?: string;
  /** id from data/site/documents.ts when a scanned copy exists. */
  documentId?: string;
  logo?: ImageAsset;
}

export interface CallToAction {
  label: string;
  href: string;
}
