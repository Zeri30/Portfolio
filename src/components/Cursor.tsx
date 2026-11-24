"use client";

import { useEffect, useRef } from "react";

/** A blend-mode ring that trails the pointer and grows over links and buttons. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };
    const over = (e: PointerEvent) => {
      const target = e.target as Element | null;
      el.dataset.active = String(Boolean(target?.closest("a, button")));
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="cursor-ring pointer-events-none fixed left-0 top-0 z-200 -ml-4.25 -mt-4.25 size-8.5 rounded-full border-[1.5px] border-white"
      style={{ transform: "translate3d(-200px, -200px, 0)" }}
    />
  );
}
