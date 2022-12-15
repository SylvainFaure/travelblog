const jsonToHTML = (json) => {
  const dom = {
    paragraph: 'p'
  }
  const markup = json.blocks
    .map((block) => {
      const wrapper = document.createElement(dom[block.type])
      wrapper.innerHTML = block.data.text
      const removeInlineStyle = (node) => {
        Array.from(node.children).forEach((n) => {
          if (n.getAttribute('style')) {
            n.removeAttribute('style')
          }
          if (Array.from(n.children).length) {
            removeInlineStyle(n)
          }
        })
      }
      removeInlineStyle(wrapper)
      return wrapper.outerHTML
    })
    .join('')
  // console.log(markup)
  return markup
}

export { jsonToHTML }
