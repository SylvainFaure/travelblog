export const state = () => ({
  user: null,
  token: 'token.token.token',
  isLogged: false
})

export const mutations = {
  setUser: (state, payload) => {
    state.user = payload
  },
  setToken: (state, payload) => {
    state.token = payload
  },
  setIsLogged: (state, payload) => {
    state.isLogged = payload
  }
}

export const actions = {
  getToken: ({ commit, state }) => {
    if (state.user) {
      commit('token', state.user.token)
    }
  },
  getUser: ({ commit }) => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    commit('setUser', user)
  }
}
