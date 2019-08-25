export default class asideMenuController {
  constructor(
		$rootScope
  ) {
		'ngInject'
    this.$rootScope = $rootScope;
  }	
  getItemLink (item) {
    if (item.travel_id) {
      return 'logged.travel({travelId: item.travel_id})'
    }
    if (item.article_id) {
      return 'logged.article({articleId: item.article_id})'
    }
    if (item.anecdote_id) {
      return 'logged.anecdote({anecdoteId: item.anecdote_id})'
    }
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
    if (item.anecdote_id) {
      return item.anecdote_title
    }
  }
}
export const asideMenuComponent = {
	templateUrl: 'admin/components/aside-menu.component.html',
	controller: asideMenuController,
	controllerAs: 'vm',
	bindings: {
    items: "<"
	}
}