<template>
  <div
    v-if="article"
    class="travel__article"
    :style="articleImg()"
  >
    <div class="travel__article-photo">
      <h1 class="title travel__article-title">
        {{ _article.title }}
      </h1>
      <h2>
        {{ _article.place }}
      </h2>
      <p class="travel__article-desc">
        {{ _article.short_desc }}
      </p>
      <btn :link="{name:'travel-travelSlug-article', params: {travelSlug: travelSlug, article: article.article_slug.toLowerCase(), articleId: article.article_id}}">
        {{ $t('label_discover_step') }}
      </btn>
    </div>
  </div>
</template>
<script>
import Btn from '@/components/Btn'
import formatArticle from '@/mixins/formatArticle'
import formatRoute from '@/mixins/formatRoute'
import { mapState } from 'vuex'

export default {
  components: {
    Btn
  },
  mixins: [ formatArticle, formatRoute ],
  props: {
    article: {
      type: Object,
      required: true
    },
    travelSlug: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(['travels']),
    _article() {
      return this.formatArticle(this.article)
    },
    travel() {
      return this.travels.filter(travel => travel.travel_id === Number(this.article.article_id))[0]
    }
  },
  methods: {
    articleImg() {
      const url = process.env.AWS_BUCKET_PATH
      console.log(this._article)
      return `background: linear-gradient(rgba(255,255,255,.7), rgba(255,255,255,.7)), url('${url}img/${this._article.article_cover}'); background-repeat: no-repeat; background-position: center; background-size: cover;`
    }
  }
}
</script>
<style lang="scss">
.travel__article {
  /*background-color: #E1F5FE;*/
  padding: 2em;
  margin: 2em auto;
  max-width: 85%;
  &-desc {
    margin: 1em 0;
  }
}
</style>
