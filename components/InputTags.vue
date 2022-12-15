<template>
  <div>
    <h4 v-if="label" class="label font-bold my-4">
      <span class="bg-white z-10 pr-6">{{ label }}</span>
    </h4>
    <div class="flex flex-wrap">
      <Tag v-for="tag in tags" :key="tag" class="mr-2 my-2" :tag="tag" deletable @remove="removeTag" />
    </div>
    <div class="relative">
      <InputText v-model="inputModel" @enter="addTag" />
      <div
        class="cursor-pointer text-white absolute right-0 top-0 h-full w-12 bg-gray-600 flex justify-center items-center"
        @click="addTag"
      >
        <Icon name="plus" />
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
export default {
  props: {
    value: VueTypes.array.def([]),
    label: VueTypes.string.def(null),
    options: VueTypes.array.def([])
  },
  data() {
    return {
      inputModel: '',
      tags: []
    }
  },
  mounted() {
    if (this.value) {
      this.tags = this.value
    }
  },
  methods: {
    addTag() {
      this.tags.push(this.inputModel)
      this.inputModel = ''
      this.$emit('change', this.tags)
    },
    removeTag(tag) {
      this.tags = this.tags.filter((t) => t !== tag)
      this.$emit('change', this.tags)
    }
  }
}
</script>
