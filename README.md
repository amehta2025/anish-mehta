# anish-mehta

Hey, I'm Anish. This is my personal website.

**Live:** https://anish-mehta.vercel.app

It has a bit about me, my experience, some projects, and **Route**: a little puzzle in the hero where you try to find the cheapest path through a network before Dijkstra's algorithm does. Leave it alone and it plays itself.

## Built with

- React + Vite
- Vitest for tests
- GitHub Actions for CI
- Vercel for hosting

## Run it locally

You'll need Node 20+.

```bash
git clone https://github.com/amehta2025/anish-mehta.git
cd anish-mehta
npm install
npm run dev
```

Then open http://localhost:5173.

## Tests

```bash
npm test
```

The tests live in `src/games/routeLogic.test.js` and check the puzzle's logic:

- **Normal use:** Dijkstra finds the cheapest route (even when it has more steps), route costs add up, and 50 randomly generated puzzles are all solvable.
- **Edge cases:** start equals end, the end can't be reached, clicking a node that isn't connected, clicking backward to rewind, and trying to keep going after reaching the end.

## How deploys work

1. Make changes on a branch and open a pull request.
2. GitHub Actions runs lint, tests, and a build on the PR (`.github/workflows/ci.yml`).
3. `main` is protected: a PR can't be merged until those checks pass.
4. Once merged, Vercel automatically deploys `main` to the live site.

So nothing reaches the live site without passing the tests.

## AI use

I built this with Claude (Anthropic) as a coding partner. It helped write the components, the game, the styling, the tests, and the CI setup, and explained concepts along the way. I decided what the site should be and what goes on it, reviewed and edited the code, and set up the repo, branch protection, CI, and Vercel deployment myself.

## Limitations

- The tests cover the puzzle's logic, not the visuals. There are no browser tests, so a layout or click bug wouldn't be caught automatically.
- Your best streak is saved in your own browser only; there's no shared leaderboard.
- AI-written code can look right and still be wrong. The tests and my own review are the check on that, but they don't cover everything.
