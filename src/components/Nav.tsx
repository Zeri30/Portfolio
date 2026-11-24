import { profile } from "@/lib/content";

const links = [
  { href: "#stack", label: "Stack" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-oat/80 px-6 backdrop-blur-md sm:px-8">
      <div className="mx-auto flex min-h-17 max-w-330 items-center justify-between gap-7">
        <a href="#top" className="inline-flex min-h-11 items-center gap-2.5 text-base font-semibold tracking-[-0.02em]">
          {profile.name}
        </a>
        <nav aria-label="Main" className="hidden gap-x-7 text-sm md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="inline-flex min-h-11 items-center">
              <span className="swap">
                <span>{l.label}</span>
              </span>
            </a>
          ))}
          <a href={profile.resumeHref} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center">
            <span className="swap">
              <span>Résumé ↗︎</span>
            </span>
          </a>
        </nav>
        <a
          href="#contact"
          className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-ink px-5 text-sm font-medium text-oat"
        >
          <span className="swap">
            <span>Let&apos;s talk</span>
          </span>
        </a>
      </div>
    </header>
  );
}
