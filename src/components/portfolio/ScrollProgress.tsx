import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { getRawScroll, startScrollSignal } from "./scrollSignal";

const SECTIONS = [
  { id: "top", label: "Intro" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

/**
 * Scroll indicator wired to the SAME scroll signal that drives the 3D scene,
 * so the rail, the percentage readout and the WebGL choreography stay in sync.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  const [pct, setPct] = useState(0);
  const [active, setActive] = useState(0);
  const shown = useRef(0);

  // Smoothly ease the readout toward the shared scroll signal every frame.
  useEffect(() => {
    const stop = startScrollSignal();
    let raf = 0;
    const loop = () => {
      const target = getRawScroll().progress * 100;
      shown.current += (target - shown.current) * 0.16;
      setPct((p) => (Math.abs(p - shown.current) > 0.4 ? shown.current : p));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      stop();
    };
  }, []);

  // Which section is currently centred in the viewport.
  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.4;
      let next = 0;
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= mid) next = i;
      });
      setActive(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const rounded = Math.round(pct);

  return (
    <>
      {/* Top gradient rail */}
      <motion.div
        aria-hidden
        style={{ scaleX, backgroundImage: "var(--gradient-brand)" }}
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left shadow-[0_0_18px_var(--accent)]"
      />

      {/* Side rail: percentage + section markers (desktop) */}
      <div
        aria-hidden
        className="fixed top-1/2 right-5 z-[65] hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground tabular-nums">
          {String(rounded).padStart(2, "0")}%
        </span>

        <div className="relative h-44 w-[2px] overflow-hidden rounded-full bg-border/60">
          <motion.div
            style={{ scaleY: scaleX, backgroundImage: "var(--gradient-brand)" }}
            className="absolute inset-0 origin-top shadow-[0_0_14px_var(--accent)]"
          />
        </div>

        <ul className="flex flex-col items-center gap-3">
          {SECTIONS.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-label={s.label}
                className="group flex items-center gap-2"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    i === active
                      ? "size-2 bg-accent shadow-[0_0_12px_var(--accent)]"
                      : "size-1.5 bg-muted-foreground/40 group-hover:bg-muted-foreground"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
