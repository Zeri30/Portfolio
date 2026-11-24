import { education, experience, profile } from "@/lib/content";
import { SectionTitle } from "./SectionHeader";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 px-6 pb-36 sm:px-8">
      <div className="mx-auto max-w-330">
        <SectionTitle title="Experience" />

        <ol className="mt-6">
          {experience.map((job) => (
            <li key={job.role + job.period} className="xrow reveal flex flex-wrap gap-x-12 gap-y-4 py-10">
              <div className="flex w-50 shrink-0 flex-col gap-1 text-sm">
                <span className="text-muted">{job.period}</span>
                {job.kind && <span className="text-soft">{job.kind}</span>}
              </div>
              <div className="min-w-0 flex-[1_1_280px]">
                <h3 className="text-[28px] font-medium leading-[1.1] tracking-[-0.04em]">{job.role}</h3>
                <span className="mt-1.5 block text-[15px] text-plum">{job.org}</span>
              </div>
              <ul className="flex min-w-0 flex-[1.4_1_380px] flex-col gap-3 text-[15px] leading-relaxed text-body">
                {job.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className="reveal flex flex-wrap items-baseline gap-x-12 gap-y-3 py-9">
          <span className="w-50 shrink-0 text-sm text-muted">Education</span>
          <span className="min-w-0 flex-[1_1_280px] text-[15px] font-medium">{education.degree}</span>
          <span className="flex min-w-0 flex-[1.4_1_380px] flex-wrap justify-between gap-4 text-[15px] text-body">
            {education.note}
            <a href={profile.resumeHref} target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-medium text-ink">
              <span className="swap">
                <span>Full résumé</span>
              </span>
              <span aria-hidden="true">↗︎</span>
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}
