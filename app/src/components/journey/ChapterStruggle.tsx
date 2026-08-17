import { Chapter } from "./Chapter";
import { Reveal } from "../shared/Reveal";
import { Polaroid } from "../shared/Polaroid";
import { NotificationSequence } from "./NotificationSequence";
import { journey } from "../../content/copy";

const c = journey.struggle;

/**
 * Chapter 3 — deeper plum, colder light. The universal version of
 * university stress: the portal, the group chat, the 11:59 PM deadline.
 */
export function ChapterStruggle() {
  return (
    <Chapter id="chapter-3" number={c.number} title={c.title} tone="dark">
      <Reveal delay={80} className="struggle__banner-row">
        <p className="struggle__banner">{c.banner}</p>
      </Reveal>

      <NotificationSequence />

      <div className="struggle__deck">
        <Reveal from="left" delay={100} className="struggle__photo">
          <Polaroid slot="struggle1" caption={c.photoCaption} tilt={-5} />
        </Reveal>

        <div className="struggle__refrains">
          {c.refrains.slice(1).map((line, i) => (
            <Reveal key={line} from="right" delay={180 + i * 150}>
              <span>{line}</span>
            </Reveal>
          ))}
        </div>
      </div>

      {/* The turn. The jokes stop here — this photo gets its own quiet beat,
          away from the deadline gags, and the closer below lands on it. */}
      <div className="struggle__quiet">
        <Reveal delay={80}>
          <p className="struggle__quiet-lead">{c.hardDaysLead}</p>
        </Reveal>
        <Reveal delay={220} from="zoom" className="struggle__photo2">
          <Polaroid slot="struggle2" caption={c.photoCaption2} tilt={-2} />
        </Reveal>
      </div>

      <Reveal delay={120}>
        <p className="display struggle__closer">
          {c.closer.map((line, i) => (
            <span key={line}>
              {line}
              {i < c.closer.length - 1 && <br />}
            </span>
          ))}
        </p>
      </Reveal>
    </Chapter>
  );
}
