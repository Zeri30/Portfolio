import { profile } from "@/lib/content";
import { ContactForm } from "./ContactForm";
import { ReplayIntroButton } from "./ReplayIntroButton";
import { MaskedHeading } from "./SectionHeader";

const links = [
  { label: "LinkedIn", href: profile.linkedin.href, arrow: "↗︎" },
  { label: "GitHub", href: profile.github.href, arrow: "↗︎" },
  { label: "Facebook", href: profile.facebook.href, arrow: "↗︎" },
  { label: "Résumé", href: profile.resumeHref, arrow: "↓" },
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 bg-roast px-6 pb-9 pt-35 text-oat sm:px-8">
      <div className="mx-auto max-w-330">
        <MaskedHeading
          className="mb-20 text-[clamp(48px,7vw,112px)] leading-[0.95] tracking-[-0.055em]"
          lines={["Let's build something", <span key="h" className="text-caramel">that holds up.</span>]}
        />

        <div className="flex flex-wrap items-start gap-16">
          <div className="reveal flex min-w-0 flex-[1_1_380px] flex-col gap-7">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-h-11 flex-wrap items-center gap-3 text-[clamp(20px,2.4vw,32px)] font-medium tracking-[-0.03em]"
            >
              <span className="swap">
                <span>{profile.email}</span>
              </span>
              <span aria-hidden="true" className="text-caramel">
                ↗︎
              </span>
            </a>
            <a
              href={profile.phone.href}
              className="-mt-4 inline-flex min-h-11 items-center gap-3 text-[clamp(17px,1.6vw,21px)] tracking-[-0.02em] text-oat/90"
            >
              <span className="text-dim">Phone</span>
              <span className="swap">
                <span>{profile.phone.label}</span>
              </span>
            </a>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {links.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2 text-[15px]">
                  <span className="swap">
                    <span>{l.label}</span>
                  </span>
                  <span aria-hidden="true" className="text-dim">
                    {l.arrow}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <ContactForm />
        </div>

        <footer className="mt-32 flex flex-wrap items-center justify-between gap-3 text-[13px] text-dim">
          <span>© 2026 {profile.name}</span>
          <ReplayIntroButton />
          <a href="#top" className="inline-flex min-h-11 items-center text-oat">
            <span className="swap">
              <span>Back to top ↑</span>
            </span>
          </a>
        </footer>
      </div>
    </section>
  );
}
