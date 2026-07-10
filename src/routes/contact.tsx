import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import portrait from "@/assets/portrait.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — D.M. SHARAN®" },
      { name: "description", content: "Start a project — let's build something with impact." },
      { property: "og:title", content: "Contact — D.M. SHARAN®" },
      { property: "og:description", content: "Let's build something with impact." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const contactItems = [
    {
      label: "EMAIL",
      value: "dm.sharan123@gmail.com",
      link: "mailto:dm.sharan123@gmail.com",
    },
    {
      label: "GITHUB",
      value: "github.com/sharandm27-eng",
      link: "https://github.com/sharandm27-eng",
    },
    {
      label: "LINKEDIN",
      value: "linkedin.com/in/sharan-d-m-2139563a1",
      link: "https://www.linkedin.com/in/sharan-d-m-2139563a1/",
    },
    {
      label: "BASED IN",
      value: "Bengaluru",
      link: null,
    },
  ];

  return (
    <section className="grain relative flex min-h-screen flex-col justify-between px-6 pb-16 pt-32 md:px-16">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/70">
          05 — Contact
        </p>
        <h1 className="mt-6 font-display text-6xl leading-[0.85] md:text-[9.5rem]">
          <AnimatedHeading text="READY TO" />
          <br />
          <AnimatedHeading text="WORK" delay={0.2} />
          <br />
          <AnimatedHeading text="TOGETHER?" delay={0.4} className="text-ember" />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="mt-6 font-mono text-[13px] leading-relaxed text-foreground/80 max-w-md"
        >
          Got an idea, a project, or just want to talk tech? I'd love to hear from you.
        </motion.p>
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <motion.div
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
          className="mt-16 grid gap-10 border-t border-foreground/20 pt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {contactItems.map((item) => (
            <div key={item.label}>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60">
                {item.label}
              </div>
              <div className="mt-2 font-display text-lg sm:text-xl md:text-2xl break-all">
                {item.link ? (
                  <a
                    href={item.link}
                    target={item.link.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="hover:text-ember transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.0, duration: 0.7, ease: "easeOut" }}
          className="mt-12 flex"
        >
          <a
            href="mailto:dm.sharan123@gmail.com"
            data-cursor="email me"
            className="group flex items-center gap-2 rounded-full bg-foreground px-2 py-2 pr-6 text-[color:var(--ember-deep)] shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--ember-deep)] text-foreground transition-transform group-hover:rotate-90">
              +
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.25em]">Get In Touch</span>
            <span className="ml-2 h-9 w-9 overflow-hidden rounded-full ring-2 ring-[color:var(--ember)]">
              <img
                src={portrait}
                alt=""
                className="h-full w-full scale-[2] object-cover object-top"
              />
            </span>
          </a>
        </motion.div>

        {/* Footer line */}
        <motion.p
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 0.8, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          className="mt-20 font-mono text-[12px] uppercase tracking-[0.25em] text-foreground/80 text-center md:text-left"
        >
          © 2026 D.M. Sharan. Designed & Built with care.
        </motion.p>
      </div>
    </section>
  );
}
