import { SKILLS } from "../data";

// the scannable version of the mixer: every skill, grouped like the résumé
export default function Skills() {
  return (
    <div className="mt-6 border-t border-rule pt-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="m-0 text-lg font-semibold tracking-[-.015em]">Full toolkit</h3>
        <span className="flex items-center gap-1.5 text-[13px] text-dim">
          <span aria-hidden className="inline-block h-3 w-5 rounded-full border border-dashed border-pink-deep" />
          still learning
        </span>
      </div>
      <dl className="m-0 mt-4 grid gap-4">
        {SKILLS.map((g) => (
          <div key={g.group} className="grid gap-2 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-4">
            <dt className="text-[14px] font-medium text-dim">{g.group}</dt>
            <dd className="m-0 flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <span
                  key={s.name}
                  className={`rounded-full px-2.5 py-1 text-[13px] ${
                    s.learning ? "border border-dashed border-pink-deep text-dim" : "bg-raise text-ink ring-1 ring-rule"
                  }`}
                >
                  {s.name}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
