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
	}
	toCamelCase(str) {
		return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
			return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
		}).replace(/\s+/g, '');
	}

	triggerAction(action) {
		this.TextEditor.isEditingComponent = true
		let elmt = $('.text-editor_active-action')
		let assets = action == "image" ? JSON.stringify(this.assets) : '';
		let anecdotes = JSON.stringify(this.anecdotes)
		const isAnecdote = this.TextEditor.elementActions.filter(anec => anec.action == 'addanecdote')
		if(this.TextEditor.context == 'article' && !!isAnecdote.length) {
			this.TextEditor.elementActions.push({
				icon: 'sticky note outline',
				action: 'addanecdote'
			})
		}
		elmt.append(`<editor-comp type="${action}" actions='${JSON.stringify(this.TextEditor.elementActions)}' anecdotes='${anecdotes}' assets='${assets}'></editor-comp>`)
		this.$compile($('editor-comp'))(this.$scope)
  }

}
export const textEditorComponent = {
	templateUrl: 'admin/components/text-editor.component.html',
	controller: textEditorController,
	controllerAs: 'vm',
	bindings: {
		actions: '<',
		assets: '<',
		anecdotes: '<'
	}
}