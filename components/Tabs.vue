<template>
  <div class="flex m-6">
    <div
      v-for="tab in mappedTabs"
      :key="tab.key"
      :class="{
        'font-bold border-b-2 border-gray-400': tab.active,
        'cursor-pointer mr-8 py-2': true
      }"
      @click="handleTabClick(tab)"
    >
      {{ tab.name }}
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
export default {
  props: {
    tabs: VueTypes.array.def([])
  },
  data() {
    return {
      mappedTabs: []
    }
  },
  mounted() {
    this.mappedTabs = this.tabs.map((t, i) => ({ ...t, active: i === 0 }))
  },
  methods: {
    handleTabClick(tab) {
      this.$emit('tab', tab)
      this.mappedTabs = this.mappedTabs.map((t) => ({
        ...t,
        active: t.key === tab.key
      }))
    }
  }
}
</script>
