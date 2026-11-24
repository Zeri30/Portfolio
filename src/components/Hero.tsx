import type { CSSProperties } from "react";
import { profile, recentlyBuilt } from "@/lib/content";
import { LocalTime } from "./LocalTime";
import { Spotlight } from "./Spotlight";
import { TypingRole } from "./TypingRole";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export function Hero() {
  return (
    <Spotlight
      id="top"
      className="flex min-h-[min(calc(100svh-69px),900px)] flex-col justify-end px-6 pb-12 pt-20 sm:px-8"
    >
      <h1 className="relative mx-auto mb-16 w-full max-w-330 text-[clamp(52px,9.6vw,156px)] font-medium leading-[0.92] tracking-[-0.058em]">
        <span className="ln">
          <span style={delay(0.25)}>Every feature,</span>
        </span>
        <span className="ln">
          <span style={delay(0.37)}>
            <span className="font-light text-soft">front to back,</span>
          </span>
        </span>
        <span className="ln">
          <span style={delay(0.49)}>
            <span className="text-plum">with receipts.</span>
          </span>
        </span>
      </h1>

      <div className="relative mx-auto flex w-full max-w-330 flex-wrap items-start justify-between gap-x-16 gap-y-8">
        <p className="fade m-0 max-w-[44ch] text-base leading-relaxed text-body" style={delay(0.7)}>
          {profile.intro}
        </p>
        <div className="fade flex flex-wrap gap-x-16 gap-y-6" style={delay(0.85)}>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm text-muted">Recently built</span>
            <TypingRole phrases={recentlyBuilt} />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm text-muted">
              Status · PH <LocalTime />
            </span>
            <span className="text-[17px] font-medium">{profile.status}</span>
          </div>
        </div>
      </div>
    </Spotlight>
  );
}
