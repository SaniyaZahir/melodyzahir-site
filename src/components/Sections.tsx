import { useState } from "react";
import Section from "./Row";
import { EMAIL, LINKS, PROJECTS, WINS } from "../data";

const Ext = ({ href, children }: { href: string; children: string }) => (
  <a href={href} target="_blank" rel="noopener" className="underline decoration-rule underline-offset-[3px] hover:decoration-pink-deep">
    {children}
  </a>
);

export function Work() {
  return (
    <Section id="work" title="Work">
      <ul className="m-0 list-none divide-y divide-rule border-y border-rule p-0">
        <li className="py-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <span className="font-medium">Software Engineer, Google Developer Groups</span>
            <span className="font-mono text-[13px] text-dim">Oct 2026 – now</span>
          </div>
          <p className="m-0 mt-1.5 max-w-[60ch] text-dim">
            Frontend and backend on SignalLooper, a desktop app built with Tauri, Rust, React and TypeScript. Shipping
            features with a student team from spec through review.
          </p>
        </li>
        <li className="py-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <span className="font-medium">B.Eng. Software Engineering, McMaster University</span>
            <span className="font-mono text-[13px] text-dim">in progress</span>
          </div>
        </li>
      </ul>
    </Section>
  );
}

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <ul className="m-0 list-none divide-y divide-rule border-y border-rule p-0">
        {PROJECTS.map((p) => (
          <li key={p.name} className="py-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <span className="font-medium">{p.name}</span>
              <span className="font-mono text-[13px] text-dim">{p.when}</span>
            </div>
            <p className="m-0 mt-1.5 max-w-[60ch] text-dim">{p.blurb}</p>
            <p className="m-0 mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[13px] text-dim">
              <span>{p.stack.join(", ")}</span>
              {p.link && <Ext href={p.link.href}>{p.link.label}</Ext>}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Wins() {
  return (
    <Section id="wins" title="Wins">
      <ul className="m-0 list-none p-0">
        {WINS.map((w) => (
          <li key={w.text} className="flex gap-4 py-1">
            <span className="shrink-0 font-mono text-[13px] leading-[1.6rem] text-dim">{w.year}</span>
            <span>{w.text}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    const select = () => {
      const el = document.getElementById("email");
      if (!el) return;
      const r = document.createRange();
      r.selectNodeContents(el);
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
    <Section id="contact" title="Contact">
      <p className="m-0 max-w-[60ch] text-dim">Internships, collaborations, or just to say hi.</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span id="email" className="select-all font-mono text-[15px]">{EMAIL}</span>
        <button
          type="button"
          onClick={copy}
          className="rounded-md border border-rule px-2.5 py-1 text-[13px] text-dim hover:border-ink hover:text-ink"
        >
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <p className="m-0 mt-4 flex flex-wrap gap-x-5 gap-y-1">
        {LINKS.map((l) => (
          <Ext key={l.label} href={l.href}>{l.label}</Ext>
        ))}
      </p>
    </Section>
  );
}
