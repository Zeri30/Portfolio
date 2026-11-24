import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";

/**
 * Presents a live project the way it actually looks: a realistic browser window and a phone,
 * staged on a backdrop in the project's own brand colors. Hovering the browser scrolls the
 * full-page capture; `seconds` keeps the pace readable for longer pages.
 */

type Theme = {
  /** Stage backdrop. */
  stage: string;
  /** Decorative layer drawn over the stage (pattern, glow), with one size per layer. */
  decor: string;
  decorSize: string;
  decorMask?: string;
  /** Browser chrome. */
  chrome: "light" | "dark";
  /** Colored drop shadow under the devices. */
  shadow: string;
  /** Fill behind the screenshot while it loads. */
  screen: string;
  /** Phone body color and the status bar, matched to the site's own header. */
  phone: string;
  statusBar: { bg: string; fg: string };
};

export const showcaseThemes = {
  pawfolio: {
    stage: "radial-gradient(120% 95% at 88% 8%, #c3c9fb 0%, #e1e4fc 42%, #f4f5fb 100%)",
    decor:
      "radial-gradient(circle at 12% 88%, rgb(252 200 43 / 0.55) 0, transparent 22%), radial-gradient(rgb(51 59 196 / 0.16) 1.3px, transparent 1.6px)",
    decorSize: "auto, 22px 22px",
    decorMask: "linear-gradient(180deg, transparent, #000 35%)",
    chrome: "light",
    shadow: "0 50px 90px -35px rgb(51 59 196 / 0.45)",
    screen: "#f3f4f6",
    phone: "#0d0d0f",
    statusBar: { bg: "#ffffff", fg: "#111111" },
  },
  icpep: {
    stage: "radial-gradient(95% 85% at 82% 12%, #420f0f 0%, #170808 46%, #070707 100%)",
    decor:
      "radial-gradient(circle at 85% 18%, rgb(220 38 38 / 0.35) 0, transparent 30%), linear-gradient(rgb(220 38 38 / 0.13) 1px, transparent 1px), linear-gradient(90deg, rgb(220 38 38 / 0.13) 1px, transparent 1px)",
    decorSize: "auto, 44px 44px, 44px 44px",
    decorMask: "radial-gradient(90% 80% at 70% 30%, #000 30%, transparent 85%)",
    chrome: "dark",
    shadow: "0 50px 90px -30px rgb(220 38 38 / 0.32)",
    screen: "#0b0b0c",
    phone: "#2b2b30",
    statusBar: { bg: "#050505", fg: "#f2f2f2" },
  },
} satisfies Record<string, Theme>;

type Props = {
  name: string;
  href: string;
  displayUrl: string;
  tabTitle: string;
  favicon: StaticImageData;
  desktop: { image: StaticImageData; alt: string };
  mobile: { image: StaticImageData; alt: string };
  seconds: number;
  theme: Theme;
};

const chromeTones = {
  light: {
    frame: "bg-[#e8eaef] text-[#3c4043]",
    tab: "bg-white",
    toolbar: "bg-white border-b border-[#e3e5ea]",
    pill: "bg-[#f1f3f4] text-[#3c4043]",
    icon: "text-[#5f6368]",
    ring: "ring-1 ring-black/10",
  },
  dark: {
    frame: "bg-[#161618] text-[#e3e3e8]",
    tab: "bg-[#262629]",
    toolbar: "bg-[#262629] border-b border-black/60",
    pill: "bg-[#1b1b1e] text-[#d4d4da]",
    icon: "text-[#9a9aa3]",
    ring: "ring-1 ring-white/10",
  },
};

function BrowserChrome({ tone, favicon, tabTitle, displayUrl }: { tone: Theme["chrome"]; favicon: StaticImageData; tabTitle: string; displayUrl: string }) {
  const t = chromeTones[tone];
  return (
    <div className={t.frame} aria-hidden="true">
      {/* Tab strip */}
      <div className="flex h-8 items-end gap-3 px-3 sm:h-9">
        <span className="mb-3 flex shrink-0 gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className={`flex h-[78%] min-w-0 max-w-56 flex-1 items-center gap-2 rounded-t-lg px-3 text-[11px] ${t.tab}`}>
          <Image src={favicon} alt="" width={14} height={14} className="size-3.5 shrink-0 rounded-sm" />
          <span className="truncate">{tabTitle}</span>
          <span className={`ml-auto shrink-0 ${t.icon}`}>×</span>
        </span>
      </div>
      {/* Toolbar */}
      <div className={`flex h-9 items-center gap-3 px-3 ${t.toolbar}`}>
        <span className={`hidden shrink-0 items-center gap-2.5 sm:flex ${t.icon}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7L21 8" /><path d="M21 3v5h-5" /></svg>
        </span>
        <span className={`flex h-6 min-w-0 flex-1 items-center gap-2 rounded-full px-3 text-[11px] ${t.pill}`}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${t.icon}`}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
          <span className="truncate">{displayUrl}</span>
        </span>
      </div>
    </div>
  );
}

/** iPhone-style status bar with the Dynamic Island, so the notch never covers the site's header. */
export function StatusBar({ bg, fg }: Theme["statusBar"]) {
  return (
    <span
      className="relative flex aspect-[390/50] items-center justify-between px-[10%] text-[clamp(5px,0.5vw,8px)] font-semibold"
      style={{ background: bg, color: fg }}
    >
      <span className="tabular-nums">9:41</span>
      <span className="absolute left-1/2 top-1/2 h-[58%] w-[31%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
      <span className="flex items-center gap-[0.35em]">
        <svg viewBox="0 0 18 12" className="h-[1em] w-auto" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="0.6" /><rect x="5" y="5.5" width="3" height="6.5" rx="0.6" /><rect x="10" y="3" width="3" height="9" rx="0.6" /><rect x="15" y="0" width="3" height="12" rx="0.6" /></svg>
        <svg viewBox="0 0 16 12" className="h-[1em] w-auto" fill="currentColor"><path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.3-1.4A10.3 10.3 0 0 0 8 .3 10.3 10.3 0 0 0 .7 3.2L2 4.6a8.4 8.4 0 0 1 6-2.4Zm0 3.8c1.3 0 2.5.5 3.4 1.3l1.3-1.4A6.7 6.7 0 0 0 8 4.1 6.7 6.7 0 0 0 3.3 5.9l1.3 1.4C5.5 6.5 6.7 6 8 6Zm0 3.8a1.8 1.8 0 1 0 0 0Z" /><circle cx="8" cy="10" r="1.6" /></svg>
        <svg viewBox="0 0 26 12" className="h-[1em] w-auto"><rect x="0.5" y="0.5" width="22" height="11" rx="3" fill="none" stroke="currentColor" opacity="0.45" /><rect x="2" y="2" width="17" height="8" rx="1.8" fill="currentColor" /><rect x="23.5" y="4" width="1.8" height="4" rx="0.9" fill="currentColor" opacity="0.45" /></svg>
      </span>
    </span>
  );
}

export function SiteShowcase({ name, href, displayUrl, tabTitle, favicon, desktop, mobile, seconds, theme }: Props) {
  const t = chromeTones[theme.chrome];
  return (
    <figure className="m-0">
      <div className="relative overflow-hidden rounded-[22px] px-[5%] pb-[13%] pt-[6%]" style={{ background: theme.stage }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: theme.decor,
            backgroundSize: theme.decorSize,
            maskImage: theme.decorMask,
            WebkitMaskImage: theme.decorMask,
          }}
        />

        {/* Desktop browser */}
        <div className={`relative overflow-hidden rounded-xl ${t.ring}`} style={{ boxShadow: theme.shadow }}>
          <BrowserChrome tone={theme.chrome} favicon={favicon} tabTitle={tabTitle} displayUrl={displayUrl} />
          <a
            href={href}
            target="_blank"
            rel="noopener"
            aria-label={`Open the ${name} live site in a new tab`}
            className="scroll-shot block aspect-[16/10] overflow-hidden"
            style={{ "--scroll-duration": `${seconds}s`, background: theme.screen } as CSSProperties}
          >
            <Image src={desktop.image} alt={desktop.alt} sizes="(min-width: 1024px) 720px, 90vw" className="block h-auto w-full" />
          </a>
        </div>

        {/* Phone */}
        <a
          href={href}
          target="_blank"
          rel="noopener"
          tabIndex={-1}
          aria-hidden="true"
          className="float-2 absolute bottom-[5%] right-[3.5%] hidden w-[21%] rounded-[16%/7.5%] p-[1.4%] ring-1 ring-white/20 sm:block"
          style={{ boxShadow: theme.shadow, background: theme.phone }}
        >
          <span className="relative block overflow-hidden rounded-[12%/5.6%]" style={{ background: theme.screen }}>
            <StatusBar {...theme.statusBar} />
            <Image src={mobile.image} alt={mobile.alt} sizes="180px" className="block h-auto w-full" />
          </span>
        </a>
      </div>
    </figure>
  );
}
