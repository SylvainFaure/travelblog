<template>
  <div class="flex">
    <div
      :class="[
        { 'bg-gray-200 pointer-events-none': unpublished },
        'w-full border border-gray-500 rounded py-2 px-4 flex'
      ]"
    >
      <div class="font-bold">{{ entity[`${type}_title_${locale}`] }}</div>
      <div class="mx-2">
        {{
          entity[`${type}_${type === 'article' ? 'country' : 'countries'}_${locale}`].join(
            `${type === 'article' ? '' : ', '}`
          )
        }}
      </div>
    </div>
    <div v-if="!unpublished" class="flex items-center px-2 text-gray-600">
      <Icon name="menu2" />
    </div>
    <div v-else class="flex items-center">
      <Btn icon-btn :label="$t('general.edit')" icon="pencil" type="raw" @click="$emit('edit')" />
      <Btn icon-btn :label="$t('general.publish')" icon="rocket" type="raw" @click="$emit('publish')" />
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
    return {
      locale: 'fr'
    }
  },
  mounted() {
    this.locale = this.$i18n.locale
  }
}
</script>
