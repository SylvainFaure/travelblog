import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      travels: [],
      articles: [],
      assets: []
    },
    mutations: {
      setTravels(state, travels) {
        state.travels = travels
      },
      setArticles(state, articles) {
        state.articles = articles
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        const getTravels = axios.get(`http://localhost:3000/api/travels`)
        const getArticles = axios.get(`http://localhost:3000/api/articles`)
        return Promise.all([getTravels, getArticles])
          .then(data => {
            data.forEach((arr, i) => {
              if (arr.data[0].travel_id) {
                console.log('calling setTravels')
                vuexContext.commit('setTravels', arr.data)
              }
              if (arr.data[0].article_id) {
                console.log('calling setArticles')
                vuexContext.commit('setArticles', arr.data)
              }
            })
          })
          .catch(err => context.error(err))
      }
      /* setTravels(vuexContext, travels) {
        vuexContext.commit('setTravels', travels)
      } */
    },
    getters: {
      travels(state) {
        return state.travels
      },
      article(state) {
        return state.articles
      }
    }
  })
}

export default createStore
