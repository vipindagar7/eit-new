import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid, type QuickLink } from "@/components/pages/QuickLinksGrid";
import { SectionNote } from "@/components/pages/SectionNote";
import { getRoutesInGroup } from "@/data/site/routes";
import { getPlacementMous } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/placements/mous";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const mous = getPlacementMous();
  const links: QuickLink[] = getRoutesInGroup("placements", [path]).map((route) => ({ href: route.path, label: route.title }));

  return (
    <>
      <PageHero path={path} eyebrow="Placements" title={["Placement", "MOUs"]} description="Memoranda of understanding signed with industry partners for placements and training." tone="sage" />

      <PageSection name="default">
        {mous.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2">
            {mous.map((mou) => (
              <li key={mou.id} data-anim="card" className="rounded-2xl border border-primary/10 bg-white p-6">
                <p className="text-base font-semibold text-primary">{mou.organisation}</p>
                {mou.purpose && <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{mou.purpose}</p>}
                {mou.signedOn && <p className="mt-2 text-xs text-muted-foreground">Signed {mou.signedOn}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <SectionNote title="Placement MOUs are being compiled">
            Industry partnerships signed for placements and training will appear here once compiled.
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
