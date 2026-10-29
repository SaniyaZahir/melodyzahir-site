import { useTheme } from "../hooks";

export const SECTIONS = [
  { key: "1", id: "inspire", label: "about" },
  { key: "2", id: "work", label: "work" },
  { key: "3", id: "projects", label: "projects" },
  { key: "4", id: "stack", label: "stack" },
  { key: "5", id: "contact", label: "contact" },
] as const;

// floating pill nav, centered
export default function Header() {
  const { theme, toggle } = useTheme();
  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-[5] flex justify-center py-3">
      <nav
        aria-label="Sections"
        className="flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-rule bg-card/90 p-1 shadow-[0_6px_24px_-12px_rgba(59,42,35,.25)] backdrop-blur"
      >
        <a href="#top" className="rounded-full px-3 py-1.5 font-mono text-[13px] text-ink no-underline hover:bg-raise">
          ./
        </a>
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            title={`press ${s.key}`}
            className="whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-[13px] text-dim no-underline hover:bg-raise hover:text-ink"
          >
            ./{s.label}
          </a>
        ))}
        <button
          type="button"
          onClick={toggle}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          className="rounded-full px-3 py-1.5 text-[13px] text-dim hover:bg-raise hover:text-ink"
        >
          ◐
        </button>
      </nav>
    </header>
  );
}
