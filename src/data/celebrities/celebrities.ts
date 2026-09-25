// Celebrity Corner: notable alumni, chief guests and speakers.
// Intentionally empty until real people (with their permission and photographs) are supplied.

import type { ImageAsset } from "@/types";

export interface Celebrity {
  id: string;
  name: string;
  /** One line under the name, e.g. "Alumnus, Class of 2015" or "Chief Guest, Annual Fest". */
  role: string;
  /** Small label, e.g. "Alumni", "Chief Guest", "Speaker". */
  category?: string;
  /** Longer text shown when the card is expanded. */
  bio?: string;
  /** Close-up portrait, face centred. TODO: see assets.md for size and path. */
  photo?: ImageAsset;
  /** Optional link, e.g. to the event or interview page. */
  href?: string;
}

export const celebrities: Celebrity[] = [];
