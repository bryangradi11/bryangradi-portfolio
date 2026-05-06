"use client";

export default function SnakeScoreBoard({
  score,
  highScore,
}: {
  score: number;
  highScore: number;
}) {
  return (
    <aside
      aria-label="Snake game score"
      className="flex w-full shrink-0 flex-col gap-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 backdrop-blur-sm md:w-[200px]"
    >
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
          Score
        </span>
        <span className="font-mono text-4xl font-medium tabular-nums text-[var(--text-primary)]">
          {score.toLocaleString()}
        </span>
      </div>

      <div className="h-px w-10 bg-[var(--accent)]" />

      <div className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
          High Score
        </span>
        <span className="font-mono text-2xl tabular-nums text-[var(--text-secondary)]">
          {highScore.toLocaleString()}
        </span>
      </div>
    </aside>
  );
}
