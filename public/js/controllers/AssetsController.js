class AssetsController {
  constructor (
    $rootScope, 
    $state, 
    Assets, 
  ) {
    this.assets = Assets;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.fr = $rootScope.rvm.fr;
    this.it = $rootScope.rvm.it;
    this.$rootScope.$on('changeLang', () => {
        this.fr = $rootScope.rvm.fr;
        this.it = $rootScope.rvm.it;
        this.$state.reload();
    })
    
    $('.ui.accordion').accordion();
  }
}

export default AssetsController;