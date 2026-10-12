import { useEffect, useMemo, useRef, useState } from 'react'
import {
  edgeBetween, makeNetwork, neighbours, routeCost, shortest, sizeForStreak, step,
} from './routeLogic.js'

const HIT_RADIUS = 7 // how close (in board units, out of 100) a press must be to count as a node
const SEARCH_SPEED = 110 // demo: ms per node Dijkstra settles
const TRACE_SPEED = 170 // demo: ms per edge of the final path
const HOLD = 2000 // demo: ms to admire the answer before the next network

function loadBest() {
  try {
    return Number(localStorage.getItem('route-best')) || 0
  } catch {
    return 0
  }
}

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

// This component handles input, timing, and drawing. The rules live in routeLogic.js.
export default function Route() {
  const [network, setNetwork] = useState(() => makeNetwork(4))
  const answer = useMemo(() => shortest(network), [network])
  const [route, setRoute] = useState(() => [network.start])
  // Until someone touches the board it plays Dijkstra on loop. `demo` counts
  // animation frames; null means a person is playing.
  const [demo, setDemo] = useState(() => (prefersReducedMotion() ? null : 0))
  const [solved, setSolved] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [streak, setStreak] = useState(0)
  const [best, setBest] = useState(loadBest)
  const boardRef = useRef(null)
  const dragging = useRef(false)

  // Demo loop: settle nodes one by one, trace the cheapest path, hold, new network.
  useEffect(() => {
    if (demo === null) return
    const searched = answer.order.length
    const total = searched + answer.path.length
    const delay = demo < searched ? SEARCH_SPEED : demo < total ? TRACE_SPEED : HOLD
    const timer = setTimeout(() => {
      if (demo < total) {
        setDemo(demo + 1)
      } else {
        const next = makeNetwork(4)
        setNetwork(next)
        setRoute([next.start])
        setDemo(0)
      }
    }, delay)
    return () => clearTimeout(timer)
  }, [demo, answer])

  const loadNetwork = (next) => {
    setNetwork(next)
    setRoute([next.start])
    setSolved(false)
    setRevealed(false)
    setDemo(null)
  }

  // Any real interaction ends the demo and hands over a fresh network.
  const takeOver = () => {
    if (demo === null) return { network, route }
    const next = makeNetwork(4)
    loadNetwork(next)
    return { network: next, route: [next.start] }
  }

  const tryMove = (current, n) => {
    const next = step(current.network, current.route, n)
    setRoute(next)
    const arrived = next[next.length - 1] === current.network.end
    if (arrived && !solved && !revealed && routeCost(current.network, next) === shortest(current.network).cost) {
      setSolved(true)
      const newStreak = streak + 1
      setStreak(newStreak)
      if (newStreak > best) {
        setBest(newStreak)
        try {
          localStorage.setItem('route-best', String(newStreak))
        } catch {
          // storage can be blocked; the game still works
        }
      }
    }
  }

  const next = () => loadNetwork(makeNetwork(sizeForStreak(streak)))

  // Skipping a network you haven't solved ends the streak.
  const skip = () => {
    if (!solved) setStreak(0)
    loadNetwork(makeNetwork(sizeForStreak(solved ? streak : 0)))
  }

  const reveal = () => {
    setRevealed(true)
    setStreak(0)
    setRoute(answer.path)
  }

  const undo = () => setRoute((r) => (r.length > 1 ? r.slice(0, -1) : r))

  // The node under the pointer, if one is close enough.
  const nodeAt = (e, nodes) => {
    const rect = boardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    let found = null
    let closest = HIT_RADIUS
    nodes.forEach((p, i) => {
      const d = Math.hypot(p.x - x, p.y - y)
      if (d < closest) {
        closest = d
        found = i
      }
    })
    return found
  }

  const onPointerDown = (e) => {
    const current = takeOver()
    const n = nodeAt(e, current.network.nodes)
    if (n !== null) tryMove(current, n)
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  // While dragging, only step forward to a neighbour or back one node, never jump.
  const onPointerMove = (e) => {
    if (!dragging.current || demo !== null) return
    const n = nodeAt(e, network.nodes)
    if (n === null || n === route[route.length - 1]) return
    const back = route.length > 1 && n === route[route.length - 2]
    if (back || !route.includes(n)) tryMove({ network, route }, n)
  }

  const onPointerUp = () => {
    dragging.current = false
  }

  // What to draw: in the demo, the nodes Dijkstra has settled and as much of its path as has been traced.
  const searched = demo === null ? 0 : Math.min(demo, answer.order.length)
  const visited = new Set(answer.order.slice(0, searched))
  const shown = demo === null ? route : answer.path.slice(0, Math.max(1, demo - answer.order.length + 1))
  const head = shown[shown.length - 1]
  const arrived = head === network.end
  const playing = demo === null && !arrived && !revealed
  const options = playing ? neighbours(network, head).filter((n) => !route.includes(n)) : []
  const cost = routeCost(network, shown)

  const onRoute = (e) => {
    for (let i = 1; i < shown.length; i++) {
      if (edgeBetween(network, shown[i - 1], shown[i]) === e) return true
    }
    return false
  }

  let status
  if (demo !== null) status = 'Dijkstra is finding the cheapest route. Tap a node to try it yourself.'
  else if (revealed) status = `Dijkstra's route costs ${answer.cost}. Streak reset.`
  else if (solved && arrived) status = `Cheapest route found. Streak ${streak}.`
  else if (arrived) status = `That route costs ${cost}, but the cheapest is ${answer.cost}. Tap a node to backtrack.`
  else if (route.length === 1) status = 'Route from the teal node to the pink one for the lowest total cost.'
  else status = `Cost so far ${cost}. The cheapest route costs ${answer.cost}.`

  return (
    <div className="arcade route">
      <div className="arcade__hud">
        <span className="mono">Route</span>
        <span className="mono">
          Streak <b>{streak}</b> · Best <b>{best}</b>
        </span>
      </div>

      <svg
        ref={boardRef}
        className={solved && arrived ? 'route__board is-solved' : 'route__board'}
        viewBox="0 0 100 100"
        aria-label="Shortest path puzzle"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <defs>
          <linearGradient id="route-glow" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0" stopColor="var(--teal)" />
            <stop offset="1" stopColor="var(--magenta)" />
          </linearGradient>
        </defs>

        {network.edges.map((e, i) => {
          const a = network.nodes[e.a]
          const b = network.nodes[e.b]
          let cls = 'route__edge'
          if (onRoute(e)) cls += ' is-route'
          else if (options.length && (e.a === head || e.b === head)) cls += ' is-option'
          return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={cls} />
        })}

        {network.edges.map((e, i) => {
          const a = network.nodes[e.a]
          const b = network.nodes[e.b]
          const x = (a.x + b.x) / 2
          const y = (a.y + b.y) / 2
          return (
            <g key={i} className={onRoute(e) ? 'route__weight is-route' : 'route__weight'}>
              <circle cx={x} cy={y} r="2.9" />
              <text x={x} y={y}>{e.w}</text>
            </g>
          )
        })}

        {network.nodes.map((p, i) => {
          let cls = 'route__node'
          if (i === network.start) cls += ' is-start'
          else if (i === network.end) cls += ' is-end'
          else if (shown.includes(i)) cls += ' is-route'
          else if (visited.has(i)) cls += ' is-visited'
          const option = options.includes(i)
          return (
            <g key={i}>
              {option && <circle cx={p.x} cy={p.y} r="4.6" className="route__ring" />}
              <circle
                cx={p.x}
                cy={p.y}
                r={i === network.start || i === network.end ? 3.2 : 2.4}
                className={cls}
                tabIndex={option ? 0 : undefined}
                role={option ? 'button' : undefined}
                aria-label={option ? `Go to node, cost ${edgeBetween(network, head, i).w}` : undefined}
                onKeyDown={(ev) => {
                  if (option && (ev.key === 'Enter' || ev.key === ' ')) {
                    ev.preventDefault()
                    tryMove({ network, route }, i)
                  }
                }}
              />
            </g>
          )
        })}
      </svg>

      <div className="route__readout">
        <span className="mono">
          Cost <b>{cost}</b> · Cheapest <b>{demo === null ? answer.cost : '?'}</b>
        </span>
        <span className="route__actions">
          {demo === null && !solved && !revealed && (
            <>
              <button type="button" className="route__btn" onClick={undo} disabled={route.length < 2}>
                Undo
              </button>
              <button type="button" className="route__btn" onClick={reveal}>
                Reveal
              </button>
            </>
          )}
          {demo === null && (
            <button
              type="button"
              className={solved || revealed ? 'route__btn is-next' : 'route__btn'}
              onClick={solved || revealed ? next : skip}
            >
              {solved || revealed ? 'Next ›' : 'Skip'}
            </button>
          )}
        </span>
      </div>

      <p className="route__status" aria-live="polite">{status}</p>
    </div>
  )
}
