<template>
  <div v-if="article">
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
import { useState } from 'nuxt/app'
import type { Article } from '../../types/article'
definePageMeta({
  middleware: 'article',
})
const article = useState<Article | null>('currentArticle')
</script>
