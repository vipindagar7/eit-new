import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { SmartImage } from "@/components/home/SmartImage";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { SectionNote } from "@/components/pages/SectionNote";
import { podcastsSection } from "@/data/home/podcasts";
import { getEpisodes } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/podcasts";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const episodes = getEpisodes();

  return (
    <>
      <PageHero path={path} eyebrow={podcastsSection.eyebrow} title={podcastsSection.title} description={podcastsSection.description} tone="peach" />

      <PageSection name="default">
        {episodes.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {episodes.map((episode) => {
              const card = (
                <>
                  <div className="relative aspect-square overflow-hidden rounded-2xl [container-type:inline-size]">
                    <SmartImage image={episode.cover} accent={episode.accent} sizes="(min-width: 1024px) 30vw, 90vw" />
                  </div>
                  <div className="mt-4">
                    <p className="text-lg font-semibold text-primary">{episode.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {[episode.speakers.join(", "), episode.dateLabel, episode.duration].filter(Boolean).join(" · ")}
                    </p>
                    {episode.summary && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{episode.summary}</p>}
                  </div>
                </>
              );
              return (
                <li key={episode.id} data-anim="card">
                  {episode.url ? (
                    <a href={episode.url} target="_blank" rel="noopener noreferrer" className="block">
                      {card}
                    </a>
                  ) : (
                    card
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <SectionNote title="Episodes are being added">Podcasts and talks will appear here once published.</SectionNote>
        )}
      </PageSection>

      <ScrollAnimator />
    </>
  );
}
