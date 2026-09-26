import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { SmartImage } from "@/components/home/SmartImage";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid, type QuickLink } from "@/components/pages/QuickLinksGrid";
import { SectionNote } from "@/components/pages/SectionNote";
import { getRoutesInGroup } from "@/data/site/routes";
import { getPlacementActivities } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/placements/expert-lectures";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const lectures = getPlacementActivities("expert-lecture");
  const links: QuickLink[] = getRoutesInGroup("placements", [path]).map((route) => ({ href: route.path, label: route.title }));

  return (
    <>
      <PageHero path={path} eyebrow="Placements" title={["Industry Expert", "Lectures"]} description="Sessions by industry professionals to prepare students for the workplace." tone="lilac" />

      <PageSection name="default">
        {lectures.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2">
            {lectures.map((lecture) => (
              <li key={lecture.id} data-anim="card" className="overflow-hidden rounded-2xl border border-primary/10 bg-white">
                {lecture.images?.[0] && (
                  <div className="relative aspect-[16/9] overflow-hidden [container-type:inline-size]">
                    <SmartImage image={lecture.images[0]} accent="#C8A5C9" sizes="(min-width: 1024px) 45vw, 90vw" />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-base font-semibold text-primary">{lecture.title}</p>
                  {lecture.date && <p className="mt-1 text-xs text-muted-foreground">{lecture.date}</p>}
                  {lecture.description && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{lecture.description}</p>}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <SectionNote title="Expert lectures are being compiled">
            Reports and photographs from industry expert lectures will appear here once compiled.
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
