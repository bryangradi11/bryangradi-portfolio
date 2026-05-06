"use client";

import { motion } from "motion/react";
import { personalData } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  const [firstName, ...rest] = personalData.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-20">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
          className="flex flex-col items-start gap-8"
        >
          <motion.span
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]"
          >
            Founder · Full-Stack Engineer
          </motion.span>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(3rem,10vw,7.5rem)] font-light leading-[0.95] tracking-[-0.04em] text-[var(--text-primary)]"
          >
            <span className="font-light">{firstName} </span>
            <span className="font-bold">{lastName}</span>
          </motion.h1>

          <motion.div
            variants={{
              hidden: { opacity: 0, scaleX: 0 },
              visible: { opacity: 1, scaleX: 1 },
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
            className="h-px w-[60px] bg-[var(--accent)]"
          />

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg"
          >
            {personalData.tagline}
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white shadow-[0_0_0_0_rgba(59,130,246,0.5)] transition-shadow duration-300 hover:shadow-[0_0_30px_0_rgba(59,130,246,0.4)]"
            >
              View Projects
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                →
              </span>
            </motion.a>

            <motion.a
              href={`mailto:${personalData.social.email}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-white/[0.02] px-6 py-3 text-sm font-medium text-[var(--text-secondary)] backdrop-blur-sm transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.04] hover:text-[var(--text-primary)]"
            >
              Get in touch
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2.4,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
              Scroll to explore
            </span>
            <span className="text-[var(--text-muted)]" aria-hidden>
              ↓
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
