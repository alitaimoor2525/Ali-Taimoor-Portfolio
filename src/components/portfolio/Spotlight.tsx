import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";

/** Card shell with a cursor-tracking spotlight and animated border sheen. */
export function Spotlight({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(0);
  const bg = useMotionTemplate`radial-gradient(360px circle at ${mx}px ${my}px, color-mix(in oklab, var(--accent) 20%, transparent), transparent 65%)`;

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      className={`glass group relative overflow-hidden rounded-3xl transition-transform duration-300 hover:-translate-y-1 ${className}`}
    >
      <motion.div
        style={{ background: bg }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">{children}</div>
    </div>
  );
}
