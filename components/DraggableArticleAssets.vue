<template>
  <div v-if="mounted" class="flex">
    <div class="assets-list w-1/3 p-4 h-3/4 overflow-y-scroll">
      <h3>{{ $t('assets.non_associated') }}</h3>
      <draggable
        :class="{ 'flex flex-wrap py-8': !!assets.length }"
        :list="assets"
        :group="{ name: 'assets', pull: 'clone', put: false }"
        @change="handleAssetChange"
      >
        <div v-for="asset in assets" :key="`asset-${asset.asset_id}`" class="draggable-asset__container mr-2 mb-2">
          <img :src="asset.asset_src" class="w-24" />
        </div>
      </draggable>
    </div>
    <div class="articles-list w-2/3 bg-gray-200 p-4 h-3/4 overflow-y-scroll">
      <div v-for="article in articles" :key="`article-${article.article_id}`">
        <h3 :class="article[`article_title_${locale}`] ? '' : 'italic text-gray-500'">
          {{
            article[`article_title_${locale}`]
              ? article[`article_title_${locale}`]
              : article[`article_title_${otherLocale}`]
          }}
        </h3>
        <draggable
          :list="assetsByArticle[article.article_id]"
          :group="{ name: 'assets', pull: false, put: true }"
          :class="{ 'flex flex-wrap py-4': !!assetsByArticle[article.article_id].length }"
          @change="handleAssetChange($event, article.article_id)"
        >
          <div
            v-for="asset in assetsByArticle[article.article_id]"
            :key="`asset-article-${asset.asset_id}`"
            class="relative"
          >
            <span
              class="absolute top-0 right-0 my-2 mr-4 text-white"
              @click="removeAssetFromArticle(asset, article.article_id)"
            >
              <Icon name="cross" small />
            </span>
            <img :src="asset.asset_src" class="w-24 mr-2 mb-2" />
          </div>
        </draggable>
        <div v-if="!assetsByArticle[article.article_id].length" class="my-4 text-xs">
          {{ $t('assets.article_empty') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  props: {
    assets: VueTypes.array.def([]),
    travels: VueTypes.array.def([]),
    articles: VueTypes.array.def([])
  },
  data() {
    const locale = this.$i18n.locale
    const otherLocale = locale === 'fr' ? 'it' : 'fr'

    return {
      locale,
      otherLocale,
      mounted: false,
      assetsByArticle: {},
      modifiedAssetsIds: {}
    }
  },
  mounted() {
    this.locale = this.$i18n.locale
    this.articles.forEach((article) => {
      this.$set(
        this.assetsByArticle,
        article.article_id,
        this.assets.filter((asset) => asset.asset_article_ids.includes(article.article_id))
      )
    })
    this.mounted = true
  },
  methods: {
    handleAssetChange(event, articleId) {
      if (event.added) {
        const asset = event.added.element
        const isInModified = !!this.modifiedAssetsIds[asset.asset_id]
        const previousIds = isInModified
          ? [...asset.asset_article_ids, ...this.modifiedAssetsIds[asset.asset_id].present]
          : [...asset.asset_article_ids]
        this.modifiedAssetsIds[asset.asset_id] = {
          past: asset.asset_article_ids,
          present: Array.from(new Set([...previousIds, articleId]))
        }
      }
    },
    removeAssetFromArticle(asset, articleId) {
      const isInModified = !!this.modifiedAssetsIds[asset.asset_id]
      this.modifiedAssetsIds[asset.asset_id] = {
        past: asset.asset_article_ids,
        present: isInModified
          ? this.modifiedAssetsIds[asset.asset_id].present.filter((a) => a !== asset.asset_id)
          : asset.asset_article_ids.filter((a) => a !== articleId)
      }
      this.assetsByArticle[articleId] = this.assetsByArticle[articleId].filter((a) => a.asset_id !== asset.asset_id)
    },
    getModifiedAssets() {
      return this.modifiedAssetsIds
    }
  }
}
</script>
