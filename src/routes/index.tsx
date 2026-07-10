import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import portrait from "@/assets/portrait.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

interface SlidingHeadingProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

function SlidingHeading({ text, className, delay = 0, stagger = 0.04 }: SlidingHeadingProps) {
  const letters = Array.from(text);
  return (
    <motion.span
      aria-label={text}
      className={className}
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          variants={{
            hidden: {
              y: "120%",
              rotate: 12,
              opacity: 0,
              filter: "blur(12px)",
            },
            show: {
              y: 0,
              rotate: 0,
              opacity: 1,
              filter: "blur(0px)",
              transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

function Index() {
  return (
    <section className="grain relative min-h-screen overflow-hidden">
      {/* Portrait */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 flex justify-center"
      >
        <img
          src={portrait}
          alt="Portrait"
          width={896}
          height={1216}
          className="h-[85vh] w-auto object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.35)]"
        />
      </motion.div>

      {/* Giant type on top of portrait with mix-blend-mode */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center pt-16 z-0"
        style={{
          mixBlendMode: "overlay",
          color: "rgba(255, 255, 255, 0.4)",
        }}
      >
        <SlidingHeading
          text="SHARAN"
          delay={0.4}
          stagger={0.09}
          className="font-display select-none text-[45vw] leading-none md:text-[35vw] whitespace-nowrap"
        />
      </div>

      {/* Bottom left copy */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-32 left-6 z-10 max-w-xs md:left-12"
      >
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/90">
          CODE. CREATE. INNOVATE.
        </p>
        <p className="mt-4 font-mono text-[13px] leading-relaxed text-foreground/80">
          I design and build fast, scalable web applications, AI-powered solutions, and seamless
          digital experiences.
        </p>
      </motion.div>

      {/* Bottom right — projects count */}
      <motion.a
        href="/projects"
        data-cursor="view all"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.7 }}
        className="absolute bottom-10 right-6 z-10 flex flex-col items-end gap-2 md:right-12"
      >
        <span className="rounded-md bg-[color:var(--ember-deep)] px-3 py-1 font-mono text-xs text-foreground">
          3<span className="text-ember">↗</span>
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/80">
          All Projects
        </span>
      </motion.a>

      {/* Marching stripes at bottom */}
      <div className="absolute inset-x-0 bottom-0 z-20 h-3 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="flex h-full w-[200%] gap-2"
        >
          {Array.from({ length: 60 }).map((_, i) => (
            <span key={i} className="h-full w-8 shrink-0 bg-foreground/70" />
          ))}
        </motion.div>
      </div>

      {/* Refresh icon top right */}
      <motion.button
        data-cursor="reload"
        whileHover={{ rotate: 180 }}
        transition={{ type: "spring", stiffness: 120 }}
        onClick={() => window.location.reload()}
        className="absolute right-6 top-24 z-10 grid h-9 w-9 place-items-center rounded-md bg-foreground/95 text-[color:var(--ember-deep)]"
      >
        ⟳
      </motion.button>
    </section>
  );
}
