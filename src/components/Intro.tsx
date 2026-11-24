"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import portrait from "@/assets/czerina-portrait.png";
import { profile } from "@/lib/content";
import { LocalTime } from "./LocalTime";

const GLYPHS = "#%&*+=/<>[]{}?ABCDEFGHJKMNPRSTUVWXYZ0123456789";
const TICK_MS = 50;
/** The counter runs 0 → 100 in LOAD_MS, then holds briefly: the curtain lifts at 1s. */
const LOAD_MS = 900;
const HOLD_MS = 100;
const EXIT_MS = 850;

type Phase = "playing" | "out" | "gone";

/*
 * The inline gate script in <head> writes <html data-intro="skip|playing"> before first paint.
 * Read it as an external store: the server snapshot is "playing" (matching the server HTML),
 * and the client switches to the real value right after hydration without a mismatch.
 */
function subscribeIntro(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-intro"] });
  return () => observer.disconnect();
}
const getIntroAttr = () => document.documentElement.dataset.intro ?? "skip";
const getServerIntroAttr = () => "playing";

function stageFor(count: number) {
  if (count < 25) return "frontend";
  if (count < 50) return "api";
  if (count < 75) return "database";
  if (count < 100) return "tests";
  return "ready";
}

/** Each letter locks in once the counter passes its threshold (between 25 and 90). */
function revealAt(index: number, length: number) {
  return 25 + index * (65 / length);
}

export function Intro() {
  const introAttr = useSyncExternalStore(subscribeIntro, getIntroAttr, getServerIntroAttr);
  const playing = introAttr === "playing";
  const [phase, setPhase] = useState<Phase>("playing");
  const [count, setCount] = useState(0);
  // Scrambled glyphs are generated on the client only (no randomness during server render).
  const [scramble, setScramble] = useState<string[]>(() => Array.from(profile.name, () => "·"));
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const finish = useCallback(() => {
    clearTimers();
    setCount(100);
    setPhase("out");
    document.documentElement.dataset.intro = "done";
    timers.current.push(window.setTimeout(() => setPhase("gone"), EXIT_MS));
  }, []);

  const start = useCallback(() => {
    clearTimers();
    window.scrollTo({ top: 0, behavior: "instant" });
    document.documentElement.dataset.intro = "playing";
    setCount(0);
    setPhase("playing");
  }, []);

  // Lock page scroll only while the intro is actually playing.
  useEffect(() => {
    document.documentElement.style.overflow = playing ? "hidden" : "";
  }, [playing]);

  // "Replay intro" button in the footer.
  useEffect(() => {
    const onReplay = () => start();
    window.addEventListener("replay-intro", onReplay);
    return () => {
      window.removeEventListener("replay-intro", onReplay);
      clearTimers();
      document.documentElement.style.overflow = "";
    };
  }, [start]);

  // Counter + scramble loop while playing.
  useEffect(() => {
    if (!playing || phase !== "playing") return;
    const startedAt = performance.now();
    const id = window.setInterval(() => {
      setCount(Math.min(100, Math.round(((performance.now() - startedAt) / LOAD_MS) * 100)));
      setScramble(Array.from(profile.name, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]));
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [playing, phase]);

  // When the counter lands on 100, hold briefly, then lift the curtain.
  useEffect(() => {
    if (playing && phase === "playing" && count >= 100) {
      timers.current.push(window.setTimeout(finish, HOLD_MS));
    }
  }, [count, phase, playing, finish]);

  if (introAttr === "skip" || phase === "gone") return null;

  const chars = Array.from(profile.name);
  const renderName = (from: number, to: number) =>
    chars.slice(from, to).map((ch, i) => {
      const index = from + i;
      const done = count >= revealAt(index, chars.length);
      return (
        <span
          key={index}
          className={done ? "glyph-done" : undefined}
          style={{ color: done ? "#f4eee6" : count < 8 ? "#3a2a23" : "#8a7263" }}
        >
          {done ? ch : scramble[index]}
        </span>
      );
    });

  const space = profile.name.indexOf(" ");
  const clip = Math.max(0, 100 - count * 1.25);
  const edgeVisible = count > 0 && clip > 0;

  return (
    <div
      className="intro fixed inset-x-0 top-0 z-100 h-dvh bg-roast text-oat"
      data-state={phase === "out" ? "out" : "in"}
      role="dialog"
      aria-modal="true"
      aria-label="Intro"
    >
      <div className="flex h-full flex-col justify-between px-6 py-7 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-xs text-dim">Portfolio ©2026</span>
          <button type="button" onClick={finish} className="min-h-11 px-1 text-sm text-oat">
            <span className="swap">
              <span>Skip intro →</span>
            </span>
          </button>
        </div>

        <div className="flex items-end justify-between gap-12">
          <div className="flex min-w-0 flex-col items-start gap-5">
            <span className="font-mono text-xs text-dim">( hello, I&apos;m )</span>
            <p
              aria-label={profile.name}
              className="text-[clamp(60px,11vw,176px)] font-medium leading-[0.86] tracking-[-0.058em]"
            >
              <span aria-hidden="true" className="block whitespace-nowrap">
                {renderName(0, space)}
              </span>
              <span aria-hidden="true" className="block whitespace-nowrap pl-[0.85em]">
                {renderName(space + 1, chars.length)}
              </span>
            </p>
            <div
              className={`flex flex-wrap gap-x-7 gap-y-2.5 text-lg text-[#d8c7b8] transition-all duration-700 ${
                count > 55 ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0"
              }`}
            >
              <span>{profile.role}</span>
              <span className="self-center font-mono text-sm text-dim">
                Bulacan, PH · <LocalTime />
              </span>
            </div>
          </div>

          <figure className="m-0 hidden shrink-0 flex-col gap-3.5 md:mr-[3vw] md:flex lg:mr-[7vw]">
            <div className="relative aspect-[4/5] h-[min(52vh,470px)]">
              {["-top-2.5 -left-2.5 border-t border-l", "-top-2.5 -right-2.5 border-t border-r", "-bottom-2.5 -left-2.5 border-b border-l", "-bottom-2.5 -right-2.5 border-b border-r"].map(
                (pos) => (
                  <span key={pos} aria-hidden="true" className={`absolute size-4 border-soft ${pos}`} />
                ),
              )}
              <div
                className="absolute inset-0 overflow-hidden rounded-[3px] transition-[clip-path] duration-200 ease-linear"
                style={{
                  clipPath: `inset(${clip}% 0 0 0)`,
                  background: "radial-gradient(circle at 50% 38%, #E9BE93 0%, #C98A5C 55%, #7A4630 100%)",
                }}
              >
                <Image
                  src={portrait}
                  alt="Portrait of Czerina Piedad"
                  fill
                  preload
                  sizes="380px"
                  placeholder="blur"
                  className="breathe object-cover object-bottom saturate-[.94]"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute -inset-x-4 h-px bg-caramel transition-[top,opacity] duration-200 ease-linear"
                style={{ top: `${clip}%`, opacity: edgeVisible ? 1 : 0 }}
              />
            </div>
            <figcaption className="flex justify-between gap-4 font-mono text-[11px] text-dim">
              <span>Fig. 01</span>
              <span>{profile.name}, 2026</span>
            </figcaption>
          </figure>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <span className="font-mono text-[clamp(56px,8vw,120px)] leading-[0.85] tracking-[-0.04em] tabular-nums">
              {String(count).padStart(3, "0")}
            </span>
            <span className="pb-1.5 font-mono text-[13px] text-dim">
              loading the stack / <span className="text-oat">{stageFor(count)}</span>
            </span>
          </div>
          <div
            role="progressbar"
            aria-label="Loading portfolio"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={count}
            className="relative h-px overflow-hidden bg-hairline-dark"
          >
            <div className="absolute inset-y-0 left-0 bg-caramel" style={{ width: `${count}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
