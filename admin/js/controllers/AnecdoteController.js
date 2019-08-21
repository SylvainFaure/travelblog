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
	}
	
}

export default TravelController;
