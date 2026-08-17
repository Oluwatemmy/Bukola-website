import type { ReactNode } from "react";
import { Ambient } from "../shared/Ambient";
import { Reveal } from "../shared/Reveal";

type Props = {
  id: string;
  number: string;
  title: string;
  /** Drives the background — the tone shifts by light, not by new styling. */
  tone: "dream" | "work" | "dark" | "calm" | "bright";
  children: ReactNode;
  /** Chapter 5 sets its own heading, so the standard one can be hidden. */
  hideHeading?: boolean;
};

/**
 * Every chapter is the same room with the light changed. Keeping the frame
 * identical is what makes the five read as one journey.
 */
export function Chapter({ id, number, title, tone, children, hideHeading = false }: Props) {
  return (
    <section className={`chapter chapter--${tone} section screen`} id={id}>
      <Ambient petals={2} />

      <div className="section-inner chapter__inner">
        {!hideHeading && (
          <Reveal className="chapter__head" delay={0}>
            <span className="chapter__rule" />
            <span className="eyebrow">{number}</span>
            <span className="chapter__rule" />
            <h2 className="display chapter__title">{title}</h2>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
