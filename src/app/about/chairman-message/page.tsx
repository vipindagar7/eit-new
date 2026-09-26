import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { SmartImage, initials } from "@/components/home/SmartImage";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid, type QuickLink } from "@/components/pages/QuickLinksGrid";
import { SectionNote } from "@/components/pages/SectionNote";
import { getRoutesInGroup } from "@/data/site/routes";
import { getLeadershipMessages } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/about/chairman-message";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const chairman = getLeadershipMessages().find((person) => person.designation.toLowerCase().includes("chairman"));
  const links: QuickLink[] = getRoutesInGroup("about", [path]).map((route) => ({ href: route.path, label: route.title }));

  return (
    <>
      <PageHero path={path} eyebrow="Leadership" title={["Chairman's", "Message"]} description="A word from the Chairman of Echelon Institute of Technology." tone="mist" />

      <PageSection name="default" eyebrow="Leadership" title={["Chairman's", "message"]}>
        {chairman ? (
          <div data-anim="card" className="flex flex-col gap-8 rounded-2xl border border-primary/10 bg-eit-surface p-8 sm:flex-row sm:items-start sm:p-10">
            <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-full [container-type:inline-size]">
              <SmartImage image={chairman.photo} accent="#CFE7EC" label={initials(chairman.name)} sizes="96px" />
            </div>
            <div>
              <p className="text-xl font-semibold text-primary">{chairman.name}</p>
              <p className="text-sm font-medium text-muted-foreground">{chairman.designation}</p>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-primary/80">
                {chairman.message.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <SectionNote title="The Chairman's message is being finalised">
            This page will carry a message from the Chairman once it is supplied by the institute.
          </SectionNote>
        )}
      </PageSection>

      <PageSection name="default" bg="surface" eyebrow="More" title={["Explore", "About EIT"]}>
        <QuickLinksGrid links={links} columns={3} />
      </PageSection>

      <ScrollAnimator />
    </>
  );
}
