import type { ReactNode } from "react";

type Props = { id?: string; title: string; children: ReactNode };

// a section is just a heading and its content. spacing does the separating.
export default function Section({ id, title, children }: Props) {
  return (
    <section id={id} className="scroll-mt-8 pt-14">
      <h2 className="m-0 text-[15px] font-semibold">{title}</h2>
      <div className="mt-4 min-w-0">{children}</div>
    </section>
  );
}
