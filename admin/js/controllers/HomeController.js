class HomeController {
  constructor(
    $rootScope, 
    $scope,
    $state,
    ArticlesList,
    TravelsList,
    AssetsList,
    Settings,
    ApiService,
    AuthService,
    toastr
  ) {
    'ngInject';
    this.articles = ArticlesList 
    this.travels = TravelsList
    this.assets = AssetsList
    this.settings = Settings
    this.AuthService = AuthService;
    this.ApiService = ApiService
    console.log('HomeController')
    this.rvm = $rootScope.rvm;
    this.$rootScope = $rootScope
    this.$state = $state
    this.toastr = toastr

    this.isEditing = false

    this.AWS_BUCKET_PATH = process.env.AWS_BUCKET_PATH

    this.cover = this.getCover()
    this.isLogged = $rootScope.rvm.isLogged;
    $('.settings .image').dimmer({on: 'hover'})
    $rootScope.$on('changeAsset', (e, from, asset) => {
      if (from == "home" && this) {
        if (this.$rootScope.rvm.fr) {
          this.settings.cover_fr = asset.asset_id
        }
        if (this.$rootScope.rvm.it) {
          this.settings.cover_it = asset.asset_id          
        }
        this.ApiService.updateSettings(this.settings)
          .then(resp => {
            console.log(resp)
            this.toastr.success("The main cover has been correctly updated")
          })
          .catch(err => {
            console.log(err)
            this.toastr.error("There was an unexpected error, please try again")
          })
      }
    });
    $scope.$on('$stateChangeStart', () => {
      console.log('state change home')
    })
  }
  changeLang() {
    this.$rootScope.rvm.fr = !this.$rootScope.rvm.fr; 
    this.$rootScope.rvm.it = !this.$rootScope.rvm.it;
    this.$rootScope.$emit('changeLang')
    this.$state.reload('logged')
  }

  getCover() {
    return this.assets.filter(asset => {
      const id = this.rvm.fr ? Number(this.settings.cover_fr) : Number(this.settings.cover_it)
      return Number(asset.asset_id) == id
    })[0]
  }

  logout() {
    this.AuthService.loginLogout();
    this.$window.location.reload();
  }

  changeCover() {
    $('.ui.modal.maincover').modal('show')
  }

  closeModal() {
    $('.ui.modal.maincover').modal('hide')
    this.ApiService.settings()
      .then(resp => {
        this.settings = resp.data
        this.cover = this.getCover()
        this.$state.reload()
      })
      .catch(err => {
        console.log(err)
      })
  }

  saveMainTitle() {
    if (this.rvm.fr && !this.settings.site_name_fr) {
      this.toastr.warning("Il faut un titre !")
      return
    }
    if (this.rvm.it && !this.settings.site_name_it) {
      this.toastr.warning("Questo sito ha bisogno di un titolo!")
      return
    }
    this.isEditing = false
    this.ApiService.updateSettings(this.settings)
    .then(resp => {
      this.toastr.success("The main title has been correctly updated")
    })
    .catch(err => {
      console.log(err)
      this.toastr.error("There was an unexpected error, please try again")
    })
  }

  deploySite () {
    this.ApiService.siteDeploy()
      .then(r => {
        console.log(r)
        this.toastr.success("The site has successfully been built!")
      })
      .catch(err => {
        this.toastr.error("There was an unexpected error, please try again")
      })
  }
}
export default HomeController;