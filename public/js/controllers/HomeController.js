class HomeController {
  constructor(
    $rootScope, 
    $state,
    ArticlesList,
    TravelsList
  ) {
    'ngInject';
    this.articles = ArticlesList 
    this.travels = TravelsList

    this.fr = $rootScope.rvm.fr
    this.it = $rootScope.rvm.it
    this.$rootScope = $rootScope
    this.$state = $state
  }
  changeLang() {
    this.$rootScope.rvm.fr = !this.$rootScope.rvm.fr; 
    this.$rootScope.rvm.it = !this.$rootScope.rvm.it;
    this.$rootScope.$emit('changeLang')
    this.$state.reload('logged')
  }
}
export default HomeController;