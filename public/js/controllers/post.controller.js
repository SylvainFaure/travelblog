class PostController {
  constructor(
    post,
    country,
    $rootScope,
    $scope,
    $compile
  ){
    var vm = this;
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$compile = $compile;
    vm.post = post[0];
    console.log(vm.post)
    vm.country = country;

    this.$rootScope.$on('changed-lang', () => {
      if (vm.$rootScope.lang == 'fr') {
        let article = {
          id: vm.post.article_id,
          title: vm.post.article_title_fr,
          place: vm.post.article_place_fr,
          cover: vm.post.article_cover,
          step: vm.post.article_step,
          slug: vm.post.article_slug,
          catch_phrase: vm.post.article_catch_phrase_fr,
          long_desc: vm.post.article_long_desc_fr,
          short_desc: vm.post.article_short_desc_fr,
          /*assets: vm.assets.filter(asset => {
            return asset.asset_place_fr == art.article_place_fr
          })*/
        }
        vm.post = article
      }
      if (vm.$rootScope.lang == 'it') {
        let article = {
          id: vm.post.article_id,
          title: vm.post.article_title_it,
          place: vm.post.article_place_it,
          cover: vm.post.article_cover,
          step: vm.post.article_step,
          slug: vm.post.article_slug,
          catch_phrase: vm.post.article_catch_phrase_it,
          long_desc: vm.post.article_long_desc_it,
          short_desc: vm.post.article_short_desc_it,
          /*assets: vm.assets.filter(asset => {
            return asset.asset_place_fr == art.article_place_fr
          })*/
        }
        vm.post = article
        
      }
      this.compilePost()
    })
  }
  
  compilePost() {
    let elem = $(".description");
    elem.html(this.post.long_desc);
    this.$compile(elem.contents())(this.$scope);
  }
}
export default PostController