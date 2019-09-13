class LoginController {
  constructor(
    $rootScope,
    AuthService,
    $window,
    $state,
    toastr
  ) {
    this.AuthService = AuthService;
    this.$rootScope = $rootScope;
    this.$window = $window;
    this.$state = $state;
    this.toastr = toastr;

    console.log('LoginController')
    
    this.isSignin = true;
    this.isSignup = false;
    this.userRequest = false;
    this.userRequestToValid = false;
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
      if (res.status == 200 && res.data.status == 200) {
        this.saveToken(res.data.token);
        this.toastr.success("You are correctly identified", "Success !");
        this.$state.reload();
      } else {
        this.toastr.warning('Your email or password are wrong, try again', "Ops !")
      }
    }, rej => {
      if (rej.status == 401) {
        this.toast.warning("You don't have a registered access", "Ops !")
      }
    }) 
  }  

  signup() {
    const email = this.signupEmail;
    const pass = this.signupPass;
    const confPass = this.signupPassConf;
    
    this.AuthService.loginSignup(email, pass).then(res => {
      this.toastr.success("You have correctly change your password", "Great !");
      this.switchSignInSignUp()
    }, rej => {
      console.debug(rej);
      this.toastr.success("There was an error", "Ops !");
    })
  }
  
  switchSignInSignUp() {
    this.isSignin = !this.isSignin;
    this.isSignup = !this.isSignup;
  }
  
  confirmPassword() {
    const pass = this.signupPass;
    const confPass = this.signupPassConf;
    return pass == confPass;
  }
  
  confirmEmail(email) {
    const reg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return reg.test(email)
  }

  sendUserRequest() {
    const email = this.sendRequestMail;
    const role = this.sendRequestRole || "visitor";
    this.AuthService.sendRequest('request', email, role).then(res => {
      if (res.status == 200) {
        this.toastr.success("Your request has been sent !", "Success !")
      }
    }, rej => {
      console.debug(rej);
      this.toastr.error("There was an unexpected error, please retry !", "Error")
    })
  }

  saveToken(token) {
    let payload = JSON.parse(atob(token.split(".")[1]));
    let userInfo = {
      email: payload.email,
      role: payload.role,
      token: token
    }
    if (this.$window.localStorage.getItem('user')) {
      this.$window.localStorage.removeItem('user');
    }
    this.$rootScope.rvm.userInfo = userInfo;
    this.$window.localStorage.setItem('user', JSON.stringify(userInfo));
  }

  verifyToken() {
    this.AuthService.isAuthenticated().then(res => {
      if (res.status == 200) {
        this.$rootScope.rvm.userInfo = {
          email: res.data.email,
          role: res.data.role,
          token: res.config.data.token
        };
        this.$rootScope.rvm.isLogged = true;
        if (res.data.name == "JsonWebTokenError" || res.data.name == "TokenExpiredError") {
          this.$rootScope.rvm.userInfo = {};
          this.$rootScope.rvm.isLogged = false;
          console.debug("You are not log in: %s", res.data.name)
        }
      } 
    }, rej => {
      console.debug(rej);
      this.$rootScope.rvm.isLogged = false;
    })
  }

}

export default LoginController;
