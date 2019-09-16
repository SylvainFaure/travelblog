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
    this.labels = this.fr ? {
        edit: 'Modifier / Charger les images',
        associate: 'Associer les images',
        wip: 'En cours'
    } : {
      edit: 'Modificare / Caricare le immagini',
      associate: 'Associare le immagini',
      wip: 'Ci stiamo lavorando'
    }
    
    $('.ui.secondary.menu')
      .on('click', (ev) => {
        let elt = ev.target
        if  (!Object.keys(elt.dataset).length) {
          elt = $(ev.target).parents('[data-tab]')[0]
        }
        $(elt).addClass('active')
        if (elt.dataset.tab == 'first') {
          $('[data-tab=second]').removeClass('active')
        } else {
          $('[data-tab=first]').removeClass('active')
        }

        $.tab('change tab', elt.dataset.tab);
      })
    
    $('.ui.accordion').accordion();
  }
}

export default AssetsController;