<template>
  <button type="button" :class="[classes, additionalClasses, 'rounded text-center']" @click="$emit('click')">
    <span v-if="!iconBtn">{{ label }}</span>
    <span v-else v-tooltip="label"><Icon :name="icon" /></span>
  </button>
</template>

<script>
import VueTypes from 'vue-types'
export default {
  props: {
    type: VueTypes.string.def('primary'),
    label: VueTypes.string.def('Save'),
    iconBtn: VueTypes.bool.def(false),
    icon: VueTypes.string.def('checkmark'),
    additionalClasses: VueTypes.string.def('')
  },
  computed: {
    classes() {
      const others = this.iconBtn ? 'px-4 py-2' : 'p-2'
      return `bg-${this.type || 'primary'} ${this.type === 'raw' ? '' : 'border text-white'} ${others}`
    }
  }
}
</script>
