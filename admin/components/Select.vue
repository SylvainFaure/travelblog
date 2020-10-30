<template>
  <div>
    <h4 v-if="label" class="label font-bold my-4">
      <span class="bg-white z-10 pr-6">{{ label }}</span>
    </h4>
    <v-select
      :options="options"
      :label="optionLabel"
      :multiple="multiple"
      :taggable="taggable"
      :push-tags="pushTags"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event)"
    />
  </div>
</template>

<script>
import vSelect from 'vue-select'
import VueTypes from 'vue-types'
import 'vue-select/dist/vue-select.css'
export default {
  components: {
    vSelect
  },
  props: {
    label: VueTypes.string.def(null),
    placeholder: VueTypes.string.def(null),
    options: VueTypes.array.def([]),
    optionLabel: VueTypes.string.def('label'),
    multiple: VueTypes.bool.def(false),
    taggable: VueTypes.bool.def(false),
    pushTags: VueTypes.bool.def(false),
    value: VueTypes.oneOfType([VueTypes.object, VueTypes.array]).def(null),
    small: VueTypes.bool.def(false)
  }
}
</script>
<style lang="scss">
.vs__dropdown-toggle {
  @apply border;
}
.label {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  &::after {
    content: '';
    position: absolute;
    padding-left: 2px;
    width: 100%;
    height: 1px;
    background-color: black;
  }
}
</style>
