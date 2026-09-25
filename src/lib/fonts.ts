/**
 * Typography foundation — the single place fonts are configured.
 *
 * Manrope (variable, weights 200–800) is bundled locally in /src/fonts and loaded
 * through next/font/local: no runtime request to Google, no layout shift.
 * To swap the family, change this file and the --font-sans token in globals.css.
 */
import localFont from "next/font/local";

export const fontSans = localFont({
  src: "../fonts/manrope-latin-wght-normal.woff2",
  weight: "200 800",
  style: "normal",
  display: "swap",
  variable: "--font-manrope",
  fallback: ["system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
});

/**
 * Handwritten accent (Caveat). Used sparingly for short signature phrases such as
 * "More Than A Campus" and "Real People, Real Impact". Never for body text or headings.
 */
export const fontScript = localFont({
  src: "../fonts/caveat-latin-wght-normal.woff2",
  weight: "400 700",
  style: "normal",
  display: "swap",
  variable: "--font-script",
  preload: false,
  fallback: ["Segoe Script", "Bradley Hand", "cursive"],
});
