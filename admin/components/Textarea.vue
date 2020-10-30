<template>
  <div>
    <h4 v-if="label" class="label font-bold my-4">
      <span class="bg-white z-10 pr-6">{{ label }}</span>
    </h4>
    <textarea
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :rows="rows"
      :class="[classes, 'w-full p-2 rounded border border-grey-600']"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
import VueTypes from 'vue-types'
export default {
  props: {
    name: VueTypes.string.def('textarea'),
    placeholder: VueTypes.string.def(''),
    label: VueTypes.string.def(null),
    required: VueTypes.bool.def(false),
    rows: VueTypes.number.def(4),
    value: VueTypes.string.def(''),
    classes: VueTypes.string.def('')
  }
}
</script>
