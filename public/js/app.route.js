
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
        post: (ApiService, $stateParams) => {
          return ApiService.getArticleDetail($stateParams.post);
        },
        travel: ($stateParams) => {
          return $stateParams.travel
        },
        assets: ApiService => ApiService.getAssets()
      }
    })
    .state('gallery', {
      url: '/{travel}/{post}/gallery',
      templateUrl: "public/views/gallery.html",
      controller: "GalleryController",
      controllerAs: "vm",
      resolve: {
        // only need assets filtered by article
        post: (ApiService, $stateParams) => {
          return ApiService.getArticleDetail($stateParams.post);
        },
        travel: ($stateParams) => {
          return $stateParams.travel
        },
        assets: ApiService => ApiService.getAssets()
      }
    })
  $urlRouterProvider.otherwise("/");
};
