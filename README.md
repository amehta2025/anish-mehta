# anish-mehta

Hey, I'm Anish. This is my personal website.

**Live:** https://anish-mehta.vercel.app

The site is designed like an engineering drawing: a title block across the top (with a live cursor readout), a "Detail A" diagram of what I'm working on now, projects laid out as numbered parts with spec tables (hover one to measure it), and an experience log. It follows your system's light/dark setting (dark mode is a blueprint) and respects reduced-motion preferences.

## Built with

- React + Vite
- IBM Plex Sans / IBM Plex Mono
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

## Editing content

Everything on the page comes from `src/data/content.js`: profile, experience, projects, and contact links. Add a project there and it shows up as a new part, gets its own `#id` anchor, and is checked by the tests.

## Tests

```bash
npm test
```

- `src/data/content.test.js` checks the content file: every project has a unique URL-safe id, a title, blurb, tags, and https links; every job has a role, organization, dates, and summary; there's exactly one valid email link.
- `src/lib/format.test.js` checks the small formatting helpers (cursor coordinates, measurement labels, email/link parsing), including edge cases like negative or huge values.

## How deploys work

1. Make changes on a branch and open a pull request.
2. GitHub Actions runs lint, tests, and a build on the PR (`.github/workflows/ci.yml`).
3. `main` is protected: a PR can't be merged until those checks pass.
4. Once merged, Vercel automatically deploys `main` to the live site.

So nothing reaches the live site without passing the tests.

## AI use

I built this with Claude (Anthropic) as a coding partner. It helped explore design directions, write the components, styling, and tests, and explained concepts along the way. I decided what the site should be and what goes on it, reviewed and edited the code, and set up the repo, branch protection, CI, and Vercel deployment myself.

## Limitations

- The tests cover the content and helper logic, not the visuals. There are no automated browser tests, so a layout bug wouldn't be caught by CI.
- AI-written code can look right and still be wrong. The tests and my own review are the check on that, but they don't cover everything.
