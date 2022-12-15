<template>
  <EntityActions save-only can-remove :is-new="isNew" @save="saveCategory" @remove="openRemoveModal">
    <div v-if="mounted">
      <div class="m-8">
        <InputText v-model="model.name" :label="$t('categories.name')" />
        <InputText v-model="model.label" :label="$t('categories.label')" />
        <ChooseImage
          id="desktop"
          :image="model.asset_desktop"
          :assets="assets"
          :data="{ travels, articles }"
          :label="$t('article.cover_desktop')"
          @change="handleCoverChange($event, 'desktop')"
        />
        <ChooseImage
          id="mobile"
          :image="model.asset_mobile"
          :assets="assets"
          :data="{ travels, articles }"
          :label="$t('article.cover_mobile')"
          @change="handleCoverChange($event, 'mobile')"
        />
      </div>
    </div>
    <RemoveModal v-if="modalId === 'remove-category'" @confirm="removeCategory" @cancel="closeModal" />
  </EntityActions>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  async asyncData({ $axios, route, app }) {
    let assets = []
    let travels = []
    let articles = []
    let category
    try {
      if (route.params.id && route.params.id !== 'new') {
        const categoryData = await $axios.get(`/api/categories/${route.params.id}`)
        category = categoryData ? categoryData.data : null
      }
      const [assetsData, travelsData, articlesData] = await Promise.all([
        $axios.get('/api/assets'),
        $axios.get('/api/travels'),
        $axios.get('/api/articles')
      ])
      assets = assetsData.data
      travels = travelsData.data
      articles = articlesData.data
      const lang = app.i18n.locale
      const model = category
        ? {
            name: category.category_name,
            label: category[`category_label_${lang}`],
            asset_desktop: category[`category_asset_${lang}`]
              ? assets.find((a) => a.asset_id === category[`category_asset_${lang}`])
              : null,
            asset_mobile: category[`category_asset_mobile_${lang}`]
              ? assets.find((a) => a.asset_id === category[`category_asset_mobile_${lang}`])
              : null
          }
        : {
            name: '',
            label: '',
            asset_desktop: null,
            asset_mobile: null
          }
      return {
        category,
        model,
        lang,
        assets,
        travels,
        articles,
        isNew: !category,
        mounted: false
      }
    } catch (error) {
      console.warn(error)
    }
  },
  computed: {
    ...mapState('modal', ['modalId'])
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    ...mapMutations('modal', ['setVisible', 'setModalId']),
    async reloadData() {
      try {
        const { data } = await this.$axios.get(`/api/categories/${this.$route.params.id}`)
        this.category = data
        this.model = {
          name: data.category_name,
          label: data[`category_label_${this.lang}`],
          asset_desktop: data[`category_asset_${this.lang}`],
          asset_mobile: data[`category_asset_mobile_${this.lang}`]
        }
      } catch (error) {
        console.warn(error)
      }
    },
    handleCoverChange(asset, device) {
      this.model[`asset_${device}`] = asset
    },
    openRemoveModal() {
      this.setModalId('remove-category')
      this.setVisible(true)
    },
    async saveCategory() {
      const category = {
        ...this.category,
        category_name: this.model.name,
        [`category_label_${this.lang}`]: this.model.label,
        [`category_asset_${this.lang}`]: this.model.asset_desktop ? this.model.asset_desktop.asset_id : null,
        [`category_asset_mobile_${this.lang}`]: this.model.asset_mobile ? this.model.asset_mobile.asset_id : null
      }
      if (!category.category_id) {
        try {
          const { data } = await this.$axios.post('/api/categories', category)
          this.$toast.success(this.$t('categories.save.success'))
          this.$router.push(`/categories/${data[0].category_id}`)
        } catch (error) {
          this.$toast.error(this.$t('categories.save.error'))
        }
      } else {
        try {
          await this.$axios.put(`/api/categories/${category.category_id}`, category)
          this.$toast.success(this.$t('categories.save.success'))
          this.reloadData()
        } catch (error) {
          this.$toast.error(this.$t('categories.save.error'))
        }
      }
    },
    async removeCategory() {
      try {
        await this.$axios.delete(`/api/categories/${this.category.category_id}`)
        this.$toast.success(this.$t('categories.delete.success'))
        this.$router.push('/travels')
      } catch (error) {
        this.$toast.error(this.$t('categories.delete.error'))
      }
    }
  }
}
</script>

<style></style>
