"use client";

export function ReplayIntroButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("replay-intro"))}
      className="min-h-11 cursor-pointer text-[13px] text-oat"
    >
      <span className="swap">
        <span>Replay intro ↺</span>
      </span>
    </button>
  );
}
