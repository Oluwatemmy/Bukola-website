import "./Ambient.css";

/**
 * The two ambient layers that run through every screen: a slow star twinkle
 * and a couple of falling petals. Both are pure CSS on ≤3 elements, so they
 * cost effectively nothing even on an old phone.
 */
export function Ambient({ petals = 2, stars = true }: { petals?: number; stars?: boolean }) {
  return (
    <div className="ambient" aria-hidden="true">
      {stars && <div className="ambient__stars" />}
      {Array.from({ length: petals }, (_, i) => (
        <span key={i} className={`ambient__petal ambient__petal--${i % 3}`} />
      ))}
    </div>
  );
}
