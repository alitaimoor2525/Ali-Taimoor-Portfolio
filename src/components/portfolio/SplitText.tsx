import { motion } from "motion/react";

/**
 * Per-character 3D reveal for headline text.
 * Each char carries a slice of the shared brand gradient so the transform
 * on the char (which breaks a parent background-clip) still looks continuous.
 */
export function SplitText({
  text,
  className,
  gradient = false,
  delay = 0,
  stagger = 0.04,
}: {
  text: string;
  className?: string;
  gradient?: boolean;
  delay?: number;
  stagger?: number;
}) {
  const chars = text.split("");

  return (
    <span className={className} style={{ perspective: 800, display: "inline-block" }}>
      {chars.map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className="inline-block will-change-transform"
          style={
            gradient
              ? {
                  backgroundImage: "var(--gradient-brand)",
                  backgroundSize: `${chars.length * 100}% 100%`,
                  backgroundPosition: `${(i / Math.max(chars.length - 1, 1)) * 100}% center`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }
              : undefined
          }
          initial={{ opacity: 0, y: "0.6em", rotateX: -85, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}
