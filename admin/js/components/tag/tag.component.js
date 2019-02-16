export default class tagController {
  constructor() {
    'ngInject'
    this.tagColor = this.color();
  }	

  color() {        
    let colors = ['red', 'orange', 'yellow', 'teal', 'blue', 'olive', 'green', 'violet', 'purple', 'pink', 'brown', 'grey', 'black']
    return colors[Math.floor(Math.random() * 13)]
  }

}
export const tagComponent = {
	templateUrl: 'components/tag.component.html',
	controller: tagController,
	controllerAs: 'vm',
	bindings: {
    label: "<"
	}
}