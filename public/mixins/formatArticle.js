import formatDate from '@/mixins/formatDate'
export default {
  mixins: [formatDate],
  methods: {
    formatArticle(article) {
      const lang = this.$store.getters.lang
      if (lang === 'fr') {
        article.title = article.article_title_fr
        article.travel = article.article_country_fr
        article.published_date = this.formatRel(article.article_published_date_fr)
      }
      if (lang === 'it') {
        article.title = article.article_title_it
        article.travel = article.article_country_it
        article.published_date = this.formatRel(article.article_published_date_it)
      }
      return article
    }
  }
}
