"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";
import icpepHero from "@/assets/icpep-hero.jpg";
import pawfolioHero from "@/assets/pawfolio-hero.jpg";
import type { Project } from "@/lib/content";

const ArrowRight = () => (
  <svg className="parrow hidden sm:block" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

/** Project index with an ink-curtain hover and a preview card that follows the pointer. */
export function ProjectList({ projects }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<Project["preview"] | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = previewRef.current;
    if (el) el.style.transform = `translate3d(${e.clientX + 28}px, ${e.clientY - 114}px, 0)`;
  };

  return (
    <>
      <div onPointerMove={onMove} onPointerLeave={() => setHovered(null)} >
        {projects.map((p) => (
          <a
            key={p.slug}
            href={`#${p.slug}`}
            onPointerEnter={() => setHovered(p.preview)}
            className="prow flex flex-wrap items-center gap-x-8 gap-y-2.5 border-b border-hairline px-4 py-8.5 last:border-b-0"
          >
            <span className="pmuted w-12 shrink-0 font-mono text-xs text-muted">{p.index}</span>
            <span className="ptitle flex-[1_1_360px] text-[clamp(30px,4vw,60px)] font-medium leading-none tracking-[-0.045em]">
              {p.title}
            </span>
            <span className="pmuted flex-[1_1_260px] text-sm text-muted">{p.summary}</span>
            <ArrowRight />
          </a>
        ))}
      </div>
      <p className="mt-5 hidden text-sm text-muted [@media(hover:hover)]:block">Hover a project to preview it.</p>

      <div
        ref={previewRef}
        aria-hidden="true"
        className="preview pointer-events-none fixed left-0 top-0 z-40 h-57 w-85"
        style={{ opacity: hovered ? 1 : 0, transform: "translate3d(-600px, -600px, 0)" }}
      >
        {hovered === "pawfolio" && (
          <div className="pop relative h-full overflow-hidden rounded-[14px] shadow-[0_30px_60px_-24px_rgb(28_19_16/0.45)]">
            <Image src={pawfolioHero} alt="" fill sizes="340px" className="object-cover object-top" />
          </div>
        )}
        {hovered === "icpep" && (
          <div className="pop relative h-full overflow-hidden rounded-[14px] shadow-[0_30px_60px_-24px_rgb(28_19_16/0.55)]">
            <Image src={icpepHero} alt="" fill sizes="340px" className="object-cover object-center" />
          </div>
        )}
        {hovered === "livestats" && (
          <div className="pop flex h-full flex-col items-center justify-center gap-3 rounded-[14px] bg-[#0f1115] text-white shadow-[0_30px_60px_-24px_rgb(28_19_16/0.55)]">
            <span className="size-4 rounded-full bg-[#f26b2a]" />
            <span className="font-mono text-[52px] font-medium leading-none tabular-nums">10:00</span>
            <span className="h-0.5 w-32 rounded-full bg-white/25" />
            <span className="flex gap-2 text-[11px] font-semibold">
              <span className="rounded-md bg-[#f26b2a] px-3.5 py-1.5 text-[#1a0d06]">Start</span>
              <span className="rounded-md bg-[#3a3f48] px-3.5 py-1.5 text-[#e6e8eb]">Pause</span>
              <span className="rounded-md bg-[#e2455a] px-3.5 py-1.5">End period</span>
            </span>
          </div>
        )}
      </div>
    </>
  );
}
