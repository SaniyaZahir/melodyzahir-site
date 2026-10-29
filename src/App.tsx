import { useEffect } from "react";
import Header, { SECTIONS } from "./components/Header";
import Scope from "./components/Scope";
import Section from "./components/Row";
import Mixer from "./components/Mixer";
import Ticker from "./components/Ticker";
import Skills from "./components/Skills";
import { Contact, Projects, Wins, Work } from "./components/Sections";
import { useReducedMotion } from "./hooks";
import { LINKS } from "./data";

export default function App() {
  const reduced = useReducedMotion();

  // number keys jump between sections
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
    <div className="gutter mx-auto max-w-[720px] pb-16 text-[16px] leading-relaxed">
      <Header />

      <main>
        <section id="top" className="pt-20">
          <h1 className="m-0 text-[clamp(34px,6vw,48px)] font-semibold leading-[1.1] tracking-[-.02em]">
            hi, i'm melody<span className="text-pink-deep">.</span>
          </h1>
          <p className="m-0 mt-4 max-w-[52ch] text-[18px] text-dim">
            I build software and add my creative touch to things. Software Engineering at McMaster, based in Toronto.
          </p>
          <p className="m-0 mt-4 max-w-[52ch] text-[18px]">
            What drives me: building and shipping features used by millions.
          </p>
          <p className="m-0 mt-6 flex flex-wrap gap-x-5 gap-y-1">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener"
                className="underline decoration-rule underline-offset-[3px] hover:decoration-pink-deep"
              >
                {l.label}
              </a>
            ))}
          </p>
        </section>

        <Work />
        <Projects />
        <Wins />

        <Section id="sound" title="Oscilloscope">
          <p className="m-0 mb-4 text-dim">Move across it to change the note. Click to hear it.</p>
          <Scope />
        </Section>

        <Section id="stack" title="Stack">
          <Mixer />
          <Skills />
        </Section>

        <Section title="Outside of code">
          <Ticker />
        </Section>

        <Contact />
      </main>

      <footer className="mt-20 flex flex-wrap justify-between gap-2 border-t border-rule pt-5 text-[14px] text-dim">
        <span>© 2026 Melody Zahir</span>
        <a href="#top" className="no-underline hover:text-ink">back to top</a>
      </footer>
    </div>
  );
}
