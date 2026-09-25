// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.

import type { GalleryImage } from "@/types";

export interface Gallery {
  id: string;
  title: string;
  images: GalleryImage[];
}

export const galleries: Gallery[] = [];
