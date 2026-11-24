import { stats } from "@/lib/content";
import { CountUp } from "./CountUp";
import { SectionTitle } from "./SectionHeader";

export function Impact() {
  return (
    <section id="impact" className="px-6 pb-36 pt-32 sm:px-8">
      <div className="mx-auto max-w-330">
        <SectionTitle title="By the numbers" />
        <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-12 gap-y-12">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-4">
              <span className="text-[clamp(64px,7vw,112px)] font-light leading-[0.9] tracking-[-0.06em] text-plum">
                <CountUp from={s.from} to={s.to} prefix={s.prefix} />
              </span>
              <span className="max-w-57.5 text-sm leading-normal text-body">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
