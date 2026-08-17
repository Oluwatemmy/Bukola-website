import { Ambient } from "../shared/Ambient";
import { Polaroid } from "../shared/Polaroid";
import { reveal as copy } from "../../content/copy";
import "./GraduationReveal.css";

/**
 * Screen 2. The doorway light has just become this screen's glow, so this
 * section animates in on mount rather than on scroll.
 */
export function GraduationReveal({ entered }: { entered: boolean }) {
  return (
    <section className={`grad section screen ${entered ? "is-entered" : ""}`} id="reveal">
      <Ambient petals={2} />

      <div className="grad__glow" aria-hidden="true" />

      <div className="section-inner grad__inner">
        <p className="eyebrow grad__eyebrow">{copy.eyebrow}</p>
        <h1 className="display grad__headline">{copy.headline}</h1>
        <p className="script grad__sub">{copy.sub}</p>

        {/* Two cards dropped on the table: her, and the signed shirt
            tucked in behind at an angle. */}
        <div className="grad__photos">
          <Polaroid
            slot="revealHero"
            caption={copy.caption}
            tilt={-4}
            priority
            glow
            className="grad__photo grad__photo--a"
          />
          <Polaroid
            slot="revealHero2"
            caption={copy.caption2}
            tilt={6}
            priority
            className="grad__photo grad__photo--b"
          />
        </div>

        <span className="grad__spark grad__spark--a" aria-hidden="true">
          💜
        </span>
        <span className="grad__spark grad__spark--b" aria-hidden="true">
          💗
        </span>

        <p className="grad__hint">
          {copy.scrollHint}
          <span className="grad__arrow" aria-hidden="true" />
        </p>
      </div>
    </section>
  );
}
