import { useTheme } from "../hooks";

export const SECTIONS = [
  { key: "1", id: "work", label: "work" },
  { key: "2", id: "projects", label: "projects" },
  { key: "3", id: "stack", label: "stack" },
  { key: "4", id: "contact", label: "contact" },
] as const;

export default function Header() {
  const { theme, toggle } = useTheme();
  return (
    <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-8">
      <a href="#top" className="font-medium no-underline">
        Melody Zahir
      </a>
      <nav aria-label="Sections" className="flex flex-wrap items-baseline gap-x-5 gap-y-1 text-[15px] text-dim">
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="no-underline hover:text-ink">
            {s.label}
          </a>
        ))}
        <button type="button" onClick={toggle} className="text-dim hover:text-ink">
          {theme === "dark" ? "light" : "dark"}
        </button>
      </nav>
    </header>
  );
}
