import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="flex flex-1 py-20">
      <Container className="my-auto max-w-3xl">
        <span aria-hidden className="mb-8 block h-1 w-16 bg-eit-accent" />
        <h1 className="text-5xl font-extrabold tracking-[-0.04em] text-primary md:text-6xl">Page not found</h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          The page you are looking for does not exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex h-11 items-center rounded-md bg-primary px-5 text-[0.9375rem] font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Go to Home
        </Link>
      </Container>
    </section>
  );
}
