import EditorJS from'@editorjs/editorjs';
import AddAnecdote from '../../custom-editor-actions/addanecdote';
import { jsonToHTML } from '../../custom-editor-actions/editor-utils';

export default class editorCompController {
  constructor(
		TextEditor,
		$rootScope,
		ApiService,
		$state,
		$scope
	) {
		'ngInject'
		this.$state = $state;
		this.editor = undefined;
		this.editorUpdated = false
		this.ApiService = ApiService;
		this.TextEditor = TextEditor;
		this.assets = $scope.$parent.vm.assets
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
		
		this.html = ''
		
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

	initEditor () {
		console.log('init editor')
		this.editor = new EditorJS({
			holderId: 'editor',
			onReady: () => {
				// console.log('Editor.js is ready to work!')
		  },
		 	onChange: () => {
			 // console.log('Now I know that Editor\'s content changed!')
			},
			tools: {
				anecdote: {
					class: AddAnecdote,
					inlineToolbar : true,
					config: {}
				},
			},
			data: this.comp && this.comp.rawContent ? this.comp.rawContent : {}
		})
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

	async addContent() {
		const promise = new Promise(async (res, rej) => {
			let content, _content;
			if (this.type == "image") {
				content = this.comp.content;
			} else if (this.type == "music") {
				const splittedLink = this.comp.content.link.split('/')
				content = {
					link: splittedLink[splittedLink.length - 1],
					type: splittedLink[splittedLink.length - 2]
				}
			} else {
				_content = await this.editor.save();
				content = jsonToHTML(_content)
				// console.log('ADD', _content, content)
			}
			res({content, _content})
		})
		const {content, _content} = await promise
		console.log(content)
		this.TextEditor.addContent(this.type, content, _content);
		// console.log(this.TextEditor)
		this.destroyComponent();
	}	

	async updateContent() {
		const promise = new Promise(async (res, rej) => {
			let content, _content;
			if (this.type == "image") {
				content = this.comp.content;
			} else if (this.type == "music") {
				const splittedLink = this.comp.content.link.split('/')
				content = {
					link: splittedLink[splittedLink.length - 1],
					type: splittedLink[splittedLink.length - 2]
				}
			} else {
				_content = await this.editor.save();
				content = jsonToHTML(_content)
				// console.log('ADD', _content, content)
			}
			res({content, _content})
		})
		const {content, _content} = await promise
		this.TextEditor.updateContent(this.comp, content, _content);
		console.log(this.TextEditor)
		this.comp.isEditing = false
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

	turnBackToActions(type) {
		$(`.editor-comp_actions-${type}-input`).fadeOut().css({'display':'none'})
	}

	execAction(action) {
		if (action == 'addlink') {
			// show input
			// get link and wrap highlightedtext with it
			this.unsetActionsElement()
			$('.editor-comp_actions-link-input').fadeIn().css({'display':'flex'})
		} else if (action == 'addanecdote') {
			this.unsetActionsElement()
			$('.editor-comp_actions-anecdote-input').fadeIn().css({'display':'flex'})
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

	addAnecdote() {
		$('#highlighted-text').addClass(`anecdote_${this.activeAnecdote.anecdote_id}`).removeAttr('id').attr('data-title', this.activeAnecdote.anecdote_title);
		this.content = $(".editor-comp_content").html().replace(/<!--[^>]*-->?/gm, '');
		$('.editor-comp_actions-anecdote-input').fadeOut().css({'display':'none'})
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
			// fullWidth: this.comp.content.fullWidth,
			// position: this.comp.content.position,
			originalAsset: this.asset
		};
		this.asset = null;
		this.showAssetPicker = false
	}

	openModal() {
		this.randomModalClass = "" + Math.floor(Math.random() * 1000);
		setTimeout(() => {
			$('.ui.modal').modal('hide others')
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
		// assets: "<",
		anecdotes: '<',
		comp: "<"
	}
}