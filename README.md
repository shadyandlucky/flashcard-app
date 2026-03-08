# Spanish Flashcards App

A React + Vite + TypeScript app for learning Spanish vocabulary with study and quiz modes.

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open http://localhost:5173

## E2E Tests (Playwright)

Install browsers into the project (once):

```bash
npm run test:e2e:install
```

Run tests (starts the dev server automatically if needed):

```bash
npm run test:e2e
```

Or with UI:

```bash
npm run test:e2e:ui
```

Ensure nothing else is using port 5173, or run `npm run dev` in another terminal and the tests will reuse it.
