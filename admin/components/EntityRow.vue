<template>
  <div class="flex">
    <div
      :class="[
        { 'bg-gray-200 pointer-events-none': unpublished },
        'w-full border border-gray-500 rounded py-2 px-4 flex'
      ]"
    >
      <div class="font-bold" v-html="title" />
      <div v-if="type === 'article'" class="mx-2" v-html="articleCountry" />

      <div v-if="type === 'travel'" class="mx-2" v-html="travelCountries">
        {{ entity[`${type}_countries_${locale}`].join(', ') }}
      </div>
    </div>
    <div v-if="!unpublished" class="flex items-center px-2 text-gray-600">
      <Icon name="menu2" />
      <Btn icon-btn :label="$t('general.remove')" icon="cross" type="raw" @click="$emit('remove')" />
    </div>
    <div v-else class="flex items-center">
      <Btn icon-btn :label="$t('general.edit')" icon="pencil" type="raw" @click="$emit('edit')" />
      <!-- <Btn icon-btn :label="$t('general.publish')" icon="rocket" type="raw" @click="$emit('publish')" /> -->
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
export default {
  props: {
    entity: VueTypes.object.def(null),
    type: VueTypes.string.def(''),
    unpublished: VueTypes.bool.def(false)
  },
  data() {
    const locale = this.$i18n.locale
    const otherLocale = locale === 'fr' ? 'it' : 'fr'
    return {
      locale,
      otherLocale
    }
  },
  computed: {
    title() {
      return this.entity[`${this.type}_title_${this.locale}`]
        ? this.entity[`${this.type}_title_${this.locale}`]
        : `<span class="italic text-gray-500">${this.entity[`${this.type}_title_${this.otherLocale}`]}</span>`
    },
    articleCountry() {
      return this.entity[`${this.type}_country_${this.locale}`]
        ? this.entity[`${this.type}_country_${this.locale}`]
        : `<span class="italic text-gray-500">${this.entity[`${this.type}_country_${this.otherLocale}`]}</span>`
    },
    travelCountries() {
      return this.entity[`${this.type}_countries_${this.locale}`]
        ? this.entity[`${this.type}_countries_${this.locale}`].join(', ')
        : `<span class="italic text-gray-500">${this.entity[`${this.type}_countries_${this.otherLocale}`].join(
            ', '
          )}</span>`
    }
  }
}
</script>
