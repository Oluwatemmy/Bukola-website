import { Chapter } from "./Chapter";
import { Reveal } from "../shared/Reveal";
import { journey } from "../../content/copy";

const c = journey.calm;

/**
 * Chapter 4 — everything clears. Coffee steam and a calendar counting up
 * are the only motion. Deliberately the emptiest screen in the site.
 */
export function ChapterCalm() {
  return (
    <Chapter id="chapter-4" number={c.number} title={c.title} tone="calm">
      <Reveal delay={140} from="zoom">
        <div className="calm__cup" aria-hidden="true">
          <span className="calm__steam calm__steam--a" />
          <span className="calm__steam calm__steam--b" />
        </div>
      </Reveal>

      <Reveal delay={260}>
        <p className="calm__years" aria-label={`${c.years[0]} to ${c.years[c.years.length - 1]}`}>
          {c.years.map((year, i) => (
            <span key={year} className={`calm__year ${i === c.years.length - 1 ? "is-now" : ""}`}>
              {year}
            </span>
          ))}
        </p>
      </Reveal>

      <div className="calm__copy">
        <Reveal delay={120}>
          <p className="calm__lead">
            {c.lead.map((line, i) => (
              <span key={line}>
                {line}
                {i < c.lead.length - 1 && <br />}
              </span>
            ))}
          </p>
        </Reveal>

        <Reveal delay={420}>
          <p className="calm__outro">
            {c.outro.map((line, i) => (
              <span key={line}>
                {line}
                {i < c.outro.length - 1 && <br />}
              </span>
            ))}
          </p>
        </Reveal>
      </div>
    </Chapter>
  );
}
