import { useEffect, useState } from "react";
import { Chapter } from "./Chapter";
import { Reveal } from "../shared/Reveal";
import { Polaroid } from "../shared/Polaroid";
import { useInView } from "../../hooks/useInView";
import { journey } from "../../content/copy";

const c = journey.work;

/** Counts to the target once, when the bar comes into view. */
function useCountUp(target: number, run: boolean, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // Same ease as the bar so the number and the fill stay together.
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);

  return value;
}

/** Chapter 2 — student-computer chaos, controlled. */
export function ChapterWork() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const pct = useCountUp(c.progressTarget, inView);

  return (
    <Chapter id="chapter-2" number={c.number} title={c.title} tone="work">
      <div className="work__deck">
        <div className="work__chips">
          {c.chips.map((chip, i) => (
            <Reveal key={chip} from="left" delay={140 + i * 130}>
              <span className="work__chip">{chip}</span>
            </Reveal>
          ))}
        </div>

        <Reveal from="right" delay={260} className="work__photo">
          <Polaroid slot="work1" caption={c.photoCaption} tilt={4} />
        </Reveal>
      </div>

      {/* Second card comes in from the left, so the two photos alternate
          sides down the chapter instead of stacking on one edge. */}
      <div className="work__aside">
        <Reveal from="left" delay={120} className="work__photo2">
          <Polaroid slot="work2" caption={c.photoCaption2} tilt={-5} />
        </Reveal>
        <Reveal delay={300} className="work__aside-copy">
          <span className="work__badge">{c.badge}</span>
        </Reveal>
      </div>

      <div className="work__progress" ref={ref}>
        <p className="work__progress-label">{c.progressLabel}</p>
        <div
          className="work__track"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={c.progressLabel}
        >
          <div className="work__bar" style={{ width: inView ? `${c.progressTarget}%` : "0%" }} />
        </div>
        <p className="work__pct">{pct}%</p>
      </div>

      <div className="work__copy">
        <Reveal delay={80}>
          <p className="display work__lead">{c.lead}</p>
        </Reveal>
        <Reveal delay={200}>
          <p className="work__body">{c.body}</p>
        </Reveal>
      </div>
    </Chapter>
  );
}
