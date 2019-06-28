<template>
  <div>
    {{ $route.params }}
  </div>
</template>
<script>
import formatArticle from '@/mixins/formatArticle'
import formatRoute from '@/mixins/formatRoute'
import { mapState } from 'vuex'

export default {
  mixins: [ formatArticle, formatRoute ],
  data() {
    return {
      articleId: undefined,
      article: {}
    }
  },
  computed: {
    ...mapState(['articles'])
  },
  created() {
    if (!this.$route.params.articleId) {
      this.articleId = this.getArticleIdFromSlug(this.$route.params.article)
    } else {
      this.articleId = this.$route.params.articleId
    }
    this.article = this.articles.filter(art => art.article_id === this.articleId)[0]
  }
}
</script>
<style lang="scss">

</style>
