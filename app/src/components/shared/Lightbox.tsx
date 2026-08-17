import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import "./Lightbox.css";

export type LightboxSource = {
  /** The thumbnail the photo grows out of. */
  el: HTMLImageElement;
  src: string;
  alt: string;
  caption?: string;
};

type Box = { w: number; h: number; left: number; top: number };
type Start = { tx: number; ty: number; sx: number; sy: number };

const LightboxContext = createContext<((s: LightboxSource) => void) | null>(null);

/** Returns the opener, or null outside the provider. */
export const useLightbox = () => useContext(LightboxContext);

/** Breathing room around the enlarged photo. */
const PAD = 14;
const DURATION = 400;

/** Largest rect with the photo's own aspect ratio that fits the screen. */
function fitToScreen(natW: number, natH: number): Box {
  const maxW = window.innerWidth - PAD * 2;
  const maxH = window.innerHeight - PAD * 2;
  const ratio = natW && natH ? natW / natH : 3 / 4;

  let w = maxW;
  let h = w / ratio;
  if (h > maxH) {
    h = maxH;
    w = h * ratio;
  }
  return { w, h, left: (window.innerWidth - w) / 2, top: (window.innerHeight - h) / 2 };
}

/**
 * Tap a photo and it grows out of its card to fill the screen; tap anywhere —
 * the photo included — and it shrinks back into place.
 *
 * The grow is a FLIP: the full-size image is placed at its final rect, then
 * transformed back onto the thumbnail and released. Only transform and
 * opacity animate, so it stays smooth on a phone.
 */
export function LightboxProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [source, setSource] = useState<LightboxSource | null>(null);
  const [box, setBox] = useState<Box | null>(null);
  const [start, setStart] = useState<Start | null>(null);
  const [shown, setShown] = useState(false);
  const closing = useRef(false);

  /** Maps the full-size rect back onto wherever the thumbnail currently is. */
  const mapToThumb = useCallback((el: HTMLImageElement, to: Box): Start => {
    const from = el.getBoundingClientRect();
    return {
      tx: from.left + from.width / 2 - (to.left + to.w / 2),
      ty: from.top + from.height / 2 - (to.top + to.h / 2),
      sx: to.w ? from.width / to.w : 1,
      sy: to.h ? from.height / to.h : 1,
    };
  }, []);

  const open = useCallback(
    (s: LightboxSource) => {
      const to = fitToScreen(s.el.naturalWidth, s.el.naturalHeight);
      closing.current = false;
      setSource(s);
      setBox(to);
      setStart(reduced ? null : mapToThumb(s.el, to));
      setShown(false);
    },
    [reduced, mapToThumb],
  );

  const close = useCallback(() => {
    if (!source || !box || closing.current) return;
    closing.current = true;
    // Re-measure: the card may have moved since it was opened.
    if (!reduced && source.el.isConnected) setStart(mapToThumb(source.el, box));
    setShown(false);
    window.setTimeout(
      () => {
        setSource(null);
        setBox(null);
        setStart(null);
        closing.current = false;
      },
      reduced ? 0 : DURATION,
    );
  }, [source, box, reduced, mapToThumb]);

  /* Release the start transform on the next painted frame — that is what
     turns it into an animation rather than a jump. */
  useEffect(() => {
    if (!source || closing.current) return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setShown(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [source]);

  /* While it's open: hold the page still and let Escape out. */
  useEffect(() => {
    if (!source) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onResize = () => setBox(fitToScreen(source.el.naturalWidth, source.el.naturalHeight));

    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [source, close]);

  return (
    <LightboxContext.Provider value={open}>
      {children}

      {source && box && (
        <div
          className={`lightbox ${shown ? "is-open" : ""}`}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={source.alt}
        >
          <img
            className="lightbox__img"
            src={source.src}
            alt={source.alt}
            style={{
              left: box.left,
              top: box.top,
              width: box.w,
              height: box.h,
              transform:
                shown || !start
                  ? "none"
                  : `translate(${start.tx}px, ${start.ty}px) scale(${start.sx}, ${start.sy})`,
            }}
          />

          {source.caption && <p className="lightbox__caption">{source.caption}</p>}
          <p className="lightbox__hint">tap anywhere to close</p>
        </div>
      )}
    </LightboxContext.Provider>
  );
}
