const pkg = require('package')
const localeMessages = require('./public/utils/messages')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    {
      src: '~/styles/transition.scss',
      lang: 'scss'
    }
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: '~/mixins/formatTravel.js',
      ssr: false
    },
    {
      src: '~/mixins/formatAsset.js',
      ssr: false
    },
    {
      src: '~/mixins/formatArticle.js',
      ssr: false
    },
    {
      src: '~/mixins/formatDate.js',
      ssr: false
    },
    {
      src: '~/plugins/i18n.js',
      ssr: false
    },
    {
      src: '~/plugins/lazyload.js',
      ssr: false
    }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    ['nuxt-i18n', {
      locales: [
        {
          code: 'fr', 
          iso: 'fr-FR',
          name: 'FR'
        },
        {
          code: 'it',
          iso: 'it-IT',
          name: 'IT'
        }
      ],
      defaultLocale: 'fr',
      vueI18n: {
        messages: localeMessages
      }
    }]
    // Doc: https://axios.nuxtjs.org/usage
  ],  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
  },
  srcDir: 'public/',
  dev: process.env.NODE_ENV == 'development',
  env: {
    AWS_BUCKET_PATH: process.env.AWS_BUCKET_PATH,
  }
}
