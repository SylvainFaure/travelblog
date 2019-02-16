export default class ApiService {
  constructor (
    $http,
    $stateParams,
    $rootScope
  ) {
    'ngInject';
    this.$http = $http;
    this.$stateParams = $stateParams
    this.BASE_PATH = 'http://localhost:3000'
    $rootScope.baseUrl = this.BASE_PATH
  }

  getAll () {
    return this.$http.get("http://localhost:8080/vendor/api/articles.json").then(resp => {
      return resp.data;
    });
  }

  getTravels() {
    return this.$http.get(this.BASE_PATH + '/api/countries').then(resp => {
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

  getCountryDetail(id) {
    return this.$http.get(this.BASE_PATH + '/api/country/' + id).then(resp => {
      return resp.data
    });
   }
  getCountryArticles(countryId) {
    return this.$http.get(this.BASE_PATH + '/api/country/' + countryId + '/articles').then(resp => {
      return resp.data
    })
   }

  getArticleDetail(id) {
    return this.$http.get(this.BASE_PATH + '/api/article/' + id).then(resp => {
      return resp.data
    });
  }


  getCountry(country) {
    return this.getAll().then(countries => {
      return countries.filter(c => {
        return country == c.country_name
      })
    }); 
  }
  getPost(country, post) {
    return this.getAll().then(countries => {
      return this.getCountry(country).then(country => {
        return country[0].articles.filter(art => {
          return art.place == post
        })
      }) 
    })
  }
}