"use client";

import { motion } from "motion/react";
import { personalData } from "@/lib/data";
import { fadeInUp, stagger, viewportConfig } from "@/lib/animations";
import Timeline from "./Timeline";

export default function About() {
  return (
    <section
      id="about"
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
            01 · About
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.05] tracking-[-0.03em] text-[var(--text-primary)]"
          >
            Building the future,{" "}
            <span className="font-semibold">one line at a time.</span>
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

          <motion.div
            variants={fadeInUp}
            className="flex max-w-2xl flex-col gap-5 pt-2 text-base leading-relaxed text-[var(--text-secondary)]"
          >
            {personalData.about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </motion.div>
        </motion.div>

        <div className="mt-16 md:mt-24">
          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.5 }}
            className="mb-8 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]"
          >
            Experience
          </motion.h3>
          <Timeline />
        </div>
      </div>
    </section>
  );
}
