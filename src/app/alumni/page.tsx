import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { CelebrityGrid } from "@/components/pages/CelebrityGrid";
import { FannedCarousel } from "@/components/pages/FannedCarousel";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid } from "@/components/pages/QuickLinksGrid";
import { SectionNote } from "@/components/pages/SectionNote";
import { getCelebrities } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/alumni";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const alumni = getCelebrities().filter((person) => person.category === "Alumni");

  return (
    <>
      <PageHero
        path={path}
        eyebrow="Alumni Network"
        title={["EIT graduates,", "out in the world"]}
        description="Meet EIT alumni who started here and now build their careers across engineering, technology and management."
        tone="lilac"
      />

      <PageSection name="default" bg="parchment" eyebrow="Alumni" title={["Where they", "are now"]}>
        {alumni.length > 0 ? (
          <>
            <FannedCarousel
              items={alumni.map((person) => ({ id: person.id, name: person.name, subtitle: person.role, photo: person.photo, accent: person.accent }))}
              className="mb-8"
            />
            <CelebrityGrid people={alumni} />
          </>
        ) : (
          <SectionNote title="The alumni directory is being built">
            Notable graduates and their stories will appear here as they are added to Celebrity Corner. In the
            meantime, browse who has already been featured.
          </SectionNote>
        )}
      </PageSection>

      <PageSection name="default" bg="surface">
        <QuickLinksGrid
          links={[
            { href: "/celebrities", label: "Celebrity Corner", description: "Alumni, chief guests and speakers who have been part of the EIT story." },
            { href: "/placements", label: "Placements", description: "Where recent graduates have started their careers." },
            { href: "/student-work", label: "Student Work", description: "Projects built by students, some by future alumni." },
          ]}
          columns={3}
        />
      </PageSection>

      <PageSection name="cta" bg="navy">
        <div data-anim="cta-buttons" className="flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-md text-2xl font-extrabold tracking-[-0.03em]">An EIT alum? We&apos;d like to hear from you.</p>
          <Link href="/contact" className="group inline-flex items-center gap-3 rounded-md bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-eit-mist">
            Share your story
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </PageSection>

      <ScrollAnimator />
    </>
  );
}
