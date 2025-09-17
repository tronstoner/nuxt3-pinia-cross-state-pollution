import { useState, defineNuxtRouteMiddleware } from 'nuxt/app'
console.log('article middleware loaded')

export default defineNuxtRouteMiddleware(async (to) => {
  if (!to) {
    console.error('Middleware called without route object')
    return
  }
  // Only run for /article/:id routes
  console.log('Middleware article', to.name, to.params?.id)
  if (to.name === 'article-id' && to.params?.id) {
    try {
      const res = await $fetch(`/api/article?id=${to.params.id}`)
      // Use useState
      const currentArticle = useState('currentArticle')
      currentArticle.value = res
    } catch {
      useState('currentArticle').value = { error: 'Failed to fetch article' }
      console.error('Middleware failed to fetch article')
    }
  }
})
