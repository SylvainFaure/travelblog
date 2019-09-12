<template>
  <h4 class="change-lang__content">
    <nuxt-link
      v-for="(locale, i) in locales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
    >
      {{ locale.name }} {{ i === locales.length - 1 ? '' : '|' }}
    </nuxt-link>
  </h4>
</template>
<script>
export default {
  data() {
    return {
      lang: ''
    }
  },
  computed: {
    locales() {
      return this.$i18n.locales
    },
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  },
  methods: {
    setLang(lang) {
      this.$store.dispatch('setLang', lang)
    },
    getLang() {
      switch (window.navigator.language) {
        case 'it-IT':
          this.$store.dispatch('setLang', 'it')
          break
        case 'fr-FR':
          this.$store.dispatch('setLang', 'fr')
          break
        default:
          this.$store.dispatch('setLang', 'fr') // TODO geolocation + fallback sur le pays le plus proche
      }
    }
  }
}
</script>
<style lang="scss">

</style>
