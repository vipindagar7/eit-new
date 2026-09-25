import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { whyEitPoints, whyEitSection } from "@/data/home/whyEit";
import { SectionHeading } from "./SectionHeading";

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Why EIT: an editorial list, not a card grid. A sticky headline on the left, six large numbered rows on the
 * right. Each row is a link to the page that backs the statement, and carries its own pastel accent.
 */
export function WhyEitSection() {
  const { eyebrow, title, description, action } = whyEitSection;

  return (
    <section data-scroll-section="why" className="overflow-x-clip bg-white py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <Button asChild size="lg" className="mt-9 rounded-full">
            <Link href={action.href}>
              {action.label}
              <ArrowUpRight aria-hidden />
            </Link>
          </Button>
        </div>

        <ol className="border-t border-primary/15">
          {whyEitPoints.map((point, index) => (
            <li key={point.id} data-anim="row" className="border-b border-primary/15">
              <div>
                <Link
                  href={point.href}
                  className="group relative grid grid-cols-[3.5rem_minmax(0,1fr)_auto] items-start gap-x-5 py-7 sm:grid-cols-[5rem_minmax(0,1fr)_auto] sm:py-9"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    style={{ backgroundColor: point.accent }}
                  />
                  <span className="text-[clamp(1.75rem,3vw,2.5rem)] leading-none font-extrabold tracking-[-0.04em] text-primary/25 tabular-nums transition-colors group-hover:text-primary">
                    {pad(index + 1)}
                  </span>
                  <span>
                    <span className="flex items-center gap-3 text-xl font-bold tracking-tight text-primary sm:text-2xl">
                      <span aria-hidden className="size-3 shrink-0 rounded-full" style={{ backgroundColor: point.accent }} />
                      {point.title}
                    </span>
                    <span className="mt-2 block max-w-xl text-base leading-relaxed text-muted-foreground">{point.body}</span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="mt-1 size-6 text-primary/40 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary"
                  />
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
