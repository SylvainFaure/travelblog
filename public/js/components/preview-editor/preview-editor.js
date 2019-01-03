export default class previewEditorController {
  constructor(
		TextEditor,
		$rootScope
  ) {
		'ngInject'
		this.TextEditor = TextEditor;
		$rootScope.$on('articleAsset', (e, asset) => {
			this.asset = asset
		});	
	}	
	
	goToEditMode(comp) {
		console.log(comp);
		comp.isEditing = true;
	}
	changePos(comp, dir) {
		this.TextEditor.changePosition(comp, dir);
	}

	deleteComp(comp) {
		this.TextEditor.deleteComponent(comp);
	}

	addContent() {
		let content;
		if (this.type == "image") {
			content = this.asset;
		} else {
			content = this.content;
		}
		this.TextEditor.addContent(this.type, content)
		this.destroyComponent()
	}	

	destroyComponent() {
		this.TextEditor.isEditingComponent = false;
		$('editor-comp').remove()
	}

	setActionsElement(top, left) {
		$('.editor-comp_actions').fadeIn(400).css({'display':'flex'})
	}
	unsetActionsElement() {
		$('.editor-comp_actions').fadeOut(400).css({'display':'none'})
	}

	execAction(action) {
		$('#highlighted-text').addClass(action).removeAttr('id');
		this.content = $(".editor-comp_content").html();
		this.unsetActionsElement()
	}

	getPosition() {
		if (this.type == "title") {
			return 0
		} else {
			return this.position + 1;
		}
	}

}
export const previewEditorComponent = {
	templateUrl: 'components/preview-editor.html',
	controller: previewEditorController,
	controllerAs: 'vm',
	bindings: {
		components: "=",
		editable: "<"
	}
}