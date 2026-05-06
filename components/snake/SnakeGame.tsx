"use client";

import { AnimatePresence } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  SNAKE_COLORS,
  SNAKE_CONFIG,
  SNAKE_HIGHSCORE_KEY,
} from "@/lib/snake/constants";
import {
  type Direction,
  type Position,
  checkSelfCollision,
  checkWallCollision,
  generateFood,
  growSnake,
  isOppositeDirection,
  isSamePosition,
  moveSnake,
} from "@/lib/snake/gameLogic";
import SnakeGameOver from "./SnakeGameOver";
import SnakeScoreBoard from "./SnakeScoreBoard";

const KEY_TO_DIRECTION: Record<string, Direction> = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  W: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  S: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  A: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
  D: { x: 1, y: 0 },
};

const TOUCH_DIRECTIONS: { label: string; dir: Direction; aria: string }[] = [
  { label: "↑", dir: { x: 0, y: -1 }, aria: "Move up" },
  { label: "←", dir: { x: -1, y: 0 }, aria: "Move left" },
  { label: "↓", dir: { x: 0, y: 1 }, aria: "Move down" },
  { label: "→", dir: { x: 1, y: 0 }, aria: "Move right" },
];

function cloneInitialSnake(): Position[] {
  return SNAKE_CONFIG.INITIAL_SNAKE.map((p) => ({ ...p }));
}

function cloneInitialDirection(): Direction {
  return { ...SNAKE_CONFIG.INITIAL_DIRECTION };
}

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [snake, setSnake] = useState<Position[]>(cloneInitialSnake);
  const [direction, setDirection] = useState<Direction>(cloneInitialDirection);
  const [food, setFood] = useState<Position>(() =>
    generateFood(cloneInitialSnake(), SNAKE_CONFIG.GRID_SIZE),
  );
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [canvasSize, setCanvasSize] = useState(
    SNAKE_CONFIG.GRID_SIZE * SNAKE_CONFIG.CELL_SIZE,
  );

  const directionRef = useRef(direction);
  const queuedDirectionRef = useRef<Direction | null>(null);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(SNAKE_HIGHSCORE_KEY);
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!Number.isNaN(parsed)) {
          // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot sync from localStorage on mount
          setHighScore(parsed);
        }
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fullSize = SNAKE_CONFIG.GRID_SIZE * SNAKE_CONFIG.CELL_SIZE;
    const updateSize = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        const target = Math.min(window.innerWidth * 0.92, 400);
        const cellSize = Math.floor(target / SNAKE_CONFIG.GRID_SIZE);
        setCanvasSize(cellSize * SNAKE_CONFIG.GRID_SIZE);
      } else {
        setCanvasSize(fullSize);
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const cellSize = useMemo(
    () => canvasSize / SNAKE_CONFIG.GRID_SIZE,
    [canvasSize],
  );

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = SNAKE_COLORS.canvasBg;
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    ctx.strokeStyle = SNAKE_COLORS.grid;
    ctx.lineWidth = 1;
    for (let i = 1; i < SNAKE_CONFIG.GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvasSize);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvasSize, i * cellSize);
      ctx.stroke();
    }

    ctx.save();
    ctx.shadowBlur = 15;
    ctx.shadowColor = SNAKE_COLORS.foodGlow;
    ctx.fillStyle = SNAKE_COLORS.food;
    const fx = food.x * cellSize + cellSize / 2;
    const fy = food.y * cellSize + cellSize / 2;
    const radius = cellSize / 2 - 3;
    ctx.beginPath();
    ctx.arc(fx, fy, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    snake.forEach((segment, index) => {
      const isHead = index === 0;
      const x = segment.x * cellSize + 1;
      const y = segment.y * cellSize + 1;
      const size = cellSize - 2;
      const opacity = isHead ? 1 : Math.max(0.5, 1 - (index / snake.length) * 0.5);

      ctx.save();
      if (isHead) {
        ctx.shadowBlur = 12;
        ctx.shadowColor = SNAKE_COLORS.snakeHeadGlow;
        ctx.fillStyle = SNAKE_COLORS.snakeHead;
      } else {
        ctx.fillStyle = SNAKE_COLORS.snakeBody;
        ctx.globalAlpha = opacity;
      }
      ctx.beginPath();
      ctx.roundRect(x, y, size, size, 4);
      ctx.fill();
      ctx.restore();
    });
  }, [canvasSize, cellSize, food, snake]);

  useEffect(() => {
    draw();
  }, [draw]);

  const resetGame = useCallback(() => {
    const initial = cloneInitialSnake();
    setSnake(initial);
    setDirection(cloneInitialDirection());
    directionRef.current = cloneInitialDirection();
    queuedDirectionRef.current = null;
    setFood(generateFood(initial, SNAKE_CONFIG.GRID_SIZE));
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setHasStarted(false);
    setIsNewHighScore(false);
  }, []);

  const tryQueueDirection = useCallback((next: Direction) => {
    if (isOppositeDirection(directionRef.current, next)) return;
    if (
      directionRef.current.x === next.x &&
      directionRef.current.y === next.y
    ) {
      return;
    }
    queuedDirectionRef.current = next;
    if (!hasStarted) setHasStarted(true);
  }, [hasStarted]);

  useEffect(() => {
    if (isGameOver || isPaused || !hasStarted) return;

    const interval = window.setInterval(() => {
      const queued = queuedDirectionRef.current;
      let activeDirection = directionRef.current;
      if (queued && !isOppositeDirection(activeDirection, queued)) {
        activeDirection = queued;
        directionRef.current = queued;
        setDirection(queued);
      }
      queuedDirectionRef.current = null;

      const triggerGameOver = (finalScore: number) => {
        setIsGameOver(true);
        setHighScore((prev) => {
          if (finalScore > prev) {
            setIsNewHighScore(true);
            try {
              window.localStorage.setItem(SNAKE_HIGHSCORE_KEY, String(finalScore));
            } catch {
              // localStorage unavailable
            }
            return finalScore;
          }
          return prev;
        });
      };

      setSnake((current) => {
        const head = current[0];
        const nextHead: Position = {
          x: head.x + activeDirection.x,
          y: head.y + activeDirection.y,
        };

        if (checkWallCollision(nextHead, SNAKE_CONFIG.GRID_SIZE)) {
          setScore((s) => {
            triggerGameOver(s);
            return s;
          });
          return current;
        }

        const willEat = isSamePosition(nextHead, food);
        const bodyToCheck = willEat ? current : current.slice(0, -1);
        if (checkSelfCollision(nextHead, bodyToCheck)) {
          setScore((s) => {
            triggerGameOver(s);
            return s;
          });
          return current;
        }

        if (willEat) {
          const grown = growSnake(current, activeDirection);
          setScore((s) => s + 10);
          setFood(generateFood(grown, SNAKE_CONFIG.GRID_SIZE));
          return grown;
        }

        return moveSnake(current, activeDirection);
      });
    }, SNAKE_CONFIG.TICK_SPEED);

    return () => window.clearInterval(interval);
  }, [food, hasStarted, isGameOver, isPaused]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && isGameOver) {
        e.preventDefault();
        resetGame();
        return;
      }
      if (e.key === " ") {
        e.preventDefault();
        if (!isGameOver && hasStarted) setIsPaused((p) => !p);
        return;
      }
      const dir = KEY_TO_DIRECTION[e.key];
      if (dir) {
        e.preventDefault();
        if (isGameOver) return;
        tryQueueDirection(dir);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hasStarted, isGameOver, resetGame, tryQueueDirection]);

  const handleTouchDirection = useCallback(
    (dir: Direction) => {
      if (isGameOver) return;
      tryQueueDirection(dir);
    },
    [isGameOver, tryQueueDirection],
  );

  return (
    <div className="flex w-full flex-col items-center gap-6 md:flex-row md:items-start md:justify-center md:gap-8">
      <SnakeScoreBoard score={score} highScore={highScore} />

      <div className="flex flex-col items-center gap-4">
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--snake-canvas-bg)] shadow-[0_8px_50px_-12px_rgba(59,130,246,0.3)]"
          style={{ width: canvasSize, height: canvasSize }}
        >
          <canvas
            ref={canvasRef}
            width={canvasSize}
            height={canvasSize}
            aria-label="Snake game board"
            className="block"
          />

          {!hasStarted && !isGameOver && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[rgba(6,9,18,0.6)]">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">
                Press any arrow / WASD to start
              </span>
            </div>
          )}

          {isPaused && !isGameOver && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[rgba(6,9,18,0.65)]">
              <span className="font-mono text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
                Paused
              </span>
            </div>
          )}

          <AnimatePresence>
            {isGameOver && (
              <SnakeGameOver
                key="game-over"
                score={score}
                isNewHighScore={isNewHighScore}
                onPlayAgain={resetGame}
              />
            )}
          </AnimatePresence>
        </div>

        <p className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)] md:block">
          ↑↓←→ or WASD · Space to pause
        </p>

        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)] md:hidden">
          Use a desktop for keyboard controls
        </p>

        <div className="grid grid-cols-3 gap-2 md:hidden" aria-label="Touch controls">
          <div />
          <button
            type="button"
            aria-label={TOUCH_DIRECTIONS[0].aria}
            onClick={() => handleTouchDirection(TOUCH_DIRECTIONS[0].dir)}
            className="flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--border)] bg-white/[0.02] font-mono text-lg text-[var(--text-secondary)] active:bg-[var(--accent)]/15"
          >
            ↑
          </button>
          <div />
          <button
            type="button"
            aria-label={TOUCH_DIRECTIONS[1].aria}
            onClick={() => handleTouchDirection(TOUCH_DIRECTIONS[1].dir)}
            className="flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--border)] bg-white/[0.02] font-mono text-lg text-[var(--text-secondary)] active:bg-[var(--accent)]/15"
          >
            ←
          </button>
          <button
            type="button"
            aria-label={TOUCH_DIRECTIONS[2].aria}
            onClick={() => handleTouchDirection(TOUCH_DIRECTIONS[2].dir)}
            className="flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--border)] bg-white/[0.02] font-mono text-lg text-[var(--text-secondary)] active:bg-[var(--accent)]/15"
          >
            ↓
          </button>
          <button
            type="button"
            aria-label={TOUCH_DIRECTIONS[3].aria}
            onClick={() => handleTouchDirection(TOUCH_DIRECTIONS[3].dir)}
            className="flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--border)] bg-white/[0.02] font-mono text-lg text-[var(--text-secondary)] active:bg-[var(--accent)]/15"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
