export const state = () => ({
  value: ''
})

export const mutations = {
  setValue: (state, payload) => {
    state.value = payload
  }
}
