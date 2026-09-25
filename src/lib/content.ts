/**
 * Server-only: turns the data files into view models for the homepage sections.
 *
 *  - Real data wins. If a real list is empty and NEXT_PUBLIC_SAMPLE_CONTENT is on, clearly labelled
 *    SAMPLE entries are used instead so the layout can be reviewed. Otherwise the list stays empty and the
 *    section hides itself.
 *  - Every image is checked against /public here, so components never request a file that does not exist.
 *
 * Do not import this file from a Client Component.
 */
import { existsSync } from "node:fs";
import path from "node:path";
import type { ImageAsset, ResolvedImage } from "@/types";
import type {
  CelebrityView, CentreView, ClubView, EpisodeView, EventView, MomentView, NoticeView, ProjectView, RecruiterView,
  StatView, StoryView, VoiceView,
} from "@/types/sections";
import { SAMPLE_CONTENT } from "./constants";
import { centres } from "@/data/centres/centres";
import { featuredCentreIds } from "@/data/home/centres";
import { featuredEventIds, eventsSection } from "@/data/home/events";
import { featuredClubIds } from "@/data/home/clubs";
import { featuredEpisodeIds } from "@/data/home/podcasts";
import { featuredProjectIds } from "@/data/home/studentWork";
import { featuredRecruiterIds, featuredStatisticIds } from "@/data/home/placements";
import { featuredStoryIds } from "@/data/home/stories";
import { campusMoments } from "@/data/home/campusLife";
import { placementStatistics } from "@/data/placements/statistics";
import { recruiters } from "@/data/placements/recruiters";
import { successStories } from "@/data/placements/successStories";
import { placementProcess } from "@/data/placements/process";
import { placementPolicy } from "@/data/placements/policy";
import { highestPerformers } from "@/data/placements/achievements";
import { placementGallery } from "@/data/placements/gallery";
import { studentProjects } from "@/data/students/projects";
import { studentTestimonials } from "@/data/students/testimonials";
import { events } from "@/data/events/events";
import { announcements } from "@/data/events/announcements";
import { clubs } from "@/data/clubs/clubs";
import { professionalSocieties } from "@/data/clubs/societies";
import { celebrities } from "@/data/celebrities/celebrities";
import { featuredCelebrityIds } from "@/data/home/celebrities";
import { episodes } from "@/data/podcasts/episodes";
import { speakers } from "@/data/podcasts/speakers";
import { leadershipMessages } from "@/data/about/messages";
import {
  sampleAnnouncements, sampleCelebrities, sampleCentres, sampleClubs, sampleEpisodes, sampleEvents, sampleHighestPerformers,
  sampleLeadership, sampleMoments, samplePlacementGallery, samplePlacementPolicy, samplePlacementProcess, sampleProjects,
  sampleRecruiters, sampleSocial, sampleSocieties, sampleSpeakers, sampleStatistics, sampleStories, sampleTestimonials,
} from "@/data/samples";
import { socialLinks } from "@/data/site/social";

/** The EIT pastels, used in turn as accents when a data entry does not name one. */
const PASTELS = ["#CFE7EC", "#D3E9DC", "#F3C4AA", "#C8A5C9", "#F5ED8F", "#E79BB2", "#DDAFBD", "#E4D3BC"];
const accentAt = (index: number, own?: string) => own ?? PASTELS[index % PASTELS.length];

const exists = (publicPath: string) => existsSync(path.join(process.cwd(), "public", publicPath));

function resolveImage(image?: ImageAsset): ResolvedImage | undefined {
  return image ? { src: image.src, alt: image.alt, ready: exists(image.src) } : undefined;
}

/** Real list, else the sample list when the review flag is on, else empty. */
function pick<T>(real: T[], sample: T[]): T[] {
  return real.length > 0 ? real : SAMPLE_CONTENT ? sample : [];
}

/** Applies an optional "featured ids" ordering. An empty id list means keep everything, in data order. */
function featured<T extends { id: string }>(items: T[], ids: string[]): T[] {
  if (ids.length === 0) return items;
  return ids.map((id) => items.find((item) => item.id === id)).filter((item): item is T => Boolean(item));
}

const dateParts = (iso: string) => {
  const date = new Date(`${iso}T00:00:00Z`);
  const format = (options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-IN", { timeZone: "UTC", ...options }).format(date);
  return {
    day: format({ day: "2-digit" }),
    month: format({ month: "short" }),
    year: format({ year: "numeric" }),
    label: format({ day: "numeric", month: "short", year: "numeric" }),
  };
};

export function getCentres(): CentreView[] {
  return featured(pick(centres, sampleCentres), featuredCentreIds).map((centre, index) => ({
    id: centre.id,
    name: centre.name,
    summary: centre.summary,
    description: centre.description,
    href: centre.href,
    accent: accentAt(index, centre.accent),
    image: resolveImage(centre.image),
  }));
}

export function getStories(): StoryView[] {
  return pick(successStories, sampleStories).map((story, index) => ({
    id: story.id,
    name: story.studentName,
    batch: story.batch,
    company: story.company,
    role: story.role,
    story: story.story,
    photo: resolveImage(story.photo),
    accent: accentAt(index),
  }));
}

export function getPlacementStats(): StatView[] {
  return featured(pick(placementStatistics, sampleStatistics), featuredStatisticIds).map((stat) => ({
    id: stat.id,
    label: stat.label,
    value: stat.value,
    note: stat.academicYear ?? stat.note,
  }));
}

export function getRecruiters(): RecruiterView[] {
  return featured(pick(recruiters, sampleRecruiters), featuredRecruiterIds).map((recruiter) => ({
    id: recruiter.id,
    name: recruiter.name,
    logo: resolveImage(recruiter.logo),
  }));
}

export function getProjects(): ProjectView[] {
  return featured(pick(studentProjects, sampleProjects), featuredProjectIds).map((project, index) => ({
    id: project.id,
    title: project.title,
    team: project.team,
    year: project.year,
    summary: project.summary,
    image: resolveImage(project.images?.[0]),
    url: project.url,
    accent: accentAt(index),
  }));
}

export function getEvents(limit = 5): EventView[] {
  const list = featured(pick(events, sampleEvents), featuredEventIds);
  const upcoming = list.filter((event) => event.status === "upcoming");
  return (upcoming.length > 0 ? upcoming : list)
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit)
    .map((event, index) => {
      const parts = dateParts(event.date);
      return {
        id: event.id,
        title: event.title,
        day: parts.day,
        month: parts.month,
        year: parts.year,
        venue: event.venue,
        summary: event.summary,
        image: resolveImage(event.image),
        accent: accentAt(index),
      };
    });
}

export function getNotices(limit = eventsSection.maxNotices): NoticeView[] {
  return pick(announcements, sampleAnnouncements)
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit)
    .map((notice) => ({
      id: notice.id,
      title: notice.title,
      dateLabel: dateParts(notice.date).label,
      href: notice.href,
      important: notice.important,
    }));
}

export function getClubs(): ClubView[] {
  return featured(pick(clubs, sampleClubs), featuredClubIds).map((club, index) => ({
    id: club.id,
    name: club.name,
    summary: club.summary,
    logo: resolveImage(club.logo),
    accent: accentAt(index),
  }));
}

export function getEpisodes(): EpisodeView[] {
  const people = speakers.length > 0 ? speakers : SAMPLE_CONTENT ? sampleSpeakers : [];
  return featured(pick(episodes, sampleEpisodes), featuredEpisodeIds).map((episode, index) => ({
    id: episode.id,
    title: episode.title,
    speakers: episode.speakerIds
      .map((id) => people.find((person) => person.id === id))
      .filter((person): person is NonNullable<typeof person> => Boolean(person))
      .map((person) => person.name),
    dateLabel: episode.date ? dateParts(episode.date).label : undefined,
    duration: episode.duration,
    summary: episode.summary,
    cover: resolveImage(episode.cover),
    url: episode.embedUrl,
    accent: accentAt(index),
  }));
}

export function getCampusMoments(): MomentView[] {
  return pick(campusMoments, sampleMoments).map((moment, index) => ({
    id: moment.id,
    title: moment.title,
    caption: moment.caption,
    image: resolveImage(moment.image) as ResolvedImage,
    accent: accentAt(index),
  }));
}

export function getVoices(): VoiceView[] {
  return featured(pick(studentTestimonials, sampleTestimonials), featuredStoryIds).map((voice, index) => ({
    id: voice.id,
    name: voice.name,
    designation: [voice.designation, voice.batch].filter(Boolean).join(", ") || undefined,
    quote: voice.quote,
    photo: resolveImage(voice.photo),
    accent: accentAt(index),
  }));
}

export function getSocialLinks() {
  return pick(socialLinks, sampleSocial);
}

export function getCelebrities(): CelebrityView[] {
  return featured(pick(celebrities, sampleCelebrities), featuredCelebrityIds).map((person, index) => ({
    id: person.id,
    name: person.name,
    role: person.role,
    category: person.category,
    bio: person.bio,
    href: person.href,
    photo: resolveImage(person.photo),
    accent: accentAt(index),
  }));
}

/** Chairman's and Director's messages, for the About page. */
export function getLeadershipMessages() {
  return pick(leadershipMessages, sampleLeadership).map((message) => ({ ...message, photo: resolveImage(message.photo) }));
}

/** Numbered steps for the Placement Process page. */
export function getPlacementProcess() {
  return pick(placementProcess, samplePlacementProcess);
}

/** Policy sections for the Placement Policy page. */
export function getPlacementPolicy() {
  return pick(placementPolicy, samplePlacementPolicy);
}

export function getHighestPerformers() {
  return pick(highestPerformers, sampleHighestPerformers).map((performer, index) => ({
    ...performer,
    photo: resolveImage(performer.photo),
    accent: accentAt(index),
  }));
}

export function getPlacementGallery() {
  return pick(placementGallery, samplePlacementGallery).map((entry) => ({ ...entry, image: resolveImage(entry.image) as ResolvedImage }));
}

export function getProfessionalSocieties() {
  return pick(professionalSocieties, sampleSocieties).map((society, index) => ({
    ...society,
    logo: resolveImage(society.logo),
    accent: accentAt(index),
  }));
}
