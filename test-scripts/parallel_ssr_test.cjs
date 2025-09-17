// Parallel SSR test for Nuxt articles using Node.js
const articleIds = [1, 2, 3, 1, 3, 2, 3, 2, 1, 2, 1, 3, 2, 3, 1, 1, 2, 2, 3, 3]
// const articleIds = [1, 2, 3]
const urlBase = 'http://localhost:3000/article'
const urlBasePinia = 'http://localhost:3000/article-pinia'

async function fetchHtml(url) {
  const res = await fetch(url)
  return await res.text()
}

async function testSSRParallel() {
  const requests = articleIds.map((id) => fetchHtml(`${urlBase}/${id}`))
  const responses = await Promise.all(requests)
  responses.forEach((html, idx) => {
    const id = articleIds[idx]
    const match = html.match(/<h2 class="articleId">(\d+)<\/h2>/)
    const errorMatch = html.match(/<h2 class="articleId">ERROR<\/h2>/)
    const returnedId = match ? match[1] : errorMatch ? 'ERROR' : 'N/A'
    if (html.includes(`<h2 class="articleId">${id}</h2>`)) {
      console.log(`[PASS] "useState" Article ${id} SSR HTML contains correct id.`)
    } else if (errorMatch) {
      console.log(`[FAIL] "useState" Article ${id} SSR HTML rendered ERROR.`)
    } else {
      console.log(`[FAIL] "useState" Article ${id} SSR HTML does NOT contain correct id! Returned id: ${returnedId}`)
    }
  })
}

async function testSSRParallelPinia() {
  const requests = articleIds.map((id) => fetchHtml(`${urlBasePinia}/${id}`))
  const responses = await Promise.all(requests)
  responses.forEach((html, idx) => {
    const id = articleIds[idx]
    const match = html.match(/<h2 class="articleId">(\d+)<\/h2>/)
    const errorMatch = html.match(/<h2 class="articleId">ERROR<\/h2>/)
    const returnedId = match ? match[1] : errorMatch ? 'ERROR' : 'N/A'
    if (html.includes(`<h2 class="articleId">${id}</h2>`)) {
      console.log(`[PASS] "Pinia" Article ${id} SSR HTML contains correct id.`)
    } else if (errorMatch) {
      console.log(`[FAIL] "Pinia" Article ${id} SSR HTML rendered ERROR.`)
    } else {
      console.log(`[FAIL] "Pinia" Article ${id} SSR HTML does NOT contain correct id! Returned id: ${returnedId}`)
    }
  })
}

const args = process.argv.slice(2)
const runUseState = args.includes('--usestate')
const runPinia = args.includes('--pinia')

async function runTestsLoop() {
  let aborted = false
  process.stdin.setRawMode(true)
  process.stdin.resume()
  process.stdin.on('data', () => {
    aborted = true
  })
  console.log('Press any key to abort the test loop...')
  while (!aborted) {
    if (runUseState || (!runUseState && !runPinia)) {
      await testSSRParallel().catch(console.error)
    }
    if (runPinia || (!runUseState && !runPinia)) {
      await testSSRParallelPinia().catch(console.error)
    }
    await new Promise((resolve) => setTimeout(resolve, 500)) // 500ms delay between runs
  }
  process.stdin.setRawMode(false)
  process.stdin.pause()
  console.log('Test loop aborted by user.')
}

runTestsLoop()
