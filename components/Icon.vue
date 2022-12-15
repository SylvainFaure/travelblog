<template>
  <svg
    :class="{
      'fill-current icon': true,
      'cursor-pointer': !!$listeners,
      'w-2 h-2': small,
      'w-4 h-4': !small
    }"
    v-on="$listeners"
  >
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>
<script>
import VueTypes from 'vue-types'
export default {
  props: {
    name: VueTypes.string.def(''),
    small: VueTypes.bool.def(false)
  }
}
</script>
