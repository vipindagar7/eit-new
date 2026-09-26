import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { SmartImage } from "@/components/home/SmartImage";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid, type QuickLink } from "@/components/pages/QuickLinksGrid";
import { SectionNote } from "@/components/pages/SectionNote";
import { getRoutesInGroup } from "@/data/site/routes";
import { getPlacementActivities } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/placements/industrial-visits";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const visits = getPlacementActivities("industrial-visit");
  const links: QuickLink[] = getRoutesInGroup("placements", [path]).map((route) => ({ href: route.path, label: route.title }));

  return (
    <>
      <PageHero path={path} eyebrow="Placements" title={["Industrial", "Visits"]} description="Site visits that connect students with real industry environments." tone="peach" />

      <PageSection name="default">
        {visits.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2">
            {visits.map((visit) => (
              <li key={visit.id} data-anim="card" className="overflow-hidden rounded-2xl border border-primary/10 bg-white">
                {visit.images?.[0] && (
                  <div className="relative aspect-[16/9] overflow-hidden [container-type:inline-size]">
                    <SmartImage image={visit.images[0]} accent="#F3C4AA" sizes="(min-width: 1024px) 45vw, 90vw" />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-base font-semibold text-primary">{visit.title}</p>
                  {visit.date && <p className="mt-1 text-xs text-muted-foreground">{visit.date}</p>}
                  {visit.description && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{visit.description}</p>}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <SectionNote title="Industrial visits are being compiled">
            Reports and photographs from industrial visits will appear here once compiled.
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
