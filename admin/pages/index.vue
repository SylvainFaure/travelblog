<template>
  <div class="homepage flex justify-center items-center">
    <div class="mx-16 py-8 w-full h-full">
      <ChooseHighlights
        type="travel"
        :published="publishedTravels"
        :unpublished="travels"
        @edit="handleEdit"
        @publish="handlePublish"
      />
    </div>
    <transition name="fade">
      <Loader v-if="loading" />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  async asyncData({ $axios, app }) {
    const [publishedTravelsData, publishedArticlesData, travelsData, articlesData, settingsData] = await Promise.all([
      $axios.get('/api/travels/published'),
      $axios.get('/api/articles/published'),
      $axios.get('/api/travels'),
      $axios.get('/api/articles'),
      $axios.get('/api/settings')
    ])

    const publishedTravels = publishedTravelsData ? publishedTravelsData.data : []
    const publishedArticles = publishedArticlesData ? publishedArticlesData.data : []
    const travels = travelsData
      ? travelsData.data.filter((travel) => !travel[`travel_published_${app.i18n.locale}`])
      : []
    const articles = articlesData
      ? articlesData.data.filter((article) => !article[`article_published_${app.i18n.locale}`])
      : []
    const settings = settingsData ? settingsData.data : []

    return {
      publishedTravels,
      publishedArticles,
      travels,
      articles,
      settings
    }
  },
  computed: {
    ...mapState(['loading'])
  },
  methods: {
    handleEdit(type, id) {
      window.open(`/${type}s/${id}`, '_blank')
    },
    async reloadData(type) {
      try {
        const { data } = await this.$axios.post(`/api/${type}s/published`)
        this[`${type === 'article' ? 'publishedArticles' : 'publishedTravels'}`] = data
      } catch (error) {
        console.warn(error)
      }
    },
    async handlePublish(type, entity) {
      try {
        await this.$axios.post(`/api/${type}s/published/${entity[`${type}_id`]}`, entity)
        this.reloadData(type)
        this.$toast.success(this.$t(`${type}.published.success`))
      } catch (error) {
        console.warn(error)
        this.$toast.error(this.$t(`${type}.published.error`))
      }
    }
  }
}
</script>

<style lang="scss">
.homepage {
  height: calc(100vh - 72px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
