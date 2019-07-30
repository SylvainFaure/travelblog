import { format } from 'date-fns'
export default class assetPickerController {
  constructor(
    $rootScope, 
    $scope, 
    $state, 
    $window, 
    ApiService,
    toastr
  ) {
		'ngInject'
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$window = $window;
    this.$state = $state;
    this.ApiService = ApiService;
    this.toastr = toastr;
    this.format = format;

    this.isSubmitted = false;
    this.assetToModify = '';
    this.modifiedAsset = '';
    this.newAssets = [];
    this.newAssetsData = { "0": {} }
    this.travelCategories = []
    this.placeCategories = []
    this.travels = []
    this.dimmer();
    this.getTravels();
		this.AWS_BUCKET_PATH = process.env.AWS_BUCKET_PATH

    this.fr = $rootScope.rvm.fr;
    this.it = $rootScope.rvm.it;
    $rootScope.$on('changeLang', function(){
        this.fr = $rootScope.rvm.fr;
        this.it = $rootScope.rvm.it;
        this.setCategories();
    })

    $scope.$watch('this.asset', (asset) => {
      if (asset) {
        this.assetToModify = asset.asset_src
      }
    }) 

    $scope.$watch('this.progress', () => {
      $('#progressBar').progress('increment');
    })

    setTimeout(() => {
      this.assets.forEach(asset => {
        asset.asset_article_ids = asset.asset_article_ids == "null" ? "[]" : asset.asset_article_ids
        asset.assetDate = asset.name ? this.format(new Date(Number(asset.asset_name.split("_")[0])), 'dd/MM/yyyy') : this.format(Date.parse(new Date), 'dd/MM/yyyy')
      })
    })

  }	

  initNewAssetsObjects(files) {
    if (files.length) {
      for (var i = 0; i < this.newAssets.length; i++){
        this.newAssetsData[i] = {
          title_fr: '',
          title_it: '',
          place_fr: '',
          place_it: '',
          country_fr: '',
          country_it: '',
          desc_fr: '',
          desc_it: ''
        }
      }
    }
  }
  setCategories() {
    this.assets.forEach((asset) => {
      if (this.$rootScope.rvm.fr) {
        asset.asset_place_fr == '' && !this.placeCategories.includes('') ? this.placeCategories.push('') : null
        asset.asset_place_fr && !this.placeCategories.includes(asset.asset_place_fr) ? this.placeCategories.push(asset.asset_place_fr) : null; 

        asset.asset_country_fr == '' && !this.travelCategories.includes('') ? this.travelCategories.push('') : null
        asset.asset_country_fr && !this.travelCategories.includes(asset.asset_country_fr) ? this.travelCategories.push(asset.asset_country_fr) : null; 
      }
      if (this.$rootScope.rvm.it) {
        asset.asset_place_it == '' && !this.placeCategories.includes('') ? this.placeCategories.push('') : null
        asset.asset_place_it && !this.placeCategories.includes(asset.asset_place_it) ? this.placeCategories.push(asset.asset_place_it) : null; 

        asset.asset_country_it == '' && !this.travelCategories.includes('') ? this.travelCategories.push('') : null
        asset.asset_country_it && !this.travelCategories.includes(asset.asset_country_it) ? this.travelCategories.push(asset.asset_country_it) : null;
      }
    })
  } 

  getTravels() {
    this.ApiService.travelsList().then(travels => {
      this.travels = travels.data
    })
  }

  closeModal() {
    $('.ui.modal.asset').modal('hide')
  }

  initAccordion() {
    $('.ui.accordion').accordion('close');
  }
  
  dimmer (){
    if (this.actions) {
      $('.special.cards .image').dimmer({on: 'hover'})
    }
  };

  //$('.ui.checkbox').checkbox();  

  chooseAsset (asset, event, from) {
    $('.asset-picker-img').css('opacity', '0.5')
    $(event.target).css('opacity', '1')
    this.asset = asset;
    this.$rootScope.$emit('changeAsset', from, this.asset)
  }

  toggleAsset(asset, checked) {
    if (checked) {
      this.$rootScope.$emit('addArticleAssetGallery', asset);
    } else {
      this.$rootScope.$emit('deleteArticleAssetGallery', asset);
    }
  }
	
  updateAssets() {
    this.ApiService.assetsList()
      .then((r) => {
        this.assets = r.data;
      })
      this.$state.reload();
      //this.$window.location.reload();
  }

  submit (){
    if (this.newAssets) { 
      this.uploadAsset(this.newAssets, this.newAssetsData); 
    }
  }

  uploadAsset(assets, data) {
    this.isSubmitted = true;
    if (data == undefined) {
      data = {}
    }
    this.ApiService
      .assetsUpload(assets, data)
      .then((resp) => {  
          this.newAssets = null
          this.isSubmitted = false;
          resp.config.data.file.forEach((file) => {
              this.toastr.success(`${file.name} correctly uploaded`, "Success !");
          })
          this.updateAssets();
      }, (err) => { 
	      this.isSubmitted = false;
	      this.toastr.error(`There was an error ${err.status}`, "Error");
      }, (evt) => {
        this.progress = parseInt(100.0 * evt.loaded / evt.total);            
      });
  };
  

  editAsset(asset) {
    asset.asset_article_ids = JSON.parse(asset.asset_article_ids)
    this.asset = asset
    this.ApiService.articlesList()
      .then(resp => {
        this.articles = resp.data.map(art => {
          art.article_slug = `${art.article_slug_fr} / ${art.article_slug_it}`
          art.checked = asset.asset_article_ids.includes(art.article_id)
          return art
        })
        this.selectedArticle = {}
        this.selectedArticles = this.articles.filter(art => art.checked)

        $('.ui.modal').modal('show')
        $('.ui.dropdown').dropdown()
      })
      .catch(err => {
        console.warn(err)
      })
    this.ApiService.travelsList()
      .then(resp => {
        this.travels = resp.data.map(travel => {
          travel.travel_slug = `${travel.travel_slug_fr} / ${travel.travel_slug_it}`
          return travel
        })
        this.selectedTravel = this.travels.filter(travel => travel.travel_id == asset.asset_travel_id)[0]
      })

  }
  deleteSelectedArticle(article) {
    this.asset.asset_article_ids.splice(this.asset.asset_article_ids.indexOf(article.article_id), 1)
    this.articles.map(art => {
      art.checked = this.asset.asset_article_ids.includes(art.article_id)
      return art
    })
    this.selectedArticles = this.articles.filter(art => art.checked)
  }
  setSelectedArticles() {
    if (this.selectedArticle) {
      this.asset.asset_article_ids.push(this.selectedArticle.article_id)
      this.articles = this.articles.map(art => {
        art.checked = this.asset.asset_article_ids.includes(art.article_id)
        return art
      })
      this.selectedArticles.push(this.selectedArticle)
    }
  }
  setSelectedTravel() {
    this.asset.asset_travel_id = this.selectedTravel.travel_id
  }

  updateAsset(asset) {     
    //let assetModified = this.dataURItoBlob(modifiedAsset)
    //assetModified.name = asset.asset_name
    if (asset.assetDate) delete asset.assetDate
    asset.asset_article_ids = JSON.stringify(asset.asset_article_ids)
    this.ApiService.assetUpdate(asset, asset.asset_id)
      .then(resp => {
        console.log(resp)
        this.toastr.success("Asset updated successfully")
      })
      .catch(err => {
        this.toastr.error("There was an error! Try again")

        console.log(err)
      })
    // if (this.removeOriginal) {
    //   this.deleteAsset(asset.asset_id, asset.asset_name)
    // }
  }

  deleteAsset (index, name) {
    this.ApiService.assetsDelete([index], [name]).then((resp) => {
	    this.toastr.success(`The file was correctly deleted`, "Success !");
    	this.$state.reload()
    	//this.$window.location.reload()
    }, (err) => {
    	this.toastr.error(`There was an error ${err.status}`, "Error");
    })
    
  }

  deleteAssets () {
    let toDelete = $('.delete-assets')
    let index = []
    let names = []
    for (var i = 0; i < toDelete.length; i++) {
      if (toDelete[i].checked) {
        index.push(toDelete[i].value)
        names.push(toDelete[i].name)
      }
    }
    this.ApiService.assetsDelete(index, names).then((resp) => {
	this.toastr.success(`Files were correctly deleted`, "Success !");
    	this.$state.reload()
    	this.$window.location.reload()
    }, (err) => {
    	this.toastr.error(`There was an error ${err.status}`, "Error");
    })
  }

  resetFilter() {
    this.tag = "";
    this.category = "";
  }

  dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    let byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    let arrayBuffer = new ArrayBuffer(byteString.length);
    let _ia = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
      _ia[i] = byteString.charCodeAt(i);
    }

    let dataView = new DataView(arrayBuffer);
    let blob = new Blob([dataView], {type: mimeString});
    return blob;
  }
 
}
export const assetPickerComponent = {
	templateUrl: 'admin/components/asset-picker.component.html',
	controller: assetPickerController,
	controllerAs: 'vm',
	bindings: {
    assets: "=",
    actions: "<",
    allowUpload: "<",
    disablePlace: "<",
    isGallery: "<",
    context: "@"
	}
}
