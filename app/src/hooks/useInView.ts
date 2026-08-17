import { useEffect, useRef, useState } from "react";

type Options = {
  /** Fraction of the element that must be visible. */
  threshold?: number;
  /** Shrink the viewport so things trigger a little before the edge. */
  rootMargin?: string;
  /** Keep `true` forever after the first hit (default). */
  once?: boolean;
};

/**
 * One shared observer per (threshold, rootMargin) pair keeps the page cheap
 * even with a few dozen revealing elements.
 */
const registry = new Map<string, IntersectionObserver>();
const callbacks = new WeakMap<Element, (visible: boolean) => void>();

function getObserver(threshold: number, rootMargin: string) {
  const key = `${threshold}|${rootMargin}`;
  let obs = registry.get(key);
  if (!obs) {
    obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          callbacks.get(entry.target)?.(entry.isIntersecting);
        }
      },
      { threshold, rootMargin },
    );
    registry.set(key, obs);
  }
  return obs;
}

export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.18,
  rootMargin = "0px 0px -8% 0px",
  once = true,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const obs = getObserver(threshold, rootMargin);
    callbacks.set(el, (visible) => {
      if (visible) {
        setInView(true);
        if (once) obs.unobserve(el);
      } else if (!once) {
        setInView(false);
      }
    });
    obs.observe(el);

    return () => {
      obs.unobserve(el);
      callbacks.delete(el);
    };
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
