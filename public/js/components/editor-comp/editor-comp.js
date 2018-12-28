export default class editorCompController {
  constructor(
		TextEditor,
		$rootScope
  ) {
		'ngInject'
		this.TextEditor = TextEditor;
		this.init()
		$rootScope.$on('articleAsset', (e, asset) => {
			this.asset = asset
		});	
	}

	mouseUpEvent(e) {
		this.unsetActionsElement();
		if (window.getSelection().toString().length) {
			let span = document.createElement('span')
			$(span).attr('id','highlighted-text')
			console.log(window.getSelection().getRangeAt(0))
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
			console.log(this.assets)
		})
	}
	
	
	getContent(e, type) {
		let content;
		if (type == "asset") {
			content = {};
		} else {
			content = e.currentTarget.innerHTML
		} 
		this.content = content;
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
export const editorCompComponent = {
	templateUrl: 'components/editor-comp.html',
	controller: editorCompController,
	controllerAs: 'vm',
	bindings: {
		type: '@',
		actions: '<',
		assets: "<"
	}
}