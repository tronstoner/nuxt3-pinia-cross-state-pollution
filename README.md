# Nuxt SSR Parallel Test Suite

This project demonstrates SSR cross-state pollution and race conditions in Nuxt 3, especially when using Pinia for SSR state management.

## Overview

- The app provides two article routes:
  - `/article/[id]` uses `useState` for SSR state
  - `/article-pinia/[id]` uses Pinia store for SSR state
- Both routes fetch article data via a Nuxt server API with random delay to simulate network latency.
- SSR and hydration are tested for correctness and cross-state pollution.

## Important

**The Nuxt dev server must be running at `http://localhost:3000` for SSR tests to work.**
Start it with:

```zsh
npm run dev
```

## Test Scripts

### Node.js Parallel SSR Test

Located in `test-scripts/parallel_ssr_test.cjs` (Node 22+ required for native fetch).

- Runs SSR requests in parallel for both routes and checks SSR HTML for correct article id and error markers.
- Usage:
  ```zsh
  npm run ssrtest:usestate   # Only /article/[id] (useState)
  npm run ssrtest:pinia      # Only /article-pinia/[id] (Pinia)
  npm run ssrtest:all        # Both routes
  ```
- Press any key to abort the test loop.
- Checks for `<h2 class="articleId">{id}</h2>` and `<h2 class="articleId">ERROR</h2>` in SSR HTML.

## Test Cases

- **Normal SSR:** `/article/[id]` route with `useState` should always render the correct id in SSR HTML.
- **Pinia SSR:** `/article-pinia/[id]` route with Pinia store may fail to render the correct id in SSR HTML due to a race condition in the middleware.
- **Error Handling:** If SSR fails, `<h2 class="articleId">ERROR</h2>` is rendered.

## Known Issue: Pinia SSR Race Condition

- The issue lies in the `article-pinia` middleware and how Pinia store is used for SSR state.
- When SSR requests are made in parallel, the Pinia store may not be updated in time, resulting in incorrect or missing SSR HTML.
- This is highlighted by the test scripts, which often show `[FAIL] "Pinia" Article <id> SSR HTML does NOT contain correct id! Returned id: ERROR`.
- The `useState` route does not exhibit this issue.

## Requirements

- Nuxt server running at `http://localhost:3000`
- Node.js 22+ for native fetch in Node test script

## Customization

- Edit `articleIds` array in scripts to change tested ids.
- Change `urlBase` if your server runs on a different port or path.

## Further Reading

- [Nuxt SSR State Management](https://nuxt.com/docs/getting-started/ssr)
- [Pinia Documentation](https://pinia.vuejs.org/)
