import { defineNuxtRouteMiddleware } from 'nuxt/app'
import { useArticleStore } from '../store/articlestore'
console.log('article middleware loaded')

export default defineNuxtRouteMiddleware(async (to) => {
  if (!to) {
    console.error('Middleware called without route object')
    return
  }
  // Only run for /article/:id routes
  console.log('Middleware article-pinia', to.name, to.params?.id)
  if (to.name === 'article-pinia-id' && to.params?.id) {
    // THIS WORKS:
    // const store = useArticleStore() // Init store before fetch
    try {
      const res = await $fetch(`/api/article?id=${to.params.id}`)
      // THIS DOES NOT WORK:
      const store = useArticleStore() // Init store after fetch
      store.setCurrentArticle(res)
    } catch {
      console.error('Middleware failed to fetch article')
    }
  }
})
