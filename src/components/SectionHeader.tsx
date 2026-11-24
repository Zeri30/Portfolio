import type { ReactNode } from "react";

/** A plain section heading with an optional one-line note beside it. No rules, no numbering. */
export function SectionTitle({ title, note, dark = false }: { title: string; note?: string; dark?: boolean }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-12 gap-y-3">
      <h2 className="text-[clamp(30px,3.2vw,44px)] font-medium leading-tight tracking-[-0.04em]">{title}</h2>
      {note && <p className={`max-w-[42ch] text-base leading-relaxed ${dark ? "text-dim" : "text-muted"}`}>{note}</p>}
    </div>
  );
}

/** Large heading whose lines slide up from behind a mask as they scroll into view. */
export function MaskedHeading({ lines, className = "" }: { lines: ReactNode[]; className?: string }) {
  return (
    <h2 className={`font-medium leading-[0.92] tracking-[-0.055em] ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="mask">
          <span>{line}</span>
        </span>
      ))}
    </h2>
  );
}
