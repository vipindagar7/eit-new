import type { HistoryMilestone } from "@/data/about/history";
import { cn } from "@/lib/utils";

interface HistoryTimelineProps {
  milestones: HistoryMilestone[];
}

/**
 * A vertical history timeline, 2007 to present: a centre line that draws itself as the section
 * scrolls through view, with milestones alternating left and right, each tilting in with real CSS 3D
 * perspective (not a WebGL scene — see the conversation that scoped this down from the original
 * "3D particle" ask). The line's growth and each row's alternating tilt are driven by the "history"
 * preset in ScrollAnimator (see components/animations/ScrollAnimator.tsx) via the shared
 * `data-anim`/`data-scroll-section` vocabulary every other page already uses — no bespoke JS here.
 */
export function HistoryTimeline({ milestones }: HistoryTimelineProps) {
  if (milestones.length === 0) return null;

  return (
    <div className="relative" style={{ perspective: 1200 }}>
      <span
        aria-hidden
        data-anim="stage"
        className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-primary/20 sm:block"
        style={{ transformOrigin: "top center" }}
      />
      <span aria-hidden className="absolute top-0 bottom-0 left-3 w-px bg-primary/20 sm:hidden" />

      <ol className="relative space-y-12 sm:space-y-16">
        {milestones.map((milestone, index) => {
          const onRight = index % 2 === 1;
          return (
            <li
              key={milestone.id}
              data-anim="row"
              style={{ transformStyle: "preserve-3d" }}
              className={cn(
                "relative pl-10 sm:w-[calc(50%-2.5rem)] sm:pl-0",
                onRight ? "sm:ml-auto sm:pl-10" : "sm:mr-auto sm:pr-10 sm:text-right",
              )}
            >
              {/* Mobile: dot on the single left-hand line. */}
              <span aria-hidden className="absolute top-1 left-[0.55rem] size-2.5 rounded-full bg-eit-accent sm:hidden" />
              {/* Desktop: dot on whichever side of the centre line this entry sits on. */}
              <span
                aria-hidden
                className={cn("absolute top-1 hidden size-2.5 rounded-full bg-eit-accent sm:block", onRight ? "-left-[0.55rem]" : "-right-[0.55rem]")}
              />
              <p className="text-sm font-bold tracking-[0.14em] text-eit-accent uppercase">{milestone.year}</p>
              <p className="mt-1 text-xl font-semibold text-primary">{milestone.title}</p>
              {milestone.description && <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{milestone.description}</p>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
