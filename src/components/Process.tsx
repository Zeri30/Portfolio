"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { MaskedHeading } from "./SectionHeader";

const STEP_MS = 5000;

const steps = [
  {
    title: "Spec it",
    body: "Each feature's design is written in OpenSpec before implementation, so behaviour is agreed before code review.",
    file: "specs/period-controller.md",
  },
  {
    title: "Build it small",
    body: "Small, focused components instead of 700-line files, and targeted React Query caching instead of invalidating everything.",
    file: "ProfileForm.tsx: refactor",
  },
  {
    title: "Test it",
    body: "Playwright for real user journeys and Vitest for units, so a fix stays fixed.",
    file: "e2e/booking.spec.ts",
  },
];

/* ---------- Panel: spec ---------- */
function SpecPanel() {
  const lines: [string, string][] = [
    ["### Requirement: Period controller", "text-[#d7a6cb]"],
    ["The scorer SHALL move a game to its next period.", "text-sand"],
    ["#### Scenario: Ending a period", "mt-3.5 text-oat"],
  ];
  const clauses = [
    ["WHEN", "the game clock reaches 00:00"],
    ["THEN", "the scorer can advance the period"],
    ["AND", "the clock resets for the new period"],
  ];
  return (
    <div className="flex flex-1 flex-col p-7 font-mono text-[13px] leading-[1.9]">
      {lines.map(([text, cls], i) => (
        <span key={text} className={`pop ${cls}`} style={{ animationDelay: `${0.05 + i * 0.12}s` }}>
          {text}
        </span>
      ))}
      {clauses.map(([kw, text], i) => (
        <span key={kw} className="pop text-sand" style={{ animationDelay: `${0.42 + i * 0.12}s` }}>
          - <span className="text-caramel">{kw}</span> {text}
        </span>
      ))}
      <span className="pop mt-auto pt-6 text-[11px] text-soft" style={{ animationDelay: "0.8s" }}>
        Illustrative spec format
      </span>
    </div>
  );
}

/* ---------- Panel: refactor ("code morph") ---------- */
const BEFORE_BARS = ["92%", "78%", "85%", "64%", "90%", "72%", "88%", "58%", "94%", "70%", "82%", "66%", "89%", "75%"];

function BuildPanel() {
  const d = (s: number): CSSProperties => ({ animationDelay: `${s}s` });
  return (
    <div className="flex flex-1 flex-wrap items-center gap-7 p-7">
      <div className="pop flex flex-[1_1_180px] flex-col gap-1.5">
        <span className="mb-2 font-mono text-[11px] text-dim">before · 1 file · 700+ lines</span>
        {BEFORE_BARS.map((w, i) => (
          <span key={i} className="h-1.25 rounded-full bg-hairline-dark" style={{ width: w }} />
        ))}
      </div>
      <svg className="pop" style={d(0.35)} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d9a273" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
      <div className="flex flex-[1_1_200px] flex-col gap-2.5">
        <span className="pop font-mono text-[11px] text-dim" style={d(0.45)}>
          after · 15-line wrapper
        </span>
        <div className="pop flex flex-col gap-1.5 rounded-[10px] border border-caramel p-3" style={d(0.55)}>
          <span className="h-1.25 w-[70%] rounded-full bg-caramel" />
          <span className="h-1.25 w-1/2 rounded-full bg-caramel" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[0.7, 0.8, 0.9, 1].map((s) => (
            <span key={s} className="pop rounded-lg border border-hairline-dark p-2.5 font-mono text-[11px] text-sand" style={d(s)}>
              component ✓
            </span>
          ))}
        </div>
        <span className="pop font-mono text-[11px] text-soft" style={d(1.1)}>
          ✓ each piece unit-tested
        </span>
      </div>
    </div>
  );
}

/* ---------- Panel: terminal replay ---------- */
type Token = { t: string; c: string };
const K = "#d7a6cb", S = "#e3b48a", F = "#f4eee6", P = "#cbb8a8", C = "#8a7263";
const CODE: Token[][] = [
  [{ t: "import ", c: K }, { t: "{ test, expect } ", c: F }, { t: "from ", c: K }, { t: "'@playwright/test'", c: S }],
  [{ t: " ", c: P }],
  [{ t: "// e2e/booking.spec.ts", c: C }],
  [{ t: "test", c: F }, { t: "(", c: P }, { t: "'guest can book an open court'", c: S }, { t: ", ", c: P }, { t: "async ", c: K }, { t: "({ page }) => {", c: P }],
  [{ t: "  await ", c: K }, { t: "page.goto", c: F }, { t: "(", c: P }, { t: "'/courts'", c: S }, { t: ")", c: P }],
  [{ t: "  await ", c: K }, { t: "page.getByRole", c: F }, { t: "(", c: P }, { t: "'button'", c: S }, { t: ", { name: ", c: P }, { t: "'Book'", c: S }, { t: " }).first().click()", c: P }],
  [{ t: "  await ", c: K }, { t: "expect", c: F }, { t: "(page.getByText(", c: P }, { t: "'Booking confirmed'", c: S }, { t: ")).toBeVisible()", c: P }],
  [{ t: "})", c: P }],
];

function TestPanel() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setStep((s) => (s >= CODE.length + 14 ? 0 : s + 1)), 400);
    return () => window.clearInterval(id);
  }, []);
  const visible = CODE.slice(0, Math.min(step, CODE.length));
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 overflow-x-auto whitespace-pre py-5.5 font-mono text-[13px] leading-[1.85]">
        {visible.map((tokens, i) => (
          <div key={i} className="flex">
            <span className="w-12 shrink-0 pr-4.5 text-right text-[#5e4b40]">{i + 1}</span>
            <span>
              {tokens.map((tk, j) => (
                <span key={j} style={{ color: tk.c }}>
                  {tk.t}
                </span>
              ))}
            </span>
          </div>
        ))}
        {step < CODE.length && (
          <div className="flex">
            <span className="w-12 shrink-0" />
            <span className="caret text-caramel">▍</span>
          </div>
        )}
      </div>
      <div className="min-h-18 border-t border-[#2a1d18] px-5.5 py-3 font-mono text-[12.5px] leading-[1.7]" aria-live="polite">
        {step > CODE.length && (
          <div className="text-sand">
            <span className="text-[#d7a6cb]">$</span> npx playwright test
          </div>
        )}
        {step > CODE.length + 1 && (
          <div className="pop">
            <span className="text-caramel">✓ 38 passed</span>
            <span className="text-soft">{"  "}auth · booking · payment</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Section ---------- */
export function Process() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % steps.length), STEP_MS);
    return () => window.clearTimeout(id);
  }, [active, paused]);

  const pick = (i: number) => {
    setActive(i);
    setPaused(true);
  };

  return (
    <section id="process" className="scroll-mt-20 px-6 pb-36 sm:px-8">
      <div className="mx-auto max-w-330">
        <MaskedHeading
          className="mb-16 text-[clamp(48px,7.4vw,120px)]"
          lines={[
            "How I keep",
            <>
              things <span className="text-plum">standing.</span>
            </>,
          ]}
        />
        <div className="flex flex-wrap items-stretch gap-14">
          <div className="flex min-w-0 flex-[1_1_360px] flex-col justify-center" role="tablist" aria-label="How I work">
            {steps.map((s, i) => {
              const on = i === active;
              return (
                <button
                  key={s.title}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="process-panel"
                  onClick={() => pick(i)}
                  className={`relative flex cursor-pointer flex-col gap-2 py-5 text-left transition-[color,padding] duration-500 ${
                    on ? "pl-3 text-ink" : "pl-0 text-dim hover:text-ink"
                  }`}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-xs">0{i + 1}</span>
                    <span className="text-3xl font-medium tracking-[-0.04em]">{s.title}</span>
                  </span>
                  {on && (
                    <>
                      <span className="pop pl-9 text-[15px] leading-relaxed text-body">{s.body}</span>
                      {!paused && (
                        <span
                          key={`fill-${active}`}
                          className="tab-fill absolute inset-x-0 -bottom-px h-px bg-plum"
                          style={{ "--tab-ms": `${STEP_MS}ms` } as CSSProperties}
                        />
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>

          <div
            id="process-panel"
            role="tabpanel"
            className="flex min-h-105 min-w-0 flex-[1.3_1_520px] flex-col overflow-hidden rounded-2xl bg-roast text-oat"
          >
            <div className="flex h-11 items-center justify-between gap-3 border-b border-[#2a1d18] px-5">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="size-2.25 rounded-full bg-hairline-dark" />
                <span className="size-2.25 rounded-full bg-hairline-dark" />
                <span className="size-2.25 rounded-full bg-hairline-dark" />
              </span>
              <span className="font-mono text-[11px] text-dim">{steps[active].file}</span>
            </div>
            {active === 0 && <SpecPanel key="spec" />}
            {active === 1 && <BuildPanel key="build" />}
            {active === 2 && <TestPanel key="test" />}
          </div>
        </div>
      </div>
    </section>
  );
}
