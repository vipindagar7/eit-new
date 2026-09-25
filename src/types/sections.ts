/**
 * View models for the homepage sections: plain, serialisable shapes the server hands to Client Components.
 * Images arrive already checked against /public, so components never request a file that does not exist.
 */
import type { ResolvedImage } from "./index";

export interface CentreView {
  id: string;
  name: string;
  summary?: string;
  description?: string;
  href?: string;
  accent: string;
  image?: ResolvedImage;
}

export interface StoryView {
  id: string;
  name: string;
  batch?: string;
  company: string;
  role?: string;
  story?: string;
  photo?: ResolvedImage;
  accent: string;
}

export interface StatView {
  id: string;
  label: string;
  value: string;
  note?: string;
}

export interface RecruiterView {
  id: string;
  name: string;
  logo?: ResolvedImage;
}

export interface ProjectView {
  id: string;
  title: string;
  team: string[];
  year?: number;
  summary?: string;
  image?: ResolvedImage;
  url?: string;
  accent: string;
}

export interface EventView {
  id: string;
  title: string;
  day: string;
  month: string;
  year: string;
  venue?: string;
  summary?: string;
  image?: ResolvedImage;
  accent: string;
}

export interface NoticeView {
  id: string;
  title: string;
  dateLabel: string;
  href?: string;
  important?: boolean;
}

export interface ClubView {
  id: string;
  name: string;
  summary?: string;
  logo?: ResolvedImage;
  accent: string;
}

export interface EpisodeView {
  id: string;
  title: string;
  speakers: string[];
  dateLabel?: string;
  duration?: string;
  summary?: string;
  cover?: ResolvedImage;
  url?: string;
  accent: string;
}

export interface MomentView {
  id: string;
  title: string;
  caption?: string;
  image: ResolvedImage;
  accent: string;
}

export interface VoiceView {
  id: string;
  name: string;
  designation?: string;
  quote: string;
  photo?: ResolvedImage;
  accent: string;
}

export interface CelebrityView {
  id: string;
  name: string;
  role: string;
  category?: string;
  bio?: string;
  href?: string;
  photo?: ResolvedImage;
  accent: string;
}
