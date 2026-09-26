"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { eventsSection } from "@/data/home/events";
import { useCarousel } from "@/hooks/use-carousel";
import { useMediaQuery } from "@/hooks/use-media-query";
import { easing } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { EventView, NoticeView } from "@/types/sections";
import { CarouselControls, SlideProgress } from "./CarouselControls";
import { SectionHeading } from "./SectionHeading";
import { SmartImage } from "./SmartImage";

const VISIBLE_NOTICES = 4;

/**
 * Events & Notifications: upcoming events on the left (one at a time, with a date-tab strip) and a notice board on
 * the right. Both move on by themselves at their own pace, and each has arrows and a pause button.
 */
export function EventsSection({ events, notices }: { events: EventView[]; notices: NoticeView[] }) {
  const { eyebrow, title, description, intervalMs, noticeStepMs, eventsAction, noticesAction } = eventsSection;
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const eventCarousel = useCarousel<HTMLDivElement>({ count: Math.max(events.length, 1), intervalMs });
  const noticeCarousel = useCarousel<HTMLDivElement>({ count: Math.max(notices.length, 1), intervalMs: noticeStepMs });
  const { rootRef: eventsRef, bind: eventsBind, ...eventState } = eventCarousel;
  const { rootRef: noticesRef, bind: noticesBind, ...noticeState } = noticeCarousel;

  if (events.length === 0 && notices.length === 0) return null;

  const current = events[eventState.index];
  const windowSize = Math.min(notices.length, VISIBLE_NOTICES);
  const shownNotices = Array.from({ length: windowSize }, (_, offset) => notices[(noticeState.index + offset) % notices.length]);

  return (
    <section aria-label="Events and notifications" data-scroll-section="events" className="overflow-x-clip bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          {/* Events */}
          {events.length > 0 && current && (
            <div
              ref={eventsRef}
              {...eventsBind}
              aria-roledescription="carousel"
              aria-label="Upcoming events"
              data-anim="panel-left"
              className="relative overflow-hidden rounded-[2rem] bg-eit-surface p-7 sm:p-10"
            >
              <div aria-hidden className="absolute inset-y-0 right-0 hidden w-[45%] sm:block">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={current.id}
                    className="absolute inset-0 [container-type:inline-size]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0.01 : 0.8 }}
                  >
                    <SmartImage image={current.image} accent={current.accent} label={current.day} sizes="(min-width: 1024px) 25vw, 40vw" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-r from-eit-surface via-eit-surface/60 to-transparent" />
              </div>

              <div className="relative flex min-h-[21rem] flex-col justify-between gap-8 sm:max-w-[58%]" aria-live={eventState.running ? "off" : "polite"}>
                {/* mode="wait" previously held the OUTGOING event on screen for its full ~450ms exit
                    animation before mounting the next one, while the date-tab buttons below (driven
                    straight off eventState.index, with no such delay) already showed the new date as
                    active the instant it was clicked. For that whole window the "active" tab and the
                    visible day/title genuinely disagreed (usability audit #32/#33 — e.g. "26 Oct" marked
                    active while the card still read "12 Oct"). popLayout removes the outgoing card from
                    the layout immediately so the incoming one mounts and starts fading in on the same
                    render as the state change, keeping the active tab and the visible content in sync. */}
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
                    transition={{ duration: reduceMotion ? 0.01 : 0.45, ease: easing.out }}
                  >
                    <div className="flex items-end gap-4">
                      <span className="text-[clamp(4rem,9vw,7rem)] leading-[0.85] font-extrabold tracking-[-0.06em] text-primary">{current.day}</span>
                      <span className="pb-1 text-lg font-bold leading-tight text-primary">
                        {current.month}
                        <span className="block text-sm font-medium text-muted-foreground">{current.year}</span>
                      </span>
                    </div>
                    <h3 className="mt-6 text-2xl font-bold tracking-tight text-primary sm:text-3xl">{current.title}</h3>
                    {current.venue && (
                      <p className="mt-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <MapPin aria-hidden className="size-4" />
                        {current.venue}
                      </p>
                    )}
                    {current.summary && <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">{current.summary}</p>}
                  </motion.div>
                </AnimatePresence>

                <div className="space-y-5">
                  <SlideProgress />
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <ol className="flex flex-wrap gap-2" aria-label="Choose an event">
                      {events.map((event, index) => (
                        <li key={event.id}>
                          <button
                            type="button"
                            onClick={() => eventState.goTo(index)}
                            aria-label={`${event.day} ${event.month}: ${event.title}`}
                            aria-current={index === eventState.index ? "true" : undefined}
                            className={cn(
                              "rounded-full border px-3.5 py-1.5 text-xs font-bold tabular-nums transition-colors",
                              index === eventState.index ? "border-primary bg-primary text-white" : "border-primary/20 bg-white text-primary hover:bg-primary/5",
                            )}
                          >
                            {event.day} {event.month}
                          </button>
                        </li>
                      ))}
                    </ol>
                    <CarouselControls
                      label="event"
                      onPrev={eventState.prev}
                      onNext={eventState.next}
                      onTogglePause={eventState.togglePause}
                      userPaused={eventState.userPaused}
                      timed={eventState.timed}
                    />
                  </div>
                  <Link href={eventsAction.href} className="group inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    {eventsAction.label}
                    <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Notice board */}
          {notices.length > 0 && (
            <div
              ref={noticesRef}
              {...noticesBind}
              aria-roledescription="carousel"
              aria-label="Notice board"
              data-anim="panel-right"
              className="flex flex-col rounded-[2rem] bg-eit-peach/40 p-7 text-primary sm:p-9"
            >
              <h3 className="text-xl font-bold tracking-tight">Notice board</h3>

              <ol className="relative mt-6 flex-1" aria-live={noticeState.running ? "off" : "polite"}>
                <AnimatePresence initial={false} mode="popLayout">
                  {shownNotices.map((notice) => (
                    <motion.li
                      key={notice.id}
                      layout={!reduceMotion}
                      initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: reduceMotion ? 0 : -24 }}
                      transition={{ duration: reduceMotion ? 0.01 : 0.55, ease: easing.out }}
                      className="border-b border-primary/15 py-4 first:pt-0"
                    >
                      <Link href={notice.href ?? noticesAction.href} className="group block">
                        <span className="flex items-center gap-3 text-xs font-semibold text-primary/65">
                          {notice.dateLabel}
                          {notice.important && <span className="rounded-full bg-eit-accent px-2 py-0.5 text-[0.65rem] font-bold text-primary">Important</span>}
                        </span>
                        <span className="mt-1 block text-base leading-snug font-medium group-hover:underline group-hover:decoration-eit-accent group-hover:decoration-2 group-hover:underline-offset-4">
                          {notice.title}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ol>

              {/* Playback controls now sit at the bottom of every carousel on this page — here, beside
                  the board's own action link — instead of top-right here but bottom-left on the events
                  panel next to it (usability audit #34/#36 flagged that inconsistency). */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <Link href={noticesAction.href} className="group inline-flex items-center gap-2 text-sm font-semibold text-primary underline decoration-eit-accent decoration-2 underline-offset-4">
                  {noticesAction.label}
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <CarouselControls
                  label="notice"
                  onPrev={noticeState.prev}
                  onNext={noticeState.next}
                  onTogglePause={noticeState.togglePause}
                  userPaused={noticeState.userPaused}
                  timed={noticeState.timed}
                />
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
