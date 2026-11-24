import icpepFavicon from "@/assets/icpep-favicon.png";
import icpepMobile from "@/assets/icpep-mobile.jpg";
import icpepReel from "@/assets/icpep-reel.jpg";
import pawfolioFavicon from "@/assets/pawfolio-favicon.png";
import pawfolioFull from "@/assets/pawfolio-full.jpg";
import pawfolioMobile from "@/assets/pawfolio-mobile.jpg";
import { icpep, liveStats, pawfolio, projects } from "@/lib/content";
import { ProjectList } from "./ProjectList";
import { ClockShowcase } from "./ClockShowcase";
import { MaskedHeading } from "./SectionHeader";
import { SiteShowcase, showcaseThemes } from "./SiteShowcase";

/** Only real external links open in a new tab; "#" placeholders stay put. */
const external = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {});

function CaseText({
  label,
  title,
  body,
  highlights,
  meta,
  liveHref,
  note,
}: {
  label: string;
  title: string;
  body: string;
  highlights: string[];
  meta: string[];
  liveHref?: string;
  /** Shown instead of links when a project can't be linked publicly. */
  note?: string;
}) {
  return (
    <div className="reveal flex min-w-0 flex-[1_1_340px] flex-col gap-6">
      <span className="text-sm text-muted">{label}</span>
      <h3 className="text-balance text-[clamp(32px,3.4vw,48px)] font-medium leading-[1.04] tracking-[-0.045em]">{title}</h3>
      <p className="max-w-[46ch] text-base leading-relaxed text-body">{body}</p>
      <ul className="flex flex-col gap-2.5 text-[15px] leading-snug text-body">
        {highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <p className="text-sm text-muted">{meta.join("  ·  ")}</p>
      {liveHref ? (
        <div className="flex flex-wrap gap-7 text-[15px] font-medium">
          <a href={liveHref} {...external(liveHref)} className="inline-flex min-h-11 items-center gap-2">
            <span className="swap">
              <span>Visit live site</span>
            </span>
            <span aria-hidden="true">↗︎</span>
          </a>
        </div>
      ) : (
        note && <p className="text-sm italic text-soft">{note}</p>
      )}
    </div>
  );
}

export function Work() {
  return (
    <>
      <section id="work" className="px-6 pb-10 pt-36 sm:px-8">
        <div className="mx-auto max-w-330">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
            <MaskedHeading
              className="text-[clamp(48px,7.4vw,120px)]"
              lines={[
                "Things I've",
                <>
                  shipped<span className="font-light text-soft">.</span>
                </>,
              ]}
            />
            <p className="reveal max-w-[34ch] pb-3 text-base leading-relaxed text-muted">
              Two products live in production, and the scoring work from my internship.
            </p>
          </div>
          <ProjectList projects={projects} />
        </div>
      </section>

      <section id="pawfolio" className="scroll-mt-20 px-6 pb-36 pt-32 sm:px-8">
        <div className="mx-auto flex max-w-330 flex-wrap items-center gap-x-20 gap-y-14">
          <CaseText {...pawfolio} />
          <div className="reveal min-w-0 flex-[1.5_1_560px]">
            <SiteShowcase
              name="Pawfolio"
              href={pawfolio.liveHref}
              displayUrl={pawfolio.displayUrl}
              tabTitle={pawfolio.tabTitle}
              favicon={pawfolioFavicon}
              desktop={{
                image: pawfolioFull,
                alt: "Pawfolio homepage: hero with a dog in a suit wearing a Hired badge, how it works, recently hired pets, FAQ and ID verification",
              }}
              mobile={{ image: pawfolioMobile, alt: "Pawfolio on a phone" }}
              seconds={9}
              theme={showcaseThemes.pawfolio}
            />
          </div>
        </div>
      </section>

      <section id="icpep" className="scroll-mt-20 px-6 pb-36 sm:px-8">
        <div className="mx-auto flex max-w-330 flex-wrap-reverse items-center gap-x-20 gap-y-14">
          <div className="reveal min-w-0 flex-[1.5_1_560px]">
            <SiteShowcase
              name="ICPEP.SE"
              href={icpep.liveHref}
              displayUrl={icpep.displayUrl}
              tabTitle={icpep.tabTitle}
              favicon={icpepFavicon}
              desktop={{
                image: icpepReel,
                alt: "ICPEP.SE BulSU Meneses Campus website: red 3D wireframe hero, chapter stats, the organization, executive board carousel, teams and events",
              }}
              mobile={{ image: icpepMobile, alt: "ICPEP.SE on a phone" }}
              seconds={16}
              theme={showcaseThemes.icpep}
            />
          </div>
          <CaseText {...icpep} />
        </div>
      </section>

      {/* Internship work: private codebase, so the visual is an illustration drawn in code. */}
      <section id="livestats" className="scroll-mt-20 px-6 pb-36 sm:px-8">
        <div className="mx-auto flex max-w-330 flex-wrap items-center gap-x-20 gap-y-14">
          <CaseText {...liveStats} />
          <div className="reveal min-w-0 flex-[1.5_1_560px]">
            <ClockShowcase />
          </div>
        </div>
      </section>
    </>
  );
}
