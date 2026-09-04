import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SceneFallback } from "./SceneFallback";
import { useHydrated, useSceneQuality } from "./useHydrated";

// Retry once on a stale/failed chunk fetch (happens after a redeploy).
const HeroScene = lazy(() =>
  import("./HeroScene").catch(() => import("./HeroScene")),
);

/**
 * Loads the Three.js hero scene only when:
 *  - the app has hydrated,
 *  - motion isn't reduced,
 *  - and the container is actually near the viewport.
 * Small screens get a lighter variant instead of no 3D at all.
 */
export function Scene3D({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const quality = useSceneQuality();
  const [visible, setVisible] = useState(false);
  const [inView, setInView] = useState(true);
  const [awake, setAwake] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el || !hydrated || quality === "off") return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
        // Keep rendering slightly past the hero so the scroll exit stays smooth,
        // then stop the render loop entirely once it's off screen.
        setInView(entry.isIntersecting);
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hydrated, quality]);

  // Never burn frames in a background tab.
  useEffect(() => {
    const onVis = () => setAwake(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const enabled = hydrated && quality !== "off" && visible;

  return (
    <div ref={hostRef} className={className}>
      <div className="relative h-full w-full">
        {enabled ? (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.9, rotateX: 12 }}
            animate={ready ? { opacity: 1, scale: 1, rotateX: 0 } : { opacity: 0, scale: 0.9, rotateX: 12 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000 }}
          >
            <Suspense fallback={null}>
              <HeroScene onReady={() => setReady(true)} lite={quality === "lite"} active={inView && awake} />
            </Suspense>
          </motion.div>
        ) : null}

        <AnimatePresence>
          {!ready ? (
            <motion.div
              key="fallback"
              className="absolute inset-0"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SceneFallback loading={enabled} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
