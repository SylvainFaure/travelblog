export default class tagController {
  constructor() {
    'ngInject'
    this.tagColor = this.color();
  }	

  color() {        
    let colors = ['red', 'orange', 'yellow', 'teal', 'blue', 'olive', 'green', 'violet', 'purple', 'pink', 'brown', 'grey', 'black']
    return colors[Math.floor(Math.random() * 13)]
  }
  cbFn(value) {
    this.cb({value: value})
  }

}
export const tagComponent = {
	templateUrl: 'admin/components/tag.component.html',
	controller: tagController,
	controllerAs: 'vm',
	bindings: {
    label: "<",
    deletable: '<',
    cb: '&'
	}
}