# melody-site

My personal site. React + TypeScript, built with Vite, styled with Tailwind CSS.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build into dist/
```

## What's where

- `src/data.ts` — all the content: stack levels, projects, wins, links. Edit this to update the site.
- `src/components/Scope.tsx` — the oscilloscope. Canvas render loop; cursor x maps to pitch (C4–C6), tapping plays the note with the Web Audio API.
- `src/components/Mixer.tsx` — the tech stack as a mixing console, rendered from `STACK` in `data.ts`.
- `src/components/Ticker.tsx` — the scrolling "i also like" lanes.
- `src/index.css` — theme tokens (white / grey / brown / baby pink) for light and dark mode.

## Deploy

Push to GitHub, then import the repo on Vercel (framework preset: Vite). Or run `npm run build` and upload `dist/` anywhere that serves static files.
