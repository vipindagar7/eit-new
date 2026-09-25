#!/usr/bin/env node
/**
 * Route smoke test. Run against a running server (npm run dev, or npm run build && npm start):
 *
 *   node scripts/verify-routes.mjs [baseUrl]      (default http://localhost:3000)
 *
 * Checks that
 *  1. every URL in /sitemap.xml returns 200 and renders the shared page layout — checked via the
 *     footer's "All rights reserved." text, which is part of the root layout and so renders on every
 *     page whether it is still a Coming Soon placeholder or now fully built. Its absence means the
 *     page crashed past an error boundary;
 *  2. every page URL of the OLD site (src/data/legacy/sitemap.ts) reaches a live new route;
 *  3. every PDF of the old site is registered in src/data/site/documents.ts.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const read = (rel) => readFileSync(fileURLToPath(new URL(`../${rel}`, import.meta.url)), "utf8");

const legacyUrls = [...read("src/data/legacy/sitemap.ts").matchAll(/"(https:\/\/eitfaridabad\.com[^"]*)"/g)].map((m) => m[1]);
const documentsSource = read("src/data/site/documents.ts");

const failures = [];
const fail = (message) => failures.push(message);

async function fetchPage(path, options = {}) {
  return fetch(`${base}${path}`, { redirect: "manual", ...options });
}

// 1. Sitemap
const sitemapXml = await (await fetchPage("/sitemap.xml")).text();
const sitemapPaths = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const sitemapSet = new Set(sitemapPaths);

for (const path of sitemapPaths) {
  const response = await fetchPage(path);
  const html = response.status === 200 ? await response.text() : "";
  if (response.status !== 200) fail(`sitemap route ${path} → ${response.status}`);
  else if (!html.includes("All rights reserved.")) fail(`sitemap route ${path} did not render the shared page layout`);
}

// 2 + 3. Legacy coverage
let pageCount = 0;
let pdfCount = 0;

for (const url of legacyUrls) {
  const { pathname } = new URL(url);

  if (pathname.toLowerCase().endsWith(".pdf")) {
    pdfCount += 1;
    if (!documentsSource.includes(`"${pathname}"`)) fail(`PDF not registered in documents.ts: ${pathname}`);
    continue;
  }

  pageCount += 1;
  if (pathname === "/") continue; // served directly, covered by the sitemap check

  const first = await fetchPage(pathname);
  const location = first.headers.get("location");
  if (first.status !== 308 || !location) {
    fail(`legacy ${pathname} → expected 308 redirect, got ${first.status}`);
    continue;
  }

  const target = new URL(location, base).pathname;
  if (!sitemapSet.has(target) && target !== "/") fail(`legacy ${pathname} redirects to unknown route ${target}`);

  const second = await fetchPage(target);
  if (second.status !== 200) fail(`legacy ${pathname} → ${target} returned ${second.status}`);
}

// 4. Unknown route must 404
const unknown = await fetchPage("/this-route-does-not-exist");
if (unknown.status !== 404) fail(`unknown route returned ${unknown.status}, expected 404`);
const unknownDept = await fetchPage("/departments/not-a-department");
if (unknownDept.status !== 404) fail(`unknown department returned ${unknownDept.status}, expected 404`);

console.log(`Sitemap routes checked : ${sitemapPaths.length}`);
console.log(`Old-site URLs in list  : ${legacyUrls.length} (${pageCount} pages, ${pdfCount} PDFs)`);

if (failures.length > 0) {
  console.error(`\n${failures.length} problem(s):`);
  for (const message of failures) console.error(`  - ${message}`);
  process.exit(1);
}
console.log("\nAll routes OK.");
