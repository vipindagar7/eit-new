"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowRight, ChevronRight, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { headerCta, mainNav, menuNav, utilityNav } from "@/data/site/navigation";
import type { SocialLink } from "@/data/site/social";
import { easing } from "@/lib/animations";
import type { LogoAssets } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { SearchDialog } from "./SearchDialog";

/** Hover / open backgrounds that adapt to the transparent and solid states. */
const itemSurface =
  "hover:bg-white/10 data-[state=open]:bg-white/10 group-data-[solid=true]/nav:hover:bg-primary/5 group-data-[solid=true]/nav:data-[state=open]:bg-primary/5";

/** Accent underline for the current page. */
const activeMark =
  "relative px-2 text-sm min-[1360px]:px-3 min-[1360px]:text-[0.9375rem] after:absolute after:inset-x-2 min-[1360px]:after:inset-x-3 after:bottom-0.5 after:h-0.5 after:rounded-full after:bg-eit-accent after:opacity-0 aria-[current=page]:after:opacity-100";

const iconButton =
  "text-current hover:bg-white/10 hover:text-current group-data-[solid=true]/nav:hover:bg-primary/5";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

/**
 * Site navbar.
 *  - Home: transparent over the hero, turning light + blurred once the page scrolls.
 *  - Every other page: light from the start.
 * Colour, background and shadow are animated with Framer Motion; children inherit the text colour.
 */
export function Navbar({ logoAssets, social }: { logoAssets: LogoAssets; social: SocialLink[] }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Overlays remember the path they were opened on, so they close by themselves on navigation.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const [searchPath, setSearchPath] = useState<string | null>(null);
  const menuOpen = menuPath === pathname;
  const searchOpen = searchPath === pathname;

  const solid = pathname !== "/" || scrolled;

  return (
    <>
      <motion.header
        data-solid={solid}
        initial={false}
        animate={solid ? "solid" : "clear"}
        variants={{
          clear: {
            backgroundColor: "rgba(255, 255, 255, 0.07)",
            color: "#ffffff",
            borderBottomColor: "rgba(255, 255, 255, 0.22)",
            boxShadow: "0 10px 30px -18px rgba(23, 50, 77, 0)",
          },
          solid: {
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            color: "#17324D",
            borderBottomColor: "rgba(23, 50, 77, 0.08)",
            boxShadow: "0 10px 30px -18px rgba(23, 50, 77, 0.5)",
          },
        }}
        transition={{ duration: reduce ? 0 : 0.35, ease: easing.out }}
        className={cn(
          "group/nav sticky top-0 z-50 h-(--nav-h) border-b backdrop-blur-xl backdrop-saturate-150",
          !solid && "on-dark",
        )}
      >
        <motion.span aria-hidden style={{ scaleX: scrollYProgress }} className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-0.5 origin-left bg-eit-accent" />
        <Container className="grid h-full grid-cols-[auto_1fr_auto] items-center gap-4 min-[1360px]:gap-6">
          <Logo variant="adaptive" assets={logoAssets} nameClassName="hidden sm:flex lg:hidden min-[1360px]:flex" />

          {/* Desktop: centre navigation */}
          <NavigationMenu aria-label="Primary" className="col-start-2 hidden justify-self-center lg:flex">
            <NavigationMenuList>
              {mainNav.map((item) => (
                <NavigationMenuItem key={item.label}>
                  {item.sections ? (
                    <>
                      <NavigationMenuTrigger
                        aria-current={isActive(pathname, item.href) ? "page" : undefined}
                        className={cn(itemSurface, activeMark, "bg-transparent")}
                      >
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="flex w-max max-w-[calc(100vw-3rem)] flex-wrap gap-x-6 gap-y-6 p-6 text-primary">
                          <div className="w-32 shrink-0">
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                className="inline-flex items-center gap-1 text-xl font-bold tracking-tight hover:underline hover:decoration-eit-accent hover:decoration-2 hover:underline-offset-8"
                              >
                                {item.label}
                                <ChevronRight aria-hidden className="size-5" />
                              </Link>
                            </NavigationMenuLink>
                          </div>
                          {item.sections.map((section, index) => (
                            <div key={section.title ?? index} className="w-56 border-l border-primary/10 pl-5">
                              {section.title && (
                                <h3 className="mb-2 text-sm font-bold text-muted-foreground">{section.title}</h3>
                              )}
                              <ul>
                                {section.links.map((entry) => (
                                  <li key={entry.href}>
                                    <NavigationMenuLink asChild>
                                      <Link
                                        href={entry.href}
                                        aria-current={pathname === entry.href ? "page" : undefined}
                                        className="block rounded-md px-2 py-1.5 text-[0.9375rem] hover:bg-eit-mist/50 aria-[current=page]:font-bold"
                                      >
                                        {entry.label}
                                      </Link>
                                    </NavigationMenuLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        aria-current={isActive(pathname, item.href) ? "page" : undefined}
                        className={cn(navigationMenuTriggerStyle(), itemSurface, activeMark)}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right cluster */}
          <div className="col-start-3 flex items-center gap-1.5 justify-self-end">
            <Button
              ref={searchButtonRef}
              variant="ghost"
              size="icon"
              aria-label="Search the site"
              onClick={() => setSearchPath(pathname)}
              className={cn(iconButton, "hidden min-[1360px]:inline-flex")}
            >
              <Search aria-hidden className="size-5" />
            </Button>

            <Button
              asChild
              className={cn(
                "hidden h-11 rounded-full px-4 text-sm lg:inline-flex min-[1360px]:px-5 min-[1360px]:text-[0.9375rem]",
                "bg-white text-primary hover:bg-white/90",
                "group-data-[solid=true]/nav:bg-primary group-data-[solid=true]/nav:text-white group-data-[solid=true]/nav:hover:bg-primary/90",
              )}
            >
              <Link href={headerCta.href}>
                {headerCta.label}
                <ArrowRight aria-hidden />
              </Link>
            </Button>

            <Button
              ref={menuButtonRef}
              variant="ghost"
              size="icon"
              aria-label="Open site menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              onClick={() => setMenuPath(pathname)}
              className={iconButton}
            >
              <Menu aria-hidden className="size-6" />
            </Button>
          </div>
        </Container>
      </motion.header>

      <MobileNav
        open={menuOpen}
        onOpenChange={(open) => setMenuPath(open ? pathname : null)}
        items={menuNav}
        cta={headerCta}
        utility={utilityNav}
        logoAssets={logoAssets}
        social={social}
        onSearch={() => setSearchPath(pathname)}
        returnFocusRef={menuButtonRef}
      />
      <SearchDialog
        open={searchOpen}
        onOpenChange={(open) => setSearchPath(open ? pathname : null)}
        onCloseFocus={() => {
          // The search button is hidden on small screens; fall back to the menu button.
          const target = searchButtonRef.current?.offsetParent ? searchButtonRef.current : menuButtonRef.current;
          target?.focus();
        }}
      />
    </>
  );
}
