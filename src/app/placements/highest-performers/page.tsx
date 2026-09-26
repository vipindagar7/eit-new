import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { SmartImage, initials } from "@/components/home/SmartImage";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid, type QuickLink } from "@/components/pages/QuickLinksGrid";
import { SectionNote } from "@/components/pages/SectionNote";
import { getRoutesInGroup } from "@/data/site/routes";
import { getHighestPerformers } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/placements/highest-performers";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const performers = getHighestPerformers();
  const links: QuickLink[] = getRoutesInGroup("placements", [path]).map((route) => ({ href: route.path, label: route.title }));

  return (
    <>
      <PageHero path={path} eyebrow="Placements" title={["Highest", "Performers"]} description="Students leading each placement season by package and offer." tone="lilac" />

      <PageSection name="default">
        {performers.length > 0 ? (
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {performers.map((performer) => (
              <li key={performer.id} data-anim="card" className="text-center">
                <div className="relative mx-auto aspect-square w-full max-w-28 overflow-hidden rounded-full [container-type:inline-size]">
                  <SmartImage image={performer.photo} accent={performer.accent} label={initials(performer.name)} sizes="112px" />
                </div>
                <p className="mt-3 text-sm font-semibold text-primary">{performer.name}</p>
                <p className="text-xs text-muted-foreground">{performer.company}</p>
                {performer.batch && <p className="text-xs text-muted-foreground">{performer.batch}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <SectionNote title="Highest performers are being finalised">
            Top offers and the students behind them will appear here once the placement season is complete.
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
