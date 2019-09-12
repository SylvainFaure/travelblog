import Vuex from 'vuex'
import axios from 'axios'

import articles from './articles'
import assets from './assets'
import travels from './travels'

const createStore = () => {
  return new Vuex.Store({
    state: {
      travels: [],
      articles: [],
      assets: [],
      lang: ''
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
      },
      setLang(state, lang) {
        state.lang = lang
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        if (process.env.STANDALONE) {
          vuexContext.commit('setTravels', travels)
          vuexContext.commit('setArticles', articles)
          vuexContext.commit('setAssets', assets)
          vuexContext.commit('setLang', 'fr')
        }
        if (!process.env.STANDALONE) {
          const getTravels = axios.get(`${process.env.BASE_PATH}api/travels`)
          const getArticles = axios.get(`${process.env.BASE_PATH}api/articles`)
          const getAssets = axios.get(`${process.env.BASE_PATH}api/assets`)
          return Promise.all([getTravels, getArticles, getAssets])
            .then(data => {
              data.forEach((arr, i) => {
                if (arr.data[0].travel_id) {
                  // console.log('calling setTravels', arr.data)
                  vuexContext.commit('setTravels', arr.data)
                }
                if (arr.data[0].article_id) {
                  // console.log('calling setArticles', arr.data)
                  vuexContext.commit('setArticles', arr.data)
                }
                if (arr.data[0].asset_id) {
                  // console.log('calling setAssets', arr.data)
                  vuexContext.commit('setAssets', arr.data)
                }
              })
            })
            .catch(err => context.error(err))
        }
      },
      setLang(vuexContext, lang) {
        vuexContext.commit('setLang', lang)
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
      },
      lang(state) {
        return state.lang
      }
    }
  })
}

export default createStore
