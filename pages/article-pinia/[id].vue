<template>
  <div v-if="article && !('error' in article)">
    <h1>{{ article.title }}</h1>
    <h2 class="articleId">{{ article.id }}</h2>
    <p><strong>Author:</strong> {{ article.author }}</p>
    <p><strong>Published:</strong> {{ article.publishedAt }}</p>
    <div>{{ article.content }}</div>
  </div>
  <div v-else>
    <h2 class="articleId">ERROR</h2>
    <p>Loading or article not found.</p>
  </div>
</template>

<script setup lang="ts">
import { useArticleStore } from '~/store/articlestore'
import type { Article } from '../../types/article'
definePageMeta({
  middleware: 'article-pinia',
})

const articleStore = useArticleStore()
const article = computed<Article | { error: string } | null>(() => articleStore.currentArticle)
if (import.meta.server) {
  // Simulate delay to test SSR behavior
  await new Promise((resolve) => setTimeout(resolve, 100)) // 500ms delay
}

console.log('Article Pinia page, article:', article?.value)
</script>
