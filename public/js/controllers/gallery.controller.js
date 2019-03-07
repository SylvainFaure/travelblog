class GalleryController {
  constructor(
   assets
  ) {
    var vm = this
    vm.assets = assets;
    console.debug(vm.asets)

    vm.$rootScope.$on('changed-lang', () => {
      if (vm.$rootScope.lang == 'fr') {
      }
      if (vm.$rootScope.lang == 'it') {
      }
    })
    
  }
 
  openImg(asset) {
   
  }
    
}

export default GalleryController;
