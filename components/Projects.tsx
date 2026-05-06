"use client";

import { motion } from "motion/react";
import { personalData } from "@/lib/data";
import { fadeInUp, stagger, viewportConfig } from "@/lib/animations";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section
      id="projects"
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
            03 · Projects
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.05] tracking-[-0.03em] text-[var(--text-primary)]"
          >
            Things I&apos;m{" "}
            <span className="font-semibold">building.</span>
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
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
          }}
          className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 md:gap-6"
        >
          {personalData.projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
