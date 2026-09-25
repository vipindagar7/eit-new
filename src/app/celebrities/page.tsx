import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { CelebrityGrid } from "@/components/pages/CelebrityGrid";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { SectionNote } from "@/components/pages/SectionNote";
import { celebritiesSection } from "@/data/home/celebrities";
import { getCelebrities } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/celebrities";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const people = getCelebrities();

  return (
    <>
      <PageHero
        path={path}
        eyebrow={celebritiesSection.eyebrow}
        title={celebritiesSection.title}
        description={celebritiesSection.description}
        secondaryAction={{ label: "Alumni Network", href: "/alumni" }}
        tone="rose"
      />

      <PageSection name="default">
        {people.length > 0 ? (
          <CelebrityGrid people={people} />
        ) : (
          <SectionNote title="Celebrity Corner is being built">
            Alumni, chief guests and speakers who have been part of the EIT story will appear here once added.
          </SectionNote>
        )}
      </PageSection>

      <ScrollAnimator />
    </>
  );
}
