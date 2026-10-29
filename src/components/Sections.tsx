import { useState, type MouseEvent } from "react";
import Card from "./Row";
import { EMAIL, LINKS, PROJECTS, WINS } from "../data";

const Chip = ({ children }: { children: string }) => (
  <span className="rounded-full bg-pink/55 px-2.5 py-0.5 text-[12.5px] font-medium text-onpink">{children}</span>
);

export function Inspire() {
  return (
    <Card id="inspire" eyebrow="What inspires me">
      <p className="m-0 max-w-[26ch] text-[clamp(24px,3.4vw,34px)] font-semibold leading-[1.2] tracking-[-.025em] [text-wrap:balance]">
        Building and shipping features <em className="mark">used by millions.</em>
      </p>
    </Card>
  );
}

export function Work() {
  return (
    <Card id="work" eyebrow="Experience" title="Work">
      <div className="flex flex-col gap-3">
        <article className="rounded-2xl bg-raise p-4 sm:p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="m-0 text-lg font-semibold tracking-[-.015em]">Software Engineer @ GDG</h3>
            <span className="text-sm tabular-nums text-dim">Oct 2026 – now</span>
          </div>
          <p className="m-0 mt-0.5 text-dim">Google Developer Groups · SignalLooper</p>
          <ul className="m-0 mt-3 flex max-w-[62ch] list-none flex-col gap-1.5 p-0 text-[15px]">
            {[
              "Working on both the frontend and backend teams of a desktop app built with Tauri, Rust, React and TypeScript.",
              "Shipping features with a student dev team from onboarding through review.",
            ].map((t) => (
              <li key={t} className="relative pl-4">
                <span aria-hidden className="absolute left-0 top-[.62em] h-1.5 w-1.5 rounded-full bg-pink-deep" />
                {t}
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl bg-raise p-4 sm:p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="m-0 text-lg font-semibold tracking-[-.015em]">B.Eng. Software Engineering</h3>
            <span className="text-sm text-dim">In progress</span>
          </div>
          <p className="m-0 mt-0.5 text-dim">McMaster University</p>
        </article>
      </div>
    </Card>
  );
}

export function Projects() {
  return (
    <Card id="projects" eyebrow="Things I've built" title="Projects">
      <div className="grid gap-3 md:grid-cols-3">
        {PROJECTS.map((p) => (
          <article
            key={p.name}
            className="group flex min-w-0 flex-col gap-2.5 rounded-2xl border border-rule bg-card p-4 transition duration-300 hover:-translate-y-0.5 hover:border-pink-deep/60 hover:shadow-[0_14px_30px_-18px_rgba(59,42,35,.35)]"
          >
            <span className="text-[13px] text-dim">{p.when}</span>
            <h3 className="m-0 text-xl font-semibold tracking-[-.02em]">{p.name}</h3>
            <p className="m-0 text-[15px] leading-relaxed text-dim">{p.blurb}</p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
              {p.stack.map((s) => <Chip key={s}>{s}</Chip>)}
            </div>
            {p.link && (
              <a href={p.link.href} target="_blank" rel="noopener" className="self-start text-sm font-medium text-brown decoration-pink-deep">
                {p.link.label} ↗
              </a>
            )}
          </article>
        ))}
      </div>
    </Card>
  );
}

export function Wins() {
  return (
    <Card id="wins" eyebrow="Competitions" title="Wins">
      <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-3">
        {WINS.map((w) => (
          <li key={w.title} className="flex flex-col gap-1 rounded-2xl bg-raise p-4">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-serif text-[30px] italic leading-none text-brown">{w.place}</span>
              <span className="text-[13px] tabular-nums text-dim">{w.year}</span>
            </div>
            <strong className="mt-1 font-semibold tracking-[-.01em]">{w.title}</strong>
            <span className="text-sm text-dim">{w.sub}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = (e: MouseEvent<HTMLButtonElement>) => {
    const code = e.currentTarget.previousElementSibling as HTMLElement;
    const select = () => {
      const r = document.createRange();
      r.selectNodeContents(code);
      const s = getSelection();
      s?.removeAllRanges(); s?.addRange(r);
    };
    try {
      navigator.clipboard.writeText(EMAIL).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }, select);
    } catch { select(); }
  };

  return (
    <Card id="contact" eyebrow="Let's talk">
      <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
        <div>
          <h2 className="m-0 text-[clamp(32px,5vw,48px)] font-semibold leading-[1.05] tracking-[-.035em]">
            Let's build <em className="mark tracking-[-.01em]">something.</em>
          </h2>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <code className="select-all rounded-xl border border-rule bg-raise px-3 py-2 font-mono text-sm">{EMAIL}</code>
            <button type="button" onClick={copy} className="rounded-xl bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-brown">
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener"
              className="group flex justify-between gap-3 border-b border-rule py-3 no-underline last:border-0"
            >
              <span className="font-medium">{l.label}</span>
              <span className="text-sm text-dim group-hover:text-pink-deep">{l.handle} ↗</span>
            </a>
          ))}
        </div>
      </div>
    </Card>
  );
}
