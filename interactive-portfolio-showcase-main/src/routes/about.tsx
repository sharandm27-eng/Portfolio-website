import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import portrait from "@/assets/portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — D.M. SHARAN®" },
      {
        name: "description",
        content:
          "The person behind the pixels — a designer & developer building high-impact digital work.",
      },
      { property: "og:title", content: "About — D.M. SHARAN®" },
      { property: "og:description", content: "The person behind the pixels." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <section className="grain relative min-h-screen px-6 pb-24 pt-32 md:px-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/70">01 — About</p>
      <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.9] md:text-7xl">
        <AnimatedHeading text="BUILDING THE FUTURE," />
        <br />
        <AnimatedHeading text="ONE PROJECT AT A TIME." delay={0.25} />
      </h1>

      <div className="mt-20 grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-2xl bg-[color:var(--ember-deep)]">
            <img src={portrait} alt="Portrait" className="h-full w-full object-cover" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="space-y-6 font-sans text-lg leading-relaxed text-foreground/85"
        >
          <p>
            I'm D.M. Sharan, an aspiring AI & Full Stack Developer who loves transforming ideas into
            modern digital experiences. From intelligent applications to responsive websites, I
            focus on creating solutions that are simple, efficient, and meaningful.
          </p>
          <p>
            Currently pursuing B.Tech in Computer Science (AI & ML), I'm continuously exploring
            emerging technologies, improving my skills, and building projects that challenge me to
            grow as a developer.
          </p>
          <p>
            What excites me most are real-world problems that are genuinely challenging to solve —
            the kind that push me to learn something new I didn't know before.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-6">
            {[
              ["3", "Projects"],
              ["10+", "Technologies Learned"],
              ["100%", "Passion for Learning"],
              ["6", "Hackathons Participated"],
            ].map(([n, l]) => (
              <div key={l} className="border-t border-foreground/20 pt-3">
                <div className="font-display text-4xl">{n}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/60">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
