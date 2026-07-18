import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

const links = [
  { to: "/", label: "Index" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/projects", label: "Projects" },
  { to: "/certificates", label: "Certificates" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12"
      >
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="font-display text-2xl tracking-widest relative z-50"
          data-cursor="home"
        >
          D.M. SHARAN<span className="text-ember">®</span>
        </Link>
        <nav className="hidden gap-10 md:flex">
          {links.slice(1).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-cursor="visit"
              className="group relative font-mono text-xs uppercase tracking-[0.25em] hover:text-[#4A9EFF] transition-colors duration-300"
              activeProps={{ className: "text-neon-blue" }}
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full group-hover:bg-[#4A9EFF]" />
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-6">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="resume"
            className="rounded-full border border-foreground/30 px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-foreground/90 hover:border-ember hover:text-ember transition-colors relative z-50"
          >
            Resume
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-11 flex-col items-end justify-center gap-1.5 relative z-50 focus:outline-none cursor-pointer group"
            data-cursor="menu"
            aria-label="Toggle menu"
          >
            <span
              className={`h-px bg-foreground transition-all duration-300 ${isOpen ? "w-6 rotate-45 translate-y-1.5" : "w-6 group-hover:w-4"}`}
            />
            <span
              className={`h-px bg-foreground transition-all duration-300 ${isOpen ? "w-6 -rotate-45 -translate-y-1" : "w-4 group-hover:w-6"}`}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile/Overlay Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-background/98 backdrop-blur-xl px-8 sm:px-16"
          >
            <nav className="flex flex-col gap-6">
              {links.map((l, index) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.05, duration: 0.4 }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setIsOpen(false)}
                    className="font-display text-4xl sm:text-6xl uppercase tracking-widest text-foreground hover:text-[#4A9EFF] active:text-[#4A9EFF] transition-colors block py-2 select-none"
                    activeProps={{ className: "text-neon-blue" }}
                  >
                    {l.label === "Index" ? "Home" : l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
