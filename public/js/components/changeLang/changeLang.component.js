export default class changeLangController {
  constructor(
		$rootScope
  ) {
		'ngInject'
    this.$rootScope = $rootScope;
    this.getLang()
    this.$rootScope.lang = window.navigator.language
  }	
  getLang() {
    switch (window.navigator.language) {
      case 'it-IT':
        this.$rootScope.lang = 'it';
        break;
      case 'fr-FR':
        this.$rootScope.lang = 'fr';
        break;
      default:
        this.$rootScope.lang = 'fr' // TODO geolocation + fallback sur le pays le plus proche
    }
    this.$rootScope.$emit('changed-lang')
  }
  changeLang() {
    this.$rootScope.lang = this.$rootScope.lang == 'fr' ? 'it' : 'fr' 
    this.$rootScope.$emit('changed-lang')
  }
}
export const changeLangComponent = {
	templateUrl: 'public/components/change-lang.html',
	controller: changeLangController,
	controllerAs: 'vm',
	bindings: {
	
	}
}