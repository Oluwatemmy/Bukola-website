import { ChapterBeginning } from "./ChapterBeginning";
import { ChapterWork } from "./ChapterWork";
import { ChapterStruggle } from "./ChapterStruggle";
import { ChapterCalm } from "./ChapterCalm";
import { ChapterFinishLine } from "./ChapterFinishLine";
import "./Journey.css";

/** Five chapters, scrolled straight through. 😭 → ☕ → 🥹 → 🎓 */
export function Journey() {
  return (
    <div className="journey" id="journey">
      <ChapterBeginning />
      <ChapterWork />
      <ChapterStruggle />
      <ChapterCalm />
      <ChapterFinishLine />
    </div>
  );
}
