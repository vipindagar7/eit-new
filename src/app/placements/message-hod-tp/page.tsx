import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { SmartImage, initials } from "@/components/home/SmartImage";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid, type QuickLink } from "@/components/pages/QuickLinksGrid";
import { SectionNote } from "@/components/pages/SectionNote";
import { getRoutesInGroup } from "@/data/site/routes";
import { getPlacementMessages } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/placements/message-hod-tp";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const messages = getPlacementMessages();
  const links: QuickLink[] = getRoutesInGroup("placements", [path]).map((route) => ({ href: route.path, label: route.title }));

  return (
    <>
      <PageHero
        path={path}
        eyebrow="Placements"
        title={["Message from HoD", "and Training & Placement"]}
        description="A word from the placement cell's leadership."
        tone="mist"
      />

      <PageSection name="default">
        {messages.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-2">
            {messages.map((person) => (
              <div key={person.id} data-anim="card" className="flex flex-col gap-5 rounded-2xl border border-primary/10 bg-eit-surface p-7 sm:flex-row sm:items-start">
                <div className="relative aspect-square w-16 shrink-0 overflow-hidden rounded-full [container-type:inline-size]">
                  <SmartImage image={person.photo} accent="#CFE7EC" label={initials(person.name)} sizes="64px" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-primary">{person.name}</p>
                  <p className="text-sm font-medium text-muted-foreground">{person.designation}</p>
                  <div className="mt-3 space-y-3 text-sm leading-relaxed text-primary/80">
                    {person.message.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <SectionNote title="This message is being finalised">
            A message from the HoD and Training &amp; Placement office will appear here once supplied.
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
