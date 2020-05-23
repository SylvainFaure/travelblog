export default class previewEditorController {
  constructor(
		TextEditor,
		$rootScope,
		$sce,
		$scope
  ) {
		'ngInject'
		this.TextEditor = TextEditor;
		this.AWS_BUCKET_PATH = process.env.AWS_BUCKET_PATH
		$rootScope.$on('changeAsset', (e, from, asset) => {
			if (from == "previewEditor") {
				this.editingImage = asset;
			}
		});
		this.rvm = $rootScope.rvm;
		this.$sce = $sce
		this.tooltipAnecdote()
	}	

	$onInit() {
		if (this.components.length) {
			this.components.forEach(comp => {
				comp.isEditing = false;
			})
		}
	}	

	tooltipAnecdote() {
		setTimeout(() => {
			$('[class^=anecdote]').hover(function () {
				const text = $(this).data('title')
				$(this).prepend(`<span class="anecdote_tooltip" style="top: 30px; left: 10px;">${text}</span>`)
			}, function () {
				$('.anecdote_tooltip').remove()
			})
		}, 1000)
	}

	getTrustedSce(type, url) {
		return this.$sce.trustAsResourceUrl(`https://open.spotify.com/embed/${type}/${url}`)
	}

	goToEditMode(comp) {
		comp.isEditing = true;
	}
	changePos(comp, dir) {
		this.TextEditor.changePosition(comp, dir);
	}

	deleteComp(comp) {
		this.TextEditor.deleteComponent(comp);
	}

	changeImage(comp) {
		this.openModal();
		this.editingComponent = comp;
		this.editingImage = comp.content.originalAsset || comp.originalAsset;
	}

	confirmImage() {
		const content = {
			name: this.editingImage.asset_name,
			src: this.editingImage.asset_src,
			fullWidth: this.editingImageWidth,
			position: this.editingImagePosition,
			originalAsset: this.editingImage
		}
		this.TextEditor.updateContent(this.editingComponent, content)
		delete this.editingComponent;
		delete this.editingImage;
	}

	openModal() {
		this.randomModalClass = "" + Math.floor(Math.random() * 1000);
		setTimeout(() => {
			$(`.ui.modal.change-image.${this.randomModalClass}`).modal('show')
		})
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

	execAction(action) {
		$('#highlighted-text').addClass(action).removeAttr('id');
		this.content = $(".editor-comp_content").html();
		this.unsetActionsElement()
	}



}
export const previewEditorComponent = {
	templateUrl: 'admin/components/preview-editor.html',
	controller: previewEditorController,
	controllerAs: 'vm',
	bindings: {
		components: "=",
		editable: "<",
		previewEditorAssets: "=",
		previewEditorAnecdotes: "<"
	}
}