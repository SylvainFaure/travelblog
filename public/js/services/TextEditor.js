export default class TextEditor {
  constructor (
  ) {
    this.isEditingComponent = false;
    this.components = [];
    
  }

  addParagraph(para) {
    let paragraphComp = {
      type: "paragraph",
      content: para,
      position: this.components.length
    }
    this.components.push(paragraphComp);
  }

  addCatchPhrase(catchPhrase) {
    const catchPhraseComp = {
      type: "catch",
      content: catchPhrase,
      position: this.components.length
    }
    this.components.push(catchPhraseComp);
  }

  addSubtitle(subtitle) {
    const subtitleComp = {
      type: "subtitle",
      content: subtitle,
      position: this.components.length
    }
    this.components.push(subtitleComp);
  }

  addImage(image) { // asset = {}
    const imageComp = {
      type: "image",
      content: {
        name: image.asset_name,
        src: image.asset_src,
        fullWidth: image.width || "full",
        position: image.position || "center"
      },
      originalAsset: image,
      position: this.components.length
    }
    this.components.push(imageComp);
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

}