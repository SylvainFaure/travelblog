<template>
  <div :class="{ 'mt-2 mb-4': !small }">
    <h4 v-if="label" class="label font-bold my-4">
      <span class="bg-white z-10 pr-6">{{ label }}</span>
    </h4>
    <input
      :id="id"
      :class="[small ? 'text-xs' : '', 'w-full p-2 rounded border']"
      :type="type"
      :name="name"
      :required="required"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="value"
      @keyup.enter="$emit('enter')"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
import VueTypes from 'vue-types'
export default {
  props: {
    type: VueTypes.string.def('text'),
    name: VueTypes.string.def('input'),
    id: VueTypes.string.def('input'),
    label: VueTypes.string.def(''),
    placeholder: VueTypes.string.def(''),
    required: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    value: VueTypes.string.def(''),
    small: VueTypes.bool.def(false)
  }
}
</script>
