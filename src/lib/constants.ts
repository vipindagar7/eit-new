/**
 * Environment-derived constants. Only NEXT_PUBLIC_* values are read here,
 * so nothing in this file may ever be a secret.
 */

const DEFAULT_SITE_URL = "https://eitfaridabad.com";

/**
 * Some hosts (e.g. a platform that pre-declares the variable before you fill it in) set
 * NEXT_PUBLIC_SITE_URL to an empty string rather than leaving it unset. `??` does not catch that
 * (`"" ?? fallback` is still `""`), and `new URL("")` throws and fails the whole build. So: treat a
 * blank or otherwise invalid value as unset and fall back, instead of trusting it directly.
 */
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const candidate = raw && raw.length > 0 ? raw : DEFAULT_SITE_URL;
  try {
    return new URL(candidate).toString().replace(/\/$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const SITE_URL = resolveSiteUrl();

const rawSiteName = process.env.NEXT_PUBLIC_SITE_NAME?.trim();
export const SITE_NAME = rawSiteName && rawSiteName.length > 0 ? rawSiteName : "Echelon Institute of Technology";

/** Search-engine indexing stays off until the real site is ready. */
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const DEFAULT_TITLE = "Echelon Institute of Technology | EIT Faridabad";
export const TITLE_TEMPLATE = "%s | EIT Faridabad";

export const BRAND_COLOR = "#17324D";

/**
 * Development aid. When true, homepage sections whose real content is still empty show clearly
 * labelled SAMPLE entries so the layout can be reviewed. Keep it false in production: an empty section
 * then hides itself instead of showing invented content.
 */
export const SAMPLE_CONTENT = process.env.NEXT_PUBLIC_SAMPLE_CONTENT === "true";
