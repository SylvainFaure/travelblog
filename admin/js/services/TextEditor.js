import isEqual from 'lodash.isequal';
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

  addContent(type, content) {
    if (typeof content == 'string') {
      content.replace(/<!--[^>]*-->?/gm, '');
    }
    const comp = {
      type: type,
      content: content,
      position: this.components.length
    }
    if (comp.$$hashKey) {
      delete comp.$$hashKey
    }
    this.components.push(comp);
    this.$rootScope.$emit("componentsChange", this.context, this.components);
  }

  updateContent(comp, content) {
    this.components.forEach((c) => {
      if (isEqual(c, comp)) {
        c.content = content;
      }
    })
    this.$rootScope.$emit("componentsChange", this.context, this.components);
  }

  deleteComponent(comp) {
    this.components.forEach((component, index) => {
      if (component.position > comp.position) {
        component.position -= 1;
      }
      if (component.position == comp.position) {
        if (isEqual(component, comp)) {
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
          if (isEqual(c, comp)) {
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
          if (isEqual(c, comp)) {
            this.components[i].position += 1;
          }
        })
      }
    }
    this.$rootScope.$emit("componentsChange", this.context, this.components);
  }

}