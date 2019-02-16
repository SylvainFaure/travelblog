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
    TextEditor,
    DateService,
    toastr
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
    this.DateService = DateService;
    this.toastr = toastr;
    
    this.stepOne = true;
    this.hasGallery = this.hasGallery();
    this.editGallery = false;


    /* Mapping db data */
    if (this.json_in.newarticle) {
      this.assetsGallery = [];      
    } else {
      /* Dates */
      this.articleDates = {
        from: "",
        to: ""
      }
      if (this.json_in.article_date_from) { 
        const timestampFrom = this.json_in.article_date_from;
        this.json_in.article_date_from = this.DateService.fromTimestampToDate(timestampFrom)
        this.articleDates.from = this.DateService.fromTimestampToDatePickerDate(timestampFrom)
      }
      if (this.json_in.article_date_to) {
        const timestampTo = this.json_in.article_date_to;
        this.json_in.article_date_to = this.DateService.fromTimestampToDate(timestampTo)
        this.articleDates.to = this.DateService.fromTimestampToDatePickerDate(timestampTo)
      }
      
      /* Travel */
      if (this.json_in.article_travel_id) {
        const travel = this.travels.filter(travel => {
          return travel.travel_id == this.json_in.article_travel_id;
        })
        this.json_in.article_travel_fr = travel[0].travel_title_fr;
        this.json_in.article_travel_it = travel[0].travel_title_it;
      }

      if (this.$rootScope.rvm.fr) {
        /* Gallery */
        let parsed = JSON.parse(this.json_in.article_gallery_fr);
        this.assetsGallery = typeof parsed == "object" && parsed !== null ? parsed : [];

        /* Editor, long desc */
        let parsedComponents = JSON.parse(this.json_in.article_long_desc_fr);
        this.articleComponents = typeof parsedComponents == "object" && parsedComponents !== null ? parsedComponents : [];
        this.TextEditor.components = this.articleComponents;

        this.isPublished = this.json_in.article_published_fr;
      }
      if (this.$rootScope.rvm.it) {
        let parsed = JSON.parse(this.json_in.article_gallery_it);
        this.assetsGallery = typeof parsed == "object" && parsed !== null ? parsed : [];

        let parsedComponents = JSON.parse(this.json_in.article_long_desc_it);
        this.articleComponents = typeof parsedComponents == "object" && parsedComponents !== null ? parsedComponents : [];
        this.TextEditor.components = this.articleComponents;

        this.isPublished = this.json_in.article_published_it;
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
    
    $rootScope.$on('changeAsset', (e, from, asset) => {
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
    if (type == 'dates') {
      this.randomClass = "" + Math.floor(Math.random() * 1000);
      setTimeout(() => {
        $(`.ui.modal.dates.${this.randomClass}`).modal('show')
      })
    }
  }

  initDatepicker() {
    $('#rangestart').calendar({
      type: 'date',
      endCalendar: $('#rangeend'),
      onChange: (date) => {
        const timestamp = this.DateService.fromDateToTimestamp(date)
        this.json_in.article_date_from = this.DateService.fromTimestampToDate(timestamp)
        this.articleDates.from = this.DateService.fromTimestampToDatePickerDate(timestamp)
	    }    
    });
    $('#rangeend').calendar({
      type: 'date',
      startCalendar: $('#rangestart'),
      onChange: (date) => {
        const timestamp = this.DateService.fromDateToTimestamp(date)
        this.json_in.article_date_to = this.DateService.fromTimestampToDate(timestamp)
        this.articleDates.to = this.DateService.fromTimestampToDatePickerDate(timestamp)
	    }
    });
  }

  editCover() {
   this.openModal('cover');
  }

  editDates() {
    this.openModal('dates');
    setTimeout(() => {
      this.initDatepicker();
    })
  }

  toggleStep() {
    this.stepTwo = !this.stepTwo
    this.isEditing = false
  }

  formatArticle(article) {
    if (article.article_date_from) {
      article.article_date_from = this.DateService.fromDateToTimestamp(article.article_date_from)
    }
    if (article.article_date_to) {
      article.article_date_to = this.DateService.fromDateToTimestamp(article.article_date_to)
    }
    if (article.article_travel_fr) {
      delete article.article_travel_fr;
    }
    if (article.article_travel_it) {
      delete article.article_travel_it;
    }

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

  saveArticle(mode) {
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
        if (mode == 'direct') {
          this.$state.reload();
        }
      }, (error) => {
        console.warn(error)
      })
    }
  }

  publishArticle() {
    if (this.$rootScope.rvm.fr) {
      this.json_in.article_published_fr = "true";
      this.json_in.article_published_date_fr = Date.now();
    }
    if (this.$rootScope.rvm.it) {
      this.json_in.article_published_it = "true";
      this.json_in.article_published_date_it = Date.now();
    }
    this.saveArticle(this.json_in);
    this.ApiService.articlePublish(this.json_in.article_id, this.json_in)
      .then(success => {
        console.log(success)
        this.toastr.success("Your article has been published !", "Success !")
      }, err => {
        console.log(err)
        this.toastr.error("There was an unexpected error, please retry !", "Error")
      })
  }

  unpublishArticle() {
    if (this.$rootScope.rvm.fr) {
      this.json_in.article_published_fr = false;
    }
    if (this.$rootScope.rvm.it) {
      this.json_in.article_published_it = false;
    }
    this.saveArticle(this.json_in);
    this.ApiService.articleUnpublish(this.json_in.article_id)
      .then(success => {
        console.log(success)
        this.toastr.success("Your article has been unpublished !", "Success !")
      }, err => {
        console.log(err)
        this.toastr.error("There was an unexpected error, please retry !", "Error")
      })
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
