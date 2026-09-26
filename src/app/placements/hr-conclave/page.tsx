import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { SmartImage } from "@/components/home/SmartImage";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid, type QuickLink } from "@/components/pages/QuickLinksGrid";
import { SectionNote } from "@/components/pages/SectionNote";
import { getRoutesInGroup } from "@/data/site/routes";
import { getPlacementActivities } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/placements/hr-conclave";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const editions = getPlacementActivities("hr-conclave");
  const links: QuickLink[] = getRoutesInGroup("placements", [path]).map((route) => ({ href: route.path, label: route.title }));

  return (
    <>
      <PageHero path={path} eyebrow="Placements" title={["HR", "Conclave"]} description="Bringing HR leaders from industry onto campus to meet the placement cell." tone="rose" />

      <PageSection name="default">
        {editions.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2">
            {editions.map((edition) => (
              <li key={edition.id} data-anim="card" className="overflow-hidden rounded-2xl border border-primary/10 bg-white">
                {edition.images?.[0] && (
                  <div className="relative aspect-[16/9] overflow-hidden [container-type:inline-size]">
                    <SmartImage image={edition.images[0]} accent="#E79BB2" sizes="(min-width: 1024px) 45vw, 90vw" />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-base font-semibold text-primary">{edition.title}</p>
                  {edition.date && <p className="mt-1 text-xs text-muted-foreground">{edition.date}</p>}
                  {edition.description && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{edition.description}</p>}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <SectionNote title="HR Conclave coverage is being compiled">
            Reports and photographs from the HR Conclave will appear here once compiled.
          </SectionNote>
        )}
      </PageSection>

      <PageSection name="default" bg="surface" eyebrow="More" title={["Explore", "placements"]}>
        <QuickLinksGrid links={links} columns={3} />
      </PageSection>

      <ScrollAnimator />
    </>
  );
}
