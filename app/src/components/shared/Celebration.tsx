import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import "./Celebration.css";

type Kind = "confetti" | "heart" | "star";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vrot: number;
  life: number;
  maxLife: number;
  color: string;
  kind: Kind;
  sway: number;
};

/** Strictly the site palette — no stray red hearts. */
const COLORS = ["#ffd3ea", "#ffa8d8", "#ff9fd4", "#e6a9e0", "#d089ea", "#c86fd8", "#a75fae"];

type Props = {
  active: boolean;
  /** `burst` = the door opening. `gentle` = the final scene. */
  intensity?: "burst" | "gentle";
  className?: string;
};

/**
 * One small canvas draws all celebration particles — hearts, stars and
 * confetti — instead of dozens of animated DOM nodes. It stops its own
 * rAF loop the moment the last particle dies.
 */
export function Celebration({ active, intensity = "burst", className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!active || reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const narrow = w < 430;
    const burst = intensity === "burst";
    /* Keep the count modest — this has to stay smooth on a mid-range phone. */
    const total = burst ? (narrow ? 90 : 130) : narrow ? 34 : 48;
    const particles: Particle[] = [];

    const spawn = (fromCentre: boolean): Particle => {
      const kindRoll = Math.random();
      const kind: Kind = kindRoll < 0.42 ? "confetti" : kindRoll < 0.75 ? "heart" : "star";
      const maxLife = burst ? 1900 + Math.random() * 1600 : 4200 + Math.random() * 2600;

      if (fromCentre) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.5;
        const speed = 3.4 + Math.random() * 5.6;
        return {
          x: w / 2 + (Math.random() - 0.5) * w * 0.36,
          y: h * 0.52,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: (kind === "confetti" ? 5 : 9) + Math.random() * 6,
          rot: Math.random() * Math.PI * 2,
          vrot: (Math.random() - 0.5) * 0.22,
          life: 0,
          maxLife,
          color: COLORS[(Math.random() * COLORS.length) | 0],
          kind,
          sway: 0.4 + Math.random() * 1.1,
        };
      }

      return {
        x: Math.random() * w,
        y: h + 20,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(0.5 + Math.random() * 0.9),
        size: (kind === "confetti" ? 4 : 8) + Math.random() * 5,
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.08,
        life: 0,
        maxLife,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        kind,
        sway: 0.3 + Math.random() * 0.7,
      };
    };

    if (burst) {
      for (let i = 0; i < total; i++) particles.push(spawn(true));
    }

    const drawHeart = (s: number) => {
      ctx.beginPath();
      ctx.moveTo(0, s * 0.32);
      ctx.bezierCurveTo(-s * 0.6, -s * 0.28, -s * 0.18, -s * 0.78, 0, -s * 0.34);
      ctx.bezierCurveTo(s * 0.18, -s * 0.78, s * 0.6, -s * 0.28, 0, s * 0.32);
      ctx.closePath();
      ctx.fill();
    };

    const drawStar = (s: number) => {
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.6);
      ctx.quadraticCurveTo(0, 0, s * 0.6, 0);
      ctx.quadraticCurveTo(0, 0, 0, s * 0.6);
      ctx.quadraticCurveTo(0, 0, -s * 0.6, 0);
      ctx.quadraticCurveTo(0, 0, 0, -s * 0.6);
      ctx.fill();
    };

    let raf = 0;
    let last = performance.now();
    let elapsed = 0;
    let emitted = 0;
    const emitWindow = burst ? 0 : 7000;
    const gravity = burst ? 0.028 : -0.004;

    const frame = (now: number) => {
      const dt = Math.min(now - last, 48);
      last = now;
      elapsed += dt;

      /* Gentle mode trickles particles up rather than firing them all at once. */
      if (!burst && elapsed < emitWindow && emitted < total) {
        const want = Math.floor((elapsed / emitWindow) * total);
        while (emitted < want) {
          particles.push(spawn(false));
          emitted++;
        }
      }

      ctx.clearRect(0, 0, w, h);

      let alive = 0;
      for (const p of particles) {
        p.life += dt;
        if (p.life >= p.maxLife) continue;
        alive++;

        const t = dt / 16.7;
        p.vy += gravity * t;
        p.vx += Math.sin((p.life / 620) * p.sway) * 0.035 * t;
        p.x += p.vx * t;
        p.y += p.vy * t;
        p.rot += p.vrot * t;

        const fadeIn = Math.min(p.life / 220, 1);
        const fadeOut = 1 - Math.max(0, (p.life - (p.maxLife - 700)) / 700);
        ctx.globalAlpha = Math.max(0, Math.min(fadeIn, fadeOut)) * (burst ? 0.95 : 0.8);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;

        if (p.kind === "confetti") {
          ctx.fillRect(-p.size / 2, -p.size / 3.2, p.size, p.size / 1.6);
        } else if (p.kind === "heart") {
          drawHeart(p.size);
        } else {
          drawStar(p.size);
        }
        ctx.restore();
      }
      ctx.globalAlpha = 1;

      if (alive > 0 || (!burst && elapsed < emitWindow)) {
        raf = requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, w, h);
      }
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [active, intensity, reduced]);

  if (reduced) return null;

  return <canvas ref={canvasRef} className={`celebration ${className}`.trim()} aria-hidden="true" />;
}
