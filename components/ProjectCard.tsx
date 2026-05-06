"use client";

import { motion } from "motion/react";
import type { Project } from "@/lib/data";

const statusMeta: Record<Project["status"], { label: string; color: string }> = {
  live: { label: "Live", color: "#22c55e" },
  "in-progress": { label: "In progress", color: "#eab308" },
};

export default function ProjectCard({ project }: { project: Project }) {
  const meta = statusMeta[project.status];

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`group relative flex flex-col justify-between gap-8 overflow-hidden rounded-2xl border border-[var(--border)] bg-white/[0.015] p-6 transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.03] hover:shadow-[0_8px_40px_-12px_rgba(59,130,246,0.25)] sm:p-8 ${
        project.featured ? "md:col-span-2" : ""
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--x,50%) var(--y,0%), rgba(59,130,246,0.07), transparent 40%)",
        }}
      />

      <div className="relative flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            {project.status === "live" && (
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ background: meta.color }}
              />
            )}
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: meta.color }}
            />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
            {meta.label}
          </span>
        </div>

        <h3 className="text-2xl font-semibold leading-tight tracking-tight text-[var(--text-primary)] sm:text-3xl">
          {project.name}
        </h3>

        <p className="max-w-prose text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
          {project.description}
        </p>
      </div>

      <div className="relative flex flex-wrap items-end justify-between gap-4">
        <ul className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-[var(--border)] bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted)]"
            >
              {tag}
            </li>
          ))}
        </ul>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--text-secondary)] transition-colors group-hover:text-[var(--accent)]">
          View
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            →
          </span>
        </span>
      </div>
    </motion.a>
  );
}
