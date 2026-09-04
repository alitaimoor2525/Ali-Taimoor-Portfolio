import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { PROFILE } from "./data";
import { useTypewriter } from "./useTypewriter";
import { Scene3D } from "./Scene3D";
import { Magnetic } from "./Magnetic";
import { AvatarChip } from "./Avatar";
import { SplitText } from "./SplitText";

export function Hero() {
  const typed = useTypewriter(PROFILE.roles);

  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden px-6 pt-32 pb-24">
      {/* 3D centerpiece — lazy-loaded on visibility, with a lightweight loading fallback */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center md:items-center">
        <Scene3D className="h-[22rem] w-[22rem] max-w-full -translate-y-4 opacity-60 sm:h-[26rem] sm:w-[26rem] sm:opacity-55 md:h-[38rem] md:w-[38rem] md:translate-y-0 md:translate-x-[22%] md:opacity-90" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="max-w-2xl"
        >
          {[
            <span
              key="badge"
              className="inline-flex items-center gap-3"
            >
              <AvatarChip />
              <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs tracking-widest text-muted-foreground uppercase">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                Available for AI engineering work
              </span>
            </span>,
            <h1 key="name" className="mt-7 text-6xl leading-[0.95] font-semibold sm:text-7xl lg:text-8xl">
              <SplitText text={PROFILE.name} gradient delay={0.25} />
            </h1>,
            <p key="typed" className="mt-5 font-mono text-lg text-foreground/90 sm:text-2xl">
              {typed}
              <span className="ml-0.5 inline-block text-accent" style={{ animation: "blink-caret 1s step-end infinite" }}>
                |
              </span>
            </p>,
            <p key="stmt" className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
              {PROFILE.statement}
            </p>,
            <div key="cta" className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow-strong)] transition-transform hover:scale-[1.03]"
                  style={{ backgroundImage: "var(--gradient-brand)" }}
                >
                  View Projects
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#contact"
                  className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all hover:border-accent/50"
                >
                  Get in Touch
                </a>
              </Magnetic>
            </div>,
          ].map((child, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-20 inline-flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground uppercase"
        >
          <ArrowDown className="size-3.5 animate-bounce" /> Scroll
        </motion.a>
      </div>
    </section>
  );
}
