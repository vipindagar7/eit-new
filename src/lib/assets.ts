/**
 * Server-only asset lookups. These read /public at build/render time so the site
 * works before the real photographs, videos and logo exist, and picks them up
 * automatically once they are dropped into the folders.
 * Do not import this file from a Client Component.
 */
import { existsSync } from "node:fs";
import path from "node:path";
import { heroSlides, type ResolvedHeroSlide } from "@/data/home/hero";
import { featuredProgramSlugs } from "@/data/home/programs";
import { programs, type ResolvedProgram } from "@/data/programs/programs";

const exists = (publicPath: string) => existsSync(path.join(process.cwd(), "public", publicPath));

export function getHeroSlides(): ResolvedHeroSlide[] {
  return heroSlides.map((slide) => ({
    ...slide,
    imageReady: exists(slide.image),
    videoReady: slide.video ? exists(slide.video) : false,
  }));
}

/** Featured programs, in display order, with a flag for whether each photograph exists. */
export function getPrograms(): ResolvedProgram[] {
  return featuredProgramSlugs
    .map((slug) => programs.find((program) => program.slug === slug))
    .filter((program): program is NonNullable<typeof program> => Boolean(program))
    .map((program) => ({ ...program, imageReady: program.image ? exists(program.image.src) : false }));
}

export interface LogoAssets {
  /** Full-colour logo for light backgrounds. */
  color?: string;
  /** White logo for the transparent navbar over the hero. Falls back to `color` inverted. */
  light?: string;
}

const LOGO_DIR = "/images/logo";
const EXTENSIONS = ["svg", "png", "webp"];

const findLogo = (names: string[]) => {
  for (const name of names) {
    for (const ext of EXTENSIONS) {
      const candidate = `${LOGO_DIR}/${name}.${ext}`;
      if (exists(candidate)) return candidate;
    }
  }
  return undefined;
};

/** Looks for eit-logo.(svg|png|webp) and eit-logo-white.(svg|png|webp) in /public/images/logo. */
export function getLogoAssets(): LogoAssets {
  return {
    color: findLogo(["eit-logo"]),
    light: findLogo(["eit-logo-white", "eit-logo-light"]),
  };
}
