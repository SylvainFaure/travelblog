export const state = () => ({
  isReady: false,
  loading: true,
  error: false,
  anecdotes: null,
  settings: null,
  categories: null
})

export const mutations = {
  setAnecdotes: (state, payload) => {
    state.anecdotes = payload
  },
  setSettings: (state, payload) => {
    state.settings = payload
  },
  setCategories: (state, payload) => {
    state.categories = payload
  },
  setIsLoading: (state, payload) => {
    state.loading = payload
  },
  setIsError: (state, payload) => {
    state.error = payload
  },
  setIsReady: (state, payload) => {
    state.isReady = payload
  }
}
export const actions = {
  fetchEverything({ commit }) {
    commit('setIsError', false)
    try {
      commit('setIsReady', true)
    } catch (error) {
      commit('setIsError', true)
      console.warn(error)
    } finally {
      commit('setIsLoading', false)
    }
  }
}
