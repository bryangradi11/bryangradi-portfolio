"use client";

import { motion } from "motion/react";
import { personalData, type Experience } from "@/lib/data";
import { viewportConfig } from "@/lib/animations";

function Item({ exp, index, total }: { exp: Experience; index: number; total: number }) {
  const isLast = index === total - 1;

  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className="relative pl-10 sm:pl-14"
    >
      <span
        aria-hidden
        className={`absolute left-[7px] top-3 w-px sm:left-[11px] ${
          isLast ? "h-0" : "bottom-[-2rem] sm:bottom-[-2.5rem]"
        }`}
        style={{
          background:
            "linear-gradient(to bottom, rgba(59,130,246,0.5), rgba(59,130,246,0.05))",
        }}
      />

      <span
        aria-hidden
        className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center sm:left-1"
      >
        {exp.current && (
          <motion.span
            className="absolute h-4 w-4 rounded-full bg-[var(--accent)]"
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <span
          className={`relative h-2.5 w-2.5 rounded-full ${
            exp.current
              ? "bg-[var(--accent)] shadow-[0_0_12px_rgba(59,130,246,0.8)]"
              : "bg-[var(--text-muted)] ring-2 ring-[var(--bg-primary)]"
          }`}
        />
      </span>

      <div className="rounded-xl border border-[var(--border)] bg-white/[0.015] p-5 transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.03] sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-[var(--text-primary)] sm:text-lg">
              {exp.role}
            </h3>
            {exp.tag && (
              <span className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-[var(--accent)]">
                {exp.tag}
              </span>
            )}
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
            {exp.period}
          </span>
        </div>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">{exp.company}</p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
          {exp.description}
        </p>
      </div>
    </motion.li>
  );
}

export default function Timeline() {
  return (
    <motion.ol
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      }}
      className="relative flex flex-col gap-8 sm:gap-10"
    >
      {personalData.experiences.map((exp, i) => (
        <Item
          key={`${exp.company}-${exp.period}`}
          exp={exp}
          index={i}
          total={personalData.experiences.length}
        />
      ))}
    </motion.ol>
  );
}
