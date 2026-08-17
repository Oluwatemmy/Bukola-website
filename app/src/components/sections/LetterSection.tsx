import { Reveal } from "../shared/Reveal";
import { letter as copy } from "../../content/copy";
import "./LetterSection.css";

/**
 * A few words for you — the calmest screen in the site. No photos, no
 * particles, wide line-height. The one preserved line is the only sentence
 * set in the display serif, so it reads as the centre of the letter.
 */
export function LetterSection() {
  return (
    <section className="letter section" id="a-few-words">
      <div className="section-inner letter__inner">
        <Reveal>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="display letter__title">{copy.title}</h2>
        </Reveal>

        <Reveal delay={160} className="letter__body">
          <p className="letter__greeting">{copy.greeting}</p>

          {copy.paragraphs.map((p) => (
            <p key={p} className="letter__para">
              {p}
            </p>
          ))}

          <p className="display letter__quote">{copy.pullQuote}</p>

          {copy.paragraphsAfter.map((p) => (
            <p key={p} className="letter__para">
              {p}
            </p>
          ))}

          <p className="script letter__signoff">{copy.signOff}</p>
        </Reveal>

        <span className="letter__rule" aria-hidden="true" />
      </div>
    </section>
  );
}
