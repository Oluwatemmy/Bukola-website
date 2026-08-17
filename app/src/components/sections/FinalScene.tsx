import { Ambient } from "../shared/Ambient";
import { Celebration } from "../shared/Celebration";
import { Polaroid } from "../shared/Polaroid";
import { Reveal } from "../shared/Reveal";
import { useInView } from "../../hooks/useInView";
import { finale as copy } from "../../content/copy";
import "./FinalScene.css";

/**
 * The last screen. Two beats about 1.8s apart, then a warm celebration —
 * roughly a third the energy of the opening burst. No footer; it ends here.
 */
export function FinalScene() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.45 });

  return (
    <section className="final section screen" id="final" ref={ref}>
      <Ambient petals={3} />
      <Celebration active={inView} intensity="gentle" />

      <div className="section-inner final__inner">
        <div className="final__photo-wrap">
          <div className="final__halo" aria-hidden="true" />
          <Reveal from="zoom" delay={100}>
            <Polaroid slot="final" tilt={-2} width="min(62vw, 13rem)" glow />
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
