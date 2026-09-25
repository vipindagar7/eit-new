import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { Marquee } from "@/components/home/Marquee";
import { SmartImage, initials } from "@/components/home/SmartImage";
import { FannedCards } from "@/components/pages/FannedCards";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid, type QuickLink } from "@/components/pages/QuickLinksGrid";
import { SectionNote } from "@/components/pages/SectionNote";
import { placementsSection } from "@/data/home/placements";
import { getRoutesInGroup } from "@/data/site/routes";
import {
  getHighestPerformers, getPlacementGallery, getPlacementPolicy, getPlacementProcess, getPlacementStats, getRecruiters,
  getStories,
} from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/placements";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const stats = getPlacementStats();
  const stories = getStories();
  const recruiters = getRecruiters();
  const process = getPlacementProcess();
  const policy = getPlacementPolicy();
  const performers = getHighestPerformers();
  const gallery = getPlacementGallery();

  const hasAnyContent = stats.length > 0 || stories.length > 0 || recruiters.length > 0 || process.length > 0 || policy.length > 0 || performers.length > 0 || gallery.length > 0;

  const links: QuickLink[] = getRoutesInGroup("placements", [path]).map((route) => ({ href: route.path, label: route.title }));

  return (
    <>
      <PageHero
        path={path}
        eyebrow={placementsSection.eyebrow}
        title={placementsSection.title}
        description={placementsSection.description}
        primaryAction={{ label: "Placement Brochure", href: "/placements/brochure" }}
        secondaryAction={{ label: "Message from HoD & T&P", href: "/placements/message-hod-tp" }}
      />

      {stats.length > 0 && (
        <PageSection name="stats" bg="surface" eyebrow="At a glance" title={["Placement", "figures"]}>
          <dl className="grid grid-cols-2 gap-y-8 border-y border-primary/15 py-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.id} data-anim="stat" className={`flex flex-col-reverse justify-end px-2 lg:px-8 ${index > 0 ? "lg:border-l lg:border-primary/15" : ""}`}>
                <dt className="mt-2 text-sm font-medium text-muted-foreground">
                  {stat.label}
                  {stat.note && <span className="block text-xs">{stat.note}</span>}
                </dt>
                <dd className="text-[clamp(2.25rem,4vw,3.25rem)] font-extrabold leading-none tracking-[-0.04em] text-primary">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </PageSection>
      )}

      {stories.length > 0 && (
        <PageSection name="default" bg="parchment" eyebrow="Success stories" title={["Careers that", "started here"]}>
          <FannedCards items={stories.slice(0, 8).map((story) => ({ id: story.id, name: story.name, photo: story.photo, accent: story.accent }))} className="mb-4" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <li key={story.id} data-anim="card" className="flex flex-col gap-4 rounded-2xl border border-primary/10 bg-eit-surface p-6">
                <div className="relative aspect-square w-16 shrink-0 overflow-hidden rounded-full [container-type:inline-size]">
                  <SmartImage image={story.photo} accent={story.accent} label={initials(story.name)} sizes="64px" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-primary">{story.name}</p>
                  <p className="text-sm font-medium text-muted-foreground">{[story.role, story.company].filter(Boolean).join(" · ")}</p>
                  {story.batch && <p className="text-xs text-muted-foreground">{story.batch}</p>}
                </div>
                {story.story && <p className="text-sm leading-relaxed text-primary/80">{story.story}</p>}
              </li>
            ))}
          </ul>
        </PageSection>
      )}

      {recruiters.length > 0 && (
        <PageSection name="default" bg="navy" eyebrow="Our recruiters" title={["Companies that", "hire from EIT"]}>
          <Marquee seconds={38}>
            {recruiters.map((recruiter) => (
              <span
                key={recruiter.id}
                data-anim="row"
                className="mr-4 grid h-16 w-44 shrink-0 place-items-center rounded-2xl border border-white/15 bg-white/10 px-4 text-sm font-semibold text-white/80"
              >
                {recruiter.logo?.ready ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={recruiter.logo.src} alt={recruiter.logo.alt} className="max-h-9 w-auto object-contain" loading="lazy" />
                ) : (
                  recruiter.name
                )}
              </span>
            ))}
          </Marquee>
        </PageSection>
      )}

      {(process.length > 0 || policy.length > 0) && (
        <PageSection name="default" bg="surface" eyebrow="How it works" title={["Process and", "policy"]}>
          <div className="grid gap-10 lg:grid-cols-2">
            {process.length > 0 && (
              <div data-anim="panel-left">
                <p className="mb-5 text-sm font-semibold text-muted-foreground">Placement process</p>
                <ol className="space-y-6 border-l border-primary/15 pl-6">
                  {process.map((step, index) => (
                    <li key={step.id} className="relative">
                      <span aria-hidden className="absolute top-1 -left-[1.72rem] grid size-6 place-items-center rounded-full bg-primary text-xs font-bold text-white">
                        {index + 1}
                      </span>
                      <p className="text-base font-semibold text-primary">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {policy.length > 0 && (
              <div data-anim="panel-right">
                <p className="mb-5 text-sm font-semibold text-muted-foreground">Placement policy</p>
                <div className="space-y-6">
                  {policy.map((section) => (
                    <div key={section.heading}>
                      <p className="text-base font-semibold text-primary">{section.heading}</p>
                      {section.body.map((paragraph, index) => (
                        <p key={index} className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </PageSection>
      )}

      {performers.length > 0 && (
        <PageSection name="default" eyebrow="Highest performers" title={["Leading the", "placement season"]}>
          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {performers.map((performer) => (
              <li key={performer.id} data-anim="card" className="text-center">
                <div className="relative mx-auto aspect-square w-full max-w-28 overflow-hidden rounded-full [container-type:inline-size]">
                  <SmartImage image={performer.photo} accent={performer.accent} label={initials(performer.name)} sizes="112px" />
                </div>
                <p className="mt-3 text-sm font-semibold text-primary">{performer.name}</p>
                <p className="text-xs text-muted-foreground">{performer.company}</p>
              </li>
            ))}
          </ul>
        </PageSection>
      )}

      {gallery.length > 0 && (
        <PageSection name="default" bg="surface" eyebrow="Placement gallery" title={["Moments from", "placement season"]}>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {gallery.map((entry, index) => (
              <li key={index} data-anim="card" className="relative aspect-[4/3] overflow-hidden rounded-xl [container-type:inline-size]">
                <SmartImage image={entry.image} accent="#CFE7EC" sizes="(min-width: 1024px) 24vw, 45vw" />
                {entry.caption && (
                  <p className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-primary/80 to-transparent p-3 text-xs font-medium text-white">{entry.caption}</p>
                )}
              </li>
            ))}
          </ul>
        </PageSection>
      )}

      {!hasAnyContent && (
        <PageSection name="default">
          <SectionNote title="Placement data is being finalised">
            Statistics, recruiter logos, success stories and the placement gallery will appear here once supplied.
            In the meantime, browse the placement cell&apos;s pages below.
          </SectionNote>
        </PageSection>
      )}

      <PageSection name="default" bg="surface" eyebrow="More" title={["Explore", "placements"]}>
        <QuickLinksGrid links={links} columns={3} />
      </PageSection>

      <PageSection name="cta" bg="navy">
        <div data-anim="cta-buttons" className="flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-md text-2xl font-extrabold tracking-[-0.03em]">Have a question for the placement cell?</p>
          <Link href="/contact" className="group inline-flex items-center gap-3 rounded-md bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-eit-mist">
            Get in touch
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </PageSection>

      <ScrollAnimator />
    </>
  );
}