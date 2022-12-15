export const state = () => ({
  visible: false,
  modalId: null
})

export const mutations = {
  setVisible: (state, payload) => {
    state.visible = payload
  },
  setModalId: (state, payload) => {
    state.modalId = payload
  }
}
