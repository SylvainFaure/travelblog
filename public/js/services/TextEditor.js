export default class TextEditor {
  constructor (
    $rootScope
  ) {
    this.isEditingComponent = false;
    this.components = [];
    this.$rootScope = $rootScope;
  }


  addParagraph(para) {
    let paragraphComp = {
      type: "paragraph",
      content: para,
      position: this.components.length
    }
    this.components.push(paragraphComp);
    this.$rootScope.$emit("articleComponentsChange", this.components);
  }

  addCatchPhrase(catchPhrase) {
    const catchPhraseComp = {
      type: "catch",
      content: catchPhrase,
      position: this.components.length
    }
    this.components.push(catchPhraseComp);
    this.$rootScope.$emit("articleComponentsChange", this.components);
  }

  addSubtitle(subtitle) {
    const subtitleComp = {
      type: "subtitle",
      content: subtitle,
      position: this.components.length
    }
    this.components.push(subtitleComp);
    this.$rootScope.$emit("articleComponentsChange", this.components);
  }

  addImage(image) { // asset = {}
    const imageComp = {
      type: "image",
      content: {
        name: image.asset_name,
        src: image.asset_src,
        fullWidth: image.width || "full",
        position: image.position || "center",
        originalAsset: image
      },
      position: this.components.length
    }
    this.components.push(imageComp);
    this.$rootScope.$emit("articleComponentsChange", this.components);
  }

  addContent(type, content) {
    switch(type) {
      case "subtitle":
        this.addSubtitle(content);
        break;
      case "catchPhrase":
        this.addCatchPhrase(content);
        break;
      case "paragraph":
        this.addParagraph(content);
        break;
      case "image":
        this.addImage(content);
        break;
      default:
        // do sthg
    }
  }

  updateContent(comp, content) {
    this.components.forEach((c) => {
      if (_.isEqual(c, comp)) {
        c.content = content;
      }
    })
    this.$rootScope.$emit("articleComponentsChange", this.components);
  }

  deleteComponent(comp) {
    this.components.forEach((component, index) => {
      if (component.position > comp.position) {
        component.position -= 1;
      }
      if (component.position == comp.position) {
        if (_.isEqual(component, comp)) {
          this.components.splice(index, 1);
        }
      }
    })
    this.$rootScope.$emit("articleComponentsChange", this.components);
  }

  changePosition(comp, direction) {
    if (direction == "up") {
      this.components.forEach((component, index) => {
        if (component.position == comp.position - 1) {
          component.position += 1;
        }
        if (component.position == comp.position) {
          if (_.isEqual(component, comp)) {
            this.components[index].position -= 1;
          }
        }
      })
    }
    if (direction == "down") {
      this.components.forEach((component, index) => {
        if (component.position == comp.position + 1) {
          component.position -= 1;
        }
        if (component.position == comp.position) {
          if (_.isEqual(component, comp)) {
            this.components[index].position += 1;
          }
        }
      })
    }
    this.$rootScope.$emit("articleComponentsChange", this.components);
  }

}