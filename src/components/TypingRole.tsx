"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 70;
const DELETE_MS = 35;
const HOLD_MS = 2200;

/** Types each phrase out, holds, deletes it, then moves to the next. */
export function TypingRole({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[index];
    let delay = deleting ? DELETE_MS : TYPE_MS;
    if (!deleting && length === phrase.length) delay = HOLD_MS;

    const id = window.setTimeout(() => {
      if (!deleting && length === phrase.length) setDeleting(true);
      else if (deleting && length === 0) {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      } else setLength((l) => l + (deleting ? -1 : 1));
    }, delay);
    return () => window.clearTimeout(id);
  }, [index, length, deleting, phrases]);

  return (
    <span className="min-h-[1.4em] text-[17px] font-medium">
      <span className="sr-only">{phrases.join(", ")}</span>
      <span aria-hidden="true">
        {phrases[index].slice(0, length)}
        <span className="caret text-plum">_</span>
      </span>
    </span>
  );
}
