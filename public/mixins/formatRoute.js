export default {
  methods: {
    getTravelIdFromSlug(slug) {
      const travels = this.$store.getters.travels
      const travel = travels.filter(travel => travel.travel_slug.toLowerCase() === slug.toLowerCase())[0]
      return travel ? travel.travel_id : undefined
    },
    getTravelSlugFromId(id) {
      const travels = this.$store.getters.travels
      const travel = travels.filter(travel => Number(travel.travel_id) === Number(id))[0]
      return travel ? travel.travel_slug : ''
    },
    getArticleIdFromSlug(slug) {
      const articles = this.$store.getters.articles
      const article = articles.filter(article => article.article_slug.toLowerCase() === slug.toLowerCase())[0]
      return article ? article.article_id : undefined
    },
    getArticleSlugFromId(id) {
      const articles = this.$store.getters.articles
      const article = articles.filter(article => Number(article.article_id) === Number(id))[0]
      return article ? article.article_slug : undefined
    },
    handleLocalize(routename) {
      const localized = routename.includes('___')
      console.log(routename, localized)
      return localized ? routename : `${routename}___${this.$i18n.locale}`
    }
  }
}
