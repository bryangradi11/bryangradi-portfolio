import { personalData } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative w-full border-t border-[var(--border)] px-6 py-10 md:px-20">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-3 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
        <span>© {year} {personalData.name}</span>

        <a
          href="https://github.com/bryangradi11/bryangradi-portfolio"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View portfolio source code on GitHub"
          className="font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:text-[var(--text-secondary)]"
        >
          source ↗
        </a>

        <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
          Built in Londrina, Brazil 🇧🇷
        </span>
      </div>
    </footer>
  );
}
