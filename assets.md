# EIT website: asset guide

The single reference for every image, video, logo and document the site uses: **what to add, where to put it, which format, and what size**.
Sizes are in pixels (width × height). Ratio is width : height.

Status legend: **Live** = a built page already reads this file. **Planned** = the page is not built yet, so these specs are recommendations to confirm when that section is designed.

---

## 1. Rules for every asset

| Rule | Detail |
| --- | --- |
| Location | Never put files directly in `/public`. Use the category folders below. |
| Names | Lowercase, words separated by `-`, meaningful: `eit-campus-morning.webp`, `btech-program.webp`. No spaces, no capitals. |
| Photos | **WebP**, quality about 80. Keep the original as a backup outside the project. |
| Logos and icons | **SVG** wherever possible. If only a bitmap exists, use transparent PNG. |
| Video | **MP4 (H.264)**, no audio track, muted loops only. |
| Documents | **PDF**, kebab-case names, text-searchable (not scans) where possible. |
| Retina | Provide about 2× the size it is shown at. The site serves smaller copies automatically, so uploading larger is safe; smaller looks soft. |
| Alt text | Not stored with the file. It lives in the data file that references the image (`imageAlt`, `alt`). |
| After adding | Rebuild (or restart `npm run dev`). Missing files never break the page: the site falls back to a navy background, a text wordmark or nothing, and picks the real file up automatically. |

File size targets: hero image under 400 KB, program image under 200 KB, gallery image under 300 KB, logo SVG under 20 KB, hero video under 6 MB.

---

## 2. Live assets (used by pages that are already built)

### Logo (navbar, footer, mobile menu)

| Asset | Path | Format | Size | Ratio | Notes |
| --- | --- | --- | --- | --- | --- |
| Full-colour logo | `/public/images/logo/eit-logo.svg` (or `.png` / `.webp`) | SVG | Vector. If PNG: at least 480 × 160 | Horizontal lockup, between 2:1 and 5:1 | Shown 40 px tall. Transparent background. Used on the white navbar and the mobile menu. |
| White logo | `/public/images/logo/eit-logo-white.svg` (or `.png` / `.webp`) | SVG | Same as above | Same as the colour logo | Used over the hero and in the footer. If missing, the colour logo is turned white automatically. |

Status: **Missing**. A text wordmark is shown until these exist.

### App icon, favicon and share image

The EIT mark (three slanted bars) is the app icon. It is drawn in code, so nothing needs uploading unless you have an official mark.

| Asset | Path | Format | Size | Ratio | Notes |
| --- | --- | --- | --- | --- | --- |
| Favicon / app icon | `/src/app/icon.svg` | SVG | Vector (64 × 64 viewBox) | 1 : 1 | Current file is the EIT mark on navy. Replace it with the official mark if you have one (or use `icon.png` at 512 × 512). |
| Apple touch icon | `/src/app/apple-icon.tsx` | Generated PNG | 180 × 180 | 1 : 1 | Built from code at build time. To use a file instead, delete the `.tsx` and add `apple-icon.png` (180 × 180, opaque background). |
| Web app manifest | `/src/app/manifest.ts` | Generated | n/a | n/a | Lets the site be installed to a home screen. Lists the two icons above. |
| In-page mark | `/src/components/layout/BrandMark.tsx` | Inline SVG | n/a | 1 : 1 | Shown beside every section title and in the footer, and drawn in as each section arrives. Replace this component to change it everywhere. |
| Social share image (optional) | `/src/app/opengraph-image.png` | PNG or JPG | 1200 × 630 | 1.91 : 1 | Shown when the site is shared on WhatsApp, LinkedIn, etc. Next.js picks it up by file name; no code change. |

### Home: Hero and About

The About section reuses the **same four hero photographs** (it is that picture, shrunk and split into slanted parts), so there is nothing extra to upload for About.

| Slide | Path | Format | Size | Ratio | Status |
| --- | --- | --- | --- | --- | --- |
| Morning | `/public/images/hero/eit-campus-morning.webp` | WebP | 2400 × 1350 (min 1920 × 1080) | 16 : 9 | Missing |
| Afternoon | `/public/images/hero/eit-campus-afternoon.webp` | WebP | 2400 × 1350 | 16 : 9 | Missing |
| Evening | `/public/images/hero/eit-campus-evening.webp` | WebP | 2400 × 1350 | 16 : 9 | Missing |
| Night | `/public/images/hero/eit-campus-night.webp` | WebP | 2400 × 1350 | 16 : 9 | Missing |
| Morning video (optional) | `/public/videos/hero/eit-campus-morning.mp4` | MP4 (H.264) | 1920 × 1080, 8 to 15 s loop | 16 : 9 | Missing |

Photo composition:
- The photo fills the whole screen (cropped to fit, centred). On a desktop it shows nearly all of it; on a phone (portrait) only the **middle quarter (about 26 %)** of the width is visible. Keep the main subject (building, students) in the centre.
- The headline sits on the **left third**, so keep that area calm (sky, lawn, shadow). Put the building on the centre or right.
- Shoot the four photos from the same spot at four times of day (morning, afternoon, evening, night). The hero and the About picture then change mood together.
- The video is optional. The still image of the same slide is its poster and its fallback. Video plays on tablet-and-up screens only, never on phones or with reduced motion.
- To add or remove slides, edit `src/data/home/hero.ts`. The carousel and the split image follow the number of entries.

### Home: Programs section

One photograph per program, shown on a portrait card (about 384 × 468 px on desktop).

| Program | Path | Format | Size | Ratio | Status |
| --- | --- | --- | --- | --- | --- |
| B.Tech | `/public/images/programs/btech-program.webp` | WebP | 1200 × 1500 | 4 : 5 | Missing |
| M.Tech | `/public/images/programs/mtech-program.webp` | WebP | 1200 × 1500 | 4 : 5 | Missing |
| BCA | `/public/images/programs/bca-program.webp` | WebP | 1200 × 1500 | 4 : 5 | Missing |
| MCA | `/public/images/programs/mca-program.webp` | WebP | 1200 × 1500 | 4 : 5 | Missing |
| BBA | `/public/images/programs/bba-program.webp` | WebP | 1200 × 1500 | 4 : 5 | Missing |
| MBA | `/public/images/programs/mba-program.webp` | WebP | 1200 × 1500 | 4 : 5 | Missing |

Composition: the title, tagline and button cover the **bottom third** of the card. Keep the subject in the **upper two thirds**. A darkening gradient is added automatically.

### Home: the other sections

Every image is optional. Until a file exists the section shows a tinted placeholder, so nothing breaks. File names below are patterns: use the id of the entry in its data file. The path you type in the data file must match the file exactly.

| Section | Data file | Path pattern | Format | Size | Ratio | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Centres of Excellence | `src/data/centres/centres.ts` | `/public/images/centres/<centre-id>.webp` | WebP | 1600 × 1200 | 4 : 3 | Shown about 560 px wide. The centre name sits over the bottom, so keep the subject in the upper two thirds. |
| Placements: student stage | `src/data/placements/successStories.ts` | `/public/images/placements/<student>-story.webp` | WebP | 1200 × 1500 | 4 : 5 | Portrait, face in the upper half. On desktop the left edge fades into navy, so keep the person centred or slightly right. The same file is cropped small for the thumbnail strip. |
| Placements: recruiter logos | `src/data/placements/recruiters.ts` | `/public/images/placements/recruiter-<name>.svg` | SVG (or transparent PNG) | PNG: 400 × 200 | 2 : 1 | Shown at most 36 px tall on a light tile. Use the coloured logo on a transparent background. |
| Student Work | `src/data/students/projects.ts` | `/public/images/students/<project-id>.webp` | WebP | 1600 × 1200 | 4 : 3 | Shown about 450 px wide. Only the first image of a project is used. |
| Events | `src/data/events/events.ts` | `/public/images/events/<event-id>.webp` | WebP | 1600 × 900 | 16 : 9 | Sits on the right 45 % of the event card and fades into white on its left, so keep the subject on the right. Hidden on phones. |
| Clubs | `src/data/clubs/clubs.ts` | `/public/images/clubs/<club-id>-logo.svg` | SVG (or transparent PNG) | PNG: 512 × 512 | 1 : 1 | Shown 64 px on a white tile with padding. |
| Podcasts | `src/data/podcasts/episodes.ts` | `/public/images/podcasts/<episode-id>-cover.webp` | WebP | 1400 × 1400 | 1 : 1 | Shown about 240 px square with rounded corners. |
| Placements: gallery (full `/placements` page) | `src/data/placements/gallery.ts` | `/public/images/placements/placement-gallery-<n>.webp` | WebP | 1600 × 1200 | 4 : 3 | Grid tile on the Placements page. Any subject; caption is optional. |
| Placements: highest performers (full `/placements` page) | `src/data/placements/achievements.ts` (`highestPerformers`) | `/public/images/placements/performer-<name>.webp` | WebP | 600 × 750 | 4 : 5 | Portrait, shown small and circular (about 110 px). Face centred. |
| Clubs: professional societies | `src/data/clubs/societies.ts` | `/public/images/clubs/society-<id>-logo.svg` | SVG (or transparent PNG) | PNG: 512 × 512 | 1 : 1 | Same treatment as club logos, shown on `/clubs` and `/clubs/professional-societies`. |
| Celebrity Corner | `src/data/celebrities/celebrities.ts` | `/public/images/celebrities/<person-id>.webp` | WebP | 2000 × 1500 | 4 : 3 | Close-up portrait with the face centred, slightly above the middle. It fills the whole stage (cropped taller on phones) and the same file is cropped small for the portrait strip and the profile card. Keep the bottom third calm: the name sits there. Anyone with `category: "Alumni"` also appears on the `/alumni` page, using this same photo — no separate upload needed. |
| Campus Life ("Beyond Classrooms") | `src/data/home/campusLife.ts` | `/public/images/campus/campus-moment-<n>.webp` | WebP | 1200 × 1500 | 4 : 5 | The collage shows five frames of different shapes and crops each photo to fit, so keep the subject in the middle. Supply at least 5, ideally 8 to 10: the frames rotate through all of them. |
| Stories That Inspire | `src/data/students/testimonials.ts` | `/public/images/students/<name>-story.webp` | WebP | 1000 × 1250 | 4 : 5 | Face centred. Shown large in the middle, smaller and dimmed at the sides, and tiny in the name badge. |

Not needed: Why EIT, the Admissions band and the notice board use no images. The hero and About images are listed above.

### Sample content while you wait for real content

Set `NEXT_PUBLIC_SAMPLE_CONTENT=true` in `.env.local` to show clearly labelled "Sample" entries in sections whose real data file is still empty, so the layout can be reviewed. Keep it `false` in production: an empty section then hides itself. Real entries always replace the samples.

---

## 3. Documents (PDF)

All 22 PDFs from the old site are registered in `src/data/site/documents.ts`. To publish one: save it at the path below, then set `available: true` for it in that file. Its old `/pdf/...` URL then redirects automatically.

| Document | Path | Format | Status |
| --- | --- | --- | --- |
| Admission Brochure, UG 2025-26 | `/documents/brochures/admission-brochure-ug-2025-26.pdf` | PDF | Missing |
| Admission Brochure, PG 2025-26 | `/documents/brochures/admission-brochure-pg-2025-26.pdf` | PDF | Missing |
| EIT Magazine 2025-26 | `/documents/magazines/eit-magazine-2025-26.pdf` | PDF | Missing |
| Service Rule Book | `/documents/policies/service-rule-book.pdf` | PDF | Missing |
| Special Chance for Exam | `/documents/notices/special-chance-for-exam.pdf` | PDF | Missing |
| Commencement of Even Semester 2025-26 Classes | `/documents/notices/commencement-of-even-sem-2025-26-classes.pdf` | PDF | Missing |
| Fee Notice | `/documents/notices/fee-notice.pdf` | PDF | Missing |
| Approval Letter 2025-26 | `/documents/approvals/approval-letter-2025-26.pdf` | PDF | Missing |
| Approval Letter 2024-25 | `/documents/approvals/approval-letter-2024-25.pdf` | PDF | Missing |
| Approval Letter 2023-24 | `/documents/approvals/approval-letter-2023-24.pdf` | PDF | Missing |
| Approval Letter 2022-23 | `/documents/approvals/approval-letter-2022-23.pdf` | PDF | Missing |
| Approval Letter 2020-21 | `/documents/approvals/approval-letter-2020-21.pdf` | PDF | Missing |
| Approval Letter 2019-20 | `/documents/approvals/approval-letter-2019-20.pdf` | PDF | Missing |
| Approval Letter 2018-19 | `/documents/approvals/approval-letter-2018-19.pdf` | PDF | Missing |
| Affiliation Letter 2024 | `/documents/approvals/affiliation-letter-2024.pdf` | PDF | Missing |
| Affiliation Letter 2023 | `/documents/approvals/affiliation-letter-2023.pdf` | PDF | Missing |
| Affiliation Letter 2022 | `/documents/approvals/affiliation-letter-2022.pdf` | PDF | Missing |
| Affiliation Letter 2021-22 | `/documents/approvals/affiliation-letter-2021-22.pdf` | PDF | Missing |
| Affiliation Letter 2018 | `/documents/approvals/affiliation-letter-2018.pdf` | PDF | Missing |
| NBA Letter | `/documents/approvals/nba-letter.pdf` | PDF | Missing |
| Academic Calendar, Odd Semester 2025-26 | `/documents/calendars/academic-calendar-odd-sem-2025-26.pdf` | PDF | Missing |
| Academic Calendar, Even Semester (JCBUST) 2025 | `/documents/calendars/academic-calendar-even-sem-jcbust-2025.pdf` | PDF | Missing |

Folders for other document types already exist: `/public/documents/reports/` and `/public/documents/certificates/`.

---

## 4. Planned assets (pages not built yet)

The folders exist already. These are recommended specs so photography can be planned now. Confirm them when each section is designed, and update this file.

| Page / section | Folder | What | Format | Size | Ratio |
| --- | --- | --- | --- | --- | --- |
| Program pages (`/programs/*`) | `/public/images/programs/` | Page banner, one per program: `btech-banner.webp` | WebP | 2400 × 1000 | 12 : 5 |
| About: leadership (chairman, director, HoD) | `/public/images/about/` | Portrait photos: `chairman.webp`, `director.webp` | WebP | 800 × 1000 | 4 : 5 |
| About: governing body | `/public/images/about/` | Member portraits | WebP | 600 × 750 | 4 : 5 |
| About: campus story image | `/public/images/about/` | `eit-about-campus.webp` | WebP | 1800 × 1200 | 3 : 2 |
| Departments: faculty | `/public/images/students/` or a new `/public/images/faculty/` folder | Faculty portraits | WebP | 600 × 750 | 4 : 5 |
| Departments: labs | `/public/images/campus/` | Lab photos: `cse-lab-1.webp` | WebP | 1600 × 1067 | 3 : 2 |
| Centres | `/public/videos/centres/` | Optional short tour | MP4 | 1920 × 1080 | 16 : 9 |
| Placements: students speak | `/public/images/placements/` | Portraits | WebP | 600 × 750 | 4 : 5 |
| Placements: brochure cover | `/public/images/placements/` | Cover image of the brochure | WebP | 1000 × 1414 | A4 portrait (1 : 1.414) |
| Events | `/public/videos/events/` | Highlight reel | MP4 | 1920 × 1080 | 16 : 9 |
| Clubs | `/public/images/clubs/` | Club activity photo | WebP | 1600 × 1067 | 3 : 2 |
| Campus life | `/public/videos/campus/` | Campus tour loop | MP4 | 1920 × 1080 | 16 : 9 |
| Campus life: library | `/public/images/campus/` | Library banner | WebP | 2400 × 1000 | 12 : 5 |
| Admissions | `/public/images/programs/` or `/public/images/about/` | Optional page banner | WebP | 2400 × 1000 | 12 : 5 |
| Any inner page | `/public/icons/` | Small UI icons (SVG only) | SVG | 24 × 24 viewBox | 1 : 1 |

Pages with no images planned: Contact, Careers, Circulars, Academic calendar, Fee structure and the other text or document pages.

---

## 5. Adding a new image, step by step

1. Prepare the file to the size and ratio in this guide, and export it as WebP.
2. Name it in lowercase with hyphens and drop it in the folder listed here.
3. If it is a **hero slide** or a **program**, the path is already in the data file. Just add the file and rebuild.
4. For anything new, add its path and alt text to the matching data file in `src/data/`. Never write the path directly inside a component.
5. Rebuild and check it on desktop and on a 390 px wide phone.
