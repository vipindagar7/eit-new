import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid, type QuickLink } from "@/components/pages/QuickLinksGrid";
import { SectionNote } from "@/components/pages/SectionNote";
import { getRoutesInGroup } from "@/data/site/routes";
import { getPlacementPolicy } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/placements/policy";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const policy = getPlacementPolicy();
  const links: QuickLink[] = getRoutesInGroup("placements", [path]).map((route) => ({ href: route.path, label: route.title }));

  return (
    <>
      <PageHero path={path} eyebrow="Placements" title={["Placement", "Policy"]} description="Eligibility rules and conduct expected during the placement season." tone="sage" />

      <PageSection name="default">
        {policy.length > 0 ? (
          <div className="grid gap-10 sm:grid-cols-2">
            {policy.map((section) => (
              <div key={section.heading} data-anim="card">
                <p className="text-lg font-semibold text-primary">{section.heading}</p>
                {section.body.map((paragraph, index) => (
                  <p key={index} className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <SectionNote title="The placement policy is being finalised">
            Eligibility criteria and conduct rules for the placement season will appear here once published.
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
