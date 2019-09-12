<template>
  <div class="sitemap">
    <section class="sitemap-trips">
      <p class="sitemap-trips__title">
        {{ $t('label_trips') }}
      </p>
      <div v-for="travel in formattedTravels" :key="travel.travel_id">
        <nuxt-link :to="{name: handleLocalize('travel-travelSlug'), params: { travelSlug: travel.slug }}">
          {{ travel.name }}
        </nuxt-link>
      </div>
    </section>
    <section class="sitemap-articles">
      <p class="sitemap-articles__title">
        {{ $t('label_articles') }}
      </p>
      <div v-for="article in formattedArticles" :key="article.article_id">
        <nuxt-link :to="{name: handleLocalize('travel-travelSlug-article'), params: { travelSlug: getTravelSlugFromId(article.travel_id), article: article.article_slug }}">
          {{ article.title }}
        </nuxt-link>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import formatTravel from '@/mixins/formatTravel'
import formatRoute from '@/mixins/formatRoute'
import formatArticle from '@/mixins/formatArticle'

export default {
  mixins: [formatTravel, formatArticle, formatRoute],
  computed: {
    ...mapState(['travels', 'articles']),
    formattedTravels() {
      return this.travels.map(tr => {
        tr = this.formatTravel(tr)
        return tr
      })
    },
    formattedArticles() {
      return this.articles.map(art => {
        art = this.formatArticle(art)
        return art
      })
    }
  }
}
</script>
<style lang="scss">
.sitemap {
  display: flex;
  &-trips {
    margin-right: 1em;
    &__title {
      border: 2px solid black;
      padding: 0.5em;
      margin-bottom: 1em;
    }
  }
  &-articles {
    &__title {
      border: 2px solid black;
      padding: 0.5em;
      margin-bottom: 1em;
    }
    min-height: 100%;
    column-fill: auto;
    column-count: 2;
  }
}
</style>
