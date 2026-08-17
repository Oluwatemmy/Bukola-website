import { Ambient } from "../shared/Ambient";
import { Reveal } from "../shared/Reveal";
import { Polaroid } from "../shared/Polaroid";
import { Photo } from "../shared/Photo";
import { gallery as copy } from "../../content/copy";
import type { PhotoKey } from "../../content/photos";
import "./PhotoGallery.css";

type Card = { slot: PhotoKey; caption?: string; tilt: number };

/* Two loose stacks with a full-bleed photo between them.
   Add or remove cards here — the layout absorbs it. */
const stackA: Card[] = [
  { slot: "gallery1", tilt: -6 },
  { slot: "gallery2", caption: "look at her 🥹", tilt: 5 },
  { slot: "gallery3", caption: "graduate behavior 🎓", tilt: 3 },
];

const stackB: Card[] = [
  { slot: "gallery4", caption: "okayyyy miss graduate 💅🏽", tilt: 4 },
  { slot: "gallery5", tilt: -5 },
];

function Stack({ cards, offset = 0 }: { cards: Card[]; offset?: number }) {
  return (
    <div className="stack">
      {cards.map((card, i) => (
        <Reveal
          key={card.slot}
          from={i % 2 === 0 ? "left" : "right"}
          delay={offset + i * 170}
          className={`stack__card stack__card--${i}`}
        >
          <Polaroid slot={card.slot} caption={card.caption} tilt={card.tilt} />
        </Reveal>
      ))}
    </div>
  );
}

/**
 * Look at you now — memories laid out on a table, not a grid.
 * One photo goes near-full-screen between the stacks so the small
 * cards read as deliberate rather than repetitive.
 */
export function PhotoGallery() {
  return (
    <section className="gallery section" id="look-at-you-now">
      <Ambient petals={2} />

      <div className="section-inner gallery__inner">
        <Reveal>
          <h2 className="display gallery__title">{copy.title}</h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="script gallery__sub">{copy.sub}</p>
        </Reveal>

        <Stack cards={stackA} offset={120} />
      </div>

      <div className="gallery__full">
        <Photo slot="galleryFull" ratio={3 / 4} parallax />
        <div className="gallery__full-scrim" aria-hidden="true" />
        <Reveal delay={120} className="gallery__full-copy">
          <span className="gallery__full-rule" />
          <p className="display">{copy.fullBleedLine}</p>
        </Reveal>
      </div>

      <div className="section-inner gallery__inner">
        <Stack cards={stackB} />
        <Reveal delay={220}>
          <p className="script gallery__footnote">{copy.footnote}</p>
        </Reveal>
      </div>
    </section>
  );
}
