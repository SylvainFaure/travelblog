<template>
  <div>
    <div class="flex justify-between">
      <Tabs :tabs="tabs" @tab="activeTab = $event.key" />
      <div class="self-center mr-4">
        <Btn v-if="activeTab !== 'library'" icon-btn icon="floppy-disk" @click="saveAssociatedAssets" />
      </div>
    </div>
    <div v-if="activeTab === 'library'">
      <AssetPickerUploader :travels="travels" @uploaded="reloadAssets" />
      <AssetPickerLibrary :assets="assets" :data="{ travels, articles }" @change="reloadAssets" />
    </div>
    <div v-else-if="activeTab === 'travel-assets'">
      <DraggableTravelAssets ref="travelAssets" :assets="assets" :travels="travels" :articles="articles" />
      <div class="w-full flex justify-end">
        <Btn class="m-4" icon-btn icon="floppy-disk" @click="saveAssociatedAssets" />
      </div>
    </div>
    <div v-else-if="activeTab === 'article-assets'">
      <DraggableArticleAssets ref="articleAssets" :assets="assets" :travels="travels" :articles="articles" />
      <div class="w-full flex justify-end">
        <Btn class="m-4" icon-btn icon="floppy-disk" @click="saveAssociatedAssets" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    let assets = []
    let travels = []
    let articles = []
    try {
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
    return {
      assets,
      travels,
      articles
    }
  },
  data() {
    const library = this.$t('assets.library')
    const travelAssets = this.$t('assets.travel_assets')
    const articleAssets = this.$t('assets.article_assets')
    return {
      activeTab: 'library',
      tabs: [
        {
          key: 'library',
          name: library
        },
        {
          key: 'travel-assets',
          name: travelAssets
        },
        {
          key: 'article-assets',
          name: articleAssets
        }
      ]
    }
  },
  methods: {
    async reloadAssets() {
      const { data } = await this.$axios.get('/api/assets')
      this.assets = data
    },
    saveAssociatedAssets() {
      const context = this.activeTab === 'travel-assets' ? 'travel' : 'article'
      try {
        let modifiedAssetsIds = {}
        if (context === 'travel') {
          modifiedAssetsIds = this.$refs.travelAssets.getModifiedAssets()
        }
        if (context === 'article') {
          modifiedAssetsIds = this.$refs.articleAssets.getModifiedAssets()
        }
        Object.keys(modifiedAssetsIds).forEach(async (key) => {
          if (modifiedAssetsIds[key].past !== modifiedAssetsIds[key].present) {
            try {
              const fullAsset = this.assets.find((a) => a.asset_id === Number(key))
              const assetPayload = {
                ...fullAsset,
                asset_article_ids:
                  context === 'travel'
                    ? JSON.stringify(fullAsset.asset_article_ids)
                    : JSON.stringify(modifiedAssetsIds[key].present),
                asset_travel_id: context === 'travel' ? modifiedAssetsIds[key].present : fullAsset.asset_travel_id
              }
              await this.$axios.put(`/api/assets/${key}`, assetPayload)
            } catch (error) {
              console.warn(error)
            }
          }
        })
        this.$toast.success(this.$t('assets.updated_success'))
        this.reloadAssets()
      } catch (error) {
        console.warn(error)
        this.$toast.error(this.$t('assets.updated_error'))
      }
    }
  }
}
</script>
