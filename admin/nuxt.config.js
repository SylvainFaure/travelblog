export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,
  server: {
    port: 3001
  },

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Carte de voyage - Admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap'
      }
    ],
    script: [
      {
        src: 'https://maps.google.com/maps/api/js?key=AIzaSyAOfPfOY1Xiv5nP5dke616CAtQbjLFsgR4&libraries=places',
        async: true,
        defer: true
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['@/plugins/v-tooltip.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  router: {
    middleware: ['auth']
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/axios', 'nuxt-i18n', '@nuxtjs/toast', 'portal-vue/nuxt'],
  axios: {
    baseUrl: 'http://admin.cartedevoyages.com/api',
    proxy: true
  },
  proxy: {
    '/api/': {
      target: 'http://admin.cartedevoyages.com/api',
      pathRewrite: { '^/api': '' }
    }
  },
  i18n: {
    locales: [
      {
        code: 'fr',
        file: 'fr-FR.js'
      },
      {
        code: 'it',
        file: 'it-IT.js'
      }
    ],
    defaultLocale: 'fr',
    langDir: 'lang/',
    lazy: true,
    strategy: 'no_prefix'
  },
  toast: {
    position: 'top-right',
    duration: 5000
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    publicPath: 'admin/'
  }
}
