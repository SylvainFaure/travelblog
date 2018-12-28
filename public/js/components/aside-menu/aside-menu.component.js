export default class asideMenuController {
  constructor(
		$rootScope
  ) {
		'ngInject'
    this.$rootScope = $rootScope;
  }	

  getItemName (item) {
    if (item.travel_id) {
      if (this.$rootScope.rvm.fr) {
        return item.travel_title_fr
      } else {
        return item.travel_title_it
      }
    }
    if (item.article_id) {
      if (this.$rootScope.rvm.fr) {
        return item.article_title_fr
      } else {
        return item.article_title_it
      }
    }
  }
}
export const asideMenuComponent = {
	templateUrl: 'components/aside-menu.component.html',
	controller: asideMenuController,
	controllerAs: 'vm',
	bindings: {
    items: "<"
	}
}