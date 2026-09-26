import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { SmartImage, initials } from "@/components/home/SmartImage";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid, type QuickLink } from "@/components/pages/QuickLinksGrid";
import { SectionNote } from "@/components/pages/SectionNote";
import { getRoutesInGroup } from "@/data/site/routes";
import { getRecruitersSpeak } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/placements/recruiters-speak";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const voices = getRecruitersSpeak();
  const links: QuickLink[] = getRoutesInGroup("placements", [path]).map((route) => ({ href: route.path, label: route.title }));

  return (
    <>
      <PageHero path={path} eyebrow="Placements" title={["Recruiters", "Speak"]} description="What recruiting partners say about EIT graduates." tone="peach" />

      <PageSection name="default">
        {voices.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {voices.map((voice) => (
              <li key={voice.id} data-anim="card" className="flex flex-col gap-4 rounded-2xl border border-primary/10 bg-eit-surface p-6">
                <blockquote className="text-base leading-relaxed text-primary/85">&ldquo;{voice.quote}&rdquo;</blockquote>
                <div className="mt-auto flex items-center gap-3">
                  <div className="relative aspect-square w-11 shrink-0 overflow-hidden rounded-full [container-type:inline-size]">
                    <SmartImage image={voice.photo} accent="#F3C4AA" label={initials(voice.name)} sizes="44px" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary">{voice.name}</p>
                    <p className="text-xs text-muted-foreground">{[voice.designation, voice.organisation].filter(Boolean).join(", ")}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <SectionNote title="Recruiter quotes are being collected">
            Quotes from recruiting partners will appear here once collected by the placement cell.
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
