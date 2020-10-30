export default class AddAnecdote {
  static get isInline() {
    return true
  }

  static get sanitize() {
    return {
      span: true
    }
  }

  get state() {
    return this._state
  }

  set state(state) {
    this._state = state
    this.button.classList.toggle(this.api.styles.inlineToolButtonActive, state)
  }

  constructor({ api, config }) {
    // can pass custom value in config
    this.store = window.$nuxt.$store
    this.api = api
    this.button = null
    this._state = false

    this.tag = 'SPAN'
    this.class = 'anecdote'
  }

  render() {
    // render button for inline toolbar
    this.button = document.createElement('button')
    this.button.type = 'button'
    this.button.innerHTML = ` <svg class="fill-current w-4 h-4 icon cursor-pointer">
                                <use xlink:href="#icon-file-empty"></use>
                              </svg>`
    // this.button.classList.add(this.api.styles.inlineToolButton);

    return this.button
  }

  surround(range) {
    // execute the action on selection
    if (this.state) {
      this.unwrap(range)
      return
    }

    this.wrap(range)
  }

  wrap(range) {
    const selectedText = range.extractContents()
    const anecdote = document.createElement(this.tag)

    anecdote.classList.add(this.class)
    anecdote.appendChild(selectedText)
    range.insertNode(anecdote)

    this.api.selection.expandToTag(anecdote)
  }

  unwrap(range) {
    const anecdote = this.api.selection.findParentTag(this.tag, this.class)
    const text = range.extractContents()

    anecdote.remove()

    range.insertNode(text)
  }

  checkState() {
    // called for every inline tool when text selection is made
    const anecdote = this.api.selection.findParentTag(this.tag)

    this.state = anecdote && Array.from(anecdote.classList).includes('anecdote')
    if (this.state) {
      this.showActions(anecdote)
    } else {
      this.hideActions()
    }
  }

  renderActions() {
    this.anecdotePicker = document.createElement('input')
    this.anecdotePicker.type = 'text'
    this.anecdotePicker.value = ''
    this.anecdotePicker.hidden = true

    return this.anecdotePicker
  }

  showActions(anec) {
    this.store.commit('modal/setVisible', true)
    this.store.commit('modal/setModalId', 'anecdote')
    setTimeout(() => {
      const confirmAnecdote = document.querySelector('.confirm-anecdote')
      confirmAnecdote.addEventListener('click', (event) => {
        const value = this.store.state.editor.value
        anec.classList.add(`anecdote-${value.anecdote_id}`)
        anec.setAttribute('data-title', value.anecdote_title)
        this.store.commit('modal/setVisible', false)
        this.store.commit('modal/setModalId', null)
      })
    })
  }

  hideActions() {
    // console.log('HIDE ACTION')
  }
}
