import type { CSSProperties } from "react";
import { Photo } from "./Photo";
import type { PhotoKey } from "../../content/photos";
import "./Polaroid.css";

type Props = {
  slot: PhotoKey;
  caption?: string;
  /** Tilt in degrees — a few degrees is plenty. */
  tilt?: number;
  /** Width; anything CSS accepts. Stay in % / clamp() on mobile. */
  width?: string;
  ratio?: number;
  priority?: boolean;
  glow?: boolean;
  className?: string;
  style?: CSSProperties;
};

/** A physical-feeling photo card. The one photo treatment used site-wide. */
export function Polaroid({
  slot,
  caption,
  tilt = 0,
  width,
  ratio,
  priority,
  glow = false,
  className = "",
  style,
}: Props) {
  return (
    <figure
      className={`polaroid ${glow ? "polaroid--glow" : ""} ${className}`.trim()}
      style={{ ...style, width, ["--tilt" as string]: `${tilt}deg` }}
    >
      {/* The card's caption follows the photo when it is opened full-screen. */}
      <Photo slot={slot} ratio={ratio} priority={priority} caption={caption} />
      {caption && <figcaption className="polaroid__caption">{caption}</figcaption>}
    </figure>
  );
}
