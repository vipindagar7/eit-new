import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { getRoute } from "@/data/site/routes";

interface ComingSoonProps {
  /** Registered route path, e.g. "/about". Drives the page label and breadcrumbs. */
  path: string;
}

/**
 * The one placeholder used by every route until its real page is designed.
 * Replace a route by swapping <ComingSoon /> in that route's page.tsx — nothing else changes.
 */
export function ComingSoon({ path }: ComingSoonProps) {
  const route = getRoute(path);
  const isHome = path === "/";

  return (
    <section className="flex flex-1 py-12 md:py-20">
      <Container className="flex flex-col">
        <Breadcrumbs path={path} />

        <div className="my-auto max-w-4xl py-16 md:py-24">
          <span aria-hidden className="mb-8 block h-1 w-16 bg-eit-accent" />

          {!isHome && route && <p className="mb-3 text-lg font-semibold text-muted-foreground">{route.title}</p>}

          <h1 className="text-[clamp(3rem,10vw,7.5rem)] font-extrabold leading-[0.95] tracking-[-0.045em] text-primary">
            Coming Soon
          </h1>

          <p className="mt-8 max-w-xl text-xl font-medium text-foreground">
            We&apos;re building something better for the EIT community.
          </p>
          <p className="mt-2 max-w-xl text-base text-muted-foreground">This page is currently under development.</p>

          {!isHome && (
            <Link
              href="/"
              className="mt-10 inline-flex h-11 items-center gap-2 rounded-md border border-primary px-5 text-[0.9375rem] font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowLeft aria-hidden className="size-4" />
              Back to Home
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
}
