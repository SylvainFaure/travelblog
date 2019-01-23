export default class AuthService {
  constructor(
    $http,
    $rootScope,
    $window
  ) {
   'ngInject'
   this.BASE_PATH = process.env.BASE_PATH;
 
   this.$http = $http;
   this.$rootScope = $rootScope;
   this.$window = $window; 
  }
 
  loginSignin (email, password) {
   return this.$http.post(this.BASE_PATH + '/api/user/signin', {email: email, password: password});
  }
 
  loginSendRequest (email) {
   return this.$http.post(this.BASE_PATH + '/api/user/sendrequest', {email: email});   
  }
 
  loginLogout () {
    this.$window.localStorage.removeItem('user');
    this.$rootScope.rvm.isLogged = false;
  }
 
  loginSignup (email, password) {
    return this.$http.post(this.BASE_PATH + '/api/user/signup', {email: email, password: password})
  }

  insertNewUser (user) {
    return this.$http.post(this.BASE_PATH + '/api/user/newuser', {user: user});
  }

  isAuthenticated () {
    const token = this.getToken();
    if (token.indexOf("token") !== -1) {
      return this.$http.post(this.BASE_PATH + '/api/user/verifytoken', {token: token})
    } else {
      return this.$http.post(this.BASE_PATH + '/api/user/verifytoken', {token: token})
    }
  }

  getToken () {
    let token = "token.token.token";
    let user = this.getUser();
    if (user) {
      token = user.token;
    }
    return token;
  }
  
  getUser () {
    return JSON.parse(this.$window.localStorage.getItem('user'));
  }
 }
 