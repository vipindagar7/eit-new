import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/layout/BrandMark";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { admissionsCta } from "@/data/home/admissions";

/** Slanted pastel bars echoing the split photograph in the About section. Purely decorative. */
const bars = [
  { color: "#DDAFBD", height: "78%", top: "8%", right: "28%" },
  { color: "#F3C4AA", height: "88%", top: "0%", right: "20%" },
  { color: "#D3E9DC", height: "70%", top: "16%", right: "12%" },
  { color: "#C8A5C9", height: "82%", top: "6%", right: "4%" },
];

/** Admissions call to action: a bold pastel band at the end of the page, with the quickest answers one click away. */
export function AdmissionsCta() {
  const { eyebrow, title, description, primaryAction, secondaryAction, links, contactAction } = admissionsCta;

  return (
    <section aria-label="Admissions" data-scroll-section="cta" className="overflow-x-clip bg-white py-16 lg:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-eit-mist px-7 py-14 sm:px-12 lg:px-16 lg:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[45%] lg:block">
            {bars.map((bar, index) => (
              <span
                key={index}
                data-anim="bar"
                className="absolute w-[17%] -skew-x-[8deg] rounded-[1.4rem] opacity-90"
                style={{ backgroundColor: bar.color, height: bar.height, top: bar.top, right: bar.right }}
              />
            ))}
          </div>

          <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end">
            <div>
              <p data-anim="heading" className="mb-5 flex items-center gap-3 text-sm font-semibold text-primary/75">
                <BrandMark className="size-6" />
                {eyebrow}
              </p>
              <h2 data-anim="heading" className="text-[clamp(2.5rem,5.4vw,4.75rem)] font-extrabold leading-[1] tracking-[-0.045em] text-primary">
                {title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <p data-anim="heading" className="mt-6 max-w-lg text-lg leading-relaxed text-primary/80">{description}</p>

              <div data-anim="cta-buttons" className="mt-9 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full">
                  <Link href={primaryAction.href}>
                    {primaryAction.label}
                    <ArrowRight aria-hidden />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="rounded-full border border-primary/40 hover:bg-white/50">
                  <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
                </Button>
              </div>
            </div>

            <div data-anim="panel-right" className="lg:relative lg:z-10 lg:rounded-2xl lg:bg-white lg:p-6 lg:shadow-[0_24px_48px_-28px_rgba(23,50,77,0.5)]">
              <h3 className="text-sm font-bold text-primary/75">Quick answers</h3>
              <ul className="mt-3 divide-y divide-primary/15">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="group flex items-center justify-between gap-4 py-3 text-base font-semibold text-primary">
                      {link.label}
                      <ArrowUpRight aria-hidden className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={contactAction.href} className="mt-4 inline-block text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                {contactAction.label}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
