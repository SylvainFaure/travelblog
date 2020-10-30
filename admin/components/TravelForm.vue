<template>
  <div>
    <EntityActions
      :is-new="isNew"
      :is-published="isPublished"
      @save="saveTravel"
      @publish="saveTravel('publish')"
      @unpublish="saveTravel('unpublish')"
      @remove="openRemoveModal"
    >
      <form v-if="mounted">
        <InputText v-model="model.title" :label="$t('travel.title')" />
        <Select
          v-if="categories"
          v-model="model.category"
          :label="$t('travel.category')"
          :options="categories"
          :option-label="`category_label_${locale}`"
        />
        <ChooseImage :image="model.cover" :assets="assets" :label="$t('travel.cover')" @change="model.cover = $event" />
        <InputTags :label="$t('travel.countries')" :value="model.countries" @change="model.countries = $event" />
        <Datepicker :label="$t('travel.dates')" :model="model.dates" @change="model.dates = $event" />
        <InputTags :label="$t('travel.hashtags')" :value="model.hashtags" @change="model.hashtags = $event" />
        <InputText v-model="model.playlist" :label="$t('travel.playlist')" />
        <InputText v-model="model.slug" :label="$t('travel.slug')" />
        <Textarea v-model="model.short_desc" :label="$t('travel.short_desc')" />
        <BlockEditor
          ref="longDescription"
          :label="$t('travel.long_desc')"
          :addons="['map-description']"
          :blocks="model.long_desc"
          :assets="assets"
        />
      </form>
    </EntityActions>
    <RemoveModal v-if="modalId === 'remove-travel'" @confirm="removeTravel" @cancel="closeRemoveModal" />
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
    categories: VueTypes.array.def([])
  },
  data() {
    return {
      isNew: true,
      isPublished: false,
      mounted: false,
      model: {
        id: '',
        published: false,
        published_date: '',
        title: '', // inputtext
        category: {}, // select category
        cover: null, // image
        countries: [], // inputtags
        dates: [], // datepicker
        hashtags: '', // inputtags
        playlist: '', // inputtext
        slug: '', // inputtext
        short_desc: '', // textarea
        long_desc: '' // BlockEditor with map
      }
    }
  },
  computed: {
    ...mapState('modal', ['visible', 'modalId']),
    locale() {
      return this.$i18n.locale
    }
  },
  async mounted() {
    this.isNew = this.$route.params.id === 'new'
    if (!this.isNew) {
      try {
        const { data } = await this.$axios.get(`/api/travels/${this.$route.params.id}`)
        if (data) {
          const m = formatInput('travel', {
            data: data[0],
            locale: this.locale,
            otherData: { travels: this.travels, assets: this.assets, categories: this.categories }
          })
          this.model = m
          this.isPublished = this.model.published
          this.mounted = true
        } else {
          this.mounted = true
        }
      } catch (error) {
        console.warn(error)
        this.$router.push('/travels')
      }
    } else {
      this.mounted = true
    }
  },
  methods: {
    ...mapMutations('modal', ['setVisible', 'setModalId']),
    async reloadData() {
      this.mounted = false
      try {
        const { data } = await this.$axios.get(`/api/travels/${this.$route.params.id}`)
        if (data) {
          const m = formatInput('travel', {
            data: data[0],
            locale: this.locale,
            otherData: { travels: this.travels, assets: this.assets, categories: this.categories }
          })
          this.model = m
          this.isPublished = this.model.published
          this.mounted = true
        } else {
          this.$router.push('/travels')
        }
      } catch (error) {
        console.warn(error)
        this.$router.push('/travels')
      }
    },
    saveTravel(extra = null) {
      this.model.long_desc = this.$refs.longDescription.getBlocks()
      const formatted = formatOutput('travel', {
        data: this.model,
        otherData: { travels: this.travels, articles: this.articles, assets: this.assets },
        locale: this.locale
      })
      // CANNOT PUBLISH ON A NEWLY CREATED TRAVEL, THAT'S RIGHT LIKE THIS
      if (formatted.travel_id) {
        if (extra === 'publish') {
          formatted[`travel_published_${this.locale}`] = 1
          formatted[`travel_published_date_${this.locale}`] = Date.parse(new Date())
        }
        if (extra === 'unpublish') {
          formatted[`travel_published_${this.locale}`] = 0
          formatted[`travel_published_date_${this.locale}`] = null
        }
        this.updateTravel(formatted, extra)
      } else {
        this.createTravel(formatted)
      }
    },
    async createTravel(travel) {
      try {
        const { data } = await this.$axios.post('/api/travels', travel)
        this.$toast.success(this.$t('travel.save.success'))
        this.$router.push(`/travels/${data[0].travel_id}`)
      } catch (error) {
        this.$toast.error(this.$t('travel.save.error'))
      }
    },
    async updateTravel(travel, extra) {
      try {
        await this.$axios.put(`/api/travels/${travel.travel_id}`, travel)
        if (extra === 'publish') {
          this.publishTravel(travel)
        } else if (extra === 'unpublish') {
          this.unpublishTravel(travel.travel_id)
        } else {
          this.$toast.success(this.$t('travel.update.success'))
        }
      } catch (error) {
        console.log(error)
        this.$toast.error(this.$t('travel.update.error'))
      } finally {
        this.reloadData()
      }
    },
    async publishTravel(travel) {
      try {
        await this.$axios.post(`/api/travels/published/${travel.travel_id}`, travel)
        this.$toast.success(this.$t('travel.published.success'))
      } catch (error) {
        console.warn(error)
        this.$toast.error(this.$t('travel.published.error'))
      }
    },
    async unpublishTravel(id) {
      try {
        await this.$axios.delete(`/api/travels/published/${id}`)
        this.$toast.success(this.$t('travel.unpublished.success'))
      } catch (error) {
        console.warn(error)
        this.$toast.error(this.$t('travel.unpublished.error'))
      }
    },
    async removeTravel() {
      try {
        await this.$axios.delete(`/api/travels/${this.model.id}`)
        this.$toast.success(this.$t('travel.remove.success'))
        this.closeRemoveModal()
        this.$router.push('/travels')
      } catch (error) {
        console.warn(error)
        this.$toast.error(this.$t('travel.remove.error'))
      }
    },
    openRemoveModal() {
      this.setVisible(true)
      this.setModalId('remove-travel')
    },
    closeRemoveModal() {
      this.setVisible(false)
      this.setModalId(null)
    }
  }
}
</script>
