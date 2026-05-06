"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { personalData } from "@/lib/data";
import { fadeInUp, stagger, viewportConfig } from "@/lib/animations";

const socials = [
  { label: "LinkedIn", href: personalData.social.linkedin },
  { label: "GitHub", href: personalData.social.github },
  { label: "Gradios", href: personalData.social.gradios },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleEmailClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(personalData.social.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {
        // fall back to mailto
      }
      window.location.href = `mailto:${personalData.social.email}`;
    }
  };

  return (
    <section
      id="contact"
      className="relative flex w-full items-center px-6 py-24 md:min-h-[80vh] md:px-20 md:py-32"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={stagger}
          className="flex flex-col items-start gap-6"
        >
          <motion.span
            variants={fadeInUp}
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]"
          >
            04 · Contact
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="max-w-3xl text-[clamp(2.25rem,7vw,5.5rem)] font-light leading-[0.98] tracking-[-0.04em] text-[var(--text-primary)]"
          >
            Let&apos;s build{" "}
            <span className="font-semibold">something.</span>
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

          <motion.p
            variants={fadeInUp}
            className="max-w-xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg"
          >
            Open to opportunities, partnerships, and conversations about tech.
          </motion.p>

          <motion.div variants={fadeInUp} className="relative mt-4 w-full max-w-2xl">
            <motion.a
              href={`mailto:${personalData.social.email}`}
              onClick={handleEmailClick}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-white/[0.02] px-6 py-6 text-left backdrop-blur-sm transition-colors duration-300 hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/[0.05] hover:shadow-[0_0_60px_-10px_rgba(59,130,246,0.4)] sm:px-8 sm:py-7"
            >
              <span className="break-all text-lg font-medium text-[var(--text-primary)] sm:text-2xl">
                {personalData.social.email}
              </span>
              <span
                aria-hidden
                className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent)] sm:inline"
              >
                copy / send →
              </span>
            </motion.a>

            <AnimatePresence>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute -top-7 left-2 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]"
                >
                  Copied
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.ul
            variants={fadeInUp}
            className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3"
          >
            {socials.map((s) => (
              <li key={s.label}>
                <motion.a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/[0.02] px-5 py-2.5 text-sm text-[var(--text-secondary)] backdrop-blur-sm transition-colors duration-300 hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/[0.08] hover:text-[var(--text-primary)] hover:shadow-[0_0_24px_rgba(59,130,246,0.25)]"
                >
                  {s.label}
                  <span aria-hidden className="text-[var(--text-muted)]">
                    ↗
                  </span>
                </motion.a>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
