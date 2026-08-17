import { useEffect, useState } from "react";
import { useInView } from "../../hooks/useInView";
import { journey } from "../../content/copy";

const messages = journey.struggle.messages;

/**
 * The notifications land one at a time once the chapter is on screen.
 *
 * These are deliberately generic university messages — the class group, the
 * lecturer, the portal. Nothing here is put in Bukola's mouth; the beat
 * between messages is a typing indicator, not an invented reaction.
 */
export function NotificationSequence() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timers: number[] = [];
    // Two ticks per message: the message, then the beat after it.
    for (let i = 1; i <= messages.length * 2; i++) {
      timers.push(window.setTimeout(() => setShown(i), 420 + i * 620));
    }
    return () => timers.forEach(window.clearTimeout);
  }, [inView]);

  return (
    <div className="notif" ref={ref}>
      {messages.map((m, i) => (
        <div className="notif__group" key={m.text}>
          <div className={`notif__item ${shown > i * 2 ? "is-in" : ""}`}>
            <div className="notif__meta">
              <span>{m.from}</span>
              <span>{m.time}</span>
            </div>
            <p className="notif__text">{m.text}</p>
          </div>

          {i < messages.length - 1 && (
            <div className={`notif__typing ${shown > i * 2 + 1 ? "is-in" : ""}`} aria-hidden="true">
              <span className="notif__dot" />
              <span className="notif__dot" />
              <span className="notif__dot" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
