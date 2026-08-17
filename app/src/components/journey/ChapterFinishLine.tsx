import { Chapter } from "./Chapter";
import { Reveal } from "../shared/Reveal";
import { Polaroid } from "../shared/Polaroid";
import { useInView } from "../../hooks/useInView";
import { journey } from "../../content/copy";

const c = journey.finish;

/**
 * Chapter 5 — the one bright screen in the Journey. The photo starts
 * blurred and resolves as the gown line lands.
 */
export function ChapterFinishLine() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <Chapter id="chapter-5" number={c.number} title={c.title} tone="bright" hideHeading>
      <div className="finish__inner">
        <Reveal>
          <p className="finish__beat1">{c.beat1}</p>
        </Reveal>
        <Reveal delay={700}>
          <p className="display finish__beat2">{c.beat2}</p>
        </Reveal>

        <div className={`finish__stack ${inView ? "is-clear" : ""}`} ref={ref}>
          <div className="finish__halo" aria-hidden="true" />

          <Reveal delay={900} from="zoom" className="finish__main">
            <Polaroid slot="finish1" caption={c.photoCaption} tilt={-2.5} />
          </Reveal>

          <Reveal delay={1150} from="right" className="finish__second">
            <Polaroid slot="finish2" tilt={6} />
          </Reveal>
        </div>

        <Reveal delay={120}>
          <p className="finish__closer">
            {c.closer.map((line, i) => (
              <span key={line}>
                {line}
                {i < c.closer.length - 1 && <br />}
              </span>
            ))}
          </p>
        </Reveal>

        <Reveal delay={320}>
          <p className="display finish__finale">{c.finale}</p>
        </Reveal>
      </div>
    </Chapter>
  );
}
