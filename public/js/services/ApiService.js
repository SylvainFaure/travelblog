export default class ApiService {
 constructor(
   $http,
   $rootScope,
   Upload
 ) {
  'ngInject'
  this.BASE_PATH = 'http://localhost:3000'

  this.$http = $http;
  this.$rootScope = $rootScope;
  this.Upload = Upload;

  if (!this.$rootScope.rvm) {
    this.$rootScope.rvm = {};
  }
  if (window.location.hostname === "localhost" && window.location.port === "3000") {
    this.$rootScope.rvm.debug = true;
    this.$rootScope.rvm.fr = true;
    this.$rootScope.rvm.it = false;
  }

 }

 travelsList() {
  return this.$http.get(this.BASE_PATH + '/api/travels');
 }

 travelDetail(id) {
  return this.$http.get(this.BASE_PATH + '/api/travel/' + id);
 }

 travelArticles(id) {
  return this.$http.get(this.BASE_PATH + '/api/travel/' + id + '/articles')
 }

 travelCreate(travel) {
  return this.$http.post(this.BASE_PATH + '/api/newtravel', travel)
 }

 travelUpdate(travel, id) {
  return this.$http.put(this.BASE_PATH + '/api/update-travel/' + id, travel)
 }

 travelDelete(id) {
  return this.$http.delete(this.BASE_PATH + '/api/delete-travel/' + id);
 }

 articlesList() {
  return this.$http.get(this.BASE_PATH + '/api/articles');
 }

 articleCreate(article) {
  return this.$http.post(this.BASE_PATH + '/api/newarticle', article);
 }

 articleDetail(id) {
  return this.$http.get(this.BASE_PATH + '/api/article/' + id);
 }

 articleUpdate(article, id){
  return this.$http.put(this.BASE_PATH + '/api/update-article/' + id, article);
 }

 articleDelete(id) {
  return this.$http.delete(this.BASE_PATH + '/api/delete-article/' + id);  
 }

 assetsUpload(assets, data) {
  return this.Upload.upload({
    method: 'POST',
    url: this.BASE_PATH + '/api/newasset', //webAPI exposed to upload the file
    data:{file:assets, infos: data} //pass file as data, should be user ng-model
  })
 }

 assetsList() {
  return this.$http.get(this.BASE_PATH + '/api/assets');  
 }

 assetsDelete(ids, names) {
  return this.$http.post(this.BASE_PATH + '/api/delete-assets', {ids: ids, names: names}); // pass an array  
 }

 assetUpdate (asset, id) {
  return this.$http.put(this.BASE_PATH + '/api/update-asset/' + id, asset);
 }
}
