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

const infoCards = [
  {
    title: "Education",
    content: (
      <div className="space-y-1">
        <p className="font-mono text-sm text-foreground/95 font-semibold">B.Tech CSE (AI & ML)</p>
        <p className="font-mono text-xs text-foreground/75">Presidency University</p>
        <p className="font-mono text-[10px] text-foreground/50 mt-1 uppercase tracking-wider">2024 – 2028</p>
      </div>
    )
  },
  {
    title: "Interests",
    content: (
      <p className="font-mono text-xs leading-relaxed text-foreground/80 uppercase tracking-wide">
        AI/ML, Web Development, Space Tech
      </p>
    )
  },
  {
    title: "Currently Learning",
    content: (
      <p className="font-mono text-xs leading-relaxed text-foreground/80 uppercase tracking-wide">
        MCP (Model Context Protocol), Advanced React, System Design
      </p>
    )
  },
  {
    title: "Beyond Code",
    content: (
      <p className="font-mono text-xs leading-relaxed text-foreground/80 uppercase tracking-wide">
        Hackathons, building personal robotics projects, exploring ISRO's open courses
      </p>
    )
  }
];

function About() {
  return (
    <section className="grain relative min-h-screen px-6 pb-24 pt-32 md:px-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/70">01 — About</p>
      <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.9] md:text-7xl">
        <AnimatedHeading text="BUILDING THE FUTURE," />
        <br />
        <AnimatedHeading text="ONE PROJECT AT A TIME." delay={0.25} />
      </h1>

      <div className="mt-20 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24">
        
        {/* Left Column / Mobile Stack */}
        <div className="flex flex-col gap-10 order-1 lg:order-none">
          
          {/* Portrait Photo (stacked first on mobile) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="overflow-hidden rounded-2xl bg-[color:var(--ember-deep)] max-w-sm w-full border border-foreground/10 shadow-xl order-1 lg:order-none"
          >
            <img src={portrait} alt="Portrait" className="w-full h-auto object-cover" />
          </motion.div>

          {/* Bio text (stacked second on mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="space-y-6 font-sans text-base leading-relaxed text-foreground/80 max-w-xl order-2 lg:order-none"
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
          </motion.div>

          {/* Outlined "Know More" Button (stacked third on mobile) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="order-3 lg:order-none"
          >
            <a
              href="/contact"
              data-cursor="know more"
              className="group inline-flex items-center gap-2 rounded-full border border-foreground/30 px-2 py-2 pr-6 text-foreground transition-transform hover:scale-105 hover:border-[#4A9EFF] transition-colors duration-300"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-[color:var(--background)] transition-transform group-hover:translate-x-1">
                →
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.25em]">Know More</span>
            </a>
          </motion.div>

          {/* Stats Row (stacked fourth on mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="border-t border-foreground/20 pt-8 mt-2 order-4 lg:order-none"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { value: "8", label: "Projects", icon: (
                  <svg className="w-5 h-5 text-[#4A9EFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                  </svg>
                )},
                { value: "10+", label: "Techs", icon: (
                  <svg className="w-5 h-5 text-[#4A9EFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .252c-.008.379.137.751.43.992l1.004.828c.424.35.534.954.26 1.43l-1.297 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.252c.007-.379-.138-.75-.43-.992l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
                    <circle cx={12} cy={12} r={3} />
                  </svg>
                )},
                { value: "100%", label: "Passion", icon: (
                  <svg className="w-5 h-5 text-[#4A9EFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.048 8.287 8.287 0 0 0 9 9.6a8.28 8.28 0 0 1 3-3.6 8.287 8.287 0 0 0 3.362-3.186Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925 3.546 5.974 5.974 0 0 1-2.133-1A3.75 3.75 0 0 0 12 18Z" />
                  </svg>
                )},
                { value: "8", label: "Hackathons", icon: (
                  <svg className="w-5 h-5 text-[#4A9EFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                  </svg>
                )},
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-1.5 border-t border-foreground/10 pt-4">
                  <div>{s.icon}</div>
                  <div className="font-display text-2xl sm:text-3xl leading-none text-foreground">{s.value}</div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/50">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column / Bento Grid (stacked last on mobile) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 self-start order-5 lg:order-none"
        >
          {infoCards.map((card) => (
            <div
              key={card.title}
              className="bg-[#220707]/35 hover:bg-[#2d0a0a]/45 border border-[color:var(--ember)]/15 hover:border-[#4A9EFF]/30 rounded-2xl p-6 backdrop-blur-md transition-all duration-300 group hover:shadow-[0_0_25px_rgba(74,158,255,0.08)]"
            >
              {/* Diamond Icon Accent */}
              <div className="flex h-7 w-7 rotate-45 items-center justify-center border border-[color:var(--ember)]/40 bg-background text-[10px] text-[#4A9EFF] transition-colors duration-300 group-hover:border-[#4A9EFF]/60 group-hover:shadow-[0_0_8px_rgba(74,158,255,0.2)]">
                <span className="-rotate-45">✦</span>
              </div>
              
              {/* Title */}
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/90 mt-6 group-hover:text-[#4A9EFF] transition-colors duration-300">
                {card.title}
              </h3>
              
              {/* Divider */}
              <div className="my-3 border-b border-foreground/10" />
              
              {/* Content */}
              <div className="mt-2 text-foreground/80 leading-relaxed">
                {card.content}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
