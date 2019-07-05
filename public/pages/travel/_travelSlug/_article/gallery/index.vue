<template>
  <section class="gallery article__gallery">
    <h1> {{ $t('gallery_title') }} </h1>
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
  }
}
</script>
<style lang="scss">
.gallery {
  padding: 2rem;
  background-color: $color-secondary;
  min-height: 105vh;
}
</style>
