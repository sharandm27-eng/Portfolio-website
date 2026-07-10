import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import janarogya from "@/assets/janarogya.png";
import smartincampus from "@/assets/smartincampus.png";
import farmtofactory from "@/assets/farmtofactory.png";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — D.M. SHARAN®" },
      {
        name: "description",
        content: "Selected work: brand systems, high-impact websites and product design.",
      },
      { property: "og:title", content: "Projects — D.M. SHARAN®" },
      { property: "og:description", content: "Selected work — brands, sites, products." },
    ],
  }),
  component: Projects,
});

const items = [
  {
    n: "01",
    name: "Farm to Factory",
    tag: "Web App",
    year: "2025",
    description:
      "A cross-platform Flutter app connecting farmers directly with factories — eliminating middlemen through a transparent marketplace. Farmers list crops and view real-time prices; factories browse, bid, and track procurement trends. Built with role-based dashboards and multilingual support (English, Hindi, Telugu, Kannada).",
    tech: [
      "Flutter",
      "Dart",
      "Firebase",
      "Firebase Authentication",
      "Cloud Firestore",
      "Firebase Hosting",
      "Git",
      "GitHub",
    ],
    links: [{ text: "View Project ↗", url: "https://github.com/sharandm27-eng/farm_to_factory" }],
    image: farmtofactory,
  },
  {
    n: "02",
    name: "Smart InCampus",
    tag: "Web App",
    year: "2026",
    description:
      "A role-based campus management and navigation platform built for students, teachers, parents, and admins. Features include interactive campus maps, timetables, attendance tracking, event registration, an anonymous Q&A forum, and dedicated dashboards for each user role.",
    tech: ["HTML", "CSS", "JavaScript", "JSON", "LocalStorage", "SVG", "Chart.js"],
    links: [{ text: "View Project ↗", url: "https://github.com/sharandm27-eng/smart_incampus" }],
    image: smartincampus,
  },
  {
    n: "03",
    name: "JanArogya",
    tag: "Web App",
    year: "2026",
    description:
      "An AI-powered district health management system built for Narasaraopet Division, Andhra Pradesh, digitizing 1,400+ paper-based Primary Health Centres (PHCs). Health workers log metrics offline using voice dictation (multilingual support), while district officers access a live map dashboard showing PHC health metrics. The AI stack leverages Meta's Prophet for medicine stockout forecasting, scikit-learn IsolationForest for attendance anomaly detection, and the Gemini API for natural-language WhatsApp alerts and cross-clinic supply redistribution recommendations. The zero-infrastructure-cost system recently resolved a 3-way critical supply crisis automatically before human intervention was needed.",
    tech: [
      "JavaScript",
      "Python",
      "CSS",
      "HTML",
      "Vercel (Frontend)",
      "Render (Backend)",
      "Gemini API (Google)",
      "Prophet by Meta",
      "scikit-learn (IsolationForest)",
      "Web Speech API (Voice Dictation)",
    ],
    links: [{ text: "View Project ↗", url: "https://github.com/sharandm27-eng/JanArogya" }],
    image: janarogya,
  },
];

function Projects() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="grain relative min-h-screen px-6 pb-24 pt-32 md:px-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/70">
        03 — Projects
      </p>
      <h1 className="mt-4 font-display text-6xl leading-[0.9] md:text-9xl">
        <AnimatedHeading text="SELECTED" />
        <br />
        <AnimatedHeading text="WORK" delay={0.2} />
      </h1>

      <div className="mt-20 border-t border-foreground/20">
        {items.map((p, i) => {
          const isExpanded = expandedIndex === i;
          return (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: "easeOut" }}
              className="border-b border-foreground/20"
            >
              {/* Row Header Clickable */}
              <div
                role="button"
                tabIndex={0}
                data-cursor={isExpanded ? "close" : "view"}
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setExpandedIndex(isExpanded ? null : i);
                  }
                }}
                className="group flex cursor-pointer items-center justify-between py-6 transition-all hover:pl-6 md:py-8 select-none"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-xs text-foreground/50">{p.n}</span>
                  <span className="font-display text-3xl transition-colors group-hover:text-ember md:text-5xl">
                    {p.name}
                  </span>
                </div>
                <div className="flex items-center gap-8">
                  <span className="hidden font-mono text-xs uppercase tracking-[0.25em] text-foreground/70 md:inline">
                    {p.tag}
                  </span>
                  <span className="font-mono text-xs text-foreground/70">{p.year}</span>
                  <motion.span
                    animate={{ rotate: isExpanded ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="text-2xl transition-colors group-hover:text-ember block"
                  >
                    ↗
                  </motion.span>
                </div>
              </div>

              {/* Accordion Expandable Content */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[40%_1fr] gap-8 pb-8 pt-2">
                      {/* Left: Project image or placeholder */}
                      <div className="aspect-[16/9] w-full overflow-hidden rounded-lg border border-foreground/10 bg-foreground/5 flex items-center justify-center text-xs text-foreground/40 font-mono">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-full w-full object-cover object-left-top"
                          />
                        ) : (
                          "No Image Available"
                        )}
                      </div>

                      {/* Right: Info details */}
                      <div className="flex flex-col justify-between gap-6">
                        <div className="space-y-4">
                          <p className="font-mono text-sm leading-relaxed text-foreground/80">
                            {p.description}
                          </p>
                          <div className="flex flex-wrap gap-2 pt-2">
                            {p.tech.map((t) => (
                              <span
                                key={t}
                                className="rounded-full bg-foreground/5 border border-foreground/10 px-3 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground/80"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-6">
                          {p.links.map((link) => (
                            <a
                              key={link.text}
                              href={link.url}
                              target={link.url.startsWith("http") ? "_blank" : undefined}
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ember hover:text-foreground transition-colors"
                            >
                              {link.text}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
