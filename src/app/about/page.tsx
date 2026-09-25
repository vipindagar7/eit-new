import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { SmartImage, initials } from "@/components/home/SmartImage";
import { FannedCards } from "@/components/pages/FannedCards";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid, type QuickLink } from "@/components/pages/QuickLinksGrid";
import { aboutContent } from "@/data/home/about";
import { getRoutesInGroup } from "@/data/site/routes";
import { getLeadershipMessages } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/about";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const leadership = getLeadershipMessages();
  const links: QuickLink[] = getRoutesInGroup("about", [path]).map((route) => ({ href: route.path, label: route.title }));

  return (
    <>
      <PageHero
        path={path}
        eyebrow={aboutContent.eyebrow}
        title={aboutContent.title.split("\n")}
        description={aboutContent.description}
        primaryAction={{ label: "Why EIT", href: "/about/why-eit" }}
        secondaryAction={aboutContent.secondaryAction}
      />

      {leadership.length > 0 && (
        <PageSection name="default" bg="parchment" eyebrow="Leadership" title={["A message from", "our leadership"]}>
          <FannedCards items={leadership.map((person) => ({ id: person.id, name: person.name, photo: person.photo, accent: "#CFE7EC" }))} className="mb-4" />
          <div className="grid gap-10 lg:grid-cols-2">
            {leadership.map((person) => (
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
        </PageSection>
      )}

      <PageSection name="default" bg="surface" eyebrow="About EIT" title={["Read more", "about us"]}>
        <QuickLinksGrid links={links} columns={3} />
      </PageSection>

      <ScrollAnimator />
    </>
  );
}