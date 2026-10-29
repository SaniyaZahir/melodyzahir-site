import { SKILLS } from "../data";

// the plain-text version of the mixer: everything, grouped like the résumé
export default function Skills() {
  return (
    <dl className="m-0 mt-8 grid gap-3">
      {SKILLS.map((g) => (
        <div key={g.group} className="grid gap-x-6 gap-y-0.5 sm:grid-cols-[170px_minmax(0,1fr)]">
          <dt className="text-dim">{g.group}</dt>
          <dd className="m-0">
            {g.items.map((s, i) => (
              <span key={s.name}>
                {s.learning ? <span className="text-dim">{s.name} (learning)</span> : s.name}
                {i < g.items.length - 1 && ", "}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
