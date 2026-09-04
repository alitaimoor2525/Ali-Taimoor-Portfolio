const WORDS = [
  "Machine Learning",
  "LLM Apps",
  "React / TypeScript",
  "Three.js",
  "FastAPI",
  "Vector Search",
  "Design Engineering",
  "Realtime Systems",
];

/** Infinite edge-faded ticker used as a section divider. */
export function Marquee() {
  const row = [...WORDS, ...WORDS];

  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-border py-5 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
    >
      <div className="flex w-max animate-[marquee_38s_linear_infinite] gap-10 will-change-transform">
        {row.map((w, i) => (
          <span
            key={`${w}-${i}`}
            className="flex items-center gap-10 font-display text-2xl font-semibold tracking-tight text-muted-foreground/70 sm:text-3xl"
          >
            {w}
            <span className="size-1.5 rounded-full bg-accent/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
