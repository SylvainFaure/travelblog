
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
    .state('travel', {
      url: '/{travelId}',
      params: {
        countryName: null
      },
      templateUrl: "public/views/travel.html",
      controller: "TravelController",
      controllerAs: "vm",
      resolve: {
        country: (ApiService, $stateParams) => ApiService.getTravelDetail($stateParams.countryId),
        articles: (ApiService, $stateParams) => ApiService.getTravelArticles($stateParams.countryId),
        assets: ApiService => ApiService.getAssets()
      }
    })
    .state('post', {
      url: '/{travel}/{post}',
      templateUrl: "public/views/post.html",
      controller: "PostController",
      controllerAs: "vm",
      resolve: {
        post: function(ApiService, $stateParams) {
          return ApiService.getArticleDetail($stateParams.post);
        },
        travel: function($stateParams){
          return $stateParams.travel
        }
      }
    })
  $urlRouterProvider.otherwise("/");
};
