import { useRef, useState } from "react";
import { photos, photoSrc, type PhotoKey } from "../../content/photos";
import { useLightbox } from "./Lightbox";
import "./Photo.css";

type Props = {
  slot: PhotoKey;
  /** Override the manifest ratio when a layout needs a specific crop. */
  ratio?: number;
  className?: string;
  /** The first screenful after the door — worth loading eagerly. */
  priority?: boolean;
  /** Slow drift while the photo is on screen. */
  parallax?: boolean;
  /** Shown under the photo when it is opened full-screen. */
  caption?: string;
  /** Opt out of tap-to-enlarge. */
  zoomable?: boolean;
};

/**
 * A photo slot. Renders the real file if it exists in
 * /public/images/bukola/, otherwise a labelled placeholder at the exact
 * same aspect ratio — so dropping the real photo in never moves the layout.
 *
 * Once the real photo has loaded it can be tapped to fill the screen.
 * Placeholders stay inert — there is nothing to enlarge.
 */
export function Photo({
  slot,
  ratio,
  className = "",
  priority = false,
  parallax = false,
  caption,
  zoomable = true,
}: Props) {
  const meta = photos[slot];
  const [state, setState] = useState<"pending" | "ready" | "missing">("pending");
  const imgRef = useRef<HTMLImageElement>(null);
  const openLightbox = useLightbox();

  const canZoom = zoomable && state === "ready" && !!openLightbox;

  const enlarge = () => {
    if (!canZoom || !imgRef.current) return;
    openLightbox({ el: imgRef.current, src: photoSrc(slot), alt: meta.alt, caption });
  };

  return (
    <div
      className={`photo ${state} ${parallax ? "photo--parallax" : ""} ${
        canZoom ? "photo--zoomable" : ""
      } ${className}`.trim()}
      style={{ aspectRatio: String(ratio ?? meta.ratio) }}
      onClick={
        canZoom
          ? (e) => {
              e.stopPropagation();
              enlarge();
            }
          : undefined
      }
      onKeyDown={
        canZoom
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                enlarge();
              }
            }
          : undefined
      }
      role={canZoom ? "button" : undefined}
      tabIndex={canZoom ? 0 : undefined}
      aria-label={canZoom ? `${meta.alt} — tap to enlarge` : undefined}
    >
      <img
        ref={imgRef}
        src={photoSrc(slot)}
        alt={state === "ready" ? meta.alt : ""}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => setState("ready")}
        onError={() => setState("missing")}
        draggable={false}
      />

      {state !== "ready" && (
        <div className="photo__placeholder" aria-hidden="true">
          <span className="photo__frame" />
          <span className="photo__label">{meta.label}</span>
          <span className="photo__hint">{meta.file}</span>
        </div>
      )}
    </div>
  );
}
