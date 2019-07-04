<template>
  <section class="travel__gallery">
    <h1>Gallery</h1>
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
    ...mapState(['articles', 'lang']),
    article() {
      return this.articles.filter(article => {
        return article.article_id === Number(this.articleId)
      })[0]
    },
    articleAssets() {
      return this.lang === 'fr' ? JSON.parse(this.article.article_gallery_fr) : JSON.parse(this.article.article_gallery_it)
    }
  }
}
</script>
<style lang="scss">

</style>
