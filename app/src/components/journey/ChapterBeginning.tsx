import { Chapter } from "./Chapter";
import { Reveal } from "../shared/Reveal";
import { Polaroid } from "../shared/Polaroid";
import { journey } from "../../content/copy";

const c = journey.beginning;

/** Chapter 1 — dreamy and near-empty. No photos needed here. */
export function ChapterBeginning() {
  return (
    <Chapter id="chapter-1" number={c.number} title={c.title} tone="dream">
      {/* The photo floats among the doodles rather than sitting in a row —
          the chapter has to stay airy. */}
      <div className="begin__objects">
        <Reveal delay={120} className="begin__floats" from="zoom">
          <div className="begin__books" aria-hidden="true">
            <div className="begin__book" />
            <div className="begin__book" />
            <div className="begin__book" />
          </div>

          <div className="begin__cap" aria-hidden="true">
            <div className="begin__cap-top" />
            <div className="begin__tassel" />
          </div>

          <div className="begin__pencil" aria-hidden="true" />
          <span className="begin__star begin__star--a" aria-hidden="true">
            ✨
          </span>
          <span className="begin__star begin__star--b" aria-hidden="true">
            ✨
          </span>
        </Reveal>

        <Reveal delay={260} from="right" className="begin__photo">
          <Polaroid slot="beginning1" caption={c.photoCaption} tilt={4} />
        </Reveal>
      </div>

      <Reveal delay={220}>
        <p className="begin__notebook">{c.notebook}</p>
      </Reveal>

      <div className="begin__copy">
        <Reveal delay={300}>
          <p className="display begin__lead">{c.lead}</p>
        </Reveal>
        <Reveal delay={420}>
          <p className="begin__body">
            {c.body.map((line, i) => (
              <span key={line}>
                {line}
                {i < c.body.length - 1 && <br />}
              </span>
            ))}
          </p>
        </Reveal>
      </div>
    </Chapter>
  );
}
