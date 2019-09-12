<template>
  <div>
    <Header />
    <div class="header">
      <Map :zoom="10" :address="article.article_slug" />
    </div>
    <section class="article__body">
      <div class="article__header">
        <h1 class="title article__header-title">
          {{ formattedArticle.title }}
        </h1>
        <h2 class="title">
          {{ formattedArticle.short_desc }}
        </h2>
        <nuxt-link :to="{name: handleLocalize('travel-travelSlug'), params: { travelSlug: $route.params.travelSlug }}">
          <i style="font-size:24px">&#8604;</i>
        </nuxt-link>
      </div>
      <div class="article__body-long-description">
        <div v-for="(comp, $index) in formattedArticle.long_desc" :key="$index">
          <component :is="`block-${comp.type}`" :content="comp.content" :asset="comp.type == 'image' ? comp.originalAsset : null" />
          <!-- <p>Type: {{ comp.type }}</p>
          <p>Content: {{ comp.content }}</p>
          <p>Position: {{ comp.position }}</p> -->
        </div>
      </div>
    </section>
    <FloatActionBtn label="Gallery" :route="`${$route.params.article}/${$t('routes.gallery')}`" />
  </div>
</template>
<script>
import formatArticle from '@/mixins/formatArticle'
import formatRoute from '@/mixins/formatRoute'
import { mapState } from 'vuex'
import Header from '@/components/Header'
import Map from '@/components/Map'
import FloatActionBtn from '@/components/FloatActionBtn'

import BlockParagraph from '@/components/Block/Block_paragraph'
import BlockSubtitle from '@/components/Block/Block_subtitle'
import BlockImage from '@/components/Block/Block_image'
import BlockCatch from '@/components/Block/Block_catch'

export default {
  components: {
    Header,
    FloatActionBtn,
    Map,
    BlockParagraph,
    BlockSubtitle,
    BlockImage,
    BlockCatch
  },
  mixins: [ formatArticle, formatRoute ],
  data() {
    return {
      articleId: undefined,
      article: {}
    }
  },
  computed: {
    ...mapState(['articles']),
    formattedArticle() {
      const f = this.formatArticle(this.article)
      if (typeof f.long_desc === 'string') {
        JSON.parse(f.long_desc)
      }
      return f
    }
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
.article {
  &__header {
    position: absolute;
    font-size: 1.5em;
    text-align: left;
    min-height: 10em;
    width: 40%;
    top: 4em;
    left: 2em;
    padding: 1em;
    z-index: 100;
    background-color: rgba(255,255,255,0.2);
    border: 2px solid black;
  }
  &__body {
    display: flex;
    justify-content: center;
    margin: 2em 0;
    &-long-description {
      width: 50vw;
    }
  }
}

</style>
