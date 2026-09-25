import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { SmartImage } from "@/components/home/SmartImage";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid } from "@/components/pages/QuickLinksGrid";
import { SectionNote } from "@/components/pages/SectionNote";
import { campusLifeSection } from "@/data/home/campusLife";
import { getCampusMoments } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/campus-life";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const moments = getCampusMoments();

  return (
    <>
      <PageHero path={path} eyebrow={campusLifeSection.eyebrow} title={campusLifeSection.title} description={campusLifeSection.description} tone="blush" />

      <PageSection name="default">
        {moments.length > 0 ? (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {moments.map((moment) => (
              <li key={moment.id} data-anim="card" className="relative aspect-[3/4] overflow-hidden rounded-xl [container-type:inline-size]">
                <SmartImage image={moment.image} accent={moment.accent} sizes="(min-width: 1024px) 24vw, 45vw" />
                {(moment.title || moment.caption) && (
                  <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-primary/80 to-transparent p-3 text-white">
                    <p className="text-sm font-semibold">{moment.title}</p>
                    {moment.caption && <p className="text-xs text-white/80">{moment.caption}</p>}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <SectionNote title="Campus photographs are being added">Moments from campus life will appear here once supplied.</SectionNote>
        )}
      </PageSection>

      <PageSection name="default" bg="surface" eyebrow="More" title={["Beyond the", "classroom"]}>
        <QuickLinksGrid
          links={[
            { href: "/clubs", label: "Clubs & Activities", description: "Where students lead, create and compete." },
            { href: "/events", label: "Events & Notifications", description: "What's happening at EIT." },
            { href: "/student-work", label: "Student Work", description: "Projects from classrooms, labs and clubs." },
            { href: "/podcasts", label: "Podcasts & Talks", description: "Conversations worth hearing." },
            { href: "/celebrities", label: "Celebrity Corner", description: "Alumni, chief guests and speakers." },
            { href: "/campus-life/library", label: "Library", description: "Resources and reading spaces on campus." },
          ]}
          columns={3}
        />
      </PageSection>

      <ScrollAnimator />
    </>
  );
}
