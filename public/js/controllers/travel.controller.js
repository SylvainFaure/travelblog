class TravelController {
  constructor (
    travel,
    articles,
    assets,
    $rootScope 
  ) {
    var vm = this
    vm.$rootScope = $rootScope;

    vm.travel = travel[0];
    console.log(vm.travel)
    vm.articles = articles
    vm.assets = assets
    
    vm.$rootScope.$on('changed-lang', () => {
      if (vm.$rootScope.lang == 'fr') {
        vm.travel.name = vm.travel.travel_name_fr
        vm.travel.description = vm.travel.travel_desc_fr
        vm.travel.articles = []
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
          vm.travel.articles.push(article)
          this.getWaypoints()
        })
      }
      if (vm.$rootScope.lang == 'it') {
        vm.travel.name = vm.travel.travel_name_it
        vm.travel.description = vm.travel.travel_desc_it
        vm.travel.articles = []
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
          vm.travel.articles.push(article)
          this.getWaypoints()
        })
      }
    })
  }
  
  getWaypoints() {
    this.waypoints = []
    this.start = this.travel.articles[0].place
    this.end = this.travel.articles[this.travel.articles.length - 1].place
    for (let i = 1; i < this.travel.articles.length - 1; i++){
    this.waypoints.push({
        location: this.travel.articles[i].place,
        stopover: true
      })
    }
  }
}

export default TravelController;