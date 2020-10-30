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
  async fetchEverything({ commit }) {
    commit('setIsError', false)
    const getAnecdotes = this.$axios.get(`/api/anecdotes`)
    const getSettings = this.$axios.get(`/api/settings`)
    const getCategories = this.$axios.get(`/api/categories`)

    try {
      const [anecdotes, settings, categories] = await Promise.all([getAnecdotes, getSettings, getCategories])
      commit('setAnecdotes', anecdotes.data)
      commit('setSettings', settings.data)
      commit('setCategories', categories.data)
      commit('setIsReady', true)
    } catch (error) {
      commit('setIsError', true)
      console.warn(error)
    } finally {
      commit('setIsLoading', false)
    }
  }
}
