class ArticleController {
  constructor(
    $rootScope, 
    $scope, 
    $stateParams, 
    $state, 
    ArticleDetail, 
    Assets, 
    Travels, 
    ApiService,
    TextEditor
  ) {
    this.$rootScope = $rootScope; 
    this.$scope = $scope;
    this.$stateParams = $stateParams; 
    this.$state = $state;

    this.json_in = ArticleDetail;
    this.articleAssets = Assets;
    this.travels = Travels;
    this.ApiService = ApiService;
    this.TextEditor = TextEditor;
    
    this.stepOne = true;
    this.hasGallery = this.hasGallery();
    this.editGallery = false;


    /* Editor */
    if (this.json_in.newarticle) {
      this.assetsGallery = [];
    } else {
      if (this.$rootScope.rvm.fr) {
        let parsed = JSON.parse(this.json_in.article_gallery_fr);
        this.assetsGallery = typeof parsed == "object" && parsed !== null ? parsed : [];

        let parsedComponents = JSON.parse(this.json_in.article_long_desc_fr);
        this.articleComponents = typeof parsedComponents == "object" && parsedComponents !== null ? parsedComponents : [];
        this.TextEditor.components = this.articleComponents;
      }
      if (this.$rootScope.rvm.it) {
        let parsed = JSON.parse(this.json_in.article_gallery_it);
        this.assetsGallery = typeof parsed == "object" && parsed !== null ? parsed : [];

        let parsedComponents = JSON.parse(this.json_in.article_long_desc_it);
        this.articleComponents = typeof parsedComponents == "object" && parsedComponents !== null ? parsedComponents : [];
        this.TextEditor.components = this.articleComponents;
      }
    }
    $rootScope.$on("articleComponentsChange", (e, comps) => {
      this.articleComponents = comps;
      // $state.reload();
    })

    /* Gallery */
		$rootScope.$on('addArticleAssetGallery', (e, asset) => {
			this.assetsGallery.push(asset);
		});
		$rootScope.$on('deleteArticleAssetGallery', (e, asset) => {
			const copyAssetGallery = this.assetsGallery;
			this.assetsGallery.map((a, i) => {
				if (a.asset_id == asset.asset_id) {
					copyAssetGallery.splice(i, 1);
				}
			this.assetsGallery = copyAssetGallery;
			})
    });
    
    $rootScope.$on('changeCover', (e, from, asset) => {
      if (from == "article") {
        this.json_in.article_cover = asset.asset_name;
      }
		});
    
    /* Lang */
    this.fr = this.$rootScope.rvm.fr;
    this.it = this.$rootScope.rvm.it;
    this.$rootScope.$on('changeLang', () => {
      this.fr = this.$rootScope.rvm.fr;
      this.it = this.$rootScope.rvm.it;
    })

    if (!this.json_in.newarticle) {
      this.json_in.newarticle = false;
      this.isEditing = false;
    } else {
      this.isEditing = true;
    }

    /* TextEditor actions */
    this.actions = [
      {
        label: "Paragraph",
        icon:  "font"
      },
      {
        label: "Subtitle",
        icon:  "heading"
      },
      {
        label: "Image",
        icon:  "image outline"
      },
      {
        label: "Catch phrase",
        icon: "font"
      }
    ]
    this.formatTravelCountries();
  }

  hasGallery() {
    if (this.fr) return this.json_in.article_gallery_fr.length
    if (this.it) return this.json_in.article_gallery_it.length
  }

  addArticleGallery() {
    if (this.fr) {
      this.json_in.article_gallery_fr = JSON.stringify(this.assetsGallery);
    }
    if (this.it) {
      this.json_in.article_gallery_it = JSON.stringify(this.assetsGallery);
    }
    this.assetsGallery = [];
    this.editGallery = false;
  }

  formatTravelCountries() {
    if (this.fr) {
      this.travels.forEach((travel) => {
        travel.travel_countries_fr = travel.travel_countries_fr.split(',')
      })
    }
    if (this.it) {
      this.travels.forEach((travel) => {
        travel.travel_countries_it = travel.travel_countries_it.split(',')
      })
    }
  }

  getSelectedTravelCountries() {
    let travelId = Number(this.json_in.article_travel_id);
    if (travelId) {
      let travel = this.travels.filter((travel) => {
        return travel.travel_id == travelId
      })
      this.selectedTravelCountries = this.fr ? travel[0].travel_countries_fr : travel[0].travel_countries_it 
    }
  }

  openModal(type) {
    if (type == 'cover') {
      $('.ui.modal.cover').modal('show')
    }
  }

  editCover() {
   this.openModal('cover');
  }

  saveCover() {

  }

  toggleStep() {
    this.stepOne = !this.stepOne
    this.stepTwo = !this.stepTwo
    this.isEditing = false
  }

  formatArticle(article) {
    if (this.fr) {
      if (!article.article_gallery_fr) {
        article.article_gallery_fr = '[]';
      }
      if (this.articleComponents) {
        article.article_long_desc_fr = JSON.stringify(this.articleComponents);
        this.resetTextEditor();
      }
      if (!article.article_long_desc_fr) {
        article.article_long_desc_fr = '[]'; 
      }
    }
    if (this.it) {
      if (!article.article_gallery_it) {
        article.article_gallery_it = '[]';
      }
      if (this.articleComponents) {
        article.article_long_desc_it = JSON.stringify(this.articleComponents);
        this.resetTextEditor();
      }
      if (!article.article_long_desc_it) {
        article.article_long_desc_it = '[]'; 
      }
    }
    return article;
  }

  saveArticle() {
    const article = this.formatArticle(this.json_in);
    if (article.newarticle) {
      delete article.newarticle
      this.ApiService.articleCreate(article).then((resp) => {
        console.log(resp)
        this.$state.go('article', {resourcePath: resp.data.insertId})
        this.toggleStep();
      }, (error) => {
        console.warn(error);
      })
    } else {
      delete article.newarticle
      this.ApiService.articleUpdate(article, article.article_id).then((resp) => {
        console.log(resp)
        this.isEditing = false;
        this.$state.reload()
      }, (error) => {
        console.warn(error)
      })
    }
    
  }

  deleteArticle(id) {
    this.ApiService.articleDelete(id).then((result) => {
      console.log(result)
      this.$state.go('articles', {success: true})
    })
  }

  resetTextEditor() {
    this.TextEditor.components = [];
    this.TextEditor.isEditingComponent = false;
  }

  addCountry() {
    // ouvrir popup
    // form avec informations basiques
    // appeler fonction save
    // reload ?
  } 

  addTravel() {
    // ouvrir popup
    // form avec informations basiques
    // appeler fonction save
    // reload ?
  } 

  $onDestroy() {
    console.log('on destroy')
    // todo : dialog to save / not to save ?
    this.resetTextEditor();
  }
}

export default ArticleController;