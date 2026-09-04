import { useEffect, useState } from "react";

/** True after hydration — used to gate browser-only 3D work. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

/**
 * "off"  — no 3D at all (reduced motion)
 * "lite" — reduced 3D for small screens
 * "full" — full cinematic scene
 */
export function useSceneQuality(): "off" | "lite" | "full" {
  const [mode, setMode] = useState<"off" | "lite" | "full">("off");
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return setMode("off");
    const small = window.matchMedia("(max-width: 1023px)").matches;
    const nav = navigator as Navigator & { deviceMemory?: number };
    const weak =
      (nav.hardwareConcurrency ?? 8) <= 4 ||
      (nav.deviceMemory ?? 8) <= 4 ||
      window.devicePixelRatio > 2.5;
    setMode(small || weak ? "lite" : "full");
  }, []);
  return mode;
}

/** Kept for backwards-compat: true when the full scene should be skipped. */
export function useLightweightDevice() {
  return useSceneQuality() === "off";
}
