import { motion } from "motion/react";
import type { CSSProperties } from "react";

interface Props {
  text: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  stagger?: number;
}

export function AnimatedHeading({ text, className, style, delay = 0, stagger = 0.04 }: Props) {
  const letters = Array.from(text);

  return (
    <motion.span
      aria-label={text}
      className={className}
      style={{ ...style, display: "inline-block" }}
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: {
              y: -140,
              opacity: 0,
            },
            show: {
              y: 0,
              opacity: 1,
              transition: {
                type: "spring",
                stiffness: 130, // Spring stiffness
                damping: 10, // Low damping creates bouncy effect
                mass: 0.8,
              },
            },
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </motion.span>
  );
}
