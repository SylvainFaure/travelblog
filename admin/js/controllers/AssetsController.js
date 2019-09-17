class AssetsController {
  constructor (
    $rootScope, 
    $state, 
    Assets,
    Travels,
    ApiService,
    toastr
  ) {
    this.assets = Assets;
    this.travels = Travels;
    this.ApiService = ApiService;
    this.toastr = toastr;
    console.log(this.assets)
    this.$rootScope = $rootScope;
    this.AWS_BUCKET_PATH = process.env.AWS_BUCKET_PATH;
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
    
    this.activeTravelId = this.travels[0].travel_id;
    this.modifiedAssetsId = []
    this.initMainTabs()
    this.initTravelTabs()
    this.initGalleryListeners()
    $('.ui.accordion').accordion();
    
  }

  initMainTabs () {
    $('.ui.secondary.menu.main')
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
  }

  initTravelTabs () {
    $('.ui.secondary.menu.travels')
    .on('click', (ev) => {
      let elt = ev.target
      if  (!Object.keys(elt.dataset).length) {
        elt = $(ev.target).parents('[data-tab]')[0]
      }
      $('.ui.secondary.menu.travels > a').removeClass('active')
      $(elt).addClass('active')
      this.activeTravelId = Number(elt.dataset.tab.split('/')[1])
      $.tab('change tab', elt.dataset.tab);
    })
  }

  initGalleryListeners () {
    this.$rootScope.$on('addAssetGallery', (e, asset, context) => {
      if (context == 'assets') {
        asset.previous_travel_id = asset.asset_travel_id
        asset.asset_travel_id = this.activeTravelId
        this.modifiedAssetsId.push(asset.asset_id)
        console.log(asset)
      }
		});
		this.$rootScope.$on('deleteAssetGallery', (e, asset, context) => {
      if (context == 'assets') {
        asset.asset_travel_id = asset.previous_travel_id
        this.modifiedAssetsId.splice(this.modifiedAssetsId.indexOf(asset.asset_id), 1)
        console.log(asset)
      }
    });
  }

  getTravelAssets (travelId) {
    return this.assets.filter(asset => Number(asset.asset_travel_id) == Number(travelId))
  }

  saveAssets () {
    this.modifiedAssetsId.forEach(id => {
      const asset = this.assets.find(asset => asset.asset_id == id)
      delete asset.assetDate 
      delete asset.previous_travel_id
      this.ApiService.assetUpdate(asset, id)
        .then(resp => {
          console.log(resp)
          this.modifiedAssetsId = []
          this.toastr.success('Modifiche salvate con successo', 'Yeah!')
        })
        .catch(err => {
          this.toastr.error('Errore inattesa', 'Error')
          console.warn(err)
        })
    })
  }


}

export default AssetsController;