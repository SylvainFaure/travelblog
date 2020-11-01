<template>
  <header class="flex justify-between bg-gray-900 text-white p-6">
    <div class="flex">
      <h1 class="mr-2 font-semibold">{{ $t('title') }}</h1>
      <div class="flex divide-x divide-grey-100">
        <div v-for="voice in menu" :key="voice" class="px-4">
          <nuxt-link :to="`/${voice}`">
            {{ $t(`menu.${voice}`) }}
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="flex">
      <a
        v-for="locale in $i18n.locales"
        :key="locale.code"
        class="ml-4 flex items-center"
        href="#"
        @click.prevent.stop="setLocale(locale.code)"
      >
        <img :src="`/${locale.code}.png`" class="w-4 h-4 mr-2" />
        {{ locale.code.toUpperCase() }}
      </a>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      title: 'Carte de voyages',
      menu: ['homepage', 'travels', 'articles', 'assets', 'anecdotes']
    }
  },
  methods: {
    setLocale(code) {
      this.$i18n.setLocale(code)
      this.$router.go()
    }
  }
}
</script>
