import type { ReactNode } from "react";

type Props = { id?: string; eyebrow: string; title?: ReactNode; children: ReactNode; className?: string };

// every section is one soft card: small eyebrow, a heading, then content
export default function Card({ id, eyebrow, title, children, className = "" }: Props) {
  return (
    <section id={id} className={`scroll-mt-24 rounded-[22px] border border-rule bg-card p-5 sm:p-7 ${className}`}>
      <p className="m-0 text-[13px] font-medium text-dim">{eyebrow}</p>
      {title && <h2 className="m-0 mt-1 text-[clamp(22px,3vw,28px)] font-semibold leading-tight tracking-[-.02em]">{title}</h2>}
      <div className={`min-w-0 ${title ? "mt-5" : "mt-3"}`}>{children}</div>
    </section>
  );
}
