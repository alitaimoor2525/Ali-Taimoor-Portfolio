/** Lightweight, dependency-free stand-in rendered while 3D assets load
 *  (and permanently on low-power / reduced-motion devices). */
export function SceneFallback({ loading = false }: { loading?: boolean }) {
  return (
    <div className="relative grid h-full w-full place-items-center">
      <div
        aria-hidden
        className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,var(--primary),transparent_62%)] opacity-40 blur-2xl"
        style={{ animation: "float-slow 9s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="absolute inset-[18%] rounded-full border border-accent/20"
        style={{ animation: "spin 14s linear infinite" }}
      />
      {loading ? (
        <div className="relative flex flex-col items-center gap-3">
          <span className="size-2 animate-ping rounded-full bg-accent" />
          <span className="font-mono text-[10px] tracking-[0.28em] text-muted-foreground uppercase">
            Initializing scene
          </span>
          <span className="h-px w-28 overflow-hidden rounded-full bg-border">
            <span
              className="block h-full w-1/3 rounded-full"
              style={{ backgroundImage: "var(--gradient-brand)", animation: "scene-progress 1.4s ease-in-out infinite" }}
            />
          </span>
        </div>
      ) : null}
    </div>
  );
}
