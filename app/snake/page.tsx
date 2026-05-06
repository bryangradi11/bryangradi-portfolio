import type { Metadata } from "next";
import Link from "next/link";
import Background from "@/components/Background";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SnakeGame from "@/components/snake/SnakeGame";

export const metadata: Metadata = {
  title: "Snake",
  description: "Modern Snake game built with TypeScript and Canvas API.",
  alternates: { canonical: "/snake" },
};

export default function SnakePage() {
  return (
    <>
      <Background />
      <Navbar />
      <main className="relative pt-28 pb-20 md:pt-36 md:pb-32">
        <section className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-6 md:px-20">
          <header className="flex flex-col gap-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
              04 · Game
            </span>

            <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-light leading-[1] tracking-[-0.04em] text-[var(--text-primary)]">
              Snake<span className="text-[var(--accent)]">.</span>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              A classic, reimagined with Canvas and TypeScript.
            </p>

            <div className="h-px w-[60px] bg-[var(--accent)]" />

            <Link
              href="/"
              className="inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)]"
            >
              <span aria-hidden>←</span>
              back to portfolio
            </Link>
          </header>

          <div className="flex w-full justify-center">
            <SnakeGame />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
