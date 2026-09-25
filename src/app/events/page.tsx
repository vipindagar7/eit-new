import Link from "next/link";
import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { SmartImage } from "@/components/home/SmartImage";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { SectionNote } from "@/components/pages/SectionNote";
import { eventsSection } from "@/data/home/events";
import { getEvents, getNotices } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/events";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const events = getEvents(48);
  const notices = getNotices(24);

  return (
    <>
      <PageHero
        path={path}
        eyebrow={eventsSection.eyebrow}
        title={eventsSection.title}
        description={eventsSection.description}
        secondaryAction={{ label: "Academic circulars", href: "/academics/circulars" }}
        tone="mist"
      />

      <PageSection name="default" eyebrow="Calendar" title={["Upcoming", "events"]}>
        {events.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <li key={event.id} data-anim="card" className="overflow-hidden rounded-2xl border border-primary/10 bg-white">
                <div className="relative aspect-[16/10] overflow-hidden [container-type:inline-size]">
                  <SmartImage image={event.image} accent={event.accent} sizes="(min-width: 1024px) 30vw, 90vw" />
                  <div className="absolute top-3 left-3 rounded-lg bg-white/95 px-3 py-1.5 text-center leading-tight shadow-sm">
                    <p className="text-lg font-extrabold text-primary">{event.day}</p>
                    <p className="text-[0.6875rem] font-semibold tracking-wide text-eit-slate uppercase">{event.month}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-lg font-semibold text-primary">{event.title}</p>
                  {event.venue && <p className="mt-1 text-sm text-muted-foreground">{event.venue}</p>}
                  {event.summary && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{event.summary}</p>}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <SectionNote title="No events are scheduled right now">Check back soon, or see the circulars below.</SectionNote>
        )}
      </PageSection>

      <PageSection name="default" bg="surface" eyebrow="Notices" title={["Latest", "circulars"]}>
        {notices.length > 0 ? (
          <ol className="divide-y divide-primary/10 border-y border-primary/10">
            {notices.map((notice) => {
              const content = (
                <div data-anim="row" className="flex flex-wrap items-center justify-between gap-3 py-4">
                  <p className="text-base font-medium text-primary">
                    {notice.important && <span className="mr-2 rounded-full bg-eit-rose/30 px-2.5 py-0.5 text-xs font-bold text-primary">New</span>}
                    {notice.title}
                  </p>
                  <p className="shrink-0 text-sm text-muted-foreground">{notice.dateLabel}</p>
                </div>
              );
              return <li key={notice.id}>{notice.href ? <Link href={notice.href} className="block hover:bg-primary/5">{content}</Link> : content}</li>;
            })}
          </ol>
        ) : (
          <SectionNote title="No circulars published yet">Notices will be listed here as they are issued.</SectionNote>
        )}
      </PageSection>

      <ScrollAnimator />
    </>
  );
}
