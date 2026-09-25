# Hero assets (TODO: replace with real EIT photography)

The hero reads these paths from `src/data/home/hero.ts`. Until a file exists the slide shows a plain
navy fallback, so nothing breaks. Drop the files in and rebuild; no code change is needed.

| Slide | Image (required) | Video (optional, looping, muted) |
| --- | --- | --- |
| Morning | `/images/hero/eit-campus-morning.webp` | `/videos/hero/eit-campus-morning.mp4` |
| Afternoon | `/images/hero/eit-campus-afternoon.webp` | |
| Evening | `/images/hero/eit-campus-evening.webp` | |
| Night | `/images/hero/eit-campus-night.webp` | |

Guidance
- Images: 2400 × 1350 (16:9) or larger, WebP, subject kept to the right or centre so the left third stays calm for text.
- Video: MP4 (H.264), 1080p, under ~6 MB, no audio track. The image of the same slide is used as poster and fallback.
- Add or remove slides in `src/data/home/hero.ts`; the carousel adapts to the number of entries.
