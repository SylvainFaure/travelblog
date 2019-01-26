export default function Router ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('logged', {
      url: '^/',
      sticky: true,
      views: {
        home: {
          templateUrl: "views/home.html",
          controller: "HomeController",
          controllerAs: "vm"
        },
        login: {
          templateUrl: "views/login.html",
          controller: "LoginController",
          controllerAs: "vm"
        }
      }, 
      resolve: {
        ArticlesList: (ApiService) => {
          return ApiService
            .articlesList()
            .then((r) => {
              return r.data;
            })
        },
        TravelsList: (ApiService) => {
          return ApiService
            .travelsList()
            .then((r) => {
              return r.data;
            })
        }
      }
    })
    .state('logged.userrequest', {
      url: 'userrequest/:email/:role',
      templateUrl: "../assets/js/views/login.html",
      controller: "UserRequestController",
      controllerAs: "vm"
    })
    .state('logged.articles', {
      url: 'articles',
      sticky: true,
      templateUrl: '../assets/js/views/articles.html',
      controller: 'ArticlesController',
      controllerAs: 'vm',
      resolve: {
        ArticlesList: (ApiService) => {
          return ApiService
            .articlesList()
            .then((r) => {
              return r.data;
            })
        }
      }
    })
    .state('logged.travels', {
      url: 'travels',
      sticky: true,
      templateUrl: "../assets/js/views/travels.html",
      controller: "TravelsController",
      controllerAs: "vm",
      resolve: {
        Travels: (ApiService) => {
          return ApiService
            .travelsList()
            .then((r) => {
              return r.data;
            })
        },
        Assets: (ApiService) => {
          return ApiService
            .assetsList()
            .then((r) => {
              return r.data;
            })
        }
      }
      
    })
    .state('logged.assets', {
      url: 'assets',
      sticky: true,
      templateUrl: "../assets/js/views/assets.html",
      controller: "AssetsController",
      controllerAs: 'vm',
      resolve: {
        Assets: (ApiService) => {
          return ApiService
            .assetsList()
            .then((r) => {
              return r.data;
            })
        }
      }
    })
    .state('logged.travel', {
      url: 'travel/{travelId}',
      sticky: true,
      templateUrl: "../assets/js/views/travel.html",
      controller: "TravelController",
      controllerAs: "vm",
      resolve: {
        Travel: ($stateParams, ApiService, $state) => {
          return ApiService
            .travelDetail($stateParams.travelId)
            .then((r) => {
              if (!r.data.length) {
                $state.go("logged.travels", {location: "replace"});
              }
              return r.data[0]
            })
        },
        TravelArticles: ($stateParams, ApiService) => {
          return ApiService 
            .travelArticles($stateParams.travelId)
            .then((r) => {
              return r.data
            })
        },
        Assets: (ApiService) => {
          return ApiService
            .assetsList()
            .then((r) => {
              return r.data;
            })
        }
      }
    })
    .state('logged.newtravel', {
      url: 'newtravel',
      sticky: true,
      templateUrl: "../assets/js/views/newtravel.html",
      controller: "AddCountryController",
      controllerAs: 'vm'
    })
    .state('logged.article', {
      url: 'article/{articleId}',
      sticky: true,
      templateUrl: "../assets/js/views/article.html",
      controller: "ArticleController",
      controllerAs: 'vm',
      resolve: {
          ArticleDetail: ($stateParams, ApiService, $state) => {
            if ($stateParams.articleId === 'newarticle') {
              return {
                newarticle: true
              }
            }
            return ApiService
              .articleDetail($stateParams.articleId)
              .then((r) => {
                if (!r.data.length) {
                  $state.go("logged.articles", {location: "replace"});
                }
                return r.data[0];
              })
          },
          Travels: (ApiService) => {
            return ApiService
              .travelsList()
              .then((r) => {
                return r.data
              })
          },
          Assets: (ApiService) => {
            return ApiService
              .assetsList()
              .then((r) => {
                return r.data;
              })
          }
        }
    })
    $urlRouterProvider.otherwise('/'); 
}