class HomeController {
  constructor(
    travels,
    articles,
    $rootScope
  ) {
    var vm = this
    vm.$rootScope = $rootScope;
    vm.travels = travels;
    vm.articles = articles;
    console.debug(vm.travels)
    console.debug(vm.articles)

    vm.scrollDown = this.scrollDown
    window.onscroll = () => { this.stickyMenu() };

    vm.$rootScope.$on('changed-lang', () => {
      if (vm.$rootScope.lang == 'fr') {

        vm.label_trips = 'Voyages'
        vm.label_last_articles = 'Derniers articles'
        vm.label_discover = 'Découvrez'
        vm.label_in = 'dans'
        vm.label_published = 'publié le'

        vm.travels.forEach((travel) => {
          travel.travel_id = travel.travel_id
          travel.travel_name = travel.travel_title_fr
          travel.travel_desc = travel.travel_desc_fr
          travel.travel_countries = travel.travel_countries_fr
          travel.travel_published = travel.travel_published_fr == 'true' ? true : false
        })

        vm.articles.forEach(art => {
          art.article_published_date = new Date(art.article_published_date).toLocaleDateString('fr-FR')
          art.article_title = art.article_title_fr
          let travelName = () => {
            let travel = vm.travels.filter(travel => {
              return travel.travel_id == art.article_travel_id
            })
            return travel[0].travel_title_fr
          }
          art.article_travel = travelName()
        })
      }
      if (vm.$rootScope.lang == 'it') {

        vm.label_trips = 'Viaggi'
        vm.label_last_articles = 'Ultimi articoli'
        vm.label_discover = 'Scopra'
        vm.label_in = 'in'
        vm.label_published = 'pubblicato il'

        vm.travels.forEach((travel) => {
          travel.travel_id = travel.travel_id
          travel.travel_name = travel.travel_title_it
          travel.travel_desc = travel.travel_desc_it
          travel.travel_countries = travel.travel_countries_it
          travel.travel_published = travel.travel_published_it == 'true' ? true : false
        })

        vm.articles.forEach(art => {
          art.article_published_date = new Date(art.article_published_date).toLocaleDateString('it-IT')
          art.article_title = art.article_title_it 
          let travelName = () => {
            let travel = vm.travels.filter(travel => {
              return travel.travel_id == art.article_travel_id
            })
            return travel[0].travel_title_it
          }
          art.article_travel = travelName()
        })
      }
    })
    
  }
  scrollDown() {
    $('html, body').animate( { scrollTop: $('.home__main').offset().top }, 750 ); 
  }

  stickyMenu() {
    let header = $('.home__header') 
    let sticky = header.height()
    if (window.pageYOffset >= sticky) {
      $('.sticky_child').addClass("sticked")
      $('.home__main-trips, .home__main-articles').css('padding', '4em 1em')
    } else {  
      $('.sticky_child').removeClass("sticked");
      $('.home__main-trips, .home__main-articles').css('padding', '2em 1em')
    }
  }
    
}

export default HomeController;