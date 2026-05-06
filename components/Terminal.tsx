"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { personalData } from "@/lib/data";
import { useTerminalShortcut } from "./useTerminalShortcut";
import MatrixRain from "./MatrixRain";

type Tone = "default" | "muted" | "accent" | "danger";
type Line =
  | { kind: "input"; text: string }
  | { kind: "output"; text: string; tone?: Tone };

const PROMPT = "bryan@portfolio:~$";

const JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "There are 10 types of people: those who understand binary, and those who don't.",
  "A SQL query walks into a bar, walks up to two tables and asks: 'Can I JOIN you?'",
  "How many programmers does it take to change a light bulb? None — that's a hardware problem.",
  "I'd tell you a UDP joke, but you might not get it.",
  "99 little bugs in the code. 99 little bugs. Take one down, patch it around — 117 little bugs in the code.",
  "Real programmers count from 0.",
];

function out(text: string, tone: Tone = "default"): Line {
  return { kind: "output", text, tone };
}

function buildAbout(): Line[] {
  return [
    out("Hi, I'm Bryan Gradi.", "accent"),
    out(
      "Founder @ Gradios · 22 · Londrina, Brazil. Building AI-powered software, automation and digital products for businesses."
    ),
    out(""),
    out("Type 'help' for available commands.", "muted"),
  ];
}

function buildStack(): Line[] {
  const groups: [string, string[]][] = [
    ["languages", personalData.stack.languages],
    ["frontend", personalData.stack.frontend],
    ["backend", personalData.stack.backend],
    ["ai", personalData.stack.ai],
    ["devops", personalData.stack.devops],
  ];
  return groups.flatMap(([label, items]) => [
    out(`▸ ${label.toUpperCase()}`, "accent"),
    out(`  ${items.join(", ")}`),
  ]);
}

function buildProjects(): Line[] {
  return personalData.projects.flatMap((p) => [
    out(`▸ ${p.name}  [${p.status}]`, "accent"),
    out(`  ${p.description}`),
    out(`  ${p.url}`, "muted"),
    out(""),
  ]);
}

function buildExperience(): Line[] {
  return personalData.experiences.flatMap((e) => [
    out(`▸ ${e.role}`, "accent"),
    out(`  ${e.company} · ${e.period}`),
    out(`  ${e.description}`, "muted"),
    out(""),
  ]);
}

function buildContact(): Line[] {
  return [
    out(`email     ${personalData.social.email}`, "accent"),
    out(`linkedin  ${personalData.social.linkedin}`),
    out(`github    ${personalData.social.github}`),
    out(`gradios   ${personalData.social.gradios}`),
  ];
}

function buildHelp(): Line[] {
  const cmds: [string, string][] = [
    ["help", "show this list"],
    ["about", "who is Bryan"],
    ["stack", "tech I use"],
    ["projects", "things I'm building"],
    ["experience", "work history"],
    ["contact", "how to reach me"],
    ["gradios", "about the company"],
    ["matrix", "5 seconds of fun"],
    ["snake", "play hidden snake game"],
    ["joke", "programmer humor (use at your own risk)"],
    ["clear", "wipe the screen"],
    ["exit", "close the terminal"],
  ];
  return cmds.map(([cmd, desc]) =>
    out(`  ${cmd.padEnd(12)}${desc}`, "muted")
  );
}

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Line[]>([]);
  const [matrix, setMatrix] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const banner = useMemo<Line[]>(
    () => [
      out("bryan-portfolio terminal · v1.0.0", "accent"),
      out("(c) 2026 Bryan Gradi · MIT", "muted"),
      out(""),
      ...buildAbout(),
    ],
    []
  );

  useTerminalShortcut(() => {
    setHistory(banner);
    setOpen(true);
  });

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const close = useCallback(() => {
    setOpen(false);
    setInput("");
    setMatrix(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const inputLine: Line = { kind: "input", text: raw };

    if (!cmd) {
      setHistory((h) => [...h, inputLine]);
      return;
    }

    let result: Line[] = [];
    switch (cmd) {
      case "help":
        result = [out(""), out("Available commands:", "accent"), ...buildHelp(), out("")];
        break;
      case "about":
        result = [out(""), ...buildAbout(), out("")];
        break;
      case "stack":
        result = [out(""), ...buildStack(), out("")];
        break;
      case "projects":
        result = [out(""), ...buildProjects()];
        break;
      case "experience":
      case "exp":
        result = [out(""), ...buildExperience()];
        break;
      case "contact":
        result = [out(""), ...buildContact(), out("")];
        break;
      case "gradios":
        result = [
          out(""),
          out("Gradios", "accent"),
          out(personalData.company.description),
          out(`Visit: ${personalData.company.url}`, "muted"),
          out(""),
        ];
        break;
      case "matrix":
        result = [out(""), out("Engaging the matrix...", "accent"), out("")];
        setMatrix(true);
        setTimeout(() => setMatrix(false), 5000);
        break;
      case "snake":
        result = [out(""), out("Loading snake.exe...", "accent"), out("")];
        setTimeout(() => {
          close();
          router.push("/snake");
        }, 800);
        break;
      case "joke": {
        const j = JOKES[Math.floor(Math.random() * JOKES.length)];
        result = [out(""), out(j), out("")];
        break;
      }
      case "clear":
      case "cls":
        setHistory([]);
        return;
      case "exit":
      case "quit":
        close();
        return;
      default:
        result = [
          out(""),
          out(`command not found: ${cmd}`, "danger"),
          out(`type 'help' to see available commands`, "muted"),
          out(""),
        ];
    }

    setHistory((h) => [...h, inputLine, ...result]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    run(input);
    setInput("");
  };

  const toneClass = (tone: Tone | undefined) => {
    switch (tone) {
      case "accent":
        return "text-[var(--accent)]";
      case "muted":
        return "text-[var(--text-muted)]";
      case "danger":
        return "text-[#f87171]";
      default:
        return "text-[#86efac]";
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="terminal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md sm:p-8"
          >
            <motion.div
              key="terminal-window"
              role="dialog"
              aria-modal="true"
              aria-label="Hidden terminal"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-[70vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-[var(--accent)]/40 bg-[rgba(8,11,20,0.96)] shadow-[0_0_80px_-10px_rgba(59,130,246,0.5)]"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(59,130,246,0.04), transparent 40%)",
              }}
            >
              <div className="flex items-center justify-between border-b border-[var(--border)] bg-white/[0.02] px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  {PROMPT}
                </span>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close terminal"
                  className="font-mono text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                >
                  ESC
                </button>
              </div>

              <div
                ref={bodyRef}
                onClick={() => inputRef.current?.focus()}
                className="relative flex-1 overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed sm:text-sm"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, rgba(59,130,246,0.04) 0px, rgba(59,130,246,0.04) 1px, transparent 1px, transparent 3px)",
                  }}
                />

                <div className="relative">
                  {history.map((line, i) =>
                    line.kind === "input" ? (
                      <div key={i} className="flex gap-2 text-[#86efac]">
                        <span className="text-[var(--accent)]">{PROMPT}</span>
                        <span>{line.text}</span>
                      </div>
                    ) : (
                      <div
                        key={i}
                        className={`whitespace-pre-wrap ${toneClass(line.tone)}`}
                      >
                        {line.text || " "}
                      </div>
                    )
                  )}

                  <form onSubmit={onSubmit} className="mt-1 flex items-center gap-2">
                    <span className="text-[var(--accent)]">{PROMPT}</span>
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      autoComplete="off"
                      spellCheck={false}
                      aria-label="Terminal input"
                      className="flex-1 bg-transparent text-[#86efac] caret-[var(--accent)] outline-none"
                    />
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {matrix && <MatrixRain onDone={() => setMatrix(false)} />}
    </>
  );
}
