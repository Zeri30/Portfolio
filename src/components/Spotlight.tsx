import type { ReactNode } from "react";

/** Hero wrapper: a faint, static dot grid that fades out toward the bottom. */
export function Spotlight({ children, id, className = "" }: { children: ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} className={`relative overflow-hidden ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#d3c4b4_1px,transparent_1.4px)] bg-[size:22px_22px] [mask-image:linear-gradient(180deg,rgb(0_0_0/0.9),transparent_92%)]"
      />
      {children}
    </section>
  );
}
