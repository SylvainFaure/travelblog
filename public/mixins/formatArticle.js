import formatDate from '@/mixins/formatDate'
export default {
  mixins: [formatDate],
  methods: {
    formatArticle(article) {
      const lang = this.$store.getters.lang
      if (lang === 'fr') {
        article.title = article.article_title_fr
        article.travel = article.article_country_fr
        article.place = article.article_place_fr
        article.cover = article.article_cover
        article.step = article.article_step
        article.slug = article.article_slug
        article.catch_phrase = article.article_catch_phrase_fr
        article.long_desc = article.article_long_desc_fr
        article.short_desc = article.article_short_desc_fr
        article.published_date = this.formatRel(article.article_published_date_fr)
      }
      if (lang === 'it') {
        article.title = article.article_title_it
        article.travel = article.article_country_it
        article.place = article.article_place_it
        article.cover = article.article_cover
        article.step = article.article_step
        article.slug = article.article_slug
        article.catch_phrase = article.article_catch_phrase_it
        article.long_desc = article.article_long_desc_it
        article.short_desc = article.article_short_desc_it
        article.published_date = this.formatRel(article.article_published_date_it)
      }
      return article
    }
  }
}
