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
    this.chosenAssets = this.assets.filter(a => a.asset_travel_id === this.activeTravelId)
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
      this.chosenAssets = this.assets.filter(a => a.asset_travel_id === this.activeTravelId)
      $.tab('change tab', elt.dataset.tab);
    })
  }

  initGalleryListeners () {
    this.$rootScope.$on('addAssetGallery', (e, asset, context) => {
      // console.log(this.modifiedAssetsId)
      const isAlreadyChosen = this.chosenAssets.find(a => asset.asset_id === a.asset_id)
      if (context == 'assets' && !isAlreadyChosen) {
        asset.previous_travel_id = asset.asset_travel_id
        asset.asset_travel_id = this.activeTravelId
        this.modifiedAssetsId.push(asset.asset_id)
        this.chosenAssets.push(asset)
        // console.log('add', this.chosenAssets)
      }
		});
		this.$rootScope.$on('deleteAssetGallery', (e, asset, context) => {
      if (context == 'assets') {
        asset.asset_travel_id = asset.previous_travel_id
        this.modifiedAssetsId.filter(id => id !== asset.asset_id)
        this.chosenAssets.filter(a => a.asset_id !== asset.asset_id)
        // console.log('delete', this.chosenAssets)
      }
    });
  }

  removeFromChosenAssets (asset) {
    asset.asset_travel_id = asset.previous_travel_id
    this.modifiedAssetsId.filter(id => id !== asset.asset_id)
    this.chosenAssets = this.chosenAssets.filter(a => a.asset_id !== asset.asset_id)
    // console.log(this.chosenAssets)
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