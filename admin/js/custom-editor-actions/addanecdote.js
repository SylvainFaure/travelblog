
export default class AddAnecdote {

  static get isInline() {
    return true;
  }

  static get sanitize() {
    return {
      span: true
    };
  }

  get state() {
    return this._state;
  }

  set state(state) {
    this._state = state;
    this.button.classList.toggle(this.api.styles.inlineToolButtonActive, state);
  }

  constructor({api, config}) {
    // can pass custom value in config
    // console.log('Add anecdote constructor', api, config)
    this.context = config.context
    this.api = api;
    this.button = null;
    this._state = false;

    this.tag = 'SPAN';
    this.class = 'anecdote';
  }

  render() {
    // render button for inline toolbar
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.innerHTML = '<i class="icon sticky note outline"></i>'
    // this.button.classList.add(this.api.styles.inlineToolButton);

    return this.button;
  }

  surround(range) {
    // execute the action on selection
    if (this.state) {
      this.unwrap(range);
      return;
    }

    this.wrap(range);
  }

  wrap(range) {
    const selectedText = range.extractContents();
    const anecdote = document.createElement(this.tag);

    anecdote.classList.add(this.class);
    anecdote.appendChild(selectedText);
    range.insertNode(anecdote);

    this.api.selection.expandToTag(anecdote);
  }

  unwrap(range) {
    const anecdote = this.api.selection.findParentTag(this.tag, this.class);
    const text = range.extractContents();

    anecdote.remove();

    range.insertNode(text);
  }


  checkState() {
    // called for every inline tool when text selection is made
    const anecdote = this.api.selection.findParentTag(this.tag);

    this.state = $(anecdote).hasClass('anecdote');
    console.log('checkState', anecdote)
    if (this.state) {
      this.showActions(anecdote);
    } else {
      this.hideActions();
    }
  }

  renderActions() {
    this.anecdotePicker = document.createElement('input');
    this.anecdotePicker.type = 'text';
    this.anecdotePicker.value = '';
    this.anecdotePicker.hidden = true;

    return this.anecdotePicker;
  }

  showActions(anec) {
    let value
    const modal = `.ui.modal.choose-anecdote`
    $(modal).modal('show');
    $(`.select-anecdote`).on('change input', (e) => {
      value = JSON.parse(e.target.value)
    })
    $('.confirm-anecdote').click(elt => {
      if (!!value) {
        $(anec).addClass(`anecdote-${value.anecdote_id}`).attr('data-title', value.anecdote_title)
      }
    })
  }

  hideActions() {
    console.log('HIDE ACTION')
  }
}