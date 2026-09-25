// Events & Notifications section. Events and notices live in data/events/*.

import type { CallToAction } from "@/types";

export const eventsSection = {
  eyebrow: "Events & Notifications",
  title: ["What's happening", "at EIT"],
  description: "Upcoming events and the latest notices, in one place.",
  /** Time each event stays on screen, in milliseconds. */
  intervalMs: 6000,
  /** How often the notice list moves on by one item, in milliseconds. */
  noticeStepMs: 3500,
  eventsAction: { label: "All Events", href: "/events" } as CallToAction,
  noticesAction: { label: "All Circulars", href: "/academics/circulars" } as CallToAction,
  maxNotices: 6,
};

/** Ids from data/events/events.ts, in display order. Empty = show all upcoming. */
export const featuredEventIds: string[] = [];
