import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Article } from '../types/article'

type ArticleState = Article | { error: string } | null

export const useArticleStore = defineStore('article', () => {
  const currentArticle = ref<ArticleState>(null)

  function setCurrentArticle(article: ArticleState) {
    currentArticle.value = article
  }

  function clearCurrentArticle() {
    currentArticle.value = null
  }

  return {
    currentArticle,
    setCurrentArticle,
    clearCurrentArticle,
  }
})
