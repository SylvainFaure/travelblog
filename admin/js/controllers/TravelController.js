class TravelController {
	constructor(
		$scope, 
		$state, 
		$rootScope, 
		Travel, 
		TravelArticles, 
		Assets, 
		ApiService
	) {
		this.$state = $state;
		this.$scope = $scope;
		console.log('TravelController')
		this.travel = Travel;
		this.travelArticles = TravelArticles; 
		this.assets = Assets
		this.ApiService = ApiService;

		this.fr = $rootScope.rvm.fr;
		this.it = $rootScope.rvm.it;
		$rootScope.$on('changeLang', function(){
			this.fr = $rootScope.rvm.fr;
			this.it = $rootScope.rvm.it;
		})
		this.isEditing = false;
		
		$rootScope.$on('changeCover', (e, from, asset) => {
			if (from == "travel") {
				this.travel.travel_cover = asset.asset_name
			}
		})

		this.setArticlePosition();

	}

	openModal() {
		$('.ui.modal.country').modal('show')
	}

	editCover() {
		this.openModal()
	}

	saveCountry() {
		this.ApiService
			.travelUpdate(this.travel, this.travel.travel_id)
			.then(function(r) {
				// success message
				this.isEditing = false;
				this.$state.reload()
			})
	}
	activeSortable() {
		// need to reinstall jqueryui
		$('#sortable').sortable({
			update: (event, ui) => {
				this.sortedArticles = $('#sortable').sortable('toArray', {attribute: "data-article"})
				this.setArticlePosition(angular.fromJson(this.sortedArticles))
			}
		})
	}

	setArticlePosition(){
		let articles = this.travelArticles;
		var sortedArticles = []
		if (articles) {
			articles.forEach(function(art, index){
				var article = angular.fromJson(art)
				var pos = index + 1
				article.article_position = '' + pos;
				sortedArticles.push(article)
				console.log(article.article_place_fr + ' - ' + article.article_position)
			})
		}
		this.travelArticles = angular.fromJson(sortedArticles);
		//this.$state.reload()
	}
}

export default TravelController;
