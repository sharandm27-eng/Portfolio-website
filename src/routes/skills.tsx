import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import brandPaths from "./brand-paths.json";

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
    skills: [
      { name: "Python", slug: "python", color: "#3776AB" },
      { name: "C++", slug: "cplusplus", color: "#00599C" },
      { name: "C", slug: "c", color: "#A8B9CC" },
      { name: "HTML5", slug: "html5", color: "#E34F26" },
      { name: "CSS3", slug: "css3", color: "#1572B6" },
    ],
  },
  {
    title: "App Development",
    skills: [
      { name: "Flutter", slug: "flutter", color: "#02569B" },
    ],
  },
  {
    title: "AI & Modern Tools",
    skills: [
      { name: "Prompt Engineering", slug: "openai", color: "#00A243" },
      { name: "API Integration", slug: "postman", color: "#FF6C37" },
      { name: "GitHub", slug: "github", color: "#FFFFFF" },
    ],
  },
  {
    title: "Backend & Auth",
    skills: [
      { name: "Firebase Auth", slug: "firebase", color: "#FFCA28" },
    ],
  },
];

interface BrandIconProps {
  slug: string;
  color: string;
  className?: string;
}

function BrandIcon({ slug, color, className }: BrandIconProps) {
  const path = (brandPaths as Record<string, string>)[slug];
  if (!path) return null;
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className} 
      fill="currentColor"
      style={{ color }}
    >
      <path d={path} />
    </svg>
  );
}

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
            className="border-b border-foreground/20 py-8 grid grid-cols-1 md:grid-cols-[30%_1fr] gap-6"
          >
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60 self-center">
              {group.title}
            </div>
            <div className="flex flex-wrap gap-4">
              {group.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-4 bg-foreground/[0.03] hover:bg-foreground/[0.06] border border-foreground/10 hover:border-ember/30 rounded-2xl p-2.5 pr-5 transition-all duration-300 group cursor-default"
                >
                  <div className="relative">
                    {/* soft cyan-white glow effect behind the icon */}
                    <div className="absolute inset-0 bg-[rgba(180,230,255,0)] group-hover:bg-[rgba(180,230,255,0.08)] rounded-xl blur-lg transition-all duration-300 pointer-events-none" />
                    
                    {/* icon container (slightly lighter/darker than the section background, not pure black) */}
                    <div className="w-[52px] h-[52px] flex items-center justify-center bg-[#151520]/80 border border-foreground/10 rounded-xl relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:border-[rgba(180,230,255,0.4)] group-hover:shadow-[0_0_15px_rgba(180,230,255,0.25)]">
                      <BrandIcon slug={skill.slug} color={skill.color} className="w-6 h-6 transition-transform duration-300 group-hover:rotate-[10deg] ease-in-out" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs uppercase tracking-wider text-foreground/90 group-hover:text-ember transition-colors duration-300 select-none">
                      {skill.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
