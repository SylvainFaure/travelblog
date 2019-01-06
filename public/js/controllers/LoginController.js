class LoginController {
  constructor(
    $rootScope,
    AuthService,
    $window,
    $state
  ) {
    this.AuthService = AuthService;
    this.$rootScope = $rootScope;
    this.$window = $window;
    this.$state = $state;
    console.log('LoginController')
    this.isSignin = true;
    this.userRequest = false;
    this.fr = $rootScope.rvm.fr
    this.it = $rootScope.rvm.it

    this.verifyToken();
  }

  changeLang() {
    this.$rootScope.rvm.fr = !this.$rootScope.rvm.fr; 
    this.$rootScope.rvm.it = !this.$rootScope.rvm.it;
    this.$rootScope.$emit('changeLang')
    this.$state.reload('logged')
  }

  signin() {
    this.AuthService.loginSignin(this.signinMail, this.signinPassword).then(res => {
      if (res.status == 200) {
        this.saveToken(res.data.token)
      }
    }, rej => {
      if (rej.status == 401) {
        this.notHaveAccess = true
        setTimeout(() => {
          this.notHaveAccess = false;
        }, 5000)
      }
    }) 
  }

  signup(email, pass) {
    this.AuthService.loginSignup(email, pass).then(res => {
      // confirm that the password is registered
      // swith to signin form
    })
  }

  sendUserRequest() {
    let email = this.sendRequestMail
    this.AuthService.loginSendRequest(email).then(res => {
      if (res.status == 200) {
        // qqch comme 
        // this.FlashMessage({status: 'success', message: 'The request is done', time: 5000})
      }
    }, rej => {

    })
  }

  saveToken(token) {
    let payload = JSON.parse(atob(token.split(".")[1]));
    let userInfo = {
      email: payload.email,
      role: payload.role,
      token: token
    }
    this.$window.localStorage.setItem('user', JSON.stringify(userInfo));
    this.$state.reload();
  }

  verifyToken() {
    this.AuthService.isAuthenticated().then(res => {
      if (!res.data.error) {
        this.$rootScope.rvm.isLogged = true;
      } else {
        this.$rootScope.rvm.isLogged = false;
      }
    })
  }

}

export default LoginController;
