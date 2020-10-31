<template>
  <TravelForm :assets="assets" :travels="travels" :articles="articles" :categories="categories" />
</template>

<script>
export default {
  async asyncData({ $axios }) {
    let assets = []
    let travels = []
    let categories = []
    let articles = []
    try {
      const [assetsData, travelsData, articlesData, categoriesData] = await Promise.all([
        $axios.get('/api/assets'),
        $axios.get('/api/travels'),
        $axios.get('/api/articles'),
        $axios.get('/api/categories')
      ])
      assets = assetsData.data
      travels = travelsData.data
      categories = categoriesData.data
      articles = articlesData.data
    } catch (error) {
      console.log(error)
    }
    return {
      assets,
      travels,
      articles,
      categories
    }
  }
}
</script>
