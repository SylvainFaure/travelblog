<template>
  <section class="gallery article__gallery">
    <div class="gallery__header">
      <h1 class="gallery__header-title">
        {{ $t('gallery_title') }}
      </h1>
      <span class="gallery__header-close" @click="closeGallery">&times;</span>
    </div>
    <transition name="fade">
      <Gallery v-if="articleAssets.length" :assets="articleAssets" />
    </transition>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import Gallery from '@/components/Gallery'
import formatRoute from '@/mixins/formatRoute'

export default {
  components: {
    Gallery
  },
  mixins: [ formatRoute ],
  data() {
    return {
      articleId: this.getArticleIdFromSlug(this.$route.params.article)
    }
  },
  computed: {
    ...mapState(['assets', 'lang']),
    articleAssets() {
      return this.assets.filter(asset => {
        if (asset.asset_article_ids) {
          return JSON.parse(asset.asset_article_ids).includes(this.articleId)
        }
      })
    }
  },
  methods: {
    closeGallery() {
      this.$router.push({ name: this.handleLocalize('travel-travelSlug-article'), params: { travelSlug: this.$route.params.travelSlug, article: this.$route.params.article } })
    }
  }
}
</script>
<style lang="scss">
.gallery {
  padding: 2rem;
  background-color: $color-secondary;
  min-height: 105vh;
  &__header {
    display: flex;
    justify-content: center;

    &-title {

    }
    &-close {
      position: absolute;
      top: 1em;
      right: 1em;
      font-size: 2em;
      cursor: pointer;
    }
  }
}
</style>
