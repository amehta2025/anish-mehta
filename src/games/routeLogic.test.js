import { describe, expect, it } from 'vitest'
import { makeNetwork, routeCost, shortest, sizeForStreak, step } from './routeLogic.js'

// A tiny hand-made network where we know the right answer:
//
//   0 ---9--- 3        the direct edge 0-3 costs 9,
//   |         |        but going around 0-1-2-3 costs 1 + 1 + 1 = 3
//   1 ---1--- 2
//
const square = {
  nodes: [{}, {}, {}, {}], // positions don't matter for the logic
  edges: [
    { a: 0, b: 3, w: 9 },
    { a: 0, b: 1, w: 1 },
    { a: 1, b: 2, w: 1 },
    { a: 2, b: 3, w: 1 },
  ],
  start: 0,
  end: 3,
}

// A "random" number generator that gives the same sequence every time (for a given seed),
// so randomly generated networks are repeatable in tests.
function seeded(seed) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

describe('Dijkstra: normal use', () => {
  it('finds the cheapest route, even when it has more steps', () => {
    const answer = shortest(square)
    expect(answer.cost).toBe(3)
    expect(answer.path).toEqual([0, 1, 2, 3])
  })

  it('adds up the cost of a route the player builds', () => {
    expect(routeCost(square, [0, 1, 2, 3])).toBe(3)
    expect(routeCost(square, [0, 3])).toBe(9)
  })

  it('lets the player step to a connected node', () => {
    expect(step(square, [0], 1)).toEqual([0, 1])
  })

  it('always produces a solvable puzzle whose answer adds up', () => {
    for (let seed = 1; seed <= 50; seed++) {
      const network = makeNetwork(5, seeded(seed))
      const answer = shortest(network)
      expect(answer.cost).toBeLessThan(Infinity)
      expect(answer.path[0]).toBe(network.start)
      expect(answer.path[answer.path.length - 1]).toBe(network.end)
      expect(routeCost(network, answer.path)).toBe(answer.cost)
    }
  })
})

describe('Dijkstra: edge cases', () => {
  it('costs 0 when the start is already the end', () => {
    const answer = shortest({ ...square, end: 0 })
    expect(answer.cost).toBe(0)
    expect(answer.path).toEqual([0])
  })

  it('reports an infinite cost when the end cannot be reached', () => {
    const cutOff = { ...square, edges: [{ a: 0, b: 1, w: 1 }] }
    expect(shortest(cutOff).cost).toBe(Infinity)
  })

  it('ignores a click on a node that is not connected', () => {
    expect(step(square, [0, 1], 3)).toEqual([0, 1])
  })

  it('rewinds the route when the player clicks a node already on it', () => {
    expect(step(square, [0, 1, 2], 1)).toEqual([0, 1])
  })

  it('stops extending the route once it reaches the end', () => {
    expect(step(square, [0, 3], 2)).toEqual([0, 3])
  })

  it('grows the puzzle as the streak grows', () => {
    expect(sizeForStreak(0)).toBe(4)
    expect(sizeForStreak(2)).toBe(5)
    expect(sizeForStreak(6)).toBe(6)
  })
})