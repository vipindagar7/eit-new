import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid, type QuickLink } from "@/components/pages/QuickLinksGrid";
import { SectionNote } from "@/components/pages/SectionNote";
import { getRoutesInGroup } from "@/data/site/routes";
import { getPlacementProcess } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/placements/process";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const steps = getPlacementProcess();
  const links: QuickLink[] = getRoutesInGroup("placements", [path]).map((route) => ({ href: route.path, label: route.title }));

  return (
    <>
      <PageHero path={path} eyebrow="Placements" title={["Placement", "Process"]} description="How students move from registration to a confirmed offer." tone="lilac" />

      <PageSection name="default">
        {steps.length > 0 ? (
          <ol className="mx-auto max-w-2xl space-y-8 border-l border-primary/15 pl-8">
            {steps.map((step, index) => (
              <li key={step.id} data-anim="row" className="relative">
                <span aria-hidden className="absolute top-1 -left-[2.72rem] grid size-8 place-items-center rounded-full bg-primary text-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="text-lg font-semibold text-primary">{step.title}</p>
                <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        ) : (
          <SectionNote title="The placement process is being finalised">
            The step-by-step process, from registration through offer, will appear here once published.
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
