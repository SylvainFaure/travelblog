import Cookie from 'cookie'
import JsCookie from 'js-cookie'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { nuxtI18nSeo } from './seo-head'

Vue.use(VueI18n)

export default async (context) => {
  const { app, route, store, req, res } = context;

  // Options
  const lazy = false
  const vuex = {"moduleName":"i18n","mutations":{"setLocale":"I18N_SET_LOCALE","setMessages":"I18N_SET_MESSAGES"},"preserveState":false}

  // Helpers
  const LOCALE_CODE_KEY = 'code'
  const LOCALE_DOMAIN_KEY = 'domain'
  const getLocaleCodes = (locales = []) => {
  if (locales.length) {
    // If first item is a sting, assume locales is a list of codes already
    if (typeof locales[0] === 'string') {
      return locales
    }
    // Attempt to get codes from a list of objects
    if (typeof locales[0][LOCALE_CODE_KEY] === 'string') {
      return locales.map(locale => locale[LOCALE_CODE_KEY])
    }
  }
  return []
}
  const getLocaleFromRoute = (route = {}, routesNameSeparator = '', defaultLocaleRouteNameSuffix = '', locales = []) => {
  const codes = getLocaleCodes(locales)
  const localesPattern = `(${codes.join('|')})`
  const defaultSuffixPattern = `(?:${routesNameSeparator}${defaultLocaleRouteNameSuffix})?`
  // Extract from route name
  if (route.name) {
    const regexp = new RegExp(`${routesNameSeparator}${localesPattern}${defaultSuffixPattern}$`, 'i')
    const matches = route.name.match(regexp)
    if (matches && matches.length > 1) {
      return matches[1]
    }
  } else if (route.path) {
    // Extract from path
    const regexp = new RegExp(`^/${localesPattern}/`, 'i')
    const matches = route.path.match(regexp)
    if (matches && matches.length > 1) {
      return matches[1]
    }
  }
  return null
}
  const getHostname = () => (
  process.browser ? window.location.href.split('/')[2] : req.headers.host // eslint-disable-line
)
  const getForwarded = () => (
  process.browser ? window.location.href.split('/')[2] : (req.headers['x-forwarded-host'] ? req.headers['x-forwarded-host'] : req.headers.host)
)
  const getLocaleDomain = () => {
  const hostname = app.i18n.forwardedHost ? getForwarded() : getHostname()
  if (hostname) {
    const localeDomain = app.i18n.locales.find(l => l[LOCALE_DOMAIN_KEY] === hostname) // eslint-disable-line
    if (localeDomain) {
      return localeDomain[LOCALE_CODE_KEY]
    }
  }
  return null
}
  const syncVuex = async (locale = null, messages = null) => {
  if (vuex && store) {
    if (locale !== null && vuex.mutations.setLocale) {
      await store.dispatch(vuex.moduleName + '/setLocale', locale)
    }
    if (messages !== null && vuex.mutations.setMessages) {
      await store.dispatch(vuex.moduleName + '/setMessages', messages)
    }
  }
}

  // Register Vuex module
  if (store) {
    store.registerModule(vuex.moduleName, {
      namespaced: true,
      state: () => ({
        locale: '',
        messages: {}
      }),
      actions: {
        setLocale ({ commit }, locale) {
          commit(vuex.mutations.setLocale, locale)
        },
        setMessages ({ commit }, messages) {
          commit(vuex.mutations.setMessages, messages)
        }
      },
      mutations: {
        [vuex.mutations.setLocale] (state, locale) {
          state.locale = locale
        },
        [vuex.mutations.setMessages] (state, messages) {
          state.messages = messages
        }
      }
    }, { preserveState: vuex.preserveState })
  }

  const detectBrowserLanguage = {"useCookie":true,"cookieKey":"i18n_redirected","alwaysRedirect":"","fallbackLocale":null}
  const { useCookie, cookieKey } = detectBrowserLanguage

  const setLocaleCookie = locale => {
    if (!useCookie) {
      return;
    }
    const date = new Date()
    if (process.client) {
      JsCookie.set(cookieKey, locale, {
        expires: new Date(date.setDate(date.getDate() + 365)),
        path: '/'
      })
    } else if (res) {
      const redirectCookie = Cookie.serialize(cookieKey, locale, {
        expires: new Date(date.setDate(date.getDate() + 365)),
        path: '/'
      })
      res.setHeader('Set-Cookie', redirectCookie)
    }
  }

  // Set instance options
  app.i18n = new VueI18n({"messages":{"it":{"main_title":"Orme","label_published":"Pubblicato","label_trips":"Viaggi","label_in":"In","label_articles":"Articoli","label_last_articles":"Ultimi articoli","label_discover":"Scopri","label_discover_step":"Scopri la tappa","routes":{"gallery":"galleria"},"gallery_title":"Foto"},"fr":{"main_title":"Cartes de Voyages","label_published":"Publié","label_trips":"Voyages","label_in":"Dans","label_articles":"Articles","label_last_articles":"Derniers articles","label_discover":"Découvrez","label_discover_step":"Découvrez l'étape","routes":{"gallery":"gallerie"},"gallery_title":"Gallerie photo"}}})
  app.i18n.locales = [{"code":"fr","iso":"fr-FR","name":"FR"},{"code":"it","iso":"it-IT","name":"IT"}]
  app.i18n.defaultLocale = 'fr'
  app.i18n.differentDomains = false
  app.i18n.forwardedHost = false
  app.i18n.beforeLanguageSwitch = () => null
  app.i18n.onLanguageSwitched = () => null
  app.i18n.setLocaleCookie = setLocaleCookie
  // Extension of Vue
  if (!app.$t) {
    app.$t = app.i18n.t
  }

  // Inject seo function
  Vue.prototype.$nuxtI18nSeo = nuxtI18nSeo

  if (store && store.state.localeDomains) {
    app.i18n.locales.forEach(locale => {
      locale.domain = store.state.localeDomains[locale.code]
    })
  }

  let locale = app.i18n.defaultLocale || null

  if (app.i18n.differentDomains) {
    const domainLocale = getLocaleDomain()
    locale = domainLocale ? domainLocale : locale
  } else {
    const routesNameSeparator = '___'
    const defaultLocaleRouteNameSuffix = 'default'

    const routeLocale = getLocaleFromRoute(route, routesNameSeparator, defaultLocaleRouteNameSuffix, app.i18n.locales)
    locale = routeLocale ? routeLocale : locale
  }

  app.i18n.locale = locale

  // Lazy-load translations
  if (lazy) {
    const { loadLanguageAsync } = require('./utils')

    // Load fallback locale.
    if (app.i18n.fallbackLocale && app.i18n.locale !== app.i18n.fallbackLocale) {
      await loadLanguageAsync(context, app.i18n.fallbackLocale)
    }

    const messages = await loadLanguageAsync(context, app.i18n.locale)
    await syncVuex(locale, messages)
    return messages
  } else {
    // Sync Vuex
    await syncVuex(locale, app.i18n.getLocaleMessage(locale))
  }
}
