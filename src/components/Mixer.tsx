import { useState } from "react";
import { STACK, tier, type Channel } from "../data";

const SEGMENTS = 12;

type Selected = Channel & { bus: string };

function Strip({ ch, bus, index, active, onPick }: {
  ch: Channel; bus: string; index: number; active: boolean; onPick: (s: Selected) => void;
}) {
  const lit = Math.round((ch.level / 100) * SEGMENTS);
  const pan = ((index % 3) - 1) * 40; // just so the knobs don't all point the same way
  const pick = () => onPick({ ...ch, bus });

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={`${ch.name}, ${bus}, ${tier(ch.level)}`}
      onClick={pick}
      onMouseEnter={pick}
      onFocus={pick}
      className={`flex w-[52px] flex-col items-center gap-2 rounded border px-1 pb-1.5 pt-2 ${
        active ? "border-rule bg-card" : "border-transparent hover:border-rule hover:bg-card"
      }`}
    >
      <span className="relative h-[18px] w-[18px] rounded-full border-[1.5px] border-dim">
        <span
          className="absolute left-1/2 top-px h-1.5 w-[1.5px] bg-ink"
          style={{ transform: `translateX(-50%) rotate(${pan}deg)`, transformOrigin: "50% 7px" }}
        />
      </span>

      <span className="flex h-[120px] gap-[5px]">
        <span className="flex h-full w-1 flex-col-reverse gap-[2px]">
          {Array.from({ length: SEGMENTS }, (_, k) => (
            <i
              key={k}
              className={`flex-1 rounded-[1px] ${
                k >= lit ? "bg-rule" : k >= SEGMENTS - 3 ? "bg-pink-deep" : "bg-brown/80"
              }`}
            />
          ))}
        </span>
        <span className="relative h-full w-1 rounded-sm bg-rule">
          <span
            className={`absolute left-1/2 h-2.5 w-5 -translate-x-1/2 translate-y-1/2 rounded-sm shadow-[inset_0_-2px_0_rgba(0,0,0,.2)] transition-[bottom] duration-500 ${
              active ? "bg-pink" : "bg-ink"
            }`}
            style={{ bottom: `${ch.level}%` }}
          />
        </span>
      </span>

      <span className="flex min-h-[2.4em] items-center text-center font-mono text-[10.5px] leading-tight">{ch.name}</span>
    </button>
  );
}

export default function Mixer() {
  const [sel, setSel] = useState<Selected>({ ...STACK[0].channels[1], bus: STACK[0].name });

  return (
    <>
      <div className="mt-1.5 overflow-x-auto pb-1 [scrollbar-width:thin]">
        <div className="flex w-max gap-3.5 rounded-2xl border border-rule bg-raise px-3.5 pb-3.5 pt-4">
          {STACK.map((bus, b) => (
            <div key={bus.name} className={`flex flex-col gap-2.5 ${b ? "border-l border-rule pl-3.5" : ""}`}>
              <span className="font-mono text-[10.5px] uppercase tracking-[.08em] text-dim">{bus.name}</span>
              <div className="flex gap-1.5">
                {bus.channels.map((ch, i) => (
                  <Strip
                    key={ch.name}
                    ch={ch}
                    bus={bus.name}
                    index={i}
                    active={sel.name === ch.name}
                    onPick={setSel}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <dl aria-live="polite" className="mt-3 grid min-h-[72px] grid-cols-[auto_minmax(0,1fr)] gap-x-3.5 gap-y-0.5 rounded-xl bg-screen px-3.5 py-3 font-mono text-[13px] text-pink">
        <dt className="text-[#8E7D75]">ch</dt><dd className="m-0">{sel.name.toLowerCase()}</dd>
        <dt className="text-[#8E7D75]">bus</dt><dd className="m-0">{sel.bus}</dd>
        <dt className="text-[#8E7D75]">lvl</dt><dd className="m-0">{tier(sel.level)}</dd>
        <dt className="text-[#8E7D75]" />
        <dd className="m-0">{sel.note}</dd>
      </dl>

      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-dim">
        <span>Fader height = how often I reach for it. Tap a channel for details.</span>
      </div>
    </>
  );
}
