import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { AnimatedHeading } from "@/components/AnimatedHeading";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — D.M. SHARAN®" },
      {
        name: "description",
        content:
          "Technical skills and expertise in languages, app development, AI tools, and backend frameworks.",
      },
      { property: "og:title", content: "Skills — D.M. SHARAN®" },
      { property: "og:description", content: "Technical skills and expertise." },
    ],
  }),
  component: Skills,
});

const skillGroups = [
  {
    title: "Languages",
    skills: ["Python", "C++", "C"],
  },
  {
    title: "App Development",
    skills: ["Flutter"],
  },
  {
    title: "AI & Modern Tools",
    skills: ["Prompt Engineering", "API Integration"],
  },
  {
    title: "Backend & Auth",
    skills: ["Firebase Authentication"],
  },
];

function Skills() {
  return (
    <section className="grain relative min-h-screen px-6 pb-24 pt-32 md:px-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/70">02 — Skills</p>
      <h1 className="mt-4 font-display text-6xl leading-[0.9] md:text-9xl">
        <AnimatedHeading text="MY SKILLS" />
        <br />
        <AnimatedHeading text="& TOOLS" delay={0.2} />
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        className="mt-20 border-t border-foreground/20"
      >
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="border-b border-foreground/20 py-8 grid grid-cols-1 md:grid-cols-[30%_1fr] gap-4"
          >
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60 self-center">
              {group.title}
            </div>
            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-foreground/5 border border-foreground/10 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-foreground/95 hover:border-ember hover:bg-ember/5 transition-all duration-300 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
