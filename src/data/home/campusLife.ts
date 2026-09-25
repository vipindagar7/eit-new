// Campus Life ("Beyond Classrooms") section.

import type { CallToAction, ImageAsset } from "@/types";

export interface CampusMoment {
  id: string;
  title: string;
  caption?: string;
  image: ImageAsset;
}

export const campusLifeSection = {
  eyebrow: "Campus Life",
  title: ["Beyond", "Classrooms"],
  description: "A vibrant campus life that inspires friendships, creativity and personal growth.",
  /** Handwritten phrase beside the photographs. */
  script: ["More", "Than", "A Campus"],
  /** Time between photograph changes, in milliseconds. */
  intervalMs: 4500,
  action: { label: "Explore Campus Life", href: "/campus-life" } as CallToAction,
};

/** Photographs for the collage. The collage shows five at a time and rotates through the rest. */
export const campusMoments: CampusMoment[] = [];
