import "./Door.css";

export type DoorPhase =
  | "arriving" // the door settles into the room before anything is said
  | "still"
  | "knock1"
  | "knock2"
  | "unlocking" // handles react
  | "opening" // leaves swing
  | "flooding"; // light takes the screen

/**
 * The two-leaf portal. Mechanics are adapted from door-animation.html —
 * two 50%-width leaves rotating on outer transform-origins inside a
 * perspective stage — restyled into plum + gold and driven by phase
 * rather than a click toggle.
 */
export function Door({ phase }: { phase: DoorPhase }) {
  const open = phase === "opening" || phase === "flooding";

  return (
    <div className={`door door--${phase} ${open ? "is-open" : ""}`} aria-hidden="true">
      <div className="door__frame">
        <div className="door__cornice">
          <span className="door__frieze" />
        </div>

        <div className="door__jamb door__jamb--left">
          <span className="door__filigree" />
        </div>
        <div className="door__jamb door__jamb--right">
          <span className="door__filigree" />
        </div>

        <div className="door__opening">
          {/* What waits behind the doors. */}
          <div className="door__interior">
            <div className="door__light" />
            <div className="door__interior-copy">
              <span className="door__interior-title">SHE DID IT</span>
              <span className="door__interior-sub">CLASS OF 2026</span>
            </div>
          </div>

          <div className="door__leaf door__leaf--left">
            <div className="door__panel">
              <span className="door__mandala" />
            </div>
            <span className="door__handle" />
          </div>

          <div className="door__leaf door__leaf--right">
            <div className="door__panel">
              <span className="door__mandala" />
            </div>
            <span className="door__handle" />
          </div>
        </div>
      </div>

      <div className="door__floor-glow" />
    </div>
  );
}
