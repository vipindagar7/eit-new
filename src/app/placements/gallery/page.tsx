import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { SmartImage } from "@/components/home/SmartImage";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid, type QuickLink } from "@/components/pages/QuickLinksGrid";
import { SectionNote } from "@/components/pages/SectionNote";
import { getRoutesInGroup } from "@/data/site/routes";
import { getPlacementGallery } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/placements/gallery";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const gallery = getPlacementGallery();
  const links: QuickLink[] = getRoutesInGroup("placements", [path]).map((route) => ({ href: route.path, label: route.title }));

  return (
    <>
      <PageHero path={path} eyebrow="Placements" title={["Placement", "Gallery"]} description="Moments from placement drives, offer-letter handovers and campus visits." tone="sand" />

      <PageSection name="default">
        {gallery.length > 0 ? (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {gallery.map((entry, index) => (
              <li key={index} data-anim="card" className="relative aspect-[4/3] overflow-hidden rounded-xl [container-type:inline-size]">
                <SmartImage image={entry.image} accent="#CFE7EC" sizes="(min-width: 1024px) 24vw, 45vw" />
                {entry.caption && (
                  <p className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-primary/80 to-transparent p-3 text-xs font-medium text-white">{entry.caption}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <SectionNote title="The placement gallery is being compiled">
            Photographs from placement drives and offer handovers will appear here once uploaded.
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
