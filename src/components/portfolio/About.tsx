import { Reveal, SectionHeading } from "./Reveal";
import { AvatarCard } from "./Avatar";
import { STATS } from "./data";

export function About() {
  return (
    <section id="about" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="About" title="Engineering intelligence into products" />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <AvatarCard className="mx-auto w-full max-w-xs lg:max-w-none" />
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground">

            <p>
              I'm a Computer Science engineer specialising in{" "}
              <span className="text-foreground">applied machine learning</span> and{" "}
              <span className="text-foreground">full-stack product development</span>. I build systems where the model
              and the interface are designed together — because an AI feature only matters when someone can actually
              use it.
            </p>
            <p>
              My work spans training and evaluating models, wiring them into resilient APIs, and shipping fast,
              accessible frontends on top. I've delivered a marketplace platform with an ML matching engine and a
              FinTech app with transaction intelligence baked in.
            </p>
            <p className="text-foreground">
              I care about measurable outcomes: latency, accuracy, adoption — not demos that die in a notebook.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="glass group relative h-full overflow-hidden rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="font-display text-4xl font-semibold gradient-text">{s.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
