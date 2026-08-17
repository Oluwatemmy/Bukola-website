import { useCallback, useEffect, useRef, useState } from "react";
import { Door, type DoorPhase } from "./Door";
import { Ambient } from "../shared/Ambient";
import { Celebration } from "../shared/Celebration";
import { door as copy } from "../../content/copy";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import "./DoorExperience.css";

type Stage =
  | { kind: "arrive" } // the door settles into the room, alone
  | { kind: "beat"; index: number } // knock knock → who's there? → …
  | { kind: "ask" } // Can I come in? + YES/NO
  | { kind: "entering" }; // YES pressed, the doors take over

type Props = {
  /** Fired when the light has taken the screen — unlock scrolling here. */
  onOpened: () => void;
  /** Fired once the veil has faded and this component can unmount. */
  onFinished: () => void;
};

/** How long the door has the screen to itself before the first knock. */
const T_ARRIVE = 1600;

/* Timing of the opening, in ms from the YES tap. */
const T_SWING = 420;
const T_FLOOD = 1780;
const T_HANDOVER = 2500;
const T_UNMOUNT = 3500;

/** Keeps NO clear of the YES button and the line she is reading. */
const CLEARANCE = 24;
/** Never let it get closer than this to an edge — the tap target needs room. */
const EDGE = 20;

export function DoorExperience({ onOpened, onFinished }: Props) {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<Stage>({ kind: "arrive" });
  const [noCount, setNoCount] = useState(0);
  const [veiled, setVeiled] = useState(false);
  const [lifting, setLifting] = useState(false);
  const timers = useRef<number[]>([]);

  /* Where NO has run off to. `null` = still sitting under YES. */
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
  const [noPeeking, setNoPeeking] = useState(false);
  const noRef = useRef<HTMLButtonElement>(null);
  const yesRef = useRef<HTMLButtonElement>(null);
  const lineRef = useRef<HTMLParagraphElement>(null);
  const peekTimer = useRef<number | undefined>(undefined);

  const after = useCallback((ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  /* The arrival is the one beat that plays on its own — she has nothing to
     answer yet. Everything after it waits for her. */
  useEffect(() => {
    if (stage.kind !== "arrive") return;
    const id = window.setTimeout(() => setStage({ kind: "beat", index: 0 }), T_ARRIVE);
    return () => window.clearTimeout(id);
  }, [stage.kind]);

  /**
   * Throw NO somewhere else on the screen.
   *
   * Deliberately called *after* a successful tap, never on approach — the
   * button must never dodge a finger. She always lands the tap, then has to
   * go find it again. Candidate spots are rejected if they cover YES (so she
   * can't mis-tap the wrong answer) or the line she is reading, and it can
   * never end up under an edge where it would be hard to reach.
   */
  const throwNoAway = useCallback(() => {
    const btn = noRef.current;
    if (!btn) return;

    const r = btn.getBoundingClientRect();
    const w = window.innerWidth;
    const h = window.innerHeight;
    // The visible pill can be smaller than its 44px tap target — reserve the
    // tap target, so what she has to hit is always what fits on screen.
    const bw = Math.max(r.width, 64);
    const bh = Math.max(r.height, 44);

    const blockers = [yesRef.current?.getBoundingClientRect(), lineRef.current?.getBoundingClientRect()]
      .filter(Boolean)
      .map((b) => b as DOMRect);

    const clashes = (x: number, y: number) =>
      blockers.some(
        (b) =>
          x < b.right + CLEARANCE &&
          x + bw > b.left - CLEARANCE &&
          y < b.bottom + CLEARANCE &&
          y + bh > b.top - CLEARANCE,
      );

    const minX = EDGE;
    const maxX = Math.max(minX, w - bw - EDGE);
    // Starts below the status bar / notch, can go anywhere down to the bottom.
    const minY = h * 0.12;
    const maxY = Math.max(minY, h - bh - EDGE);

    for (let i = 0; i < 40; i++) {
      const x = minX + Math.random() * (maxX - minX);
      const y = minY + Math.random() * (maxY - minY);
      if (!clashes(x, y)) {
        setNoPos({ x, y });
        return;
      }
    }
    // Nowhere clean (a very short screen) — top-left is always reachable.
    setNoPos({ x: minX, y: minY });
  }, []);

  const handleNo = () => {
    setNoCount((n) => n + 1);
    setNoPeeking(false);
    if (!reduced) throwNoAway();

    // If she can't spot it, it gives itself away after a few seconds.
    window.clearTimeout(peekTimer.current);
    peekTimer.current = window.setTimeout(() => setNoPeeking(true), 3800);
  };

  useEffect(() => () => window.clearTimeout(peekTimer.current), []);

  /* Rotating the phone or the browser bars sliding away must not strand it
     off screen. */
  useEffect(() => {
    if (!noPos) return;
    const onResize = () => {
      const btn = noRef.current;
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      setNoPos((p) =>
        p
          ? {
              x: Math.min(Math.max(p.x, EDGE), Math.max(EDGE, window.innerWidth - Math.max(r.width, 64) - EDGE)),
              y: Math.min(Math.max(p.y, window.innerHeight * 0.1), Math.max(0, window.innerHeight - Math.max(r.height, 44) - EDGE)),
            }
          : p,
      );
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [noPos]);

  /** Her turn: answer the knock, or step past the greeting. */
  const advance = () => {
    if (stage.kind !== "beat") return;
    setStage(
      stage.index + 1 < copy.beats.length
        ? { kind: "beat", index: stage.index + 1 }
        : { kind: "ask" },
    );
  };

  const handleYes = () => {
    if (stage.kind === "entering") return;
    setStage({ kind: "entering" });

    after(T_SWING, () => setDoorPhase("opening"));
    after(T_FLOOD, () => {
      setDoorPhase("flooding");
      setVeiled(true);
    });
    after(T_HANDOVER, () => {
      // The page below is now live; dissolve the doorway light into it.
      setLifting(true);
      onOpened();
    });
    after(T_UNMOUNT, onFinished);
  };

  /* Door phase is derived from stage, except during the opening where it
     advances on its own clock. */
  const [openingPhase, setDoorPhase] = useState<DoorPhase>("unlocking");

  let phase: DoorPhase = "still";
  if (stage.kind === "arrive") phase = "arriving";
  else if (stage.kind === "beat")
    phase = stage.index === 0 ? "knock1" : stage.index === 1 ? "knock2" : "still";
  else if (stage.kind === "entering") phase = openingPhase;

  const exhausted = noCount >= copy.noLadder.length;
  const step = Math.min(noCount, copy.noLadder.length - 1);
  const beat = stage.kind === "beat" ? copy.beats[stage.index] : null;

  /* The two previous nags stay above the current one, so the pestering
     reads as one thread instead of a stack of popups. */
  const whispers = noCount > 1 ? copy.noLadder.slice(Math.max(0, noCount - 3), noCount - 1) : [];
  const current = noCount > 0 ? copy.noLadder[noCount - 1] : copy.ask;

  return (
    <div
      className={[
        "door-x",
        stage.kind === "arrive" && "is-arriving",
        stage.kind === "entering" && "is-entering",
        exhausted && "is-warm",
        veiled && "is-veiled",
        lifting && "is-lifting",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={advance}
    >
      <Ambient petals={2} />

      <div className="door-x__stage">
        <Door phase={phase} />
      </div>

      <div className="door-x__scrim" aria-hidden="true" />

      <Celebration active={stage.kind === "entering" && !reduced} intensity="burst" />

      <div className="door-x__panel">
        {/* ---------- knock knock, and her answer ---------- */}
        {beat && (
          <div className="door-x__beat" key={beat.id}>
            <p className="display door-x__line" aria-live="polite">
              {beat.line}
            </p>
            {beat.sub && <p className="door-x__sub">{beat.sub}</p>}

            <button type="button" className="btn-reply" onClick={advance}>
              {beat.reply}
            </button>
          </div>
        )}

        {/* ---------- the ask, and the NO ladder ---------- */}
        {stage.kind === "ask" && !exhausted && (
          <div className="door-x__ask" style={{ ["--step" as string]: step }}>
            {whispers.length > 0 && (
              <div className="door-x__whispers">
                {whispers.map((w) => (
                  <p key={w} className="script door-x__whisper">
                    {w}
                  </p>
                ))}
              </div>
            )}

            <p className="display door-x__line door-x__line--ask" aria-live="polite" ref={lineRef}>
              {current}
            </p>

            {noPos && <p className="door-x__no-hint">{copy.noHint}</p>}

            <div className="door-x__buttons">
              <button type="button" className="btn-yes" onClick={handleYes} ref={yesRef}>
                {copy.yes}
              </button>

              {/* Once NO goes loose it leaves the flow, so a spacer of the
                  same height keeps the rest of the panel exactly where it was. */}
              {noPos && <span className="btn-no__spacer" aria-hidden="true" />}

              <button
                type="button"
                /* Remounting on each tap is what restarts the pop-in animation
                   at the new spot. */
                key={noCount}
                ref={noRef}
                className={[
                  "btn-no",
                  noPos && "btn-no--loose",
                  noPeeking && "btn-no--peeking",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={
                  noPos
                    ? { ["--nx" as string]: `${noPos.x}px`, ["--ny" as string]: `${noPos.y}px` }
                    : undefined
                }
                onClick={(e) => {
                  e.stopPropagation();
                  handleNo();
                }}
              >
                {copy.no}
              </button>
            </div>
          </div>
        )}

        {/* ---------- she wore me down ---------- */}
        {stage.kind === "ask" && exhausted && (
          <div className="door-x__ask door-x__ask--final">
            <p className="script door-x__whisper">{copy.giveUp.whisper}</p>
            <p className="display door-x__line" aria-live="polite">
              {copy.giveUp.line}
              <br />
              <span className="door-x__accent">{copy.giveUp.lineAccent}</span>
            </p>
            <button type="button" className="btn-yes btn-yes--wide" onClick={handleYes}>
              {copy.giveUp.cta}
            </button>
          </div>
        )}

        {/* ---------- through the door ---------- */}
        {stage.kind === "entering" && (
          <p className="display door-x__line door-x__line--go">Come in. 💜</p>
        )}
      </div>

      {/* The doorway light becomes the next screen. */}
      <div className="door-x__veil" aria-hidden="true" />
    </div>
  );
}
