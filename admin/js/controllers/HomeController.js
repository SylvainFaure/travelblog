class HomeController {
  constructor(
    $rootScope, 
    $state,
    $window,
    ArticlesList,
    TravelsList,
    AuthService
  ) {
    'ngInject';
    this.articles = ArticlesList 
    this.travels = TravelsList
    this.AuthService = AuthService;
    console.log('HomeController')
    this.rvm = $rootScope.rvm;
    this.$rootScope = $rootScope
    this.$state = $state
    this.$window = $window;

    this.isLogged = $rootScope.rvm.isLogged;
  }
  changeLang() {
    this.$rootScope.rvm.fr = !this.$rootScope.rvm.fr; 
    this.$rootScope.rvm.it = !this.$rootScope.rvm.it;
    this.$rootScope.$emit('changeLang')
    this.$state.reload('logged')
  }

  logout() {
    this.AuthService.loginLogout();
    this.$window.location.reload();
  }
}
export default HomeController;