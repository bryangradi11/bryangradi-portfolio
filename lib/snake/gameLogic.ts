export type Position = { x: number; y: number };
export type Direction = { x: number; y: number };

export function moveSnake(snake: Position[], direction: Direction): Position[] {
  const head = snake[0];
  const newHead: Position = { x: head.x + direction.x, y: head.y + direction.y };
  return [newHead, ...snake.slice(0, -1)];
}

export function growSnake(snake: Position[], direction: Direction): Position[] {
  const head = snake[0];
  const newHead: Position = { x: head.x + direction.x, y: head.y + direction.y };
  return [newHead, ...snake];
}

export function checkSelfCollision(head: Position, snake: Position[]): boolean {
  return snake.some((segment) => segment.x === head.x && segment.y === head.y);
}

export function checkWallCollision(head: Position, gridSize: number): boolean {
  return head.x < 0 || head.y < 0 || head.x >= gridSize || head.y >= gridSize;
}

export function generateFood(snake: Position[], gridSize: number): Position {
  const occupied = new Set(snake.map((s) => `${s.x},${s.y}`));
  const free: Position[] = [];
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      if (!occupied.has(`${x},${y}`)) free.push({ x, y });
    }
  }
  if (free.length === 0) return { x: 0, y: 0 };
  return free[Math.floor(Math.random() * free.length)];
}

export function isOppositeDirection(current: Direction, next: Direction): boolean {
  return current.x + next.x === 0 && current.y + next.y === 0;
}

export function isSamePosition(a: Position, b: Position): boolean {
  return a.x === b.x && a.y === b.y;
}
