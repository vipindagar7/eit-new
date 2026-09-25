import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { SmartImage, initials } from "@/components/home/SmartImage";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { SectionNote } from "@/components/pages/SectionNote";
import { clubsSection } from "@/data/home/clubs";
import { getClubs, getProfessionalSocieties } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/clubs";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const clubs = getClubs();
  const societies = getProfessionalSocieties();

  return (
    <>
      <PageHero
        path={path}
        eyebrow={clubsSection.eyebrow}
        title={clubsSection.title}
        description={clubsSection.description}
        secondaryAction={{ label: "Professional societies", href: "/clubs/professional-societies" }}
        tone="lilac"
      />

      <PageSection name="default">
        {clubs.length > 0 ? (
          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {clubs.map((club) => (
              <li key={club.id} data-anim="card" className="flex flex-col items-center gap-4 rounded-2xl border border-primary/10 bg-white p-6 text-center">
                <div className="relative size-16 overflow-hidden rounded-full [container-type:inline-size]">
                  <SmartImage image={club.logo} accent={club.accent} label={initials(club.name)} sizes="64px" />
                </div>
                <div>
                  <p className="text-base font-semibold text-primary">{club.name}</p>
                  {club.summary && <p className="mt-1 text-sm text-muted-foreground">{club.summary}</p>}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <SectionNote title="Clubs are being added">Student clubs and their activities will appear here once supplied.</SectionNote>
        )}
      </PageSection>

      {societies.length > 0 && (
        <PageSection name="default" bg="surface" eyebrow="Professional societies" title={["Chapters and", "associations"]}>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {societies.map((society) => (
              <li key={society.id} data-anim="card" className="flex items-center gap-4 rounded-2xl border border-primary/10 bg-white p-6">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-full [container-type:inline-size]">
                  <SmartImage image={society.logo} accent={society.accent} label={initials(society.name)} sizes="48px" />
                </div>
                <div>
                  <p className="text-base font-semibold text-primary">{society.name}</p>
                  {society.summary && <p className="mt-1 text-sm text-muted-foreground">{society.summary}</p>}
                </div>
              </li>
            ))}
          </ul>
          <Link href="/clubs/professional-societies" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            All professional societies
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </PageSection>
      )}

      <ScrollAnimator />
    </>
  );
}
