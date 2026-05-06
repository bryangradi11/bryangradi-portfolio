"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { personalData } from "@/lib/data";

const links = [
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "border-b border-[var(--border)] bg-[rgba(10,14,26,0.7)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-6 md:px-20">
        <a
          href="#home"
          onClick={closeMenu}
          aria-label="Bryan Gradi — back to top"
          className="font-mono text-sm font-bold tracking-tight text-[var(--text-primary)] transition-opacity hover:opacity-80"
        >
          BG
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${personalData.social.email}`}
          className="hidden rounded-full border border-[var(--border)] bg-white/[0.02] px-4 py-2 text-xs font-medium text-[var(--text-secondary)] backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.04] hover:text-[var(--text-primary)] md:inline-flex"
        >
          Get in touch
        </a>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-white/[0.02] md:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          <span
            className={`absolute h-px w-5 bg-[var(--text-primary)] transition-transform duration-300 ${
              open ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`absolute h-px w-5 bg-[var(--text-primary)] transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-px w-5 bg-[var(--text-primary)] transition-transform duration-300 ${
              open ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-16 border-b border-[var(--border)] bg-[rgba(10,14,26,0.95)] backdrop-blur-xl md:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05 } },
              }}
              className="flex flex-col gap-1 px-6 py-6"
            >
              {links.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block py-2 text-base text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="mt-4"
              >
                <a
                  href={`mailto:${personalData.social.email}`}
                  onClick={closeMenu}
                  className="inline-flex rounded-full border border-[var(--border)] bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)]"
                >
                  Get in touch
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
