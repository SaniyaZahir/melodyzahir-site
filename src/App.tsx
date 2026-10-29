import { useEffect } from "react";
import Header, { SECTIONS } from "./components/Header";
import Scope from "./components/Scope";
import Card from "./components/Row";
import Mixer from "./components/Mixer";
import Ticker from "./components/Ticker";
import Skills from "./components/Skills";
import { Contact, Inspire, Projects, Wins, Work } from "./components/Sections";
import { useReducedMotion, useTorontoTime } from "./hooks";
import { LINKS } from "./data";

export default function App() {
  const time = useTorontoTime();
  const reduced = useReducedMotion();

  // keys 1–5 jump between sections
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (/input|textarea/i.test((e.target as HTMLElement).tagName)) return;
      const s = SECTIONS.find((x) => x.key === e.key);
      if (s) document.getElementById(s.id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [reduced]);

  return (
    <div className="gutter mx-auto max-w-[880px] pb-8">
      <Header />

      <main className="flex flex-col gap-3.5">
        <section id="top" className="scroll-mt-24 rounded-[22px] border border-rule bg-card p-5 sm:p-8">
          <div className="flex flex-wrap gap-2">
            {["Toronto, ON", "Software Engineering @ McMaster", `${time} local`].map((t) => (
              <span key={t} className="rounded-full border border-rule bg-raise px-3 py-1 text-[13px] tabular-nums text-dim">
                {t}
              </span>
            ))}
          </div>
          <h1 className="m-0 mt-6 text-[clamp(40px,7vw,68px)] font-semibold leading-[1] tracking-[-.04em]">
            hi, i'm melody<span className="text-pink-deep">.</span>
          </h1>
          <p className="m-0 mt-3 text-[clamp(19px,2.4vw,24px)] leading-snug tracking-[-.015em] text-dim">
            i build software and add my <em className="mark tracking-normal">creative touch</em> to things.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {LINKS.map((l, i) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener"
                className={`rounded-xl px-3.5 py-2 text-sm font-medium no-underline transition-colors ${
                  i === 0 ? "bg-ink text-paper hover:bg-brown" : "border border-rule hover:border-pink-deep hover:bg-raise"
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>
        </section>

        <Inspire />
        <Work />
        <Projects />
        <Wins />

        <Card eyebrow="Interactive" title={<>Code meets music</>}>
          <p className="m-0 -mt-2 text-[15px] text-dim">Move across the scope to change the note. Tap to hear it.</p>
          <Scope />
        </Card>


        <Card id="stack" eyebrow="Tech stack" title="What I use">
          <Mixer />
          <Skills />
        </Card>

        <Card eyebrow="Off the clock" title="I also like…" className="overflow-hidden">
          <div className="-mx-5 sm:-mx-7">
            <Ticker />
          </div>
        </Card>

        <Contact />
      </main>

      <footer className="mt-6 flex flex-wrap items-center justify-between gap-2 px-1 text-[13px] text-dim">
        <span>© 2026 Melody · Toronto {time}</span>
        <span className="font-mono text-[12px]">~/melody-site/src/App.tsx</span>
        <a href="#top" className="no-underline hover:text-ink">Back to top ↑</a>
      </footer>
    </div>
  );
}
