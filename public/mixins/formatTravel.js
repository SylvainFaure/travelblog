import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['assets'])
  },
  methods: {
    formatTravel(travel, filteredArticles) {
      const lang = 'fr'
      if (lang === 'fr') {
        travel.name = travel.travel_name_fr
        travel.description = travel.travel_desc_fr
        travel.articles = []
        filteredArticles.forEach(art => {
          const article = {
            id: art.article_id,
            title: art.article_title_fr,
            place: art.article_place_fr,
            cover: art.article_cover,
            step: art.article_step,
            slug: art.article_slug,
            catch_phrase: art.article_catch_phrase_fr,
            long_desc: art.article_long_desc_fr,
            short_desc: art.article_short_desc_fr,
            assets: this.assets.filter(asset => {
              return asset.asset_place_fr === art.article_place_fr
            })
          }
          travel.articles.push(article)
        })
      }
      if (lang === 'it') {
        travel.name = travel.travel_name_it
        travel.description = travel.travel_desc_it
        travel.articles = []
        filteredArticles.forEach(art => {
          const article = {
            id: art.article_id,
            title: art.article_title_it,
            place: art.article_place_it,
            step: art.article_step,
            slug: art.article_slug,
            catch_phrase: art.article_catch_phrase_it,
            long_desc: art.article_long_desc_it,
            short_desc: art.article_short_desc_it,
            assets: this.assets.filter(asset => {
              return asset.asset_place_it === art.article_place_it
            })
          }
          travel.articles.push(article)
        })
      }
      return travel
    }
  }
}
