"use client";

import { motion } from "motion/react";
import { personalData } from "@/lib/data";
import { fadeInUp, stagger, viewportConfig } from "@/lib/animations";

const categories: { key: keyof typeof personalData.stack; label: string }[] = [
  { key: "languages", label: "Languages" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "ai", label: "AI / Automation" },
  { key: "devops", label: "DevOps" },
];

export default function Stack() {
  return (
    <section
      id="stack"
      className="relative w-full px-6 py-20 md:px-20 md:py-32"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={stagger}
          className="flex flex-col gap-6"
        >
          <motion.span
            variants={fadeInUp}
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]"
          >
            02 · Stack
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.05] tracking-[-0.03em] text-[var(--text-primary)]"
          >
            Tools I use{" "}
            <span className="font-semibold">to build.</span>
          </motion.h2>

          <motion.div
            variants={{
              hidden: { opacity: 0, scaleX: 0 },
              visible: {
                opacity: 1,
                scaleX: 1,
                transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            style={{ originX: 0 }}
            className="h-px w-[60px] bg-[var(--accent)]"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
          }}
          className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-16 md:grid-cols-5 md:gap-x-8"
        >
          {categories.map(({ key, label }) => (
            <motion.div
              key={key}
              variants={fadeInUp}
              className="flex flex-col gap-4"
            >
              <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
                {label}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {personalData.stack[key].map((tech) => (
                  <li key={tech}>
                    <span className="inline-flex cursor-default rounded-full border border-[var(--border)] bg-white/[0.02] px-3 py-1.5 text-xs text-[var(--text-secondary)] transition-all duration-300 hover:-translate-y-px hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/[0.08] hover:text-[var(--text-primary)] hover:shadow-[0_0_18px_rgba(59,130,246,0.15)]">
                      {tech}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
