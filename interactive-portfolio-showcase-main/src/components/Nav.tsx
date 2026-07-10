import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

const links = [
  { to: "/", label: "Index" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/projects", label: "Projects" },
  { to: "/certificates", label: "Certificates" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12"
    >
      <Link to="/" className="font-display text-2xl tracking-widest" data-cursor="home">
        D.M. SHARAN<span className="text-ember">®</span>
      </Link>
      <nav className="hidden gap-10 md:flex">
        {links.slice(1).map((l) => (
          <Link
            key={l.to}
            to={l.to}
            data-cursor="visit"
            className="group relative font-mono text-xs uppercase tracking-[0.25em]"
            activeProps={{ className: "text-ember" }}
          >
            {l.label}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-6">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="resume"
          className="rounded-full border border-foreground/30 px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-foreground/90 hover:border-ember hover:text-ember transition-colors"
        >
          Resume
        </a>
        <div className="flex h-9 w-11 flex-col items-end justify-center gap-1.5" data-cursor="menu">
          <span className="h-px w-6 bg-foreground" />
          <span className="h-px w-4 bg-foreground" />
        </div>
      </div>
    </motion.header>
  );
}
