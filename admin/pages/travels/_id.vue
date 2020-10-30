<template>
  <TravelForm :assets="assets" :travels="travels" :categories="categories" />
</template>

<script>
export default {
  async asyncData({ $axios }) {
    let assets = []
    let travels = []
    let categories = []
    try {
      const [assetsData, travelsData, categoriesData] = await Promise.all([
        $axios.get('/api/assets'),
        $axios.get('/api/travels'),
        $axios.get('/api/categories')
      ])
      assets = assetsData.data
      travels = travelsData.data
      categories = categoriesData.data
    } catch (error) {
      console.log(error)
    }
    return {
      assets,
      travels,
      categories
    }
  }
}
</script>
