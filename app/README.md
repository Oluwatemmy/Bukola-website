# For Bukola 🎓💜

A mobile-first, one-page interactive graduation surprise.

```
door → knock knock → "Can I come in?" → YES → doors swing open → light
  → SHE DID IT! → The Journey (5 chapters) → Look at you now
  → A few words for you → Final scene
```

It is **one continuous experience**, not a set of pages. Scrolling stays
locked behind the door; when the doors open, the doorway light dissolves
into the reveal and the page below unlocks.

## Run it

```bash
npm install
npm run dev            # http://localhost:5173
npm run dev -- --host  # also serves on your LAN, for testing on a real phone
npm run build          # production build into dist/
npm run preview        # serve the production build locally
```

## Where to change things

| I want to change...    | Edit                                        |
| ---------------------- | ------------------------------------------- |
| Any text on the site   | `src/content/copy.ts`                       |
| Photos                 | drop files in `public/images/bukola/` — see the README in there |
| Which photo goes where | `src/content/photos.ts`                     |
| Colours, type, spacing | `src/styles/tokens.css`                     |
| Her university years   | `journey.calm.years` in `src/content/copy.ts` |
| Class year on the door | `CLASS_OF` in `src/content/copy.ts` and the two lines in `src/components/door/Door.tsx` |

## Structure

```
src/
  content/
    copy.ts             every string in the site
    photos.ts           photo manifest — file name, label, aspect ratio
  styles/
    tokens.css          the whole colour + type system
    global.css          reset, scroll-reveal system, reduced-motion
  hooks/
    useInView.ts        one shared IntersectionObserver for all reveals
    useReducedMotion.ts
  components/
    door/
      DoorExperience    screen 1 state machine: beats, NO ladder, opening
      Door              the two-leaf 3D portal
    journey/
      Chapter           shared chapter frame (same room, changing light)
      ChapterBeginning / ChapterWork / ChapterStruggle
      ChapterCalm / ChapterFinishLine
      NotificationSequence
    sections/
      GraduationReveal  SHE DID IT!
      PhotoGallery      Look at you now
      LetterSection     A few words for you
      FinalScene
    shared/
      Photo             a photo slot with a labelled placeholder fallback
      Polaroid          the one photo-card treatment used site-wide
      Reveal            scroll-triggered entrance
      Celebration       canvas confetti / hearts / stars
      Ambient           stars + drifting petals
```

## Notes on the build

- **No animation libraries.** Everything is CSS transitions/animations on
  `transform` and `opacity`, driven by IntersectionObserver. The only
  JavaScript-driven animation is the celebration canvas, which stops its
  own rAF loop as soon as the last particle dies.
- **One observer, not thirty.** `useInView` shares a single
  IntersectionObserver per threshold across the whole page.
- **Images are lazy by default**; only the reveal hero loads eagerly.
- **`prefers-reduced-motion` is honoured** — travel distances collapse to
  zero, ambient loops stop, and the confetti canvas is not rendered at
  all. The story still plays through and every section is reachable.
- **No horizontal overflow** at 360 / 390 / 412 / 430px. Sections use
  `overflow: clip`, so pre-entrance transforms can never create a
  sideways scrollbar.
- **NO is always tappable.** However small it looks, it keeps a 44px
  invisible hit area. The joke is never a trap.
