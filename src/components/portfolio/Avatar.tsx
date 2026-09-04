import { useRef, useState } from "react";
import { motion } from "motion/react";
import { PROFILE } from "./data";

const initials = PROFILE.name
  .split(" ")
  .map((w) => w[0])
  .join("");

/** Small circular avatar used in the hero. */
export function AvatarChip({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex size-16 shrink-0 items-center justify-center sm:size-14 ${className}`}>
      <span
        className="absolute -inset-1 rounded-full opacity-60 blur-md"
        style={{ backgroundImage: "var(--gradient-brand)" }}
      />
      <span className="glass relative flex size-16 items-center justify-center overflow-hidden rounded-full sm:size-14">
        {PROFILE.photo ? (
          <img
            src={PROFILE.photo}
            alt={`${PROFILE.name} portrait`}
            className="size-full scale-[1.35] object-cover"
            style={{ objectPosition: "50% 12%" }}
            loading="eager"
          />

        ) : (
          <span className="font-display text-sm font-semibold gradient-text">{initials}</span>
        )}
      </span>
    </span>
  );
}

/** Large glass photo card with 3D tilt, used in the about section. */
export function AvatarCard({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        setTilt({
          x: ((e.clientY - r.top) / r.height - 0.5) * -12,
          y: ((e.clientX - r.left) / r.width - 0.5) * 12,
        });
      }}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ perspective: 1000 }}
      className={className}
    >
      <div
        className="glass relative overflow-hidden rounded-[1.75rem] p-2 transition-transform duration-300 ease-out"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute -inset-24 opacity-40 blur-3xl"
          style={{ backgroundImage: "var(--gradient-brand)" }}
          aria-hidden
        />
        <div className="relative aspect-4/5 overflow-hidden rounded-[1.4rem] bg-card">
          {PROFILE.photo ? (
            <img
              src={PROFILE.photo}
              alt={`${PROFILE.name} — AI/ML engineer portrait`}
              className="size-full scale-[1.08] object-cover contrast-[1.06] saturate-[1.05]"
              style={{ objectPosition: "52% 20%" }}
              loading="lazy"
            />

          ) : (
            <div className="flex size-full flex-col items-center justify-center gap-3 text-center">
              <span className="font-display text-6xl font-semibold gradient-text">{initials}</span>
              <span className="font-mono text-[0.7rem] tracking-widest text-muted-foreground uppercase">
                Photo coming soon
              </span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
            <span className="font-display text-lg font-semibold">{PROFILE.name}</span>
            <span className="font-mono text-[0.65rem] tracking-widest text-accent uppercase">{PROFILE.roles[0]}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
