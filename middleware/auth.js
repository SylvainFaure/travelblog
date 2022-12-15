export default async function ({ $axios, store, redirect, route }) {
  const user = JSON.parse(window.localStorage.getItem('user'))
  const token = user && user.token ? user.token : store.state.auth.token
  const res = await $axios.post('/api/users/verifytoken', { token })
  const isValid = !['JsonWebTokenError', 'TokenExpiredError'].includes(res.data.name)
  if (!isValid) {
    store.commit('auth/setIsLogged', false)
    // eslint-disable-next-line no-console
    console.debug(`You are not logged in: %s`, res.data.name)
    if (route.path !== '/login') {
      redirect('/login')
    }
  } else if (!store.state.auth.isLogged) {
    const { role, email } = res.data
    const user = { email, role, token }
    store.commit('auth/setIsLogged', true)
    store.commit('auth/setUser', user)
    $axios.setHeader('x-access-token', token, ['post', 'put', 'delete'])
    store.dispatch('fetchEverything')
    if (route.path === '/login') {
      redirect('/')
    }
  }
}
