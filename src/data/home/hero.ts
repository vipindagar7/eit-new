// Hero content. Edit copy, links and slides here — never inside components.
// Do not add statistics or claims that have not been verified by the institute.

import type { CallToAction } from "@/types";

/** Visual mood of a slide. The hero progresses through these as the carousel advances. */
export type TimeTheme = "morning" | "afternoon" | "evening" | "night";

export interface HeroSlide {
  id: string;
  timeTheme: TimeTheme;
  /** Short label for the slide index, e.g. "Academics". */
  label: string;
  /** Small caption in the bottom-left corner. */
  caption?: string;
  /** Path under /public. TODO: supply the real photograph (see public/images/hero/README.md). */
  image: string;
  imageAlt: string;
  /** Optional looping background video, path under /public. The image is used as poster and fallback. */
  video?: string;
  eyebrow?: string;
  /** Headline. Use "\n" to break it into lines. */
  title: string;
  description?: string;
  primaryAction?: CallToAction;
  secondaryAction?: CallToAction;
}

/** A slide plus what actually exists on disk, resolved on the server (see lib/assets.ts). */
export interface ResolvedHeroSlide extends HeroSlide {
  imageReady: boolean;
  videoReady: boolean;
}

export interface TimeThemeStyle {
  name: string;
  /** Pastel accent used for the progress bar, index dot and small details. */
  accent: string;
  /** Opacity (0–1) of the navy scrim over the photograph: behind the text, at the top/bottom edges. */
  scrim: { side: number; edge: number };
  /** Background shown when the photograph is not available. */
  fallback: string;
}

export const heroTimeThemes: Record<TimeTheme, TimeThemeStyle> = {
  morning: {
    name: "Morning",
    accent: "#F5ED8F",
    scrim: { side: 0.62, edge: 0.5 },
    fallback:
      "radial-gradient(90% 70% at 80% 105%, rgba(245,237,143,0.28) 0%, transparent 60%), linear-gradient(160deg, #2a5b7e 0%, #17324d 68%)",
  },
  afternoon: {
    name: "Afternoon",
    accent: "#CFE7EC",
    scrim: { side: 0.6, edge: 0.5 },
    fallback:
      "radial-gradient(90% 70% at 80% 105%, rgba(207,231,236,0.26) 0%, transparent 60%), linear-gradient(160deg, #245b78 0%, #17324d 70%)",
  },
  evening: {
    name: "Evening",
    accent: "#F3C4AA",
    scrim: { side: 0.66, edge: 0.55 },
    fallback:
      "radial-gradient(90% 70% at 80% 105%, rgba(243,196,170,0.3) 0%, transparent 60%), linear-gradient(160deg, #3b3a5e 0%, #17324d 70%)",
  },
  night: {
    name: "Night",
    accent: "#C8A5C9",
    scrim: { side: 0.72, edge: 0.6 },
    fallback:
      "radial-gradient(90% 70% at 80% 105%, rgba(200,165,201,0.22) 0%, transparent 60%), linear-gradient(160deg, #0f2135 0%, #0a1725 80%)",
  },
};

export const heroSettings = {
  /** Time each slide stays on screen while the carousel is playing. */
  intervalMs: 7000,
  /** Small vertical keyword list on the right of the hero (large screens only). */
  keywords: ["People", "Ideas", "Technology", "Impact"],
};

export const heroSlides: HeroSlide[] = [
  {
    id: "morning",
    timeTheme: "morning",
    label: "Home",
    caption: "The EIT campus in the morning",
    image: "/images/hero/eit-campus-morning.webp",
    imageAlt: "The Echelon Institute of Technology campus in the morning light",
    video: "/videos/hero/eit-campus-morning.mp4",
    eyebrow: "Echelon Institute of Technology, Faridabad",
    title: "Engineering Futures.\nCreating Impact.",
    description: "Engineering, computer applications and management programs at EIT Faridabad.",
    primaryAction: { label: "Explore EIT", href: "/about" },
    secondaryAction: { label: "Apply Now", href: "/admissions" },
  },
  {
    id: "afternoon",
    timeTheme: "afternoon",
    label: "Academics",
    caption: "Academic blocks in the afternoon",
    image: "/images/hero/eit-campus-afternoon.webp",
    imageAlt: "Students and academic blocks at the EIT campus in the afternoon",
    eyebrow: "Academics",
    title: "Where Ideas Become\nReal-World Impact.",
    description: "Six programs across engineering, computer applications and management.",
    primaryAction: { label: "View Programs", href: "/programs" },
    secondaryAction: { label: "Explore Departments", href: "/departments" },
  },
  {
    id: "evening",
    timeTheme: "evening",
    label: "Campus",
    caption: "Campus life in the evening",
    image: "/images/hero/eit-campus-evening.webp",
    imageAlt: "The EIT campus at sunset",
    eyebrow: "Campus Life",
    title: "Life Beyond\nThe Classroom.",
    description: "Clubs, events and student work that make the campus more than lecture halls.",
    primaryAction: { label: "Explore Campus Life", href: "/campus-life" },
    secondaryAction: { label: "Upcoming Events", href: "/events/upcoming" },
  },
  {
    id: "night",
    timeTheme: "night",
    label: "Placements",
    caption: "The campus at night",
    image: "/images/hero/eit-campus-night.webp",
    imageAlt: "The EIT campus lit up at night",
    eyebrow: "Placements",
    title: "Ready For\nWhat Comes Next.",
    description: "Training, recruiters and career support in one place.",
    primaryAction: { label: "Explore Placements", href: "/placements" },
    secondaryAction: { label: "Placement Brochure", href: "/placements/brochure" },
  },
];
