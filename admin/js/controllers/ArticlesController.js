class ArticlesController {
 constructor (
  $rootScope, 
  $window, 
  $scope, 
  $state, 
  ArticlesList, 
  ApiService
 ) {
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
 }
 deleteArticle(id) {
  this.ApiService.articleDelete(id)
  this.$state.reload()
  this.$window.location.reload()
}
}
export default ArticlesController;