"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { aboutContent } from "@/data/home/about";
import { heroSettings, heroTimeThemes, type ResolvedHeroSlide } from "@/data/home/hero";
import { useMediaQuery } from "@/hooks/use-media-query";
import { loadGsap } from "@/lib/animations";
import { AboutCard, AboutContent } from "./AboutContent";
import { HeroBackground } from "./HeroBackground";
import { HeroContent } from "./HeroContent";
import { HeroControls } from "./HeroControls";
import { SplitImage } from "./SplitImage";

interface HomeIntroProps {
  slides: ResolvedHeroSlide[];
}

/** Desktop-class screens without reduced motion get the scroll morph; everything else a static layout. */
const MORPH_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

/**
 * Hero + About as ONE scene.
 *
 * Desktop: the scene is pinned for about one screen of scrolling. The full-screen hero photograph shrinks,
 * is cut into slanted parts and moves to the right while the About text fades in. Scrolling back reverses it.
 * The photograph always follows the hero carousel, so it changes in the About state too.
 * Native scrolling is never hijacked: the pin is only a scrubbed timeline.
 *
 * Mobile / reduced motion: the hero is a plain section and About sits underneath it with the split image
 * already in place (same carousel sync, no pinning).
 */
export function HomeIntro({ slides }: HomeIntroProps) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const total = slides.length;

  const [active, setActive] = useState(0);
  const [visited, setVisited] = useState<number[]>([0]);
  const [userPaused, setUserPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [inView, setInView] = useState(true);

  const outerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLElement>(null);
  const heroBackgroundRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const aboutLayerRef = useRef<HTMLDivElement>(null);
  const finalBoxRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    const target = ((index % total) + total) % total;
    setActive(target);
    setVisited((list) => (list.includes(target) ? list : [...list, target]));
  };

  const mounted = new Set([...visited, active, (active + 1) % total]);
  const timed = total > 1 && !reduceMotion; // animated progress line + CSS clock
  const pauseable = total > 1;
  const running = !userPaused && !interacting && inView;

  // Stop the carousel clock while the whole block is off screen.
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(outer);
    return () => observer.disconnect();
  }, []);

  // With reduced motion the CSS clock is off, so a plain timer advances the slides (they change without movement).
  useEffect(() => {
    if (!reduceMotion || total < 2 || userPaused || interacting || !inView) return;
    const id = window.setTimeout(() => {
      setActive((value) => (value + 1) % total);
      setVisited((list) => (list.includes((active + 1) % total) ? list : [...list, (active + 1) % total]));
    }, heroSettings.intervalMs);
    return () => window.clearTimeout(id);
  }, [reduceMotion, total, userPaused, interacting, inView, active]);

  // Scroll morph. Everything created here is reverted on cleanup.
  useEffect(() => {
    let revert: (() => void) | undefined;
    let cancelled = false;

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;

      const media = gsap.matchMedia();
      media.add(MORPH_QUERY, () => {
        const scene = sceneRef.current;
        const group = groupRef.current;
        const stage = stageRef.current;
        const heroBackground = heroBackgroundRef.current;
        const finalBox = finalBoxRef.current;
        const aboutLayer = aboutLayerRef.current;
        const light = lightRef.current;
        const heroContent = heroContentRef.current;
        const controls = controlsRef.current;
        if (!scene || !group || !stage || !heroBackground || !finalBox || !aboutLayer || !light || !heroContent || !controls) {
          return;
        }

        const items = gsap.utils.toArray<HTMLElement>("[data-about-item]", aboutLayer);
        const card = aboutLayer.querySelector<HTMLElement>("[data-about-card]");
        const caption = aboutLayer.querySelector<HTMLElement>("[data-about-caption]");
        const scrims = gsap.utils.toArray<HTMLElement>("[data-split-scrim]", group);

        // Where the picture ends up, measured relative to the scene so scrolling and pinning don't matter.
        const target = () => {
          const sceneRect = scene.getBoundingClientRect();
          const box = finalBox.getBoundingClientRect();
          const scale = box.width / sceneRect.width;
          finalBox.style.setProperty("--half-h", `${(scale * sceneRect.height) / 2}px`);
          return {
            scale,
            x: box.left + box.width / 2 - (sceneRect.left + sceneRect.width / 2),
            y: box.top - (sceneRect.top + sceneRect.height / 2),
          };
        };

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: scene,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // The hero background and the split image look identical at progress 0; swap as soon as scrolling starts.
              const started = self.progress > 0.003;
              stage.style.opacity = started ? "1" : "0";
              heroBackground.style.opacity = started ? "0" : "1";
            },
          },
        });

        timeline
          .to(group, { scale: () => target().scale, x: () => target().x, y: () => target().y, ease: "power2.inOut", duration: 0.7 }, 0)
          .fromTo(group, { "--p": 0 }, { "--p": 1, ease: "power1.inOut", duration: 0.65 }, 0.05)
          .to(scrims, { opacity: 0, duration: 0.55 }, 0)
          .to(light, { opacity: 1, duration: 0.55 }, 0.05)
          .to(heroContent, { autoAlpha: 0, yPercent: -6, duration: 0.28 }, 0)
          .to(controls, { autoAlpha: 0, duration: 0.2 }, 0)
          .fromTo(items, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.25, ease: "power2.out" }, 0.5);

        if (card) timeline.fromTo(card, { autoAlpha: 0, y: 24, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.25, ease: "power2.out" }, 0.68);
        if (caption) timeline.fromTo(caption, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, 0.78);
        timeline.to({}, { duration: 0.15 }); // short hold on the finished composition

        return () => {
          stage.style.opacity = "";
          heroBackground.style.opacity = "";
        };
      });

      revert = () => media.revert();
      document.fonts?.ready.then(() => !cancelled && ScrollTrigger.refresh());
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  if (total === 0) return null;

  const slide = slides[active];
  const theme = heroTimeThemes[slide.timeTheme];

  const splitProps = { slides, active, mounted, panels: aboutContent.panelCount, reduceMotion };

  return (
    <div ref={outerRef} className="-mt-(--nav-h)">
      <section
        ref={sceneRef}
        aria-roledescription="carousel"
        aria-label="Highlights from EIT"
        className="on-dark relative isolate h-svh min-h-[620px] overflow-hidden bg-primary text-white"
        onFocusCapture={(event) => {
          if (event.target instanceof HTMLElement && event.target.matches(":focus-visible")) setInteracting(true);
        }}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false);
        }}
      >
        {/* Light surface that appears behind the shrinking photograph */}
        <div ref={lightRef} aria-hidden className="absolute inset-0 -z-20 bg-eit-surface opacity-0" />

        <HeroBackground
          slides={slides}
          active={active}
          mounted={mounted}
          reduceMotion={reduceMotion}
          wrapperRef={heroBackgroundRef}
        />

        {/* The same photograph, cut into slanted parts. Invisible until the page starts to scroll. */}
        <div ref={stageRef} aria-hidden className="pointer-events-none absolute inset-0 hidden opacity-0 morph:block">
          <SplitImage {...splitProps} variant="morph" groupRef={groupRef} />
        </div>

        <div ref={heroContentRef} className="relative z-10 h-full">
          <Container className="flex h-full flex-col justify-center pt-(--nav-h) pb-40 sm:pb-36 lg:pl-44">
            <div aria-live={pauseable && running ? "off" : "polite"}>
              <HeroContent slide={slide} index={active} total={total} theme={theme} reduceMotion={reduceMotion} />
            </div>
          </Container>

          {heroSettings.keywords.length > 0 && (
            <Container className="pointer-events-none absolute inset-x-0 top-[28%] hidden xl:block">
              <ul className="absolute top-0 right-10 space-y-2 border-l border-white/30 pl-6 text-sm text-white/80">
                {heroSettings.keywords.map((word) => (
                  <li key={word}>{word}</li>
                ))}
              </ul>
            </Container>
          )}
        </div>

        <div ref={controlsRef} className="pointer-events-none absolute inset-0 z-20">
          <HeroControls
            slides={slides}
            active={active}
            accent={theme.accent}
            intervalMs={heroSettings.intervalMs}
            timed={timed}
            pauseable={pauseable}
            running={running}
            userPaused={userPaused}
            onSelect={goTo}
            onPrev={() => goTo(active - 1)}
            onNext={() => goTo(active + 1)}
            onTogglePause={() => setUserPaused((value) => !value)}
          />
        </div>

        {/* About, morph version: text on the left, target box for the photograph on the right */}
        <div ref={aboutLayerRef} className="on-light pointer-events-none absolute inset-0 z-20 hidden morph:block">
          <Container className="relative flex h-full items-center">
            <AboutContent
              content={aboutContent}
              className="pointer-events-auto w-[min(34rem,45%)] [&_[data-about-item]]:invisible"
            />
            <div ref={finalBoxRef} aria-hidden className="absolute top-1/2 right-10 h-0 w-[46%]">
              <AboutCard
                words={aboutContent.card}
                className="invisible absolute -right-6 top-[calc(var(--half-h,20vh)*-0.35)]"
              />
              <p
                data-about-caption
                className="invisible absolute right-0 top-[calc(var(--half-h,20vh)+2.25rem)] text-sm text-muted-foreground"
              >
                {aboutContent.caption}
              </p>
            </div>
          </Container>
        </div>
      </section>

      {/* About, static version: small screens and reduced motion */}
      <section className="overflow-x-clip bg-eit-surface py-20 morph:hidden">
        <Container className="grid items-center gap-14 md:grid-cols-2">
          <AboutContent content={aboutContent} />
          <div className="relative mx-auto w-full max-w-xl px-3">
            <div className="relative aspect-[5/4] w-full">
              <SplitImage {...splitProps} variant="static" />
              <AboutCard words={aboutContent.card} className="absolute -right-1 bottom-6 w-32 p-4 sm:w-40" />
            </div>
            <p className="mt-6 text-right text-sm text-muted-foreground">{aboutContent.caption}</p>
          </div>
        </Container>
      </section>
    </div>
  );
}
