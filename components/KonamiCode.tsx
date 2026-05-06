"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
] as const;

function playRetroChime() {
  if (typeof window === "undefined") return;
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctx) return;
  try {
    const ctx = new Ctx();
    const notes = [523.25, 659.25, 783.99, 1046.5];
    const noteDuration = 0.12;
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = freq;
      const start = ctx.currentTime + i * noteDuration;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.18, start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, start + noteDuration);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + noteDuration + 0.02);
    });
    setTimeout(() => ctx.close().catch(() => {}), 1500);
  } catch {
    // ignore — audio is best-effort
  }
}

export default function KonamiCode() {
  const [active, setActive] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      const expected = SEQUENCE[indexRef.current];
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === expected) {
        indexRef.current += 1;
        if (indexRef.current === SEQUENCE.length) {
          indexRef.current = 0;
          setActive((prev) => !prev);
          setShowToast(true);
          playRetroChime();
        }
      } else {
        indexRef.current = key === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("retro-mode", active);
    return () => {
      document.body.classList.remove("retro-mode");
    };
  }, [active]);

  useEffect(() => {
    if (!showToast) return;
    const t = setTimeout(() => setShowToast(false), 2400);
    return () => clearTimeout(t);
  }, [showToast]);

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          key="konami-toast"
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none fixed right-6 top-20 z-[10000] flex items-center gap-3 rounded-full border border-[var(--accent)]/40 bg-[rgba(10,14,26,0.85)] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)] shadow-[0_0_40px_-8px_rgba(59,130,246,0.6)] backdrop-blur-xl"
        >
          <span aria-hidden>🎮</span>
          <span>{active ? "Retro mode activated" : "Retro mode off"}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
