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
   return this.$http.post(this.BASE_PATH + 'api/users/signin', {email: email, password: password});
  }
 
  sendRequest (requestType, email, role, token = null) {
   return this.$http.post(this.BASE_PATH + 'api/users/request', {type: requestType, email: email, role: role, pwd_token: token});   
  }
 
  loginLogout () {
    this.$window.localStorage.removeItem('user');
    this.$rootScope.rvm.isLogged = false;
  }
 
  loginSignup (email, password) {
    return this.$http.post(this.BASE_PATH + 'api/users/signup', {email: email, password: password})
  }

  insertNewUser (user) {
    return this.$http.post(this.BASE_PATH + 'api/users', {user: user});
  }

  isAuthenticated () {
    const token = this.getToken();
    return this.$http.post(this.BASE_PATH + 'api/users/verifytoken', {token: token})
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

  getUserByEmail (email) {
    return this.$http.get(this.BASE_PATH + 'api/users/email/' + email)
  }
 
}