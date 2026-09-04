import { Reveal, SectionHeading } from "./Reveal";
import { Spotlight } from "./Spotlight";
import { SKILLS } from "./data";

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Stack"
          title="Tools I ship with"
          description="A working toolkit across the full path from dataset to deployed interface."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {SKILLS.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 0.07}>
              <Spotlight className="h-full">
                <div className="p-7">
                  <h3 className="font-mono text-xs tracking-[0.22em] text-muted-foreground uppercase">
                    {group.category}
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="beam relative overflow-hidden rounded-xl border border-border bg-secondary/60 px-3.5 py-2 text-sm text-foreground/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-foreground hover:shadow-[0_0_26px_-8px_var(--accent)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
