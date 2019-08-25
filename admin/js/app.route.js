export default function Router ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('logged', {
      url: '^/',
      sticky: true,
      views: {
        home: {
          templateUrl: "admin/views/home.html",
          controller: "HomeController",
          controllerAs: "vm"
        },
        login: {
          templateUrl: "admin/views/login.html",
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
            .catch(err => {
              console.log(err)
            })
        },
        TravelsList: (ApiService) => {
          return ApiService
            .travelsList()
            .then((r) => {
              return r.data;
            })
            .catch(err => {
              console.log(err)
            })
        },
        AssetsList: (ApiService) => {
          return ApiService
            .assetsList()
            .then((r) => {
              return r.data;
            })
            .catch(err => {
              console.log(err)
            })
        },
        Settings: (ApiService) => {
          return ApiService
            .settings()
            .then(r => {
              return r.data
            })
            .catch(err => {
              console.warn(err)
            })
        }
      }
    })
    .state('logged.userrequest', {
      url: 'userrequest/:email/:role',
      templateUrl: "../js/views/login.html",
      controller: "UserRequestController",
      controllerAs: "vm"
    })
    .state('logged.articles', {
      url: 'articles',
      sticky: true,
      templateUrl: '../js/views/articles.html',
      controller: 'ArticlesController',
      controllerAs: 'vm',
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
            .then(r => {
              return r.data
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
    })
    .state('logged.travels', {
      url: 'travels',
      sticky: true,
      templateUrl: "../js/views/travels.html",
      controller: "TravelsController",
      controllerAs: "vm",
      resolve: {
        Travels: (ApiService) => {
          return ApiService
            .travelsList()
            .then((r) => {
              return r.data;
            })
            .catch(err => {
              console.log(err)
            })
        },
        Assets: (ApiService) => {
          return ApiService
            .assetsList()
            .then((r) => {
              return r.data;
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
      
    })
    .state('logged.assets', {
      url: 'assets',
      sticky: true,
      templateUrl: "../js/views/assets.html",
      controller: "AssetsController",
      controllerAs: 'vm',
      resolve: {
        Assets: (ApiService) => {
          return ApiService
            .assetsList()
            .then((r) => {
              return r.data;
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
    })
    .state('logged.anecdotes', {
      url: 'anecdotes',
      sticky: true,
      templateUrl: "../js/views/anecdotes.html",
      controller: "AnecdotesController",
      controllerAs: "vm",
      resolve: {
        Anecdotes: (ApiService) => {
          return ApiService
            .anecdotesList()
            .then((r) => {
              return r.data;
            })
            .catch(err => {
              console.log(err)
            })
        },
      }  
    })
    .state('logged.anecdote', {
      url: 'anecdotes/{anecdoteId}',
      sticky: true,
      templateUrl: "../js/views/anecdote.html",
      controller: "AnecdoteController",
      controllerAs: "vm",
      resolve: {
        Anecdote: ($stateParams, ApiService) => {
          return ApiService
            .anecdoteDetail($stateParams.anecdoteId)
            .then((r) => {
              return r.data;
            })
            .catch(err => {
              console.log(err)
            })
        },
        Assets: (ApiService) => {
          return ApiService
            .assetsList()
            .then((r) => {
              return r.data;
            })
            .catch(err => {
              console.log(err)
            })
        }
      }  
    })
    .state('logged.travel', {
      url: 'travel/{travelId}',
      sticky: true,
      templateUrl: "../js/views/travel.html",
      controller: "TravelController",
      controllerAs: "vm",
      resolve: {
        Travel: ($stateParams, ApiService, $state) => {
          if ($stateParams.travelId === "new") {
            return {
              newtravel: true
            }
          } else {
            return ApiService
              .travelDetail($stateParams.travelId)
              .then((r) => {
                if (!r.data.length) {
                  $state.go("logged.travels", {location: "replace"});
                }
                return r.data[0]
              })
              .catch(err => {
                console.log(err)
              })
          }
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
            .catch(err => {
              console.log(err)
            })
        }
      }
    })
    .state('logged.newtravel', {
      url: 'newtravel',
      sticky: true,
      templateUrl: "../js/views/newtravel.html",
      controller: "AddCountryController",
      controllerAs: 'vm'
    })
    .state('logged.article', {
      url: 'article/{articleId}',
      sticky: true,
      templateUrl: "../js/views/article.html",
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
              .catch(err => {
                console.log(err)
              })
          },
          Travels: (ApiService) => {
            return ApiService
              .travelsList()
              .then((r) => {
                return r.data
              })
              .catch(err => {
                console.log(err)
              })
          },
          Assets: (ApiService) => {
            return ApiService
              .assetsList()
              .then((r) => {
                return r.data;
              })
              .catch(err => {
                console.log(err)
              })
          },
          Anecdotes: (ApiService) => {
            return ApiService
              .anecdotesList()
              .then(r => {
                return r.data;
              })
              .catch(err => {
                console.log(err)
              })
          }
        }
    })
    $urlRouterProvider.otherwise('/'); 
}