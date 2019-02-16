
export default function Router ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: "public/views/home.html",
      controller: "HomeController",
      controllerAs: "vm",
      resolve: {
        travels: ApiService => ApiService.getTravels(),
        articles: ApiService => ApiService.getArticles(),
      }
    })
    .state('country', {
      url: '/{countryId}',
      params: {
        countryName: null
      },
      templateUrl: "public/views/country.html",
      controller: "TravelController",
      controllerAs: "vm",
      resolve: {
        country: (ApiService, $stateParams) => ApiService.getCountryDetail($stateParams.countryId),
        articles: (ApiService, $stateParams) => ApiService.getCountryArticles($stateParams.countryId),
        assets: ApiService => ApiService.getAssets()
      }
    })
    .state('post', {
      url: '/{country}/{post}',
      templateUrl: "public/views/post.html",
      controller: "PostController",
      controllerAs: "vm",
      resolve: {
        post: function(ApiService, $stateParams) {
          return ApiService.getArticleDetail($stateParams.post);
        },
        country: function($stateParams){
          return $stateParams.country
        }
      }
    })
  $urlRouterProvider.otherwise("/");
};
