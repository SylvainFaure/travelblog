export default class editorCompController {
  constructor(
		TextEditor,
		$rootScope
  ) {
		'ngInject'
		this.TextEditor = TextEditor;
		this.AWS_BUCKET_PATH = process.env.AWS_BUCKET_PATH
		this.init()
		$rootScope.$on('changeAsset', (e, from, asset) => {
			if (from == "editorComp") {
				this.asset = asset
			}
		});	

		this.fr = $rootScope.rvm.fr;
    this.it = $rootScope.rvm.it;
    $rootScope.$on('changeLang', () => {
      this.fr = $rootScope.rvm.fr;
      this.it = $rootScope.rvm.it;
		})
		this.rvm = $rootScope.rvm;
		this.imgPositionOptions = this.getImgPosOptions()
		this.showAssetPicker = false			
	}
	getImgPosOptions() {
		if (this.fr) {
			return [
				{ key: 'left', label: 'Gauche' },
				{ key: 'center', label: 'Centré' },
				{ key: 'right', label: 'Droite' }
			]
		}
		if (this.it) {
			return [
				{ key: 'left', label: 'Sinistra' },
				{ key: 'center', label: 'Centro' },
				{ key: 'right', label: 'Destra' }
			]
		}
	}
	mouseUpEvent(e) {
		this.unsetActionsElement();
		if (window.getSelection().toString().length) {
			let span = document.createElement('span')
			$(span).attr('id','highlighted-text')
			console.log(window.getSelection().getRangeAt(0).toString())
			let selection = window.getSelection().getRangeAt(0);
			let reg = /[\<\>\/]/gm;
			if (selection.toString().match(reg)) {
				// Check if it starts with an html tag 
				// Check if it ends with an html tag
				// if both add/remove/toggle class
				// if not add another span without use surround contents
			} else {
				selection.surroundContents(span)
			}
			this.setActionsElement(e.clientY, e.clientX)
		}
	}

	init() {
		setTimeout(()=> {
			$(`.editor-comp_content`).focus()
			if ((this.type == "image") && !this.comp) {
				this.comp = {
					content: {}
				}
			}
		})
	}
	
	
	getContent(e) {
		const content = e.currentTarget.innerHTML
		this.content = content;
	}

	addContent() {
		let content;
		if (this.type == "image") {
			content = this.comp.content;
		} else if (this.type == "music") {
			const splittedLink = this.comp.content.link.split('/')
			content = {
				link: splittedLink[splittedLink.length - 1],
				type: splittedLink[splittedLink.length - 2]
			}
		} else {
			content = this.content;
		}
		this.TextEditor.addContent(this.type, content);
		this.destroyComponent();
	}	

	updateContent() {
		let content;
		if (this.comp.type !== "image") {
			content = $('.editor-comp_content-edit').html();
		}
		if (this.comp.type == "image") {
			content = this.comp.content;
		}
		this.TextEditor.updateContent(this.comp, content);
		this.comp.isEditing = false;
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
		if (action == 'addlink') {
			// show input
			// get link and wrap highlightedtext with it
			this.unsetActionsElement()
			$('.editor-comp_actions-link-input').fadeIn().css({'display':'flex'})
		} else {
			$('#highlighted-text').addClass(action).removeAttr('id');
			this.content = $(".editor-comp_content").html().replace(/<!--[^>]*-->?/gm, '');
			this.unsetActionsElement()
		}
	}

	addLink() {
		const link = document.createElement('a')
		$(link).attr('href', this.activeLink)
		$(link).attr('id', 'active-link')
		const text = $('#highlighted-text').text()
		$(link).html(text)
		$('#highlighted-text').replaceWith(link)
		$('.editor-comp_actions-link-input').fadeOut().css({'display':'none'})
	}

	getPosition() {
		if (this.type == "title") {
			return 0
		} else {
			return this.position + 1;
		}
	}

	chooseImage(content) {
		this.openModal();
		this.showAssetPicker = true
		this.asset = content.originalAsset;
	}

	confirmImage() {
		this.comp.content = {
			name: this.asset.asset_name,
			src: this.asset.asset_src,
			fullWidth: this.comp.content.fullWidth,
			position: this.comp.content.position,
			originalAsset: this.asset
		};
		this.asset = null;
		this.showAssetPicker = false
	}

	openModal() {
		this.randomModalClass = "" + Math.floor(Math.random() * 1000);
		setTimeout(() => {
			$(`.ui.modal.choose-image.${this.randomModalClass}`).modal('show');
		})
	}

}
export const editorCompComponent = {
	templateUrl: 'admin/components/editor-comp.html',
	controller: editorCompController,
	controllerAs: 'vm',
	bindings: {
		type: '@',
		actions: '<',
		assets: "<",
		comp: "<"
	}
}