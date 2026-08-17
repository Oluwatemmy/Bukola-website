/* ============================================================
   PHOTO MANIFEST — the only place image files are named.

   To add a real photo: drop the file into
       app/public/images/bukola/
   using the exact file name below. Nothing else to change.

   Until a file exists, the slot renders a labelled placeholder
   at the same aspect ratio, so the layout never shifts.
   ============================================================ */

export type PhotoSlot = {
  /** File name inside /public/images/bukola/ */
  file: string;
  /** Shown in the placeholder while the real photo is missing. */
  label: string;
  /** Alt text once the real photo is in place. */
  alt: string;
  /** width / height — keeps layout stable before and after. */
  ratio: number;
};

const DIR = `${import.meta.env.BASE_URL}images/bukola/`;

export const photos = {
  /* Screen 2 — the payoff right after the doors open.
     Two cards: her, and the signed shirt tucked in behind. */
  revealHero: {
    file: "signing-out.jpg",
    label: "SIGNING-OUT PHOTO",
    alt: "Bukola on her signing-out day, holding her Class of 2026 sash",
    ratio: 3 / 4,
  },
  revealHero2: {
    file: "signing-out1.jpg",
    label: "SIGNED SHIRT / SECOND PICK",
    alt: "The back of Bukola's signed signing-out shirt",
    ratio: 3 / 4,
  },

  /* Chapter 1 — The Beginning */
  beginning1: {
    file: "beginning.jpg",
    label: "EARLY DAYS — WHEN SHE STARTED",
    alt: "Bukola early in her university years",
    ratio: 4 / 5,
  },

  /* Chapter 2 — The Work */
  work1: {
    file: "project-1.jpg",
    label: "PROJECT / STRESS PHOTO",
    alt: "Bukola working on her project",
    ratio: 4 / 3,
  },
  work2: {
    file: "project-3.jpg",
    label: "PROJECT / STRESS PHOTO 2",
    alt: "Bukola deep in project work",
    ratio: 4 / 5,
  },

  /* Chapter 3 — The Struggle */
  struggle1: {
    file: "project-2.jpg",
    label: "LATE-NIGHT PROJECT PHOTO",
    alt: "A late night of project work",
    ratio: 5 / 4,
  },
  struggle2: {
    file: "hard-days.jpg",
    label: "THE HARD DAYS — WHEN SHE WAS SICK",
    alt: "Bukola during a hard stretch of her university years",
    ratio: 4 / 5,
  },

  /* Chapter 5 — The Finish Line */
  finish1: {
    file: "gown.jpg",
    label: "SIGNING-OUT / GOWN PHOTO",
    alt: "Bukola in her graduation gown",
    ratio: 4 / 5,
  },
  finish2: {
    file: "convocation-1.jpg",
    label: "CONVOCATION PHOTO",
    alt: "Bukola at her convocation",
    ratio: 4 / 5,
  },

  /* Look at you now — the gallery. 5–8 strong photos. */
  gallery1: {
    file: "convocation-2.jpg",
    label: "CONVOCATION SHOOT",
    alt: "Bukola at her convocation shoot",
    ratio: 4 / 5,
  },
  gallery2: {
    file: "signing-out-2.jpg",
    label: "SIGNING-OUT",
    alt: "Bukola signing out",
    ratio: 4 / 5,
  },
  gallery3: {
    file: "friends-1.jpg",
    label: "WITH FRIENDS",
    alt: "Bukola with her friends",
    ratio: 1,
  },
  gallery4: {
    file: "convocation-3.jpg",
    label: "CONVOCATION SHOOT",
    alt: "Bukola at her convocation shoot",
    ratio: 4 / 5,
  },
  gallery5: {
    file: "friends-2.jpg",
    label: "WITH FRIENDS",
    alt: "Bukola celebrating with friends",
    ratio: 5 / 4,
  },
  galleryFull: {
    file: "hero-wide.jpg",
    label: "STRONGEST CONVOCATION PHOTO — full bleed",
    alt: "Bukola, graduate",
    ratio: 3 / 4,
  },

  /* Final scene */
  final: {
    file: "final.jpg",
    label: "BEST FINAL PHOTO",
    alt: `Bukola, graduate`,
    ratio: 4 / 5,
  },
} satisfies Record<string, PhotoSlot>;

export type PhotoKey = keyof typeof photos;

export const photoSrc = (key: PhotoKey) => DIR + photos[key].file;
