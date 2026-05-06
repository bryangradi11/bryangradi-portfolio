import type { Direction, Position } from "./gameLogic";

export const SNAKE_CONFIG = {
  GRID_SIZE: 20,
  CELL_SIZE: 25,
  INITIAL_SNAKE: [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ] as Position[],
  INITIAL_DIRECTION: { x: 1, y: 0 } as Direction,
  TICK_SPEED: 120,
} as const;

export const SNAKE_HIGHSCORE_KEY = "bryangradi-snake-highscore";

export const SNAKE_COLORS = {
  canvasBg: "#060912",
  grid: "rgba(255, 255, 255, 0.03)",
  food: "#f59e0b",
  foodGlow: "rgba(245, 158, 11, 0.5)",
  snakeHead: "#60a5fa",
  snakeHeadGlow: "rgba(59, 130, 246, 0.6)",
  snakeBody: "#3b82f6",
} as const;
