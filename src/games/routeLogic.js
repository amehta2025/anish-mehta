// The rules of Route as plain functions: no React, no SVG.
// A network is a set of nodes joined by weighted edges. The player builds a
// route from `start` to `end`; it's solved when its cost matches Dijkstra's.
// `rand` can be swapped out in tests so the same network comes back every time.

// Bigger networks as the streak grows.
export function sizeForStreak(streak) {
  if (streak >= 6) return 6
  if (streak >= 2) return 5
  return 4
}

// Lays nodes out on a jittered size x size grid inside a 100 x 100 box.
// Edges join grid neighbours plus at most one diagonal per cell, so no two edges cross.
export function makeNetwork(size, rand = Math.random) {
  const step = 80 / (size - 1)
  const id = (r, c) => r * size + c
  const nodes = []
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      nodes.push({
        x: 10 + c * step + (rand() - 0.5) * step * 0.4,
        y: 10 + r * step + (rand() - 0.5) * step * 0.4,
      })
    }
  }

  let edges = []
  const add = (a, b) => edges.push({ a, b, w: 1 + Math.floor(rand() * 9) })
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (c + 1 < size) add(id(r, c), id(r, c + 1))
      if (r + 1 < size) add(id(r, c), id(r + 1, c))
      if (r + 1 < size && c + 1 < size && rand() < 0.5) {
        if (rand() < 0.5) add(id(r, c), id(r + 1, c + 1))
        else add(id(r, c + 1), id(r + 1, c))
      }
    }
  }

  // Thin it out so it looks like a network rather than a mesh, without
  // ever cutting a node off from the rest.
  for (const edge of shuffle([...edges], rand)) {
    if (rand() < 0.35) {
      const without = edges.filter((e) => e !== edge)
      if (isConnected(nodes.length, without)) edges = without
    }
  }

  const start = id(Math.floor(rand() * size), 0)
  const end = id(Math.floor(rand() * size), size - 1)
  return { nodes, edges, start, end }
}

function shuffle(list, rand) {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[list[i], list[j]] = [list[j], list[i]]
  }
  return list
}

function isConnected(count, edges) {
  const seen = new Set([0])
  const stack = [0]
  while (stack.length) {
    const n = stack.pop()
    for (const e of edges) {
      const other = e.a === n ? e.b : e.b === n ? e.a : null
      if (other !== null && !seen.has(other)) {
        seen.add(other)
        stack.push(other)
      }
    }
  }
  return seen.size === count
}

// The edge between two nodes, or undefined if they aren't joined.
export function edgeBetween(network, a, b) {
  return network.edges.find((e) => (e.a === a && e.b === b) || (e.a === b && e.b === a))
}

export function neighbours(network, n) {
  return network.edges
    .filter((e) => e.a === n || e.b === n)
    .map((e) => (e.a === n ? e.b : e.a))
}

export function routeCost(network, route) {
  let cost = 0
  for (let i = 1; i < route.length; i++) cost += edgeBetween(network, route[i - 1], route[i]).w
  return cost
}

// Returns the route with `n` added, rewound to `n` if it's already on the route,
// or unchanged if `n` isn't next to the current end.
export function step(network, route, n) {
  const at = route.indexOf(n)
  if (at >= 0) return route.slice(0, at + 1)
  if (route[route.length - 1] === network.end) return route
  if (!edgeBetween(network, route[route.length - 1], n)) return route
  return [...route, n]
}

// Dijkstra from start. `order` is the order nodes were settled in, which the
// demo animates; `path` is one cheapest route to the end.
export function shortest(network) {
  const count = network.nodes.length
  const dist = Array(count).fill(Infinity)
  const prev = Array(count).fill(null)
  const done = Array(count).fill(false)
  const order = []
  dist[network.start] = 0

  for (let k = 0; k < count; k++) {
    let n = -1
    for (let i = 0; i < count; i++) if (!done[i] && (n < 0 || dist[i] < dist[n])) n = i
    done[n] = true
    order.push(n)
    if (n === network.end) break
    for (const m of neighbours(network, n)) {
      const d = dist[n] + edgeBetween(network, n, m).w
      if (d < dist[m]) {
        dist[m] = d
        prev[m] = n
      }
    }
  }

  const path = []
  for (let n = network.end; n !== null; n = prev[n]) path.unshift(n)
  return { cost: dist[network.end], path, order }
}
