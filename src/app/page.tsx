import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { AdmissionsCta } from "@/components/home/AdmissionsCta";
import { CampusLifeSection } from "@/components/home/CampusLifeSection";
import { CelebritySection } from "@/components/home/CelebritySection";
import { CentresSection } from "@/components/home/CentresSection";
import { ClubsSection } from "@/components/home/ClubsSection";
import { EventsSection } from "@/components/home/EventsSection";
import { HomeIntro } from "@/components/home/HomeIntro";
import { PlacementsSection } from "@/components/home/PlacementsSection";
import { PodcastsSection } from "@/components/home/PodcastsSection";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { StudentWorkSection } from "@/components/home/StudentWorkSection";
import { VoicesSection } from "@/components/home/VoicesSection";
import { WhyEitSection } from "@/components/home/WhyEitSection";
import { getHeroSlides, getPrograms } from "@/lib/assets";
import {
  getCampusMoments, getCelebrities, getCentres, getClubs, getEpisodes, getEvents, getNotices, getPlacementStats, getProjects,
  getRecruiters, getStories, getVoices,
} from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

export const metadata = getRouteMetadata("/");

/**
 * Home, in order: navbar, hero + about (one scroll scene), centres, why EIT, programs, placements, student work,
 * events, clubs, podcasts, celebrity corner, campus life, stories, admissions call to action, footer.
 * A section whose content is empty hides itself (see lib/content.ts).
 */
export default function Page() {
  return (
    <>
      <HomeIntro slides={getHeroSlides()} />
      <CentresSection centres={getCentres()} />
      <WhyEitSection />
      <ProgramsSection programs={getPrograms()} />
      <PlacementsSection stories={getStories()} stats={getPlacementStats()} recruiters={getRecruiters()} />
      <StudentWorkSection projects={getProjects()} />
      <EventsSection events={getEvents()} notices={getNotices()} />
      <ClubsSection clubs={getClubs()} />
      <PodcastsSection episodes={getEpisodes()} />
      <CelebritySection people={getCelebrities()} />
      <CampusLifeSection moments={getCampusMoments()} />
      <VoicesSection voices={getVoices()} />
      <AdmissionsCta />
      <ScrollAnimator />
    </>
  );
}
