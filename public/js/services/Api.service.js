export default class ApiService {
  constructor (
    $http,
    $stateParams,
    $rootScope
  ) {
    'ngInject';
    this.$http = $http;
    this.$stateParams = $stateParams
    this.BASE_PATH = process.env.BASE_PATH.slice(0, -1) // delete last slash
    $rootScope.baseUrl = this.BASE_PATH
  }

  getTravels() {
    return this.$http.get(this.BASE_PATH + '/api/travels').then(resp => {
      return resp.data
    });
  }

  getArticles() {
    return this.$http.get(this.BASE_PATH + '/api/articles').then(resp => {
      return resp.data
    });
  }

  getAssets() {
    return this.$http.get(this.BASE_PATH + '/api/assets').then(resp => {
      return resp.data
    });
  }

  getTravelDetail(id) {
    return this.$http.get(this.BASE_PATH + '/api/travels/' + id).then(resp => {
      return resp.data
    });
   }
  getTravelArticles(countryId) {
    return this.$http.get(this.BASE_PATH + '/api/travels/' + countryId + '/articles').then(resp => {
      return resp.data
    })
   }

  getArticleDetail(id) {
    return this.$http.get(this.BASE_PATH + '/api/articles/' + id).then(resp => {
      return resp.data
    });
  }
}