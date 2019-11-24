class UserRequestController {
  constructor(
    $rootScope,
    AuthService,
    $stateParams,
    toastr
  ) {
    this.AuthService = AuthService;
    this.$rootScope = $rootScope;
    this.$stateParams = $stateParams;
    this.toastr = toastr;

    console.log('UserRequestController')
    this.isSignin = false;
    this.isSignup = false;
    this.userRequest = false;
    this.userRequestToValid = true;
    this.userRequestEmail = this.$stateParams.email;
    this.userRequestRole = this.$stateParams.role;
    this.fr = $rootScope.rvm.fr
    this.it = $rootScope.rvm.it
    this.isSuperAdmin = $rootScope.rvm.userInfo.role;
  
  }

  changeLang() {
    this.$rootScope.rvm.fr = !this.$rootScope.rvm.fr; 
    this.$rootScope.rvm.it = !this.$rootScope.rvm.it;
    this.$rootScope.$emit('changeLang')
    this.$state.reload('logged')
  }

  generateToken() {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'
    let token = ''
    for (let i = 0; i <= 12; i++) {
      const randomNumber = Math.floor(Math.random() * 62)
      token += characters[randomNumber]
    }
    return token
  }

  confirmUserRequest() {
    const user = {
      email: this.userRequestEmail,
      role: this.userRequestRole,
      token: this.generateToken()
    }
    this.AuthService.sendRequest('confirm', user.email, user.role, user.token).then(res => {
      if (res.status == 200) {
        this.toastr.success("Your request has been sent !", "Success !")
      }
    }, rej => {
      console.debug(rej);
      this.toastr.error("There was an unexpected error, please retry !", "Error")
    })
  }

  refuseUserRequest() {
    this.AuthService.sendRequest('refuse', this.userRequestEmail, this.userRequestRole).then(res => {
      if (res.status == 200) {
        this.toastr.success("Your request has been sent !", "Success !")
      }
    }, rej => {
      console.debug(rej);
      this.toastr.error("There was an unexpected error, please retry !", "Error")
    })
    // new view with textarea and a message to send
    // api -> send a mail to the user with explanation
  }

  signin() {
  }

  signup(email, pass) {
  }

  sendUserRequest() {
  }

  saveToken(token) {
  }

  verifyToken() {
  }

}

export default UserRequestController;
