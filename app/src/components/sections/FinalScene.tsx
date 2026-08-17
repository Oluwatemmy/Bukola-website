import { Ambient } from "../shared/Ambient";
import { Celebration } from "../shared/Celebration";
import { Polaroid } from "../shared/Polaroid";
import { Reveal } from "../shared/Reveal";
import { useInView } from "../../hooks/useInView";
import { finale as copy, signature } from "../../content/copy";
import "./FinalScene.css";

/**
 * The last screen. Two beats about 1.8s apart, then the ceremony beat, and
 * finally the sign-off — whose arrival sets off the closing celebration.
 * No footer; it ends here.
 */
export function FinalScene() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.45 });
  /* The big one fires when the signature lands, not when the section does —
     so it happens after everything, as the last thing that moves. */
  const { ref: signRef, inView: signIn } = useInView<HTMLDivElement>({ threshold: 0.55 });

  return (
    <section className="final section" id="final" ref={ref}>
      <Ambient petals={3} />
      <Celebration active={inView} intensity="gentle" />
      <Celebration active={signIn} intensity="finale" />

      <div className="section-inner final__inner">
        <div className="final__photo-wrap">
          <div className="final__halo" aria-hidden="true" />
          {/* Sized in CSS so it can step down on short screens. */}
          <Reveal from="zoom" delay={100} className="final__photo">
            <Polaroid slot="final" tilt={-2} glow />
          </Reveal>
        </div>

        <div className="final__copy">
          <Reveal delay={400}>
            <p className="display final__beat1">{copy.beat1}</p>
          </Reveal>
          <Reveal delay={2200}>
            <p className="script final__beat2">{copy.beat2}</p>
          </Reveal>
        </div>

        {/* Tomorrow. */}
        <div className="final__party">
          <Reveal delay={100}>
            <p className="script final__ceremony">{copy.ceremony}</p>
          </Reveal>
          <Reveal delay={420} from="zoom">
            <p className="display final__party-line">{copy.party}</p>
          </Reveal>
        </div>

        {/* The sign-off. */}
        <div className="final__sign" ref={signRef}>
          <Reveal delay={80}>
            <span className="final__sign-rule" aria-hidden="true" />
            <p className="final__sign-intro">{signature.intro}</p>
          </Reveal>

          <Reveal delay={260}>
            <p className={`final__sign-name ${signIn ? "is-written" : ""}`}>{signature.name}</p>
            {/* A flourish that draws itself under the name. */}
            <svg
              className={`final__flourish ${signIn ? "is-drawn" : ""}`}
              viewBox="0 0 200 26"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 17C22 6 44 4 62 10c14 5 12 12 3 12-8 0-9-8 6-11 20-4 44-2 62 3 12 3 26 4 38-1"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </Reveal>

          <Reveal delay={520}>
            <p className="final__sign-note">{signature.note}</p>
          </Reveal>
        </div>

        <span className="final__spark final__spark--a" aria-hidden="true">
          ✨
        </span>
        <span className="final__spark final__spark--b" aria-hidden="true">
          💗
        </span>
        <span className="final__spark final__spark--c" aria-hidden="true">
          💜
        </span>
      </div>
    </section>
  );
}
