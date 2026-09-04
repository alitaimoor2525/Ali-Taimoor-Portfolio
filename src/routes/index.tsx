import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { BackgroundFX } from "@/components/portfolio/BackgroundFX";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { Marquee } from "@/components/portfolio/Marquee";
import { CursorFX } from "@/components/portfolio/CursorFX";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";

const TITLE = "Ali Taimoor — AI/ML Engineer & Full-Stack Developer";
const DESCRIPTION =
  "Ali Taimoor designs and ships AI-powered products end-to-end — machine learning engines, resilient APIs and fast, immersive interfaces.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  // Lenis smooth scrolling — loaded only in the browser, after hydration.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ duration: 1.05, smoothWheel: true });
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <BackgroundFX />
      <ScrollProgress />
      <CursorFX />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
