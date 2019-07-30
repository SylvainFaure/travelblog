class AssetsController {
  constructor (
    $rootScope, 
    $state, 
    Assets, 
  ) {
    this.assets = Assets;
    console.log(this.assets)
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.fr = $rootScope.rvm.fr;
    this.it = $rootScope.rvm.it;
    this.$rootScope.$on('changeLang', () => {
        this.fr = $rootScope.rvm.fr;
        this.it = $rootScope.rvm.it;
        this.$state.reload();
    })
    $('.ui.secondary.menu')
      .on('click', (ev) => {
        $(ev.target).addClass('active')
        if (ev.target.dataset.tab == 'first') {
          $('[data-tab=second]').removeClass('active')
        } else {
          $('[data-tab=first]').removeClass('active')
        }

        $.tab('change tab', ev.target.dataset.tab);
      })
    
    $('.ui.accordion').accordion();
  }
}

export default AssetsController;