import { useCallback, useEffect, useRef, useState } from 'react'
import { DIRS, GRID, changeDirection, newGame, step } from './snakeLogic.js'

const CELL = 20 // pixels per cell, so the board is 400 x 400
const START_SPEED = 120 // milliseconds per move; lower = faster

const KEYS = {
  ArrowUp: 'up', w: 'up', W: 'up',
  ArrowDown: 'down', s: 'down', S: 'down',
  ArrowLeft: 'left', a: 'left', A: 'left',
  ArrowRight: 'right', d: 'right', D: 'right',
}

function loadBest() {
  try {
    return Number(localStorage.getItem('snake-best')) || 0
  } catch {
    return 0
  }
}

// This component handles input, timing, and drawing.
// The rules themselves live in snakeLogic.js.
export default function Snake() {
  const canvasRef = useRef(null)
  const game = useRef(null) // current game state; changes every tick, so it's a ref, not state
  const nextDir = useRef(DIRS.right)
  const [status, setStatus] = useState('ready') // 'ready' | 'playing' | 'over'
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(loadBest)

  const draw = useCallback(() => {
    const ctx = canvasRef.current.getContext('2d')
    const { snake, food } = game.current
    const size = GRID * CELL

    ctx.fillStyle = '#070912'
    ctx.fillRect(0, 0, size, size)

    // faint grid
    ctx.strokeStyle = 'rgba(45, 226, 201, 0.05)'
    for (let i = 1; i < GRID; i++) {
      ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, size); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0, i * CELL); ctx.lineTo(size, i * CELL); ctx.stroke()
    }

    // food: glowing amber dot
    if (food) {
      ctx.shadowColor = '#ffd166'
      ctx.shadowBlur = 18
      ctx.fillStyle = '#ffd166'
      ctx.beginPath()
      ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 2.8, 0, Math.PI * 2)
      ctx.fill()
    }

    // snake: teal head fading to magenta tail
    snake.forEach((part, i) => {
      const t = i / Math.max(snake.length - 1, 1)
      ctx.shadowBlur = i === 0 ? 20 : 0
      ctx.shadowColor = '#2de2c9'
      ctx.fillStyle = `hsl(${172 + t * 140}, 85%, ${60 - t * 8}%)`
      ctx.beginPath()
      ctx.roundRect(part.x * CELL + 2, part.y * CELL + 2, CELL - 4, CELL - 4, 5)
      ctx.fill()
    })
    ctx.shadowBlur = 0
  }, [])

  // Draw a starting board once, when the component first appears.
  useEffect(() => {
    game.current = newGame()
    draw()
  }, [draw])

  const start = () => {
    game.current = newGame()
    nextDir.current = DIRS.right
    setScore(0)
    setStatus('playing')
  }

  const turn = (name) => {
    nextDir.current = changeDirection(game.current.dir, DIRS[name])
  }

  // Game loop: only runs while playing. Gets a bit faster with every food.
  useEffect(() => {
    if (status !== 'playing') return
    let timer
    const tick = () => {
      game.current = step({ ...game.current, dir: nextDir.current })
      const { score: newScore, over } = game.current
      setScore(newScore)
      draw()
      if (over) {
        setStatus('over')
        setBest((oldBest) => {
          const newBest = Math.max(oldBest, newScore)
          try {
            localStorage.setItem('snake-best', String(newBest))
          } catch {
            // storage can be blocked; the game still works
          }
          return newBest
        })
        return
      }
      timer = setTimeout(tick, Math.max(55, START_SPEED - newScore * 3))
    }
    timer = setTimeout(tick, START_SPEED)
    return () => clearTimeout(timer)
  }, [status, draw])

  // Keyboard controls. preventDefault stops the arrow keys from scrolling the page.
  useEffect(() => {
    if (status !== 'playing') return
    const onKey = (e) => {
      const name = KEYS[e.key]
      if (!name) return
      e.preventDefault()
      nextDir.current = changeDirection(game.current.dir, DIRS[name])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [status])

  // Swipe controls for phones.
  const swipeStart = useRef(null)
  const onPointerDown = (e) => {
    swipeStart.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = (e) => {
    if (!swipeStart.current) return
    const dx = e.clientX - swipeStart.current.x
    const dy = e.clientY - swipeStart.current.y
    swipeStart.current = null
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return // a tap, not a swipe
    if (Math.abs(dx) > Math.abs(dy)) turn(dx > 0 ? 'right' : 'left')
    else turn(dy > 0 ? 'down' : 'up')
  }

  return (
    <div className="arcade">
      <div className="arcade__hud">
        <span className="mono">Snake</span>
        <span className="mono">
          Score <b>{score}</b> · Best <b>{best}</b>
        </span>
      </div>
      <div className="arcade__screen">
        <canvas
          ref={canvasRef}
          width={GRID * CELL}
          height={GRID * CELL}
          className="arcade__canvas"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          aria-label="Snake game board"
        />
        {status !== 'playing' && (
          <div className="arcade__overlay">
            <p className="arcade__title">{status === 'over' ? `Game over · ${score}` : 'Play Snake'}</p>
            <button className="btn btn--primary" type="button" onClick={start}>
              {status === 'over' ? 'Play again' : 'Start'}
            </button>
            <p className="mono">arrow keys / WASD · swipe on phone</p>
          </div>
        )}
      </div>
    </div>
  )
}