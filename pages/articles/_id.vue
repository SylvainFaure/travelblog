<template>
  <ArticleForm :assets="assets" :travels="travels" :article="article" :articles="articles" :anecdotes="anecdotes" />
</template>

<script>
export default {
  async asyncData({ $axios, route }) {
    let assets = []
    let travels = []
    let articles = []
    let anecdotes = []
    let article
    try {
      if (route.params.id && route.params.id !== 'new') {
        const articleData = await $axios.get(`/api/articles/${route.params.id}`)
        article = articleData ? articleData.data : null
      }
      const [assetsData, travelsData, articlesData, anecdotesData] = await Promise.all([
        $axios.get('/api/assets'),
        $axios.get('/api/travels'),
        $axios.get('/api/articles'),
        $axios.get('/api/anecdotes')
      ])
      assets = assetsData.data
      travels = travelsData.data
      articles = articlesData.data
      anecdotes = anecdotesData.data
    } catch (error) {
      console.log(error)
    }
    console.log(article)
    return {
      assets,
      travels,
      article,
      articles,
      anecdotes
    }
  }
}
</script>
