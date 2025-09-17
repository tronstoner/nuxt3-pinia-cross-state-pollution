export default defineEventHandler(async (event) => {
  const articles = [
    {
      id: 1,
      title: 'Dummy News Article 1',
      content: 'This is the first dummy article.',
      author: 'John Doe',
      publishedAt: '2025-09-11T12:00:00Z',
    },
    {
      id: 2,
      title: 'Dummy News Article 2',
      content: 'This is the second dummy article.',
      author: 'Jane Smith',
      publishedAt: '2025-09-10T15:30:00Z',
    },
    {
      id: 3,
      title: 'Dummy News Article 3',
      content: 'This is the third dummy article.',
      author: 'Alice Brown',
      publishedAt: '2025-09-09T09:45:00Z',
    },
  ]

  const id = Number(getQuery(event).id)
  const article = articles.find((a) => a.id === id)
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 300)) // random delay to simulate network latency
  if (!article) {
    return { error: 'Article not found', status: 404 }
  }
  return article
})
