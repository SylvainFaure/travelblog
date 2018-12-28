export default class textEditorController {
  constructor(
		$scope,
		$compile,
		TextEditor
  ) {
		'ngInject'
		this.$scope = $scope;
		this.$compile = $compile;
		this.TextEditor = TextEditor;
		this.elementActions = [
			{
				icon: 'bold',
				action: 'bold'
			},
			{
				icon: 'font',
				action: 'normal'
			},
			{
				icon: 'italic',
				action: 'italic'
			},
			{
				icon: 'linkify',
				action: 'addlink'
			}
		]
	}
	toCamelCase(str) {
		return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
			return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
		}).replace(/\s+/g, '');
	}

	triggerAction(action) {
		this.TextEditor.isEditingComponent = true
		let elmt = $('.text-editor_active-action')
		let assets = action == "Image" ? JSON.stringify(this.assets) : '';
		elmt.append(`<editor-comp type="${this.toCamelCase(action)}" actions='${JSON.stringify(this.elementActions)}' assets='${assets}'></editor-comp>`)
		this.$compile($('editor-comp'))(this.$scope)
  }

}
export const textEditorComponent = {
	templateUrl: 'components/text-editor.component.html',
	controller: textEditorController,
	controllerAs: 'vm',
	bindings: {
		actions: '<',
		assets: '<'
	}
}