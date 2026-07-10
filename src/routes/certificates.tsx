import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import build_with_ai from "@/assets/build_with_ai.jpg";
import pitchathon from "@/assets/pitchathon.jpg";
import project_x from "@/assets/project_x.jpg";

export const Route = createFileRoute("/certificates")({
  head: () => ({
    meta: [
      { title: "Certificates — D.M. SHARAN®" },
      {
        name: "description",
        content: "Achievements, credentials, and event participations.",
      },
      { property: "og:title", content: "Certificates — D.M. SHARAN®" },
      { property: "og:description", content: "Achievements and credentials." },
    ],
  }),
  component: Certificates,
});

const certificates = [
  {
    id: 1,
    title: "BUILD WITH AI",
    year: "April 2026",
    description:
      "Built in a 24-hour hackathon (Build with AI), this web app transforms any YouTube playlist into a structured, gamified learning path. Students paste a playlist link, and the app automatically converts each video into a 'level' — complete with an AI-generated summary, concept linkages connecting it to the previous video, and a 5-8 question quiz to test understanding before unlocking the next level. A final comprehensive exam covers the entire playlist. Wrapped in a Samurai-themed UI, the experience turns passive video-watching into an active, level-by-level mastery journey.",
    image: build_with_ai,
  },
  {
    id: 2,
    title: "PITCHATHON",
    year: "April 2026",
    description:
      "A role-based campus management and navigation platform built for students, teachers, parents, and admins. Features include interactive campus maps, timetables, attendance tracking, event registration, an anonymous Q&A forum, and dedicated dashboards for each user role.",
    image: pitchathon,
  },
  {
    id: 3,
    title: "PROJECT X 1.0",
    year: "November 2025",
    description:
      "Build a web app which helps students and teachers about their timetables and classes and assignments. It is helpful for communities like schools and colleges.",
    image: project_x,
  },
];

function Certificates() {
  const [selectedCert, setSelectedCert] = useState<(typeof certificates)[0] | null>(null);

  return (
    <section className="grain relative min-h-screen px-6 pb-24 pt-32 md:px-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/70">
        04 — Certificates
      </p>
      <h1 className="mt-4 font-display text-6xl leading-[0.9] md:text-9xl">
        <AnimatedHeading text="ACHIEVED" />
        <br />
        <AnimatedHeading text="CERTIFICATES" delay={0.2} />
      </h1>

      {/* Grid of Certificate Cards */}
      <motion.div
        initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 border-t border-foreground/20 pt-10"
      >
        {certificates.map((cert) => (
          <motion.div
            key={cert.id}
            whileHover={{ y: -6, scale: 1.015 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setSelectedCert(cert)}
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-foreground/10 bg-foreground/2 p-4 transition-all duration-300 hover:border-ember/30 hover:bg-foreground/5 hover:shadow-[0_10px_35px_-12px_oklch(0.6_0.24_30_/_0.25)] select-none"
          >
            {/* Card Thumbnail */}
            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border border-foreground/10 bg-foreground/5 flex flex-col items-center justify-center text-xs text-foreground/40 font-mono relative">
              {cert.image ? (
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <>
                  <span className="uppercase tracking-widest text-[10px] text-foreground/45">
                    Certificate Image
                  </span>
                  <span className="mt-2 text-[10px] text-foreground/30">Click to view</span>
                </>
              )}
            </div>

            {/* Card Details */}
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h3 className="font-display text-xl uppercase tracking-wide group-hover:text-ember transition-colors">
                {cert.title}
              </h3>
              <span className="font-mono text-xs text-foreground/60 whitespace-nowrap">
                {cert.year}
              </span>
            </div>
            <p className="font-mono text-xs text-foreground/80 mt-1.5 line-clamp-1">
              {cert.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox / Modal Overlay */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-4 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-[90vw] overflow-y-auto rounded-xl border border-foreground/10 bg-card p-4 md:p-6 shadow-2xl cursor-default"
            >
              {/* Modal Content */}
              {selectedCert.image ? (
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="max-h-[65vh] object-contain rounded-lg mx-auto"
                />
              ) : (
                <div className="aspect-[4/3] w-[600px] max-w-full bg-foreground/5 flex flex-col items-center justify-center rounded-lg border border-foreground/10 font-mono text-xs text-foreground/40 mx-auto">
                  <span className="uppercase tracking-widest text-[10px] text-foreground/45">
                    {selectedCert.title} Placeholder
                  </span>
                  <span className="mt-2 text-foreground/30">{selectedCert.description}</span>
                </div>
              )}

              {/* Modal Details Footer */}
              <div className="mt-6 border-t border-foreground/10 pt-4 px-1 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex-1 space-y-2">
                  <h3 className="font-display text-2xl uppercase tracking-wider">
                    {selectedCert.title}
                  </h3>
                  <p className="font-mono text-xs text-foreground/80 leading-relaxed max-w-3xl">
                    {selectedCert.description}
                  </p>
                </div>
                <div className="font-mono text-xs text-foreground/50 whitespace-nowrap sm:mt-1">
                  {selectedCert.year}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-foreground/20 bg-background text-foreground hover:bg-foreground hover:text-background transition-all duration-300 shadow-md hover:scale-105 cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
