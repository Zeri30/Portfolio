/**
 * Illustration of the game clock and period controller I built during the Dayou Sports
 * internship. The client codebase is private, so it's drawn in code rather than captured.
 * Sizes use container query units so the UI scales with the tablet.
 */

const ORANGE = "#f26b2a";
const GRAY = "#3a3f48";
const RED = "#e2455a";

/** Small basketball mark above the clock. */
function Ball() {
  return (
    <svg viewBox="0 0 24 24" className="h-[5.5cqw] w-auto" aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" fill={ORANGE} />
      <g fill="none" stroke="#6b2a10" strokeWidth="1.3">
        <path d="M1.5 12h21" />
        <path d="M12 1.5v21" />
        <path d="M5 4.5c3 2.2 4.5 4.7 4.5 7.5s-1.5 5.3-4.5 7.5" />
        <path d="M19 4.5c-3 2.2-4.5 4.7-4.5 7.5s1.5 5.3 4.5 7.5" />
      </g>
    </svg>
  );
}

function ClockScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-[2.6cqw] bg-[#0f1115] text-white">
      <Ball />
      <span className="font-mono text-[17cqw] font-medium leading-none tracking-[0.02em] tabular-nums">10:00</span>
      <span className="h-[0.6cqw] w-[59cqw] rounded-full bg-white/25" />
      <div className="mt-[1.2cqw] grid grid-cols-3 gap-x-[2.5cqw] text-[2.8cqw]">
        <span className="w-[18cqw] rounded-[1.4cqw] py-[1.8cqw] text-center font-semibold text-[#1a0d06]" style={{ background: ORANGE }}>
          Start
        </span>
        <span className="w-[18cqw] rounded-[1.4cqw] py-[1.8cqw] text-center font-semibold text-[#e6e8eb]" style={{ background: GRAY }}>
          Pause
        </span>
        <span className="w-[18cqw] rounded-[1.4cqw] py-[1.8cqw] text-center font-semibold" style={{ background: RED }}>
          End period
        </span>
      </div>
    </div>
  );
}

export function ClockShowcase() {
  return (
    <figure className="m-0">
      <div
        role="img"
        aria-label="Illustration of the game clock and period controller UI: a 10:00 clock with Start, Pause and End period buttons on a tablet"
        className="relative overflow-hidden rounded-[22px] px-[7%] py-[8%]"
        style={{ background: "radial-gradient(95% 85% at 18% 12%, #3d2416 0%, #18120e 48%, #0c0b0a 100%)" }}
      >
        {/* Warm glow and a faint center-court arc. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 15%, rgb(242 107 42 / 0.28) 0, transparent 32%), radial-gradient(circle at 50% 118%, transparent 33%, rgb(242 107 42 / 0.16) 33.3%, transparent 33.9%)",
          }}
        />

        {/* Tablet */}
        <div
          className="relative mx-auto aspect-4/3 w-full rounded-[3.2%/4.2%] bg-[#1b1c1f] p-[1.6%] ring-1 ring-white/15"
          style={{ boxShadow: "0 50px 90px -30px rgb(242 107 42 / 0.3)" }}
        >
          <div className="@container h-full overflow-hidden rounded-[2%/2.7%]">
            <ClockScreen />
          </div>
        </div>
      </div>
    </figure>
  );
}
