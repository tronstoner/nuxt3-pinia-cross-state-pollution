# Parallel SSR Test Scripts

This folder contains scripts to test SSR output for Nuxt article routes in true parallel fashion.

## Scripts

### parallel_ssr_test.cjs

- Node.js script using native `fetch` (Node 22+).
- Runs all requests in parallel and checks SSR HTML for correct article id and error markers.
- Usage:
  ```zsh
  node test-scripts/parallel_ssr_test.cjs           # Runs both useState and Pinia tests in a loop
  node test-scripts/parallel_ssr_test.cjs --usestate # Runs only useState test in a loop
  node test-scripts/parallel_ssr_test.cjs --pinia    # Runs only Pinia test in a loop
  ```
- Press any key to abort the test loop.

### parallel_ssr_test.sh

- Shell script using `curl` and `grep`.
- Runs all requests in parallel and checks SSR HTML for correct article id.
- Usage:
  ```zsh
  zsh test-scripts/parallel_ssr_test.sh
  ```

## Requirements

- Nuxt server must be running at `http://localhost:3000`
- For Node.js script, use Node 22+ for native `fetch`.

## Customization

- Edit `articleIds` array in scripts to change tested ids.
- Change `urlBase` if your server runs on a different port or path.
