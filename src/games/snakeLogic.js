// The rules of Snake as plain functions: no React, no canvas, no timers.
// Same input -> same output, which makes them easy to test.

export const GRID = 20

export const DIRS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}

// Picks a random empty cell for the food. `rand` can be swapped out in tests.
export function randomFood(snake, rand = Math.random) {
  const free = []
  for (let x = 0; x < GRID; x++) {
    for (let y = 0; y < GRID; y++) {
      if (!snake.some((s) => s.x === x && s.y === y)) free.push({ x, y })
    }
  }
  return free[Math.floor(rand() * free.length)] ?? null
}

export function newGame(rand = Math.random) {
  const snake = [{ x: 8, y: 10 }, { x: 7, y: 10 }, { x: 6, y: 10 }]
  return { snake, dir: DIRS.right, food: randomFood(snake, rand), score: 0, over: false }
}

// You can't reverse straight into yourself; that request is ignored.
export function changeDirection(current, requested) {
  if (requested.x === -current.x && requested.y === -current.y) return current
  return requested
}

// Moves the game forward one tick and returns a NEW state.
export function step(state, rand = Math.random) {
  if (state.over) return state

  const head = { x: state.snake[0].x + state.dir.x, y: state.snake[0].y + state.dir.y }
  const ate = state.food && head.x === state.food.x && head.y === state.food.y

  // If we're not eating, the tail moves away this tick, so it can't be hit.
  const body = ate ? state.snake : state.snake.slice(0, -1)
  const hitWall = head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID
  const hitSelf = body.some((s) => s.x === head.x && s.y === head.y)
  if (hitWall || hitSelf) return { ...state, over: true }

  const snake = [head, ...body]
  return {
    ...state,
    snake,
    food: ate ? randomFood(snake, rand) : state.food,
    score: ate ? state.score + 1 : state.score,
  }
}