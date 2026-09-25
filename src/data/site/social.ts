/**
 * EIT's social profiles. Fill in the real URLs; an empty list hides every social icon on the site
 * (the side rail, the footer and the menu). Nothing here is guessed.
 */

export type SocialPlatform = "facebook" | "instagram" | "linkedin" | "youtube" | "x";

export interface SocialLink {
  platform: SocialPlatform;
  href: string;
}

export const socialLabels: Record<SocialPlatform, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  x: "X",
};

// Example: { platform: "instagram", href: "https://www.instagram.com/your-handle" }
export const socialLinks: SocialLink[] = [];
