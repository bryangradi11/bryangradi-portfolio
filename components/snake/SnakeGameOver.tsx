"use client";

import { motion } from "motion/react";

export default function SnakeGameOver({
  score,
  isNewHighScore,
  onPlayAgain,
}: {
  score: number;
  isNewHighScore: boolean;
  onPlayAgain: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      role="dialog"
      aria-modal="true"
      aria-label="Game over"
      className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 rounded-xl bg-[rgba(10,14,26,0.95)] p-6 backdrop-blur-sm"
    >
      <motion.span
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.05, duration: 0.4 }}
        className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--text-muted)]"
      >
        Game Over
      </motion.span>

      <motion.h2
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-5xl font-semibold tracking-[-0.03em] text-[var(--text-primary)] sm:text-6xl"
      >
        {score.toLocaleString()}
      </motion.h2>

      <motion.span
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent)]"
      >
        Final Score
      </motion.span>

      {isNewHighScore && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: [1, 1.05, 1], opacity: 1 }}
          transition={{
            opacity: { delay: 0.3, duration: 0.4 },
            scale: {
              delay: 0.3,
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="rounded-full border border-[var(--accent)]/40 bg-[var(--accent-glow)] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--accent)]"
        >
          🏆 New High Score
        </motion.div>
      )}

      <motion.button
        type="button"
        onClick={onPlayAgain}
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="mt-2 rounded-full border border-[var(--accent)]/50 bg-[var(--accent)]/10 px-7 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.25em] text-[var(--accent)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)]/20"
      >
        Play Again
      </motion.button>

      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
        or press Enter
      </span>
    </motion.div>
  );
}
