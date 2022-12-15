<template>
  <EntityActions save-only @save="saveSettings">
    <div>
      <div class="flex justify-center">
        <div class="w-1/2">
          <ChooseHighlights
            ref="slider"
            :title="$t('highlights.slider_title')"
            type="travel"
            :published="publishedTravels"
            :unpublished="travels"
            :highlighted="model[`slider_${locale}`]"
            class="mr-2"
            @edit="handleEdit"
            @remove="handleRemove('slider', $event)"
          />
        </div>
      </div>
      <div class="py-8">
        <BlockEditor
          ref="homepageDescription"
          :label="$t('homepage.description')"
          :remove-actions="['image', 'playlist']"
          :blocks="model[`desc_${locale}`]"
        />
      </div>
      <div class="py-8 flex justify-center">
        <ChooseHighlights
          ref="highlightsTravels"
          :title="$t('highlights.travel_title')"
          type="travel"
          :published="publishedTravels"
          :unpublished="travels"
          :highlighted="model[`highlighted_travels_${locale}`]"
          class="mr-2"
          @edit="handleEdit"
          @remove="handleRemove('highlighted_travels', $event)"
        />
        <ChooseHighlights
          ref="highlightsArticles"
          :title="$t('highlights.article_title')"
          type="article"
          :published="publishedArticles"
          :unpublished="articles"
          :highlighted="model[`highlighted_articles_${locale}`]"
          class="ml-2"
          @edit="handleEdit"
          @remove="handleRemove('highlighted_articles', $event)"
        />
      </div>
    </div>
  </EntityActions>
</template>

<script>
import { mapState } from 'vuex'
// import { normalizeEntity } from '../utils/functions'
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
    const locale = app.i18n.locale
    const model = {
      [`desc_${locale}`]: settings[`desc_${locale}`],
      [`slider_${locale}`]: settings[`slider_${locale}`].map((id) => {
        return publishedTravels.find((travel) => travel.travel_id === id)
      }),
      [`highlighted_travels_${locale}`]: settings[`highlighted_travels_${locale}`].map((id) => {
        return publishedTravels.find((travel) => travel.travel_id === id)
      }),
      [`highlighted_articles_${locale}`]: settings[`highlighted_articles_${locale}`].map((id) => {
        return publishedArticles.find((article) => article.article_id === id)
      })
    }
    return {
      publishedTravels,
      publishedArticles,
      travels,
      articles,
      settings,
      model,
      locale
    }
  },
  computed: {
    ...mapState(['loading'])
  },
  methods: {
    handleEdit(type, id) {
      window.open(`/${type}s/${id}`, '_blank')
    },
    handleRemove(highlight, { type, id }) {
      const prop = `${highlight}_${this.locale}`
      console.log(highlight, type, id, prop)
      this.$set(
        this.model,
        prop,
        this.model[prop].filter((entity) => entity[`${type}_id`] !== id)
      )
    },
    async saveSettings() {
      const desc = this.$refs.homepageDescription.getBlocks()
      const slider = this.$refs.slider.getSelected()
      const travels = this.$refs.highlightsTravels.getSelected()
      const articles = this.$refs.highlightsArticles.getSelected()

      Object.keys(this.settings).forEach((key) => {
        if (typeof this.settings[key] === 'object') {
          this.settings[key] = JSON.stringify(this.settings[key])
        }
      })

      const payload = {
        ...this.settings,
        [`desc_${this.locale}`]: JSON.stringify(desc),
        [`slider_${this.locale}`]: JSON.stringify(slider.map((t) => t.travel_id)),
        [`highlighted_travels_${this.locale}`]: JSON.stringify(travels.map((t) => t.travel_id)),
        [`highlighted_articles_${this.locale}`]: JSON.stringify(articles.map((a) => a.article_id))
      }
      try {
        const { data } = await this.$axios.put('/api/settings', payload)
        console.debug(data)
        this.$toast.success(this.$t('settings.save.success'))
      } catch (error) {
        console.warn(error)
        this.$toast.error(this.$t('settings.save.error'))
      }
    }
    // async reloadData(type) {
    //   try {
    //     const { data } = await this.$axios.get(`/api/${type}s/published`)
    //     this[`${type === 'article' ? 'publishedArticles' : 'publishedTravels'}`] = data
    //   } catch (error) {
    //     console.warn(error)
    //   }
    // },
    // async handlePublish(type, entity) {
    //   const normalized = normalizeEntity(entity)
    //   try {
    //     await this.$axios.post(`/api/${type}s/published/${entity[`${type}_id`]}`, normalized)
    //     this.reloadData(type)
    //     this.$toast.success(this.$t(`${type}.published.success`))
    //   } catch (error) {
    //     console.warn(error)
    //     this.$toast.error(this.$t(`${type}.published.error`))
    //   }
    // }
  }
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
