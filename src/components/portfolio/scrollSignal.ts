/**
 * Global scroll signal — a single passive listener shared by all 3D scenes.
 * `progress` is 0 at the very top of the page and 1 at the bottom.
 * `hero` is 0..1 across the first viewport (used to drive the hero dolly).
 * `velocity` is a smoothed, clamped 0..1 measure of how fast the user scrolls,
 * so scroll-reactive motion never spikes on flick-scroll or high-refresh devices.
 *
 * `intensity` scales every scroll-driven effect. Mobile / reduced-power devices
 * set it low so the scene still moves cinematically, just far more gently.
 */
const raw = { progress: 0, hero: 0, velocity: 0 };
const out = { progress: 0, hero: 0, velocity: 0, intensity: 1 };

let started = false;
let lastY = 0;
let lastT = 0;

function read() {
  const y = window.scrollY || 0;
  const now = performance.now();
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  raw.progress = Math.min(1, Math.max(0, y / max));
  raw.hero = Math.min(1, Math.max(0, y / Math.max(1, window.innerHeight)));

  const dt = Math.max(16, now - lastT);
  const px = Math.abs(y - lastY) / dt; // px per ms
  // smooth + clamp so fast flicks don't blow the motion out
  raw.velocity = Math.min(1, raw.velocity * 0.75 + Math.min(1, px / 3) * 0.25);

  lastY = y;
  lastT = now;
}

export function startScrollSignal() {
  if (typeof window === "undefined") return () => {};
  if (started) return () => {};
  started = true;
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      read();
      ticking = false;
    });
  };
  lastT = performance.now();
  read();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    started = false;
  };
}

/** 1 = full cinematic scroll motion, 0.3 = gentle (mobile / low power). */
export function setScrollIntensity(value: number) {
  out.intensity = Math.min(1, Math.max(0, value));
}

/** Scroll state with the device-appropriate intensity already applied. */
export function getScroll() {
  const k = out.intensity;
  out.progress = raw.progress * k;
  out.hero = raw.hero * k;
  // velocity decays toward rest even without new scroll events
  raw.velocity *= 0.94;
  out.velocity = raw.velocity * k;
  return out;
}

/** Unscaled values, for effects that must track real scroll position. */
export function getRawScroll() {
  return raw;
}
