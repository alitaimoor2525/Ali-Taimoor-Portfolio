import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { Github, ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { PROJECTS } from "./data";

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(500px circle at ${gx}% ${gy}%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 60%)`;

  return (
    <motion.div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || window.matchMedia("(pointer: coarse)").matches) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        gx.set(px * 100);
        gy.set(py * 100);
        ry.set((px - 0.5) * 12);
        rx.set(-(py - 0.5) * 12);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      className="glass group relative overflow-hidden rounded-3xl"
    >
      <motion.div style={{ background: glow }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

export function Projects() {
  const [fixly, novapay, extra] = PROJECTS;

  return (
    <section id="projects" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Case Studies"
          title="Featured work"
          description="Two products taken from problem statement to shipped, measurable outcome."
        />

        <div className="mt-16 space-y-12">
          {[fixly, novapay].map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <TiltCard>
                <div className="grid gap-0 lg:grid-cols-2">
                  <div className={`relative overflow-hidden ${i % 2 ? "lg:order-2" : ""}`}>
                    <img
                      src={p.image}
                      alt={`${p.name} product interface`}
                      loading="lazy"
                      width={1280}
                      height={800}
                      className="h-full min-h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent lg:bg-gradient-to-r" />
                  </div>

                  <div className="p-8 sm:p-10">
                    <div className="flex items-baseline gap-3">
                      <h3 className="text-3xl font-semibold gradient-text">{p.name}</h3>
                      <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                        {p.tagline}
                      </span>
                    </div>

                    <dl className="mt-6 space-y-5 text-sm">
                      <div>
                        <dt className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">Problem</dt>
                        <dd className="mt-1.5 text-muted-foreground">{p.problem}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">Approach</dt>
                        <dd className="mt-1.5 text-muted-foreground">{p.solution}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">Key features</dt>
                        <dd className="mt-2">
                          <ul className="space-y-1.5 text-muted-foreground">
                            {p.features?.map((f) => (
                              <li key={f} className="flex gap-2.5">
                                <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">Outcome</dt>
                        <dd className="mt-1.5 text-foreground">{p.outcome}</dd>
                      </div>
                    </dl>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.stack.map((t) => (
                        <span
                          key={t}
                          className="rounded-lg border border-border bg-secondary/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
                        style={{ backgroundImage: "var(--gradient-brand)" }}
                      >
                        <Github className="size-4" /> View code
                        <ArrowUpRight className="size-4" />
                      </a>
                    </div>

                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}

          <Reveal>
            <a
              href={extra.github}
              target="_blank"
              rel="noreferrer"
              className="glass group flex flex-wrap items-center justify-between gap-4 rounded-3xl p-7 transition-all hover:border-accent/40"
            >
              <div>
                <h3 className="text-xl font-semibold">
                  {extra.name} <span className="text-sm font-normal text-muted-foreground">— {extra.tagline}</span>
                </h3>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground">{extra.problem}</p>
              </div>
              <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase">
                Explore repo
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
