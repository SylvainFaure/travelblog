<template>
  <div :class="[color, 'text-xs rounded-md px-2 py-1', { 'cursor-pointer': selectable }]" @click="$emit('click')">
    <span>{{ !!tag ? `#${tag}` : '# No place' }}</span>
    <span v-if="deletable" class="cursor-pointer font-bold" @click="$emit('remove', tag)">x</span>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
export default {
  props: {
    deletable: VueTypes.bool.def(false),
    selectable: VueTypes.bool.def(false),
    selected: VueTypes.bool.def(false),
    tag: VueTypes.string.def('')
  },
  computed: {
    color() {
      const colors = ['gray', 'indigo', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'purple', 'pink']
      return `${this.selectable && !this.selected ? 'border-2 border-' : 'text-white bg-'}${
        colors[Math.floor(Math.random() * (colors.length - 1))]
      }-500`
    }
  }
}
</script>
