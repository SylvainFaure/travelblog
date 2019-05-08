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
      },
      setAssets(state, assets) {
        state.assets = assets
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        const getTravels = axios.get(`http://localhost:3000/api/travels`)
        const getArticles = axios.get(`http://localhost:3000/api/articles`)
        const getAssets = axios.get('http//localhost:3000/api/assets')
        return Promise.all([getTravels, getArticles, getAssets])
          .then(data => {
            data.forEach((arr, i) => {
              console.log(arr.data)
              if (arr.data[0].travel_id) {
                // console.log('calling setTravels', arr.data)
                vuexContext.commit('setTravels', arr.data)
              }
              if (arr.data[0].article_id) {
                // console.log('calling setArticles', arr.data)
                vuexContext.commit('setArticles', arr.data)
              }
              if (arr.data[0].asset_id) {
                console.log('calling setAssets', arr.data)
                vuexContext.commit('setAssets', arr.data)
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
      articles(state) {
        return state.articles
      },
      assets(state) {
        return state.assets
      }
    }
  })
}

export default createStore
