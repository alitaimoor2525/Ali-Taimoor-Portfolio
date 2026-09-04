import { motion, useScroll, useTransform } from "motion/react";

/** Parallax gradient mesh blobs + grid lines behind the whole page. */
export function BackgroundFX() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 320]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -140]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="aurora absolute left-1/2 top-[-30%] hidden h-[70rem] w-[70rem] -translate-x-1/2 opacity-30 md:block" />
      <div className="absolute inset-0 grid-lines opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="noise absolute inset-0 hidden opacity-[0.05] mix-blend-overlay md:block" />
      <motion.div
        style={{ y: y1, willChange: "transform" }}
        className="absolute -left-40 top-[-10%] h-[32rem] w-[32rem] rounded-full bg-primary/25 blur-[90px]"
      />
      <motion.div
        style={{ y: y2, willChange: "transform" }}
        className="absolute -right-52 top-[25%] h-[28rem] w-[28rem] rounded-full bg-accent/25 blur-[90px]"
      />
      <motion.div
        style={{ y: y3, willChange: "transform" }}
        className="absolute bottom-[-15%] left-1/3 hidden h-[26rem] w-[26rem] rounded-full bg-primary/15 blur-[100px] md:block"
      />
    </div>
  );
}
