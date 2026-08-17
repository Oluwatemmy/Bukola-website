import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { useInView } from "../../hooks/useInView";

type Props = {
  children: ReactNode;
  /** Direction the element travels in from. */
  from?: "up" | "left" | "right" | "zoom";
  /** Stagger delay in ms. */
  delay?: number;
  as?: ElementType;
  className?: string;
  threshold?: number;
  style?: React.CSSProperties;
};

/**
 * Scroll-triggered entrance. Adds `.is-in` when the element reaches the
 * viewport; the actual transition is described in global.css so the browser
 * only ever animates opacity + transform.
 */
export function Reveal({
  children,
  from = "up",
  delay = 0,
  as: Tag = "div",
  className = "",
  threshold = 0.18,
  style,
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold });
  const node = useRef<HTMLDivElement | null>(null);

  // Drop `will-change` once the entrance has finished playing.
  useEffect(() => {
    if (!inView) return;
    const el = node.current;
    if (!el) return;
    const t = window.setTimeout(() => el.classList.add("is-settled"), delay + 900);
    return () => window.clearTimeout(t);
  }, [inView, delay]);

  const dir = from === "up" ? "" : from === "zoom" ? "zoom" : `from-${from}`;

  return (
    <Tag
      ref={(el: HTMLDivElement | null) => {
        ref.current = el;
        node.current = el;
      }}
      className={`reveal ${dir} ${inView ? "is-in" : ""} ${className}`.trim()}
      style={{ ...style, ["--d" as string]: delay }}
    >
      {children}
    </Tag>
  );
}
