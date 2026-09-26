import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { SmartImage } from "@/components/home/SmartImage";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid, type QuickLink } from "@/components/pages/QuickLinksGrid";
import { SectionNote } from "@/components/pages/SectionNote";
import { getRoutesInGroup } from "@/data/site/routes";
import { getPlacementActivities } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/placements/job-fair";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const fairs = getPlacementActivities("job-fair");
  const links: QuickLink[] = getRoutesInGroup("placements", [path]).map((route) => ({ href: route.path, label: route.title }));

  return (
    <>
      <PageHero path={path} eyebrow="Placements" title={["Job", "Fair"]} description="Multiple recruiters on campus in a single day for students to meet directly." tone="sand" />

      <PageSection name="default">
        {fairs.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2">
            {fairs.map((fair) => (
              <li key={fair.id} data-anim="card" className="overflow-hidden rounded-2xl border border-primary/10 bg-white">
                {fair.images?.[0] && (
                  <div className="relative aspect-[16/9] overflow-hidden [container-type:inline-size]">
                    <SmartImage image={fair.images[0]} accent="#DDAFBD" sizes="(min-width: 1024px) 45vw, 90vw" />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-base font-semibold text-primary">{fair.title}</p>
                  {fair.date && <p className="mt-1 text-xs text-muted-foreground">{fair.date}</p>}
                  {fair.description && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{fair.description}</p>}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <SectionNote title="Job fair coverage is being compiled">
            Reports and photographs from job fairs will appear here once compiled.
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
