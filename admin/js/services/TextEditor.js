export default class TextEditor {
  constructor (
    $rootScope,
    $sce
  ) {
    this.isEditingComponent = false;
    this.components = [];
    this.context = '';
    this.$rootScope = $rootScope;
    this.$sce = $sce;

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

  trustedHtml(html) {
		return this.$sce.trustAsHtml(html)
	}

  addContent(type, content, _content) {
    if (typeof content == 'string') {
      content.replace(/<!--[^>]*-->?/gm, '');
    }
    const randomId = Math.floor(Math.random() * 100)
    const comp = {
      id: `${type}-${randomId}`,
      type,
      content,
      rawContent: _content,
      position: this.components.length
    }
    if (comp.$$hashKey) {
      delete comp.$$hashKey
    }
    this.components.push(comp);
    this.$rootScope.$emit("componentsChange", this.context, this.components);
  }

  updateContent(comp, content, _content) {
    const c = this.components.find(c => c.id === comp.id)
    c.content = content
    c.rawContent = _content
    this.$rootScope.$emit("componentsChange", this.context, this.components);
  }

  deleteComponent(comp) {
    this.components.forEach((component, index) => {
      if (component.position > comp.position) {
        component.position -= 1;
      }
      if (component.position == comp.position) {
        if (component.id == comp.id) {
          this.components.splice(index, 1);
        }
      }
    })
    this.$rootScope.$emit("componentsChange", this.context, this.components);
  }

  changePosition(comp, direction) {
    if (direction == "up") {
      let isCompUp;
      this.components.forEach((component, index) => {
        if (component.position == comp.position - 1) {
          component.position += 1;
          isCompUp = true;
        }
      })
      if (isCompUp) {
        this.components.forEach((c, i) => {
          if (c.id === comp.id) {
            this.components[i].position -= 1;
          }
        })
      }
    }
    if (direction == "down") {
      let isCompDown;
      this.components.forEach((component, index) => {
        if (component.position == comp.position + 1) {
          component.position -= 1;
          isCompDown = true;
        }
      })
      if (isCompDown) {
        this.components.forEach((c, i) => {
          if (c.id === comp.id) {
            this.components[i].position += 1;
          }
        })
      }
    }
    this.$rootScope.$emit("componentsChange", this.context, this.components);
  }

}