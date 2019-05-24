<template>
  <div
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
      <p>{{ _article.short_desc }}</p>
      <btn :link="{name: 'travel-travel-article', params: {travel: '', article: article.article_slug}}">
        {{ $t('label_discover_step') }}
      </btn>
    </div>
  </div>
</template>
<script>
import Btn from '@/components/Btn'
import formatArticle from '@/mixins/formatArticle'

export default {
  components: {
    Btn
  },
  mixins: [ formatArticle ],
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    _article() {
      return this.formatArticle(this.article)
    }
  },
  methods: {
    articleImg() {
      const url = process.env.AWS_BUCKET_PATH
      return `background: url('${url}/thumb/
        ${this._article.cover}
      '); background-repeat: no-repeat; background-position: center; background-size: cover;`
    }
  }
}
</script>
<style lang="scss">
.travel__article {
  /*background-color: #E1F5FE;*/
  padding: 0px 2em 0px 0px;
  margin: 2em auto;
  max-width: 85%;
}
</style>
