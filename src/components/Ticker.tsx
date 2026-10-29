import { LIKES } from "../data";

// one slow lane. the list renders twice so translateX(-50%) loops without a seam.
export default function Ticker() {
  return (
    <div className="group overflow-hidden" role="img" aria-label={LIKES.join(", ")}>
      <div
        aria-hidden
        className="flex w-max text-[22px] group-hover:[animation-play-state:paused]"
        style={{ animation: "slide 45s linear infinite" }}
      >
        {[0, 1].map((copy) =>
          LIKES.map((item) => (
            <span key={`${copy}-${item}`} className="whitespace-nowrap pr-6">
              {item}
              <span className="pl-6 text-rule">/</span>
            </span>
          )),
        )}
      </div>
    </div>
  );
}
