import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Glowing cursor halo + snappy dot. Desktop, fine-pointer, motion-safe only. */
export function CursorFX() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const hx = useSpring(x, { stiffness: 140, damping: 20, mass: 0.6 });
  const hy = useSpring(y, { stiffness: 140, damping: 20, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setActive(Boolean(el?.closest("a, button, [role='button'], input, textarea")));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] hidden lg:block">
      <motion.div
        style={{ x: hx, y: hy, willChange: "transform" }}
        className="absolute -ml-16 -mt-16 h-32 w-32 rounded-full opacity-60 blur-2xl"
      >
        <div
          className="h-full w-full rounded-full"
          style={{ backgroundImage: "var(--gradient-brand)", opacity: active ? 0.5 : 0.26 }}
        />
      </motion.div>
      <motion.div
        style={{ x, y }}
        animate={{ scale: active ? 2.2 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="absolute -ml-1 -mt-1 size-2 rounded-full bg-accent shadow-[0_0_18px_var(--accent)]"
      />
    </div>
  );
}
