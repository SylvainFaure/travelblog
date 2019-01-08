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
    this.fr = $rootScope.rvm.fr
    this.it = $rootScope.rvm.it
  }

  changeLang() {
    this.$rootScope.rvm.fr = !this.$rootScope.rvm.fr; 
    this.$rootScope.rvm.it = !this.$rootScope.rvm.it;
    this.$rootScope.$emit('changeLang')
    this.$state.reload('logged')
  }

  confirmUserRequest() {
    const user = {
      email: this.userRequestEmail,
      role: this.userRequestRole
    }
    this.AuthService.insertNewUser(user).then(res => {
      console.log(res)
      this.toastr.success("The user is registered correctly in database", "Success");
      // flash message
      // send mail to user inserted
    }, rej => {
      console.log(rej)
      this.toastr.success("The user has not been registered", "Error");
    })
  }

  updateRole() {
    console.log(this.userRequestRole) // = this.userRequestRole;
  }

  refuseUserRequest() {

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
