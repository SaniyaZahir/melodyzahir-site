import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks";

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const hz = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);
const rgb = (name: string) => `rgb(${getComputedStyle(document.documentElement).getPropertyValue(name).trim()})`;

/**
 * A playable oscilloscope. Cursor x → pitch (C4–C6), cursor y → amplitude.
 * Pointer down plays the note through Web Audio (fundamental + quiet 3rd harmonic).
 * Readouts are written straight to the DOM through refs so React doesn't re-render 60×/s.
 */
export default function Scope() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noteRef = useRef<HTMLElement>(null);
  const hzRef = useRef<HTMLElement>(null);
  const perRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const cv = canvasRef.current!;
    const ctx = cv.getContext("2d")!;
    let W = 0, H = 0, raf = 0, last = performance.now();
    let midi = 69, amp = 0.62, phase = 0, touched = false;
    const target = { midi: 69, amp: 0.62 };
    let colors = { screen: "", trace: "", grat: "" };
    let audio: AudioContext | undefined;

    const readColors = () => {
      colors = { screen: rgb("--screen"), trace: rgb("--trace"), grat: rgb("--grat") };
    };

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const r = cv.getBoundingClientRect();
      W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) draw();
    };

    const readout = () => {
      const m = Math.round(midi), f = hz(m);
      if (noteRef.current) noteRef.current.textContent = NOTES[m % 12] + (Math.floor(m / 12) - 1);
      if (hzRef.current) hzRef.current.textContent = f.toFixed(2);
      if (perRef.current) perRef.current.textContent = (1000 / f).toFixed(3);
    };

    const draw = () => {
      ctx.fillStyle = colors.screen;
      ctx.fillRect(0, 0, W, H);

      // graticule: 10 × 8 divisions plus minor ticks on the center line
      ctx.strokeStyle = colors.grat; ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 1; i < 10; i++) { const x = Math.round((W * i) / 10) + 0.5; ctx.moveTo(x, 0); ctx.lineTo(x, H); }
      for (let j = 1; j < 8; j++) { const y = Math.round((H * j) / 8) + 0.5; ctx.moveTo(0, y); ctx.lineTo(W, y); }
      for (let k = 0; k <= 50; k++) { const x = Math.round((W * k) / 50) + 0.5; ctx.moveTo(x, H / 2 - 3); ctx.lineTo(x, H / 2 + 3); }
      ctx.stroke();

      // trace: cycles on screen scale with pitch so higher notes look denser
      const cycles = hz(midi) / 110;
      const A = amp * H * 0.38, mid = H / 2;
      ctx.save();
      ctx.shadowColor = colors.trace; ctx.shadowBlur = 10;
      ctx.strokeStyle = colors.trace; ctx.lineWidth = 2; ctx.lineJoin = "round";
      ctx.beginPath();
      for (let x = 0; x <= W; x += 1.5) {
        const t = (x / W) * cycles * Math.PI * 2 + phase;
        const y = mid - (A * (Math.sin(t) + 0.22 * Math.sin(3 * t))) / 1.1;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!touched) target.midi = 69 + Math.sin(now / 2600) * 7; // idle drift around A4
      midi += (target.midi - midi) * Math.min(1, dt * 8);
      amp += (target.amp - amp) * Math.min(1, dt * 6);
      phase -= dt * 2.2;
      draw(); readout();
      raf = requestAnimationFrame(loop);
    };

    const aim = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      const x = Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1);
      const y = Math.min(Math.max((e.clientY - r.top) / r.height, 0), 1);
      touched = true;
      target.midi = 60 + x * 24;
      target.amp = 0.25 + (1 - Math.abs(y - 0.5) * 2) * 0.7;
      if (reduced) { midi = target.midi; amp = target.amp; draw(); readout(); }
    };

    const play = (e: PointerEvent) => {
      aim(e);
      try {
        audio ??= new AudioContext();
        const t = audio.currentTime, f = hz(Math.round(target.midi));
        const gain = audio.createGain(), third = audio.createGain();
        const o1 = audio.createOscillator(), o3 = audio.createOscillator();
        o1.frequency.value = f; o3.frequency.value = f * 3; third.gain.value = 0.18;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.18, t + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
        o1.connect(gain); o3.connect(third).connect(gain); gain.connect(audio.destination);
        [o1, o3].forEach((o) => { o.start(t); o.stop(t + 0.75); });
      } catch { /* audio unavailable */ }
    };

    const leave = () => { touched = false; };
    const themeObserver = new MutationObserver(() => { readColors(); if (reduced) draw(); });
    const schemeMq = matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => { readColors(); if (reduced) draw(); };

    readColors(); resize(); readout();
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    schemeMq.addEventListener("change", onScheme);
    addEventListener("resize", resize);
    cv.addEventListener("pointermove", aim);
    cv.addEventListener("pointerdown", play);
    cv.addEventListener("pointerleave", leave);
    if (reduced) draw(); else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      schemeMq.removeEventListener("change", onScheme);
      removeEventListener("resize", resize);
      cv.removeEventListener("pointermove", aim);
      cv.removeEventListener("pointerdown", play);
      cv.removeEventListener("pointerleave", leave);
      audio?.close();
    };
  }, [reduced]);

  return (
    <div className="relative overflow-hidden rounded-lg bg-screen">
      <span className="pointer-events-none absolute left-3.5 top-2.5 font-mono text-[11px] text-[#A8968E]">
        CH1 <span className="text-trace">●</span> move to tune · tap to play
      </span>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Oscilloscope. Move across it to change the pitch, tap to hear the note."
        className="block h-[200px] w-full cursor-crosshair touch-none sm:h-[260px]"
      />
      <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-t border-grat px-3.5 py-2.5 font-mono text-[11.5px] tabular-nums text-[#A8968E]">
        <span>note <b ref={noteRef} className="font-medium text-trace">A4</b></span>
        <span>freq <b ref={hzRef} className="font-medium text-trace">440.00</b> Hz</span>
        <span>period <b ref={perRef} className="font-medium text-trace">2.273</b> ms</span>
        <span>wave <b className="font-medium text-trace">sine + 3rd</b></span>
      </div>
    </div>
  );
}
