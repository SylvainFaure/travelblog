<template>
  <TravelForm
    :assets="assets"
    :travels="travels"
    :articles="articles"
    :categories="categories"
    :anecdotes="anecdotes"
  />
</template>

<script>
export default {
  async asyncData({ $axios }) {
    let assets = []
    let travels = []
    let categories = []
    let articles = []
    let anecdotes = []
    try {
      const [assetsData, travelsData, articlesData, categoriesData, anecdotesData] = await Promise.all([
        $axios.get('/api/assets'),
        $axios.get('/api/travels'),
        $axios.get('/api/articles'),
        $axios.get('/api/categories'),
        $axios.get('/api/anecdotes')
      ])
      assets = assetsData.data
      travels = travelsData.data
      categories = categoriesData.data
      articles = articlesData.data
      anecdotes = anecdotesData.data
    } catch (error) {
      console.log(error)
    }
    return {
      assets,
      travels,
      articles,
      categories,
      anecdotes
    }
  }
}
</script>
