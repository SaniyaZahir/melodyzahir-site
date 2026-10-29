import { LIKES } from "../data";

// two lanes drifting opposite ways. each lane renders the list twice so translateX(-50%) loops with no seam.
function Lane({ items, reverse, seconds }: { items: string[]; reverse?: boolean; seconds: number }) {
  return (
    <div
      aria-hidden
      className="flex w-max group-hover:[animation-play-state:paused]"
      style={{ animation: `slide ${seconds}s linear infinite`, animationDirection: reverse ? "reverse" : "normal" }}
    >
      {[0, 1].map((copy) =>
        items.map((item, i) => (
          <span key={`${copy}-${item}`} className="flex items-center">
            <span
              className={`whitespace-nowrap pr-[.5em] text-[clamp(28px,4.4vw,46px)] leading-[1.15] tracking-[-.03em] ${
                (i + (reverse ? 1 : 0)) % 2 ? "font-serif italic font-normal text-brown" : "font-medium"
              }`}
            >
              {item}
            </span>
            <span className="pr-[.6em] text-[clamp(16px,2vw,22px)] text-pink-deep">✦</span>
          </span>
        )),
      )}
    </div>
  );
}

export default function Ticker() {
  return (
    <div className="group fade-x flex flex-col gap-1.5 overflow-hidden" aria-label={LIKES.join(", ")} role="img">
      <Lane items={LIKES} seconds={34} />
      <Lane items={[...LIKES].reverse()} reverse seconds={40} />
    </div>
  );
}
