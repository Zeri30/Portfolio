"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1600;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts from `from` to `to` the first time it scrolls into view.
 * Server-renders the final value, so the number is correct without JavaScript.
 */
export function CountUp({ from, to, prefix = "" }: { from: number; to: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setValue(from);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION_MS);
          setValue(Math.round(from + (to - from) * easeOutCubic(t)));
          if (t < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [from, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value}
    </span>
  );
}
