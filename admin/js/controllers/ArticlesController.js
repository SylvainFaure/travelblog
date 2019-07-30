class ArticlesController {
 constructor (
  $rootScope, 
  $window, 
  $scope, 
  $state, 
  ArticlesList, 
  TravelsList,
  ApiService
 ) {
  this.travels = TravelsList
  this.articles = ArticlesList
  console.log(this.articles)
  this.$window = $window;
  this.$scope = $scope;
  this.$state = $state;
  this.ApiService = ApiService;

  this.fr = $rootScope.rvm.fr;
  this.it = $rootScope.rvm.it;
  $rootScope.$on('changeLang', function(){
    this.fr = $rootScope.rvm.fr;
    this.it = $rootScope.rvm.it;
  })
  this.articles.map(art => {
    const prop = this.fr ? 'travel_title_fr' : 'travel_title_it'
    art.travel = this.travels.filter(travel => travel.travel_id == art.article_travel_id)[0][prop]
    return art
  })
 }
 deleteArticle(id) {
  this.ApiService.articleDelete(id)
  this.$state.reload()
  this.$window.location.reload()
}
}
export default ArticlesController;