"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { clubsSection } from "@/data/home/clubs";
import type { ClubView } from "@/types/sections";
import { Marquee } from "./Marquee";
import { SectionHeading } from "./SectionHeading";
import { SmartImage, initials } from "./SmartImage";

function ClubCard({ club }: { club: ClubView }) {
  return (
    <article className="mr-4 flex w-72 shrink-0 items-start gap-4 rounded-[1.4rem] p-4 pr-6" style={{ backgroundColor: `${club.accent}66` }}>
      <span className="relative size-16 shrink-0 overflow-hidden rounded-2xl bg-white [container-type:inline-size]">
        <SmartImage image={club.logo} accent={club.accent} label={initials(club.name)} sizes="64px" imageClassName="object-contain p-2" />
      </span>
      <span className="min-w-0">
        {/* Full club names (e.g. "Sample Entrepreneurship Club") no longer get clipped mid-word: they wrap
            onto a second line instead of truncating with an ellipsis (see usability audit #5-16). */}
        <span className="line-clamp-2 text-lg leading-snug font-bold tracking-tight text-primary">{club.name}</span>
        {club.summary && <span className="mt-0.5 line-clamp-1 block text-sm text-primary/70">{club.summary}</span>}
      </span>
    </article>
  );
}

/**
 * Clubs & Activities: two rows of club cards drifting in opposite directions. They stop on hover or keyboard focus
 * and with the pause button; with reduced motion they become a plain scrollable strip.
 */
export function ClubsSection({ clubs }: { clubs: ClubView[] }) {
  const { eyebrow, title, description, marqueeSeconds, action, secondaryAction } = clubsSection;
  const [paused, setPaused] = useState(false);

  if (clubs.length === 0) return null;

  // Two rows built from the same clubs, in a different order, so neighbours differ between rows.
  const rowA = clubs;
  const rowB = [...clubs.slice(Math.ceil(clubs.length / 2)), ...clubs.slice(0, Math.ceil(clubs.length / 2))].reverse();
  // Very short lists are repeated so a row is always wider than the screen.
  const fill = (list: ClubView[]) => (list.length >= 6 ? list : Array.from({ length: 6 }, (_, index) => list[index % list.length]));

  return (
    <section aria-label="Clubs and activities" data-scroll-section="clubs" className="overflow-x-clip bg-eit-surface py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="rounded-full">
              <Link href={action.href}>
                {action.label}
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="rounded-full border border-primary/25 hover:bg-primary/5">
              <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border border-primary/25 text-primary hover:bg-primary/5"
              onClick={() => setPaused((value) => !value)}
              aria-pressed={paused}
              aria-label={paused ? "Play clubs ticker" : "Pause clubs ticker"}
            >
              {paused ? <Play aria-hidden /> : <Pause aria-hidden />}
            </Button>
          </div>
        </div>
      </Container>

      <div className="mt-12 space-y-4">
        <div data-anim="marquee-row">
          <Marquee seconds={marqueeSeconds} paused={paused}>
            {fill(rowA).map((club, index) => (
              <ClubCard key={`${club.id}-${index}`} club={club} />
            ))}
          </Marquee>
        </div>
        <div data-anim="marquee-row" data-from="right">
          <Marquee seconds={marqueeSeconds * 1.15} paused={paused} reverse>
            {fill(rowB).map((club, index) => (
              <ClubCard key={`${club.id}-${index}`} club={club} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
