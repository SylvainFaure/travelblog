const jsonToHTML = (json) => {
  const dom = {
    'paragraph': 'p'
  }
  const markup = json.blocks.map(block => {
    const wrapper = document.createElement(dom[block.type])
    wrapper.innerHTML = block.data.text
    return wrapper.outerHTML
  }).join('')
  console.log(markup)
  return markup
}

export { jsonToHTML }