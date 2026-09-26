/**
 * SAMPLE content, for reviewing layouts only.
 *
 * It is used ONLY when NEXT_PUBLIC_SAMPLE_CONTENT=true AND the real data file for that section is still empty.
 * Every entry is labelled "Sample" so it can never be mistaken for real content. In production keep the flag
 * off: a section with no real content then hides itself.
 * Replace by filling the real files in src/data/** — nothing here needs to be deleted.
 */
import type { Centre } from "../centres/centres";
import type { PlacementStatistic } from "../placements/statistics";
import type { Recruiter } from "../placements/recruiters";
import type { SuccessStory } from "../placements/successStories";
import type { StudentProject } from "../students/projects";
import type { EitEvent } from "../events/events";
import type { Announcement } from "../events/announcements";
import type { Club } from "../clubs/clubs";
import type { PodcastEpisode } from "../podcasts/episodes";
import type { PodcastSpeaker } from "../podcasts/speakers";
import type { CampusMoment } from "../home/campusLife";
import type { CommitteeMember, GalleryImage, LeadershipMessage, Mou, Testimonial } from "@/types";
import type { SocialLink } from "../site/social";
import type { Celebrity } from "../celebrities/celebrities";
import type { PlacementStep } from "../placements/process";
import type { PolicySection } from "../placements/policy";
import type { HighestPerformer } from "../placements/achievements";
import type { ProfessionalSociety } from "../clubs/societies";
import type { HistoryMilestone } from "../about/history";
import type { GoverningBodyMember } from "../about/governance";
import type { Approval } from "../about/approvals";
import type { Committee } from "../about/committees";
import type { DisclosureItem } from "../about/disclosure";
import type { PlacementActivity } from "../placements/activities";
import type { ProgramDetail, ProgramSlug } from "../programs/programs";

const note = "Sample entry: replace it by filling the real data file.";

export const sampleCentres: Centre[] = [
  { id: "sample-centre-1", name: "Sample Centre One", summary: "Sample summary line", description: note, href: "/centres", accent: "#CFE7EC" },
  { id: "sample-centre-2", name: "Sample Centre Two", summary: "Sample summary line", description: note, href: "/centres", accent: "#D3E9DC" },
  { id: "sample-centre-3", name: "Sample Centre Three", summary: "Sample summary line", description: note, href: "/centres", accent: "#F3C4AA" },
  { id: "sample-centre-4", name: "Sample Centre Four", summary: "Sample summary line", description: note, href: "/centres", accent: "#C8A5C9" },
  { id: "sample-centre-5", name: "Sample Centre Five", summary: "Sample summary line", description: note, href: "/centres", accent: "#F5ED8F" },
];

export const sampleStatistics: PlacementStatistic[] = [
  { id: "sample-stat-1", label: "Sample statistic", value: "00" },
  { id: "sample-stat-2", label: "Sample statistic", value: "00" },
  { id: "sample-stat-3", label: "Sample statistic", value: "00" },
  { id: "sample-stat-4", label: "Sample statistic", value: "00" },
];

export const sampleRecruiters: Recruiter[] = Array.from({ length: 8 }, (_, index) => ({
  id: `sample-recruiter-${index + 1}`,
  name: `Sample Recruiter ${index + 1}`,
}));

export const sampleStories: SuccessStory[] = [
  { id: "sample-story-1", studentName: "Sample Student One", batch: "B.Tech, Sample year", company: "Sample Company", role: "Sample role", story: note },
  { id: "sample-story-2", studentName: "Sample Student Two", batch: "BCA, Sample year", company: "Sample Company", role: "Sample role", story: note },
  { id: "sample-story-3", studentName: "Sample Student Three", batch: "MBA, Sample year", company: "Sample Company", role: "Sample role", story: note },
  { id: "sample-story-4", studentName: "Sample Student Four", batch: "MCA, Sample year", company: "Sample Company", role: "Sample role", story: note },
  { id: "sample-story-5", studentName: "Sample Student Five", batch: "BBA, Sample year", company: "Sample Company", role: "Sample role", story: note },
];

export const sampleProjects: StudentProject[] = Array.from({ length: 6 }, (_, index) => ({
  id: `sample-project-${index + 1}`,
  title: `Sample Project ${index + 1}`,
  team: ["Sample Student", "Sample Student"],
  year: 2026,
  summary: note,
}));

export const sampleEvents: EitEvent[] = [
  { id: "sample-event-1", title: "Sample Event One", date: "2026-10-12", venue: "Sample venue", summary: note, status: "upcoming" },
  { id: "sample-event-2", title: "Sample Event Two", date: "2026-10-26", venue: "Sample venue", summary: note, status: "upcoming" },
  { id: "sample-event-3", title: "Sample Event Three", date: "2026-11-09", venue: "Sample venue", summary: note, status: "upcoming" },
  { id: "sample-event-4", title: "Sample Event Four", date: "2026-11-21", venue: "Sample venue", summary: note, status: "upcoming" },
];

export const sampleAnnouncements: Announcement[] = Array.from({ length: 6 }, (_, index) => ({
  id: `sample-notice-${index + 1}`,
  title: `Sample notice ${index + 1}: replace with a real circular`,
  date: `2026-09-${String(18 - index * 2).padStart(2, "0")}`,
  href: "/academics/circulars",
  important: index === 0,
}));

export const sampleClubs: Club[] = [
  "Coding Club", "Robotics Club", "Cultural Club", "Sports Club", "Photography Club",
  "Literary Club", "Entrepreneurship Club", "Music Club", "Dance Club", "Social Service Club",
].map((name, index) => ({ id: `sample-club-${index + 1}`, name: `Sample ${name}`, summary: "Sample activity line" }));

export const sampleSpeakers: PodcastSpeaker[] = [
  { id: "sample-speaker-1", name: "Sample Speaker One", designation: "Sample designation" },
  { id: "sample-speaker-2", name: "Sample Speaker Two", designation: "Sample designation" },
  { id: "sample-speaker-3", name: "Sample Speaker Three", designation: "Sample designation" },
];

export const sampleEpisodes: PodcastEpisode[] = [
  { id: "sample-episode-1", title: "Sample Episode One", speakerIds: ["sample-speaker-1"], date: "2026-09-10", duration: "00 min", summary: note },
  { id: "sample-episode-2", title: "Sample Episode Two", speakerIds: ["sample-speaker-2"], date: "2026-08-27", duration: "00 min", summary: note },
  { id: "sample-episode-3", title: "Sample Episode Three", speakerIds: ["sample-speaker-3"], date: "2026-08-13", duration: "00 min", summary: note },
  { id: "sample-episode-4", title: "Sample Episode Four", speakerIds: ["sample-speaker-1", "sample-speaker-2"], date: "2026-07-30", duration: "00 min", summary: note },
];

export const sampleMoments: CampusMoment[] = Array.from({ length: 8 }, (_, index) => ({
  id: `sample-moment-${index + 1}`,
  title: `Sample moment ${index + 1}`,
  caption: "Sample caption",
  image: { src: `/images/campus/campus-moment-${index + 1}.webp`, alt: `Sample campus moment ${index + 1}` },
}));

export const sampleTestimonials: Testimonial[] = [
  { id: "sample-voice-1", name: "Sample Student One", designation: "B.Tech, Sample year", quote: "Sample quote. Replace it with a real student's words in src/data/students/testimonials.ts." },
  { id: "sample-voice-2", name: "Sample Student Two", designation: "MBA, Sample year", quote: "Sample quote. Replace it with a real student's words in src/data/students/testimonials.ts." },
  { id: "sample-voice-3", name: "Sample Student Three", designation: "BCA, Sample year", quote: "Sample quote. Replace it with a real student's words in src/data/students/testimonials.ts." },
  { id: "sample-voice-4", name: "Sample Student Four", designation: "MCA, Sample year", quote: "Sample quote. Replace it with a real student's words in src/data/students/testimonials.ts." },
];

/** Sample social links (href "#"): they show the icons but go nowhere. Fill data/site/social.ts with real URLs. */
export const sampleSocial: SocialLink[] = [
  { platform: "facebook", href: "#" },
  { platform: "instagram", href: "#" },
  { platform: "linkedin", href: "#" },
  { platform: "youtube", href: "#" },
  { platform: "x", href: "#" },
];

export const sampleCelebrities: Celebrity[] = [
  { id: "sample-celebrity-1", name: "Sample Celebrity One", role: "Sample role, Alumnus", category: "Alumni", bio: "Sample entry: replace it by filling data/celebrities/celebrities.ts." },
  { id: "sample-celebrity-2", name: "Sample Celebrity Two", role: "Sample role, Chief Guest", category: "Chief Guest", bio: "Sample entry: replace it by filling data/celebrities/celebrities.ts." },
  { id: "sample-celebrity-3", name: "Sample Celebrity Three", role: "Sample role, Speaker", category: "Speaker", bio: "Sample entry: replace it by filling data/celebrities/celebrities.ts." },
  { id: "sample-celebrity-4", name: "Sample Celebrity Four", role: "Sample role, Alumnus", category: "Alumni", bio: "Sample entry: replace it by filling data/celebrities/celebrities.ts." },
  { id: "sample-celebrity-5", name: "Sample Celebrity Five", role: "Sample role, Chief Guest", category: "Chief Guest", bio: "Sample entry: replace it by filling data/celebrities/celebrities.ts." },
  { id: "sample-celebrity-6", name: "Sample Celebrity Six", role: "Sample role, Speaker", category: "Speaker", bio: "Sample entry: replace it by filling data/celebrities/celebrities.ts." },
  { id: "sample-celebrity-7", name: "Sample Celebrity Seven", role: "Sample role, Alumnus", category: "Alumni", bio: "Sample entry: replace it by filling data/celebrities/celebrities.ts." },
  { id: "sample-celebrity-8", name: "Sample Celebrity Eight", role: "Sample role, Speaker", category: "Speaker", bio: "Sample entry: replace it by filling data/celebrities/celebrities.ts." },
];

export const sampleLeadership: LeadershipMessage[] = [
  { id: "sample-chairman", name: "Sample Chairman Name", designation: "Chairman", message: [note] },
  { id: "sample-director", name: "Sample Director Name", designation: "Director", message: [note] },
];

export const samplePlacementProcess: PlacementStep[] = [
  { id: "sample-step-1", title: "Sample step one", description: note },
  { id: "sample-step-2", title: "Sample step two", description: note },
  { id: "sample-step-3", title: "Sample step three", description: note },
  { id: "sample-step-4", title: "Sample step four", description: note },
];

export const samplePlacementPolicy: PolicySection[] = [
  { heading: "Sample policy heading", body: [note] },
  { heading: "Sample eligibility heading", body: [note] },
];

export const sampleHighestPerformers: HighestPerformer[] = Array.from({ length: 6 }, (_, index) => ({
  id: `sample-performer-${index + 1}`,
  name: `Sample Performer ${index + 1}`,
  company: "Sample Company",
  batch: "Sample batch",
}));

export const samplePlacementGallery: GalleryImage[] = Array.from({ length: 8 }, (_, index) => ({
  image: { src: `/images/placements/placement-gallery-${index + 1}.webp`, alt: `Sample placement gallery photo ${index + 1}` },
  caption: "Sample caption",
}));

export const sampleSocieties: ProfessionalSociety[] = [
  { id: "sample-society-1", name: "Sample Professional Society One", summary: "Sample summary line" },
  { id: "sample-society-2", name: "Sample Professional Society Two", summary: "Sample summary line" },
  { id: "sample-society-3", name: "Sample Professional Society Three", summary: "Sample summary line" },
];

export const sampleHistory: HistoryMilestone[] = [
  { id: "sample-history-2007", year: "2007", title: "Sample milestone: institute founded", description: note },
  { id: "sample-history-2012", year: "2012", title: "Sample milestone: new program launched", description: note },
  { id: "sample-history-2017", year: "2017", title: "Sample milestone: accreditation received", description: note },
  { id: "sample-history-2021", year: "2021", title: "Sample milestone: campus expansion", description: note },
  { id: "sample-history-2025", year: "2025", title: "Sample milestone: recent achievement", description: note },
];

export const sampleGoverningBody: GoverningBodyMember[] = [
  { id: "sample-gb-1", name: "Sample Member One", role: "Sample role, Chairperson" },
  { id: "sample-gb-2", name: "Sample Member Two", role: "Sample role, Member" },
  { id: "sample-gb-3", name: "Sample Member Three", role: "Sample role, Member" },
  { id: "sample-gb-4", name: "Sample Member Four", role: "Sample role, Member Secretary" },
];

export const sampleApprovals: Approval[] = [
  { id: "sample-approval-1", authority: "Sample Authority (e.g. AICTE)", title: "Sample Approval Title", academicYear: "2025-26" },
  { id: "sample-approval-2", authority: "Sample Authority (e.g. GGSIPU)", title: "Sample Affiliation Title", academicYear: "2025-26" },
];

const sampleMembers: CommitteeMember[] = [
  { name: "Sample Member One", role: "Chairperson" },
  { name: "Sample Member Two", role: "Member" },
  { name: "Sample Member Three", role: "Member" },
];

export const sampleCommittees: Committee[] = [
  { slug: "iqac", name: "Internal Quality Assurance Cell", description: note, members: sampleMembers },
  { slug: "grievance-redressal", name: "Grievance Redressal Committee", description: note, members: sampleMembers },
  { slug: "internal-committee-women-cell", name: "Internal Committee and Women Cell", description: note, members: sampleMembers },
  { slug: "sc-st-cell", name: "SC/ST Cell", description: note, members: sampleMembers },
  { slug: "nba-naac", name: "NBA and NAAC Policy Committee", description: note, members: sampleMembers },
];

export const sampleMandatoryDisclosure: DisclosureItem[] = [
  { id: "sample-disclosure-1", title: "Sample disclosure item one" },
  { id: "sample-disclosure-2", title: "Sample disclosure item two" },
  { id: "sample-disclosure-3", title: "Sample disclosure item three" },
];

export const samplePlacementMessages: LeadershipMessage[] = [
  { id: "sample-hod-tp", name: "Sample HoD, Training & Placement", designation: "HoD, Training & Placement", message: [note] },
];

export const sampleStudentsSpeak: Testimonial[] = [
  { id: "sample-student-speak-1", name: "Sample Student One", designation: "Placed, Sample Company", batch: "B.Tech, Sample year", quote: note },
  { id: "sample-student-speak-2", name: "Sample Student Two", designation: "Placed, Sample Company", batch: "MBA, Sample year", quote: note },
  { id: "sample-student-speak-3", name: "Sample Student Three", designation: "Placed, Sample Company", batch: "BCA, Sample year", quote: note },
];

export const sampleRecruitersSpeak: Testimonial[] = [
  { id: "sample-recruiter-speak-1", name: "Sample Recruiter Contact One", designation: "Sample designation", organisation: "Sample Company", quote: note },
  { id: "sample-recruiter-speak-2", name: "Sample Recruiter Contact Two", designation: "Sample designation", organisation: "Sample Company", quote: note },
  { id: "sample-recruiter-speak-3", name: "Sample Recruiter Contact Three", designation: "Sample designation", organisation: "Sample Company", quote: note },
];

export const samplePlacementMous: Mou[] = [
  { id: "sample-mou-1", organisation: "Sample Company One", purpose: note, signedOn: "2025" },
  { id: "sample-mou-2", organisation: "Sample Company Two", purpose: note, signedOn: "2025" },
  { id: "sample-mou-3", organisation: "Sample Company Three", purpose: note, signedOn: "2024" },
];

export const samplePlacementActivities: PlacementActivity[] = (
  [
    ["industrial-visit", "Industrial Visit"],
    ["expert-lecture", "Expert Lecture"],
    ["hr-conclave", "HR Conclave"],
    ["job-fair", "Job Fair"],
    ["skill-development", "Skill Development Session"],
  ] as const
).flatMap(([kind, label], groupIndex) =>
  Array.from({ length: 2 }, (_, index) => ({
    id: `sample-${kind}-${index + 1}`,
    kind,
    title: `Sample ${label} ${index + 1}`,
    date: `2025-${String(9 - groupIndex).padStart(2, "0")}-${String(10 + index).padStart(2, "0")}`,
    description: note,
  })),
);

/** Extra fields for the program detail pages — the base name/tagline/image etc. already come from programs.ts. */
type ProgramSampleDetail = Pick<ProgramDetail, "duration" | "summary" | "eligibility" | "specialisations" | "careerPaths">;

export const sampleProgramDetails: Record<ProgramSlug, ProgramSampleDetail> = {
  btech: {
    duration: "Sample: 4 years (8 semesters)",
    summary: note,
    eligibility: ["Sample eligibility line one", "Sample eligibility line two"],
    specialisations: ["Sample specialisation One", "Sample specialisation Two", "Sample specialisation Three"],
    careerPaths: ["Sample career path One", "Sample career path Two"],
  },
  mtech: {
    duration: "Sample: 2 years (4 semesters)",
    summary: note,
    eligibility: ["Sample eligibility line one"],
    specialisations: ["Sample specialisation One", "Sample specialisation Two"],
    careerPaths: ["Sample career path One", "Sample career path Two"],
  },
  bca: {
    duration: "Sample: 3 years (6 semesters)",
    summary: note,
    eligibility: ["Sample eligibility line one"],
    specialisations: ["Sample specialisation One"],
    careerPaths: ["Sample career path One", "Sample career path Two"],
  },
  mca: {
    duration: "Sample: 2 years (4 semesters)",
    summary: note,
    eligibility: ["Sample eligibility line one"],
    specialisations: ["Sample specialisation One"],
    careerPaths: ["Sample career path One", "Sample career path Two"],
  },
  bba: {
    duration: "Sample: 3 years (6 semesters)",
    summary: note,
    eligibility: ["Sample eligibility line one"],
    specialisations: ["Sample specialisation One", "Sample specialisation Two"],
    careerPaths: ["Sample career path One", "Sample career path Two"],
  },
  mba: {
    duration: "Sample: 2 years (4 semesters)",
    summary: note,
    eligibility: ["Sample eligibility line one"],
    specialisations: ["Sample specialisation One", "Sample specialisation Two"],
    careerPaths: ["Sample career path One", "Sample career path Two"],
  },
};
