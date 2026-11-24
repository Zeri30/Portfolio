import { stackLayers, stackQuality } from "@/lib/content";
import { SectionTitle } from "./SectionHeader";

/** Layer fills deepen as the request travels down toward the database. */
const tones = ["bg-paper", "bg-latte", "bg-[#e5d4c2]", "bg-[#dcc6b1]"];

/**
 * The stack as a cross-section: Frontend → Backend → Data → Deploy as one continuous slab,
 * with Quality drawn as the dark frame wrapped around it.
 */
export function Stack() {
  return (
    <section id="stack" className="scroll-mt-20 px-6 pt-32 sm:px-8">
      <div className="mx-auto max-w-330">
        <SectionTitle title="My stack" note="From what you click to where the data lives, with tests wrapped around all of it." />

        <div className="reveal relative mt-14">

          {/* Quality: the frame around every layer */}
          <div className="grid rounded-3xl bg-roast p-2 text-oat lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="overflow-hidden rounded-[18px] text-ink">
              {stackLayers.map((l, i) => (
                <div key={l.layer} className={`flex flex-wrap items-center gap-x-10 gap-y-4 px-6 py-7 sm:px-8 ${tones[i]}`}>
                  <div className="w-full shrink-0 sm:w-52">
                    <h3 className="text-2xl font-medium tracking-[-0.03em]">{l.layer}</h3>
                    <p className="mt-1 text-sm text-muted">{l.role}</p>
                  </div>
                  <ul className="flex min-w-0 flex-1 flex-wrap gap-2" aria-label={`${l.layer} tools`}>
                    {l.items.map((item) => (
                      <li key={item} className="rounded-full bg-oat/80 px-3.5 py-1.5 text-[15px] ring-1 ring-ink/10">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-between gap-8 px-6 py-7 sm:px-8">
              <div>
                <h3 className="text-2xl font-medium tracking-[-0.03em]">{stackQuality.layer}</h3>
                <p className="mt-1 text-sm text-dim">{stackQuality.role}</p>
              </div>
              <ul className="flex flex-wrap gap-2" aria-label="Quality tools">
                {stackQuality.items.map((item) => (
                  <li key={item} className="rounded-full bg-white/10 px-3.5 py-1.5 text-[15px] ring-1 ring-white/10">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-caramel">✓ 38 end-to-end tests at Dayou Sports</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
