export default class editorTitleController {
  constructor(
		TextEditor
  ) {
		'ngInject'
		this.TextEditor = TextEditor;

		$('.editor-title_content').focus()
	}
	
	getContent(e) {
		let content = e.currentTarget.innerText
		this.title = content;
	}

	addTitle() {
		this.TextEditor.title = this.title
		this.destroyComponent()
	}	

	destroyComponent() {
		this.TextEditor.isEditingComponent = false;
		$('editor-title').remove()
	}

}
export const editorTitleComponent = {
	templateUrl: 'components/editor-title.html',
	controller: editorTitleController,
	controllerAs: 'vm',
	bindings: {
		
	}
}