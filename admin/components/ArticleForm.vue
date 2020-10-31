<template>
  <div>
    <EntityActions
      :is-new="isNew"
      :is-published="isPublished"
      @save="saveArticle"
      @publish="saveArticle('publish')"
      @unpublish="saveArticle('unpublish')"
      @remove="openRemoveModal"
    >
      <form v-if="mounted">
        <InputText v-model="model.title" :label="$t('article.title')" />
        <ChooseImage
          :image="model.cover"
          :assets="assets"
          :data="{ travels, articles }"
          :label="$t('article.cover')"
          @change="model.cover = $event"
        />
        <Select
          v-model="model.travel"
          :label="$t('article.travel')"
          :options="travels"
          :option-label="`travel_title_${locale}`"
          @input="getCountries"
        />
        <Select v-model="model.country" :label="$t('article.country')" :options="countries" />
        <InputText v-model="model.place" :label="$t('article.place')" />
        <Datepicker :label="$t('article.dates')" :model="model.dates" @change="model.dates = $event" />
        <InputText v-model="model.slug" :label="$t('article.slug')" />
        <Textarea v-model="model.short_desc" :label="$t('article.short_desc')" />
        <GalleryEditor
          ref="gallery"
          :label="$t('article.gallery')"
          :assets="assets"
          :gallery="model.gallery"
          :picked="model.gallery"
          @gallery-change="handleGalleryChange"
        />
        <BlockEditor
          ref="longDescription"
          :label="$t('travel.long_desc')"
          :addons="['map-description']"
          :blocks="model.long_desc"
          :assets="assets"
        />
      </form>
    </EntityActions>
    <RemoveModal v-if="modalId === 'remove-article'" @confirm="removeArticle" @cancel="closeRemoveModal" />
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import { mapState, mapMutations } from 'vuex'
import { formatOutput, formatInput } from '../utils/entity-formatter'

export default {
  props: {
    assets: VueTypes.array.def([]),
    travels: VueTypes.array.def([]),
    articles: VueTypes.array.def([]),
    article: VueTypes.array.def(null)
  },
  data() {
    return {
      isNew: true,
      isPublished: false,
      mounted: false,
      countries: [],
      model: {
        id: '',
        published: false,
        published_date: '',
        title: '', // inputtext
        cover: null, // image
        travel: null, // select
        country: {}, // select
        place: '', // inputtext
        dates: null, // datepicker
        slug: '', // inputtext
        gallery: [], // gallery
        short_desc: '', // textarea
        long_desc: null // BlockEditor with anecdotes
      }
    }
  },
  computed: {
    ...mapState('modal', ['visible', 'modalId']),
    locale() {
      return this.$i18n.locale
    }
  },
  mounted() {
    this.isNew = this.article && this.article[0] ? !this.article[0].article_id : true
    if (!this.isNew) {
      try {
        const m = formatInput('article', {
          data: this.article[0],
          locale: this.locale,
          otherData: { travels: this.travels, assets: this.assets, articles: this.articles }
        })
        Object.keys(m).forEach((key) => {
          this.model[key] = m[key]
          // if (key === 'country') console.log(this.model[key])
        })
        this.isPublished = this.model.published
        this.getCountries(m.travel, false)
        this.mounted = true
      } catch (error) {
        console.warn(error)
        this.$router.push('/articles')
      }
    } else {
      this.mounted = true
    }
  },
  methods: {
    ...mapMutations('modal', ['setVisible', 'setModalId']),
    getCountries(travel, cleanModel = true) {
      if (cleanModel && this.model.country) {
        this.model.country = null
      }
      const countries = travel[`travel_countries_${this.locale}`]
      this.countries =
        countries && countries.length
          ? countries.map((country) => ({
              key: country.toLowerCase().replace(' ', '_'),
              label: country
            }))
          : []
    },
    handleGalleryChange(gallery) {
      this.model.gallery = gallery
    },
    async reloadData() {
      this.mounted = false
      try {
        const { data } = await this.$axios.get(`/api/articles/${this.$route.params.id}`)
        if (data) {
          const m = formatInput('article', {
            data: this.article[0],
            locale: this.locale,
            otherData: { travels: this.travels, assets: this.assets, articles: this.articles }
          })
          this.model = m
          this.isPublished = this.model.published
          this.mounted = true
        } else {
          this.$router.push('/articles')
        }
      } catch (error) {
        console.warn(error)
        this.$router.push('/articles')
      }
    },
    saveArticle(extra) {
      this.model.long_desc = this.$refs.longDescription.getBlocks()
      this.model.gallery = this.$refs.gallery.getContent()
      const formatted = formatOutput('article', {
        data: this.model,
        otherData: { travels: this.travels, articles: this.articles, assets: this.assets },
        locale: this.locale
      })
      // CANNOT PUBLISH ON A NEWLY CREATED ARTICLE, THAT'S RIGHT LIKE THIS
      if (formatted.article_id) {
        if (extra === 'publish') {
          formatted[`article_published_${this.locale}`] = 1
          formatted[`article_published_date_${this.locale}`] = Date.parse(new Date())
        }
        if (extra === 'unpublish') {
          formatted[`article_published_${this.locale}`] = 0
          formatted[`article_published_date_${this.locale}`] = null
        }
        this.updateArticle(formatted, extra)
      } else {
        this.createArticle(formatted)
      }
    },
    async createArticle(article) {
      try {
        const { data: createdArticle } = await this.$axios.post('/api/articles', article)
        this.$toast.success(this.$t('article.save.success'))
        this.$router.push(`/articles/${createdArticle[0].article_id}`)
      } catch (error) {
        console.warn(error)
        this.$toast.error(this.$t('article.save.error'))
      }
    },
    async updateArticle(article, extra) {
      try {
        await this.$axios.put(`/api/articles/${article.article_id}`, article)
        if (extra === 'publish') {
          this.publishArticle(article)
        } else if (extra === 'unpublish') {
          this.unpublishArticle(article.article_id)
        } else {
          this.$toast.success(this.$t('article.update.success'))
        }
      } catch (error) {
        console.warn(error)
        this.$toast.error(this.$t('article.update.error'))
      } finally {
        this.reloadData()
      }
    },
    async publishArticle(article) {
      try {
        await this.$axios.post(`/api/articles/published/${article.article_id}`, article)
        this.$toast.success(this.$t('article.published.success'))
      } catch (error) {
        console.warn(error)
        this.$toast.error(this.$t('article.published.error'))
      }
    },
    async unpublishArticle(id) {
      try {
        await this.$axios.delete(`/api/articles/published/${id}`)
        this.$toast.success(this.$t('article.unpublished.success'))
      } catch (error) {
        console.warn(error)
        this.$toast.error(this.$t('article.unpublished.error'))
      }
    },
    async removeArticle() {
      try {
        await this.$axios.delete(`/api/articles/${this.model.id}`)
        this.$toast.success(this.$t('article.remove.success'))
        this.closeRemoveModal()
        this.$router.push('/articles')
      } catch (error) {
        console.warn(error)
        this.$toast.error(this.$t('article.remove.error'))
      }
    },
    openRemoveModal() {
      this.setVisible(true)
      this.setModalId('remove-article')
    },
    closeRemoveModal() {
      this.setVisible(false)
      this.setModalId(null)
    }
  }
}
</script>
