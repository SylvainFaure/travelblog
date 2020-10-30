<template>
  <ArticleForm :assets="assets" :travels="travels" :article="article" :articles="articles" />
</template>

<script>
export default {
  async asyncData({ $axios, route }) {
    let assets = []
    let travels = []
    let articles = []
    let article
    try {
      if (route.params.id && route.params.id !== 'new') {
        const articleData = await $axios.get(`/api/articles/${route.params.id}`)
        article = articleData ? articleData.data : null
      }
      const [assetsData, travelsData, articlesData] = await Promise.all([
        $axios.get('/api/assets'),
        $axios.get('/api/travels'),
        $axios.get('/api/articles')
      ])
      assets = assetsData.data
      travels = travelsData.data
      articles = articlesData.data
    } catch (error) {
      console.log(error)
    }
    console.log(article)
    return {
      assets,
      travels,
      article,
      articles
    }
  }
}
</script>
