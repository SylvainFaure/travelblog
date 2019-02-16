class TravelController {
  constructor (
    country,
    articles,
    assets,
    $rootScope 
  ) {
    var vm = this
    vm.$rootScope = $rootScope;

    vm.country = country[0];
    console.log(vm.country)
    vm.articles = articles
    vm.assets = assets
    
    vm.$rootScope.$on('changed-lang', () => {
      if (vm.$rootScope.lang == 'fr') {
        vm.country.name = vm.country.country_name_fr
        vm.country.description = vm.country.country_desc_fr
        vm.country.articles = []
        vm.articles.forEach(art => {
          let article = {
            id: art.article_id,
            title: art.article_title_fr,
            place: art.article_place_fr,
            cover: art.article_cover,
            step: art.article_step,
            slug: art.article_slug,
            catch_phrase: art.article_catch_phrase_fr,
            long_desc: art.article_long_desc_fr,
            short_desc: art.article_short_desc_fr,
            assets: vm.assets.filter(asset => {
              return asset.asset_place_fr == art.article_place_fr
            })
          }
          vm.country.articles.push(article)
          this.getWaypoints()
        })
      }
      if (vm.$rootScope.lang == 'it') {
        vm.country.name = vm.country.country_name_it
        vm.country.description = vm.country.country_desc_it
        vm.country.articles = []
        vm.articles.forEach(art => {
          let article = {
            id: art.article_id,
            title: art.article_title_it,
            place: art.article_place_it,
            step: art.article_step,
            slug: art.article_slug,
            catch_phrase: art.article_catch_phrase_it,
            long_desc: art.article_long_desc_it,
            short_desc: art.article_short_desc_it,
            assets: vm.assets.filter(asset => {
              return asset.asset_place_it == art.article_place_it
            })
          }
          vm.country.articles.push(article)
          this.getWaypoints()
        })
      }
    })
  }
  
  getWaypoints() {
    this.waypoints = []
    this.start = this.country.articles[0].place
    this.end = this.country.articles[this.country.articles.length - 1].place
    for (let i = 1; i < this.country.articles.length - 1; i++){
    this.waypoints.push({
        location: this.country.articles[i].place,
        stopover: true
      })
    }
  }
}

export default TravelController;