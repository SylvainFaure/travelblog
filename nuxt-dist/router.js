import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _b18e6fa4 = () => interopDefault(import('../public/pages/discogs/index.vue' /* webpackChunkName: "pages/discogs/index" */))
const _389e3768 = () => interopDefault(import('../public/pages/travel/index.vue' /* webpackChunkName: "pages/travel/index" */))
const _5228309d = () => interopDefault(import('../public/pages/travel/_travelSlug/index.vue' /* webpackChunkName: "pages/travel/_travelSlug/index" */))
const _2405e9c0 = () => interopDefault(import('../public/pages/travel/_travelSlug/gallery/index.vue' /* webpackChunkName: "pages/travel/_travelSlug/gallery/index" */))
const _5260c582 = () => interopDefault(import('../public/pages/travel/_travelSlug/_article/index.vue' /* webpackChunkName: "pages/travel/_travelSlug/_article/index" */))
const _e472947c = () => interopDefault(import('../public/pages/travel/_travelSlug/_article/gallery/index.vue' /* webpackChunkName: "pages/travel/_travelSlug/_article/gallery/index" */))
const _2bccec17 = () => interopDefault(import('../public/pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/discogs",
      component: _b18e6fa4,
      name: "discogs___fr"
    }, {
      path: "/it/discogs",
      component: _b18e6fa4,
      name: "discogs___it"
    }, {
      path: "/voyages",
      component: _389e3768,
      name: "travel___fr"
    }, {
      path: "/it/viaggi",
      component: _389e3768,
      name: "travel___it"
    }, {
      path: "/voyages/:travelSlug",
      component: _5228309d,
      name: "travel-travelSlug___fr"
    }, {
      path: "/it/viaggi/:travelSlug",
      component: _5228309d,
      name: "travel-travelSlug___it"
    }, {
      path: "/voyages/:travelSlug/gallerie",
      component: _2405e9c0,
      name: "travel-travelSlug-gallery___fr"
    }, {
      path: "/it/viaggi/:travelSlug/gallery",
      component: _2405e9c0,
      name: "travel-travelSlug-gallery___it"
    }, {
      path: "/voyages/:travelSlug/:article",
      component: _5260c582,
      name: "travel-travelSlug-article___fr"
    }, {
      path: "/it/viaggi/:travelSlug/:article",
      component: _5260c582,
      name: "travel-travelSlug-article___it"
    }, {
      path: "/voyages/:travelSlug/:article/gallerie",
      component: _e472947c,
      name: "travel-travelSlug-article-gallery___fr"
    }, {
      path: "/it/viaggi/:travelSlug/:article/gallery",
      component: _e472947c,
      name: "travel-travelSlug-article-gallery___it"
    }, {
      path: "/",
      component: _2bccec17,
      name: "index___fr"
    }, {
      path: "/it/",
      component: _2bccec17,
      name: "index___it"
    }],

    fallback: false
  })
}
